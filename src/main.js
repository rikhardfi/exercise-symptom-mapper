import './style.css';
import { t, getLanguage, toggleLanguage, SYMPTOM_KEYS } from './i18n.js';
import { createSliders, getData, resetAll, updateLabels } from './sliders.js';
import { createChart, updateChart, updateChartLabels } from './chart.js';
import { exportPDF, exportXLSX, exportJSON, exportClipboard } from './export.js';

let chart = null;

function onSliderChange() {
  const data = getData();
  updateChart(data);
}

function updateAllText() {
  document.getElementById('app-title').textContent = t('title');
  document.getElementById('app-subtitle').textContent = t('subtitle');
  document.getElementById('lang-toggle').textContent = t('ui.languageToggle');

  document.querySelector('label[for="patient-name"]').textContent = t('ui.name');
  document.getElementById('patient-name').placeholder = t('ui.namePlaceholder');
  document.querySelector('label[for="report-date"]').textContent = t('ui.date');

  document.getElementById('export-label').textContent = t('ui.exportGroup');
  document.getElementById('btn-pdf').textContent = t('ui.exportPdf');
  document.getElementById('btn-xlsx').textContent = t('ui.exportXlsx');
  document.getElementById('btn-json').textContent = t('ui.exportJson');
  document.getElementById('btn-clipboard').textContent = t('ui.exportClipboard');
  document.getElementById('btn-reset').textContent = t('ui.resetAll');

  document.getElementById('help-title').textContent = t('ui.helpTitle');
  document.getElementById('help-intro').textContent = t('help.intro');
  document.getElementById('help-scale').textContent = t('help.scale');
  document.getElementById('help-chart').textContent = t('help.chart');

  const helpList = document.getElementById('help-symptom-list');
  helpList.innerHTML = '';
  SYMPTOM_KEYS.forEach((key) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t(`symptoms.${key}`)}:</strong> ${t(`help.symptoms.${key}`)}`;
    helpList.appendChild(li);
  });

  updateLabels();
  updateChartLabels();
}

function init() {
  const canvas = document.getElementById('symptom-chart');
  chart = createChart(canvas);

  const slidersContainer = document.getElementById('sliders');
  createSliders(slidersContainer, onSliderChange);

  const dateInput = document.getElementById('report-date');
  dateInput.value = new Date().toISOString().slice(0, 10);

  document.getElementById('lang-toggle').addEventListener('click', () => {
    toggleLanguage();
    updateAllText();
  });

  document.getElementById('help-toggle').addEventListener('click', () => {
    document.getElementById('help-panel').classList.toggle('open');
  });

  document.getElementById('btn-pdf').addEventListener('click', () => {
    exportPDF(getData());
  });

  document.getElementById('btn-xlsx').addEventListener('click', () => {
    exportXLSX(getData());
  });

  document.getElementById('btn-json').addEventListener('click', () => {
    exportJSON(getData());
  });

  document.getElementById('btn-clipboard').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;
    exportClipboard(getData()).then(() => {
      btn.innerHTML = `<span class="copied-feedback">${t('ui.copied')}</span>`;
      setTimeout(() => {
        btn.textContent = originalText;
      }, 1500);
    });
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm(t('ui.resetConfirm'))) {
      resetAll();
      onSliderChange();
    }
  });

  updateAllText();
}

document.addEventListener('DOMContentLoaded', init);
