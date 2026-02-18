# Exercise Symptom Mapper

A clinical tool for mapping respiratory symptoms across exercise stages. Athletes and physicians rate five symptoms (cough, chest tightness, breathlessness, wheezing, mucus production) on a 0–5 severity scale at eight exercise stages — from rest through maximal exercise to the next morning.

## Features

- **Interactive sliders** with real-time chart updates
- **Bilingual** — English and Finnish (FI/EN toggle)
- **Export** — PDF report, Excel spreadsheet, JSON data, clipboard text
- **Responsive** — works on desktop, tablet, and mobile
- **Accessible** — keyboard navigation, screen reader labels, WCAG contrast
- **Embeddable** — designed for iframe embedding on Squarespace or any site

## Usage

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

The built files appear in `dist/` and are ready for static hosting.

### Embedding via iframe

```html
<iframe
  src="https://rikhard.github.io/exercise-symptom-mapper/"
  width="100%"
  height="1200"
  frameborder="0"
  style="border: none; max-width: 960px;"
  title="Exercise Symptom Mapper"
></iframe>
```

## Severity Scale

| Value | Label        |
|-------|-------------|
| 0     | None        |
| 1     | Minimal     |
| 2     | Mild        |
| 3     | Moderate    |
| 4     | Severe      |
| 5     | Very severe |

## Citation

If you use this tool in research, please cite:

> Mäki-Heikkilä R. Exercise Symptom Mapper [software]. Available at: https://rikhard.github.io/exercise-symptom-mapper/

## License

MIT
