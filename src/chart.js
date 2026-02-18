import { Chart, registerables } from 'chart.js';
import { SYMPTOM_KEYS, t } from './i18n.js';
import { SYMPTOM_COLORS } from './sliders.js';

Chart.register(...registerables);

let chartInstance = null;

// Distinct dash patterns so overlapping lines remain distinguishable
const LINE_DASHES = [
  [],           // cough — solid
  [8, 4],       // chest tightness — dashed
  [2, 3],       // breathlessness — dotted
  [10, 3, 2, 3],// wheezing — dash-dot
  [4, 4],       // mucus — short dash
];

const POINT_STYLES = ['circle', 'rect', 'triangle', 'rectRot', 'star'];

// Visual-only vertical offsets to separate overlapping lines.
// Offsets are small enough to be visually negligible but enough to reveal all lines.
const JITTER_OFFSETS = [0, 0.08, -0.08, 0.16, -0.16];

/**
 * Apply jitter: for each stage, if multiple symptoms share the same value,
 * offset them slightly so all lines/points become visible.
 * Returns a new data object with jittered values (original data is untouched).
 */
function applyJitter(data) {
  const jittered = {};
  SYMPTOM_KEYS.forEach((key) => {
    jittered[key] = [...data[key]];
  });

  const stageCount = data[SYMPTOM_KEYS[0]].length;
  for (let s = 0; s < stageCount; s++) {
    // Group symptoms by their raw value at this stage
    const byValue = {};
    SYMPTOM_KEYS.forEach((key, i) => {
      const val = data[key][s];
      if (!byValue[val]) byValue[val] = [];
      byValue[val].push(i);
    });

    // Only jitter groups with 2+ overlapping symptoms
    for (const indices of Object.values(byValue)) {
      if (indices.length < 2) continue;
      indices.forEach((idx, rank) => {
        jittered[SYMPTOM_KEYS[idx]][s] = data[SYMPTOM_KEYS[idx]][s] + JITTER_OFFSETS[rank];
      });
    }
  }
  return jittered;
}

function createChart(canvas) {
  const ctx = canvas.getContext('2d');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: t('stagesShort'),
      datasets: SYMPTOM_KEYS.map((key, i) => ({
        label: t(`symptoms.${key}`),
        data: new Array(8).fill(0),
        borderColor: SYMPTOM_COLORS[key],
        backgroundColor: SYMPTOM_COLORS[key] + '20',
        borderWidth: 2.5,
        borderDash: LINE_DASHES[i],
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: SYMPTOM_COLORS[key],
        pointStyle: POINT_STYLES[i],
        tension: 0.3,
        fill: false,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: (value) => {
              const labels = t('severity');
              return labels[value] ?? value;
            },
            font: { size: 11 },
          },
          grid: {
            color: '#e0e0e0',
          },
        },
        x: {
          ticks: {
            font: { size: 11 },
            maxRotation: 45,
            minRotation: 0,
          },
          grid: {
            color: '#f0f0f0',
          },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 16,
            font: { size: 12 },
          },
          onHover: (event, legendItem, legend) => {
            const ci = legend.chart;
            ci.data.datasets.forEach((ds, i) => {
              ds.borderColor = i === legendItem.datasetIndex
                ? SYMPTOM_COLORS[SYMPTOM_KEYS[i]]
                : SYMPTOM_COLORS[SYMPTOM_KEYS[i]] + '25';
              ds.pointBackgroundColor = ds.borderColor;
            });
            ci.update('none');
          },
          onLeave: (event, legendItem, legend) => {
            const ci = legend.chart;
            ci.data.datasets.forEach((ds, i) => {
              ds.borderColor = SYMPTOM_COLORS[SYMPTOM_KEYS[i]];
              ds.pointBackgroundColor = SYMPTOM_COLORS[SYMPTOM_KEYS[i]];
            });
            ci.update('none');
          },
        },
        tooltip: {
          backgroundColor: 'rgba(26, 26, 46, 0.9)',
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: (context) => {
              const severity = t('severity');
              // Show the real integer value, not the jittered one
              const key = SYMPTOM_KEYS[context.datasetIndex];
              const val = rawData ? rawData[key][context.dataIndex] : Math.round(context.parsed.y);
              return `${context.dataset.label}: ${val} (${severity[val] ?? ''})`;
            },
          },
        },
      },
      animation: {
        duration: 300,
      },
    },
  });

  return chartInstance;
}

// Store raw data for tooltip display
let rawData = null;

function updateChart(data) {
  if (!chartInstance) return;

  rawData = data;
  const jittered = applyJitter(data);

  SYMPTOM_KEYS.forEach((key, i) => {
    chartInstance.data.datasets[i].data = jittered[key];
  });

  chartInstance.update('none');
}

function updateChartLabels() {
  if (!chartInstance) return;

  chartInstance.data.labels = t('stagesShort');
  SYMPTOM_KEYS.forEach((key, i) => {
    chartInstance.data.datasets[i].label = t(`symptoms.${key}`);
  });

  chartInstance.options.scales.y.ticks.callback = (value) => {
    const labels = t('severity');
    return labels[value] ?? value;
  };

  chartInstance.update();
}

function getChartBase64() {
  if (!chartInstance) return null;
  return chartInstance.toBase64Image('image/png', 1);
}

export { createChart, updateChart, updateChartLabels, getChartBase64 };
