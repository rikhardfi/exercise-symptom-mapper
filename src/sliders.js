import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { SYMPTOM_KEYS, t } from './i18n.js';

const STAGES_COUNT = 8;
const sliderInstances = {};
let clinicalMode = false;
let mobileWarningShown = false;

const SYMPTOM_COLORS = {
  cough: '#e74c3c',
  chestTightness: '#f39c12',
  breathlessness: '#3498db',
  wheezing: '#2ecc71',
  mucus: '#9b59b6',
};

function showMobileWarning() {
  if (mobileWarningShown) return;
  mobileWarningShown = true;
  const toast = document.createElement('div');
  toast.className = 'vas-mobile-warning';
  toast.textContent = t('ui.vasMobileWarning');
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function createSliders(container, onChange) {
  container.innerHTML = '';
  sliderInstances.all = [];

  if (clinicalMode && window.innerWidth < 500) {
    showMobileWarning();
  }

  SYMPTOM_KEYS.forEach((key) => {
    const card = document.createElement('div');
    card.className = 'symptom-card';
    card.setAttribute('data-symptom', key);

    const header = document.createElement('div');
    header.className = 'symptom-card-header';

    const dot = document.createElement('span');
    dot.className = 'symptom-dot';
    dot.style.backgroundColor = SYMPTOM_COLORS[key];

    const title = document.createElement('h3');
    title.className = 'symptom-title';
    title.setAttribute('data-i18n', `symptoms.${key}`);
    title.textContent = t(`symptoms.${key}`);

    header.appendChild(dot);
    header.appendChild(title);
    card.appendChild(header);

    const stages = t('stages');
    const stagesShort = t('stagesShort');

    stages.forEach((stageName, i) => {
      const row = document.createElement('div');
      row.className = 'slider-row';

      const label = document.createElement('label');
      label.className = 'slider-label';
      label.setAttribute('data-i18n-stage', i);
      label.innerHTML = `<span class="stage-full">${stageName}</span><span class="stage-short">${stagesShort[i]}</span>`;

      const sliderWrap = document.createElement('div');
      sliderWrap.className = 'slider-wrap';

      const sliderEl = document.createElement('div');
      sliderEl.className = 'slider-el';

      const valueDisplay = document.createElement('span');
      valueDisplay.className = 'slider-value';
      valueDisplay.textContent = '0';

      const severityLabel = document.createElement('span');
      severityLabel.className = 'slider-severity';
      severityLabel.textContent = clinicalMode ? t('ui.clinicalUnit') : t('severity')[0];

      sliderWrap.appendChild(sliderEl);

      // VAS tick marks
      if (clinicalMode) {
        const ticks = document.createElement('div');
        ticks.className = 'vas-ticks';
        for (let n = 10; n <= 90; n += 10) {
          const tick = document.createElement('div');
          tick.className = 'vas-tick';
          tick.style.left = `${n}%`;
          ticks.appendChild(tick);
        }
        sliderWrap.appendChild(ticks);
      }

      // VAS endpoint anchors
      if (clinicalMode) {
        const anchors = document.createElement('div');
        anchors.className = 'vas-anchors';
        const left = document.createElement('span');
        left.textContent = t('ui.vasAnchorLeft');
        const right = document.createElement('span');
        right.textContent = t('ui.vasAnchorRight');
        anchors.appendChild(left);
        anchors.appendChild(right);
        sliderWrap.appendChild(anchors);
      }

      const valueRow = document.createElement('div');
      valueRow.className = 'slider-value-row';
      valueRow.appendChild(valueDisplay);
      valueRow.appendChild(severityLabel);

      row.appendChild(label);
      row.appendChild(sliderWrap);
      row.appendChild(valueRow);
      card.appendChild(row);

      const sliderOpts = clinicalMode
        ? { start: 0, step: 1, range: { min: 0, max: 100 }, connect: [true, false] }
        : { start: 0, step: 1, range: { min: 0, max: 5 }, connect: [true, false] };

      const slider = noUiSlider.create(sliderEl, sliderOpts);

      // Color the connect bar
      const connectEl = sliderEl.querySelector('.noUi-connect');
      if (connectEl) {
        connectEl.style.backgroundColor = SYMPTOM_COLORS[key];
      }

      slider.on('update', (values) => {
        const val = Math.round(values[0]);
        valueDisplay.textContent = val;
        if (clinicalMode) {
          severityLabel.textContent = t('ui.clinicalUnit');
          severityLabel.removeAttribute('data-severity');
        } else {
          severityLabel.textContent = t('severity')[val];
          severityLabel.setAttribute('data-severity', val);
        }
        onChange();
      });

      sliderInstances.all.push({ key, stageIndex: i, slider, valueDisplay, severityLabel });
    });

    container.appendChild(card);
  });
}

function getData() {
  const data = {};
  SYMPTOM_KEYS.forEach((key) => {
    data[key] = new Array(STAGES_COUNT).fill(0);
  });
  sliderInstances.all?.forEach(({ key, stageIndex, slider }) => {
    data[key][stageIndex] = Math.round(slider.get());
  });
  return data;
}

function resetAll() {
  sliderInstances.all?.forEach(({ slider }) => {
    slider.set(0);
  });
}

function updateLabels() {
  sliderInstances.all?.forEach(({ stageIndex, slider, valueDisplay, severityLabel }) => {
    const val = Math.round(slider.get());
    if (clinicalMode) {
      severityLabel.textContent = t('ui.clinicalUnit');
    } else {
      severityLabel.textContent = t('severity')[val];
    }
  });

  document.querySelectorAll('.symptom-title').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-stage]').forEach((el) => {
    const i = parseInt(el.getAttribute('data-i18n-stage'));
    const stages = t('stages');
    const stagesShort = t('stagesShort');
    el.innerHTML = `<span class="stage-full">${stages[i]}</span><span class="stage-short">${stagesShort[i]}</span>`;
  });

  // Update VAS anchors
  document.querySelectorAll('.vas-anchors').forEach((el) => {
    const spans = el.querySelectorAll('span');
    if (spans.length === 2) {
      spans[0].textContent = t('ui.vasAnchorLeft');
      spans[1].textContent = t('ui.vasAnchorRight');
    }
  });
}

function isClinicalMode() {
  return clinicalMode;
}

function setClinicalMode(value) {
  clinicalMode = value;
}

export { createSliders, getData, resetAll, updateLabels, SYMPTOM_COLORS, isClinicalMode, setClinicalMode };
