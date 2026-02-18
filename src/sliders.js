import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { SYMPTOM_KEYS, t } from './i18n.js';

const STAGES_COUNT = 8;
const sliderInstances = {};

const SYMPTOM_COLORS = {
  cough: '#e74c3c',
  chestTightness: '#f39c12',
  breathlessness: '#3498db',
  wheezing: '#2ecc71',
  mucus: '#9b59b6',
};

function createSliders(container, onChange) {
  container.innerHTML = '';
  sliderInstances.all = [];

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
      severityLabel.textContent = t('severity')[0];

      sliderWrap.appendChild(sliderEl);

      const valueRow = document.createElement('div');
      valueRow.className = 'slider-value-row';
      valueRow.appendChild(valueDisplay);
      valueRow.appendChild(severityLabel);

      row.appendChild(label);
      row.appendChild(sliderWrap);
      row.appendChild(valueRow);
      card.appendChild(row);

      const slider = noUiSlider.create(sliderEl, {
        start: 0,
        step: 1,
        range: { min: 0, max: 5 },
        connect: [true, false],
      });

      // Color the connect bar
      const connectEl = sliderEl.querySelector('.noUi-connect');
      if (connectEl) {
        connectEl.style.backgroundColor = SYMPTOM_COLORS[key];
      }

      slider.on('update', (values) => {
        const val = Math.round(values[0]);
        valueDisplay.textContent = val;
        severityLabel.textContent = t('severity')[val];
        severityLabel.setAttribute('data-severity', val);
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
    severityLabel.textContent = t('severity')[val];
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
}

export { createSliders, getData, resetAll, updateLabels, SYMPTOM_COLORS };
