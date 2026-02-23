const translations = {
  en: {
    title: 'Exercise Symptom Mapper',
    subtitle: 'Rate your respiratory symptoms at each exercise stage',
    symptoms: {
      cough: 'Cough',
      chestTightness: 'Chest tightness',
      breathlessness: 'Breathlessness',
      wheezing: 'Wheezing',
      mucus: 'Mucus production',
    },
    stages: [
      'Rest',
      'Light exercise',
      'Moderate exercise',
      'Maximal exercise',
      '0–2 min post',
      '15 min post',
      '2 h post',
      'Next morning',
    ],
    stagesShort: [
      'Rest',
      'Light',
      'Moderate',
      'Maximal',
      '0–2 min',
      '15 min',
      '2 h',
      'Morning',
    ],
    severity: ['None', 'Minimal', 'Mild', 'Moderate', 'Severe', 'Very severe'],
    ui: {
      name: 'Name (optional)',
      namePlaceholder: 'Patient / athlete name',
      date: 'Date',
      exportPdf: 'PDF',
      exportXlsx: 'Excel',
      exportJson: 'JSON',
      exportClipboard: 'Copy',
      exportGroup: 'Export',
      languageToggle: 'FI',
      helpToggle: '?',
      helpTitle: 'How to use',
      copied: 'Copied!',
      resetAll: 'Reset all',
      resetConfirm: 'Reset all values to zero?',
    },
    help: {
      intro: 'Rate each respiratory symptom from 0 (none) to 5 (very severe) at each stage of exercise. The chart updates in real time.',
      symptoms: {
        cough: 'Any coughing — dry or productive, single coughs or bouts.',
        chestTightness: 'A feeling of constriction, pressure, or tightness in the chest.',
        breathlessness: 'Difficulty breathing or a sense of not getting enough air, beyond what is expected for the exercise intensity.',
        wheezing: 'A high-pitched whistling sound during breathing, especially on expiration.',
        mucus: 'Increased mucus or phlegm production in the airways.',
      },
      scale: 'Scale: 0 = No symptoms, 1 = Minimal (barely noticeable), 2 = Mild, 3 = Moderate (clearly affects performance), 4 = Severe, 5 = Very severe (forces you to stop).',
      chart: 'The chart shows symptom severity across exercise stages. Each coloured line represents one symptom.',
    },
  },
  fi: {
    title: 'Oirekuvaaja',
    subtitle: 'Arvioi hengitysoireesi harjoituksen eri vaiheissa',
    symptoms: {
      cough: 'Yskä',
      chestTightness: 'Puristava tunne rintakehällä',
      breathlessness: 'Hengenahdistus',
      wheezing: 'Vinkuminen',
      mucus: 'Limaneritys',
    },
    stages: [
      'Lepo',
      'Kevyt rasitus',
      'Kohtalainen rasitus',
      'Maksimaalinen rasitus',
      '0–2 min jälkeen',
      '15 min jälkeen',
      '2 t jälkeen',
      'Seuraava aamu',
    ],
    stagesShort: [
      'Lepo',
      'Kevyt',
      'Koht.',
      'Maks.',
      '0–2 min',
      '15 min',
      '2 t',
      'Aamu',
    ],
    severity: ['Ei oiretta', 'Minimaalinen', 'Lievä', 'Kohtalainen', 'Vaikea', 'Erittäin vaikea'],
    ui: {
      name: 'Nimi (vapaaehtoinen)',
      namePlaceholder: 'Potilaan / urheilijan nimi',
      date: 'Päivämäärä',
      exportPdf: 'PDF',
      exportXlsx: 'Excel',
      exportJson: 'JSON',
      exportClipboard: 'Kopioi',
      exportGroup: 'Vie',
      languageToggle: 'EN',
      helpToggle: '?',
      helpTitle: 'Käyttöohje',
      copied: 'Kopioitu!',
      resetAll: 'Nollaa',
      resetConfirm: 'Nollataanko kaikki arvot?',
    },
    help: {
      intro: 'Arvioi kukin hengitysoire asteikolla 0 (ei oiretta) – 5 (erittäin vaikea) harjoituksen eri vaiheissa. Kuvaaja päivittyy reaaliajassa.',
      symptoms: {
        cough: 'Yskiminen — kuiva tai limaa tuottava, yksittäinen tai toistuva.',
        chestTightness: 'Puristavaa tunnetta rintakehällä.',
        breathlessness: 'Hengitysvaikeus tai tunne, ettei saa riittävästi ilmaa — enemmän kuin rasitustaso edellyttäisi.',
        wheezing: 'Korkea vinkuva ääni hengitettäessä, erityisesti uloshengityksessä.',
        mucus: 'Lisääntynyt liman tai ysköksen eritys hengitysteissä.',
      },
      scale: 'Asteikko: 0 = Ei oiretta, 1 = Minimaalinen (tuskin huomattava), 2 = Lievä, 3 = Kohtalainen (vaikuttaa selvästi suorituskykyyn), 4 = Vaikea, 5 = Erittäin vaikea (pakottaa keskeyttämään).',
      chart: 'Kuvaaja näyttää oireiden voimakkuuden harjoituksen eri vaiheissa. Jokainen värillinen viiva kuvaa yhtä oiretta.',
    },
  },
};

const SYMPTOM_KEYS = ['cough', 'chestTightness', 'breathlessness', 'wheezing', 'mucus'];

let currentLang = 'en';

function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}

function setLanguage(lang) {
  currentLang = lang;
}

function getLanguage() {
  return currentLang;
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'fi' : 'en';
  return currentLang;
}

export { translations, SYMPTOM_KEYS, t, setLanguage, getLanguage, toggleLanguage };
