import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { SYMPTOM_KEYS, t, getLanguage } from './i18n.js';
import { getChartBase64 } from './chart.js';
import { isClinicalMode, SYMPTOM_COLORS } from './sliders.js';

function getMetadata() {
  const nameEl = document.getElementById('patient-name');
  const dateEl = document.getElementById('report-date');
  return {
    name: nameEl?.value || '',
    date: dateEl?.value || new Date().toISOString().slice(0, 10),
    language: getLanguage(),
  };
}

/* ===== Vector chart helpers ===== */

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function drawPoint(doc, x, y, style, r, rgb) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  switch (style) {
    case 0: // circle
      doc.circle(x, y, r, 'F');
      break;
    case 1: // square
      doc.rect(x - r * 0.85, y - r * 0.85, r * 1.7, r * 1.7, 'F');
      break;
    case 2: // triangle up
      doc.triangle(x, y - r * 1.15, x - r, y + r * 0.65, x + r, y + r * 0.65, 'F');
      break;
    case 3: // diamond
      {
        const d = r * 1.1;
        doc.lines([[d, d], [-d, d], [-d, -d]], x, y - d, [1, 1], 'F', true);
      }
      break;
    case 4: // inverted triangle
      doc.triangle(x, y + r * 1.15, x - r, y - r * 0.65, x + r, y - r * 0.65, 'F');
      break;
  }
}

/** Catmull-Rom → cubic Bézier segments for jsPDF lines(), clamped to plot bounds */
function buildSmoothSegments(pts, tension, yMin, yMax) {
  const n = pts.length;
  const segs = [];
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];

    let cp1dy = (p2.y - p0.y) * tension / 3;
    const endDy = p2.y - p1.y;
    let cp2dy = endDy - (p3.y - p1.y) * tension / 3;

    // Clamp control points to stay within plot bounds
    const cp1y = p1.y + cp1dy;
    if (cp1y < yMin) cp1dy = yMin - p1.y;
    if (cp1y > yMax) cp1dy = yMax - p1.y;

    const cp2y = p1.y + cp2dy;
    if (cp2y < yMin) cp2dy = yMin - p1.y;
    if (cp2y > yMax) cp2dy = yMax - p1.y;

    const cp1dx = (p2.x - p0.x) * tension / 3;
    const cp2dx = (p2.x - p1.x) - (p3.x - p1.x) * tension / 3;

    segs.push([cp1dx, cp1dy, cp2dx, cp2dy, p2.x - p1.x, endDy]);
  }
  return segs;
}

// Dash patterns in mm (matching Chart.js line styles)
const PDF_DASHES = [
  [],               // solid (cough)
  [2.5, 1.5],       // dashed (chest tightness)
  [0.7, 0.9],       // dotted (breathlessness)
  [3.5, 1, 0.7, 1], // dash-dot (wheezing)
  [1.5, 1.5],       // short dash (mucus)
];

function drawVectorChart(doc, data, startX, startY, width, height, clinical) {
  const stages = t('stagesShort');
  const n = stages.length;
  const yMax = clinical ? 100 : 5;
  const yStep = clinical ? 25 : 1;

  // Plot area insets
  const yLabelW = clinical ? 14 : 28;
  const plotL = startX + yLabelW;
  const plotR = startX + width;
  const plotT = startY;
  const plotB = startY + height;
  const plotW = plotR - plotL;
  const plotH = plotB - plotT;

  // Round line caps/joins for nicer dashes
  doc.internal.write('1 J 1 j');

  // Y-axis gridlines + labels
  for (let v = 0; v <= yMax; v += yStep) {
    const y = plotB - (v / yMax) * plotH;
    doc.setDrawColor(228, 228, 228);
    doc.setLineWidth(0.15);
    doc.setLineDashPattern([], 0);
    doc.line(plotL, y, plotR, y);

    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 110);
    const label = clinical ? `${v}` : (t('severity')[v] ?? `${v}`);
    doc.text(label, plotL - 2.5, y + 1, { align: 'right' });
  }

  // X-axis labels + light vertical gridlines
  stages.forEach((stage, i) => {
    const x = plotL + (i / (n - 1)) * plotW;
    if (i > 0 && i < n - 1) {
      doc.setDrawColor(243, 243, 243);
      doc.setLineWidth(0.1);
      doc.setLineDashPattern([], 0);
      doc.line(x, plotT, x, plotB);
    }
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 110);
    doc.text(stage, x, plotB + 4.5, { align: 'center' });
  });

  // Plot border (subtle)
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.2);
  doc.setLineDashPattern([], 0);
  doc.rect(plotL, plotT, plotW, plotH, 'S');

  // Data lines (smooth Bézier) + points
  SYMPTOM_KEYS.forEach((key, ki) => {
    const vals = data[key];
    const rgb = hexToRgb(SYMPTOM_COLORS[key]);
    const pts = vals.map((v, i) => ({
      x: plotL + (i / (n - 1)) * plotW,
      y: plotB - (v / yMax) * plotH,
    }));

    // Smooth curve
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
    doc.setLineWidth(0.8);
    doc.setLineDashPattern(PDF_DASHES[ki], 0);
    const segs = buildSmoothSegments(pts, 0.3, plotT, plotB);
    doc.lines(segs, pts[0].x, pts[0].y, [1, 1], 'S', false);
    doc.setLineDashPattern([], 0);

    // Points
    pts.forEach((p) => drawPoint(doc, p.x, p.y, ki, 1.4, rgb));
  });

  // Reset line caps
  doc.internal.write('0 J 0 j');

  // Legend
  const legY = plotB + 12;
  let legX = plotL;

  SYMPTOM_KEYS.forEach((key, i) => {
    const rgb = hexToRgb(SYMPTOM_COLORS[key]);

    // Dash line sample
    doc.internal.write('1 J'); // round cap for legend lines
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
    doc.setLineWidth(0.7);
    doc.setLineDashPattern(PDF_DASHES[i], 0);
    doc.line(legX, legY, legX + 7, legY);
    doc.setLineDashPattern([], 0);
    doc.internal.write('0 J');

    // Point marker on the line
    drawPoint(doc, legX + 3.5, legY, i, 1.0, rgb);

    // Label
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    const label = t(`symptoms.${key}`);
    doc.text(label, legX + 9, legY + 1);
    legX += 9 + doc.getTextWidth(label) + 5;
  });

  return legY + 5;
}

/* ===== PDF export ===== */

function exportPDF(data) {
  const meta = getMetadata();
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const clinical = isClinicalMode();
  const pageH = 210;
  const margin = 14;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(35, 87, 135);
  doc.text(t('title'), margin, 16);

  // Metadata
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  let y = 24;
  if (meta.name) {
    doc.text(`${t('ui.name').replace(' (optional)', '').replace(' (vapaaehtoinen)', '')}: ${meta.name}`, margin, y);
    y += 5;
  }
  doc.text(`${t('ui.date')}: ${meta.date}`, margin, y);
  if (clinical) {
    doc.setFontSize(8);
    doc.setTextColor(35, 87, 135);
    doc.text('VAS 0\u2013100 mm', margin, y + 4);
    y += 4;
  }

  // Vector chart — fill the page
  const chartTop = y + 8;
  const chartH = clinical ? 120 : 85;
  const chartW = 297 - margin * 2;
  const chartEndY = drawVectorChart(doc, data, margin, chartTop, chartW, chartH, clinical);

  // Data table
  const symptoms = SYMPTOM_KEYS.map((key) => t(`symptoms.${key}`));
  const stages = t('stages');
  const body = stages.map((stage, i) => {
    const row = [stage];
    SYMPTOM_KEYS.forEach((key) => {
      const val = data[key][i];
      row.push(clinical ? `${val} mm` : `${val} (${t('severity')[val]})`);
    });
    return row;
  });

  // Clinical: table on page 2; standard: table below chart on same page
  if (clinical) {
    doc.addPage();
  }

  autoTable(doc, {
    startY: clinical ? margin : chartEndY + 3,
    head: [[t('ui.stageHeader'), ...symptoms]],
    body,
    theme: 'grid',
    headStyles: { fillColor: [35, 87, 135], textColor: 255, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 249, 250] },
    margin: { left: margin, right: margin },
  });

  // Footer on last page
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by Exercise Symptom Mapper', margin, pageH - 6);

  const filename = meta.name
    ? `symptoms_${meta.name.replace(/\s+/g, '_')}_${meta.date}.pdf`
    : `symptoms_${meta.date}.pdf`;
  doc.save(filename);
}

/* ===== Other exports (unchanged) ===== */

function exportXLSX(data) {
  const meta = getMetadata();
  const stages = t('stages');
  const symptoms = SYMPTOM_KEYS.map((key) => t(`symptoms.${key}`));

  const wsData = [
    [t('title')],
    meta.name ? [`${t('ui.name')}: ${meta.name}`] : [],
    [`${t('ui.date')}: ${meta.date}`],
    [],
    [t('ui.stageHeader'), ...symptoms],
    ...stages.map((stage, i) => {
      const row = [stage];
      SYMPTOM_KEYS.forEach((key) => {
        row.push(data[key][i]);
      });
      return row;
    }),
  ].filter((r) => r.length > 0);

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{ wch: 22 }, ...symptoms.map(() => ({ wch: 16 }))];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Symptoms');

  const filename = meta.name
    ? `symptoms_${meta.name.replace(/\s+/g, '_')}_${meta.date}.xlsx`
    : `symptoms_${meta.date}.xlsx`;
  XLSX.writeFile(wb, filename);
}

function exportJSON(data) {
  const meta = getMetadata();
  const stages = t('stages');
  const clinical = isClinicalMode();

  const structured = {
    version: '1.0',
    tool: 'Exercise Symptom Mapper',
    mode: clinical ? 'VAS-100mm' : 'ordinal-0-5',
    language: meta.language,
    date: meta.date,
    name: meta.name || null,
    symptoms: {},
  };

  SYMPTOM_KEYS.forEach((key) => {
    structured.symptoms[key] = {};
    stages.forEach((stage, i) => {
      structured.symptoms[key][stage] = data[key][i];
    });
  });

  const json = JSON.stringify(structured, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const filename = meta.name
    ? `symptoms_${meta.name.replace(/\s+/g, '_')}_${meta.date}.json`
    : `symptoms_${meta.date}.json`;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportClipboard(data) {
  const meta = getMetadata();
  const stages = t('stages');
  const severity = t('severity');

  let text = `${t('title')}\n`;
  if (meta.name) text += `Name: ${meta.name}\n`;
  text += `Date: ${meta.date}\n\n`;

  const clinical = isClinicalMode();
  SYMPTOM_KEYS.forEach((key) => {
    text += `${t(`symptoms.${key}`)}:\n`;
    stages.forEach((stage, i) => {
      const val = data[key][i];
      text += clinical
        ? `  ${stage}: ${val} mm\n`
        : `  ${stage}: ${val} (${severity[val]})\n`;
    });
    text += '\n';
  });

  text += 'Generated by Exercise Symptom Mapper';

  return navigator.clipboard.writeText(text);
}

export { exportPDF, exportXLSX, exportJSON, exportClipboard };
