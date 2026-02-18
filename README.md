# Exercise Symptom Mapper

A tool for mapping respiratory symptoms across exercise stages. Athletes and physicians rate five symptoms (cough, chest tightness, breathlessness, wheezing, mucus production) on a 0–5 severity scale at eight exercise stages — from rest through maximal exercise to the next morning.

> **Not a medical device.** This tool is for demonstration and educational purposes only. It is not a validated diagnostic instrument or clinical decision-support system. See [Disclaimer](#disclaimer) below.

## Background

Respiratory symptoms are remarkably common in endurance athletes. In competitive cross-country skiers, asthma prevalence is roughly 20–25% — two to three times higher than in the general population — driven largely by years of breathing cold, dry air at high ventilation rates. Cough is the dominant complaint, reported by over 60% of skiers after exercise, followed by mucus production, wheezing, and breathlessness. Crucially, most athletes are nearly asymptomatic at rest; symptoms build during exercise and often peak *after* it ends, sometimes persisting for hours. This temporal pattern — *when* symptoms appear relative to exercise, not just *whether* they appear — is what matters clinically, because it helps distinguish exercise-induced bronchoconstriction from other causes and guides treatment decisions. This tool was built to capture that pattern in a structured, visual way.

Based on research at Tampere University ([Mäki-Heikkilä 2020](https://doi.org/10.1007/s40279-020-01334-4), [2021](https://doi.org/10.1111/sms.14040), [2022](https://doi.org/10.1136/bmjsem-2022-001315), [2023a](https://doi.org/10.1136/bmjsem-2022-001502), [2023b](https://doi.org/10.1080/22423982.2023.2223359), [dissertation 2024](https://urn.fi/URN:ISBN:978-952-03-3277-8)).

## Features

- **Interactive sliders** with real-time chart updates
- **Bilingual** — English and Finnish (FI/EN toggle)
- **Export** — PDF report, Excel spreadsheet, JSON data, clipboard text
- **Responsive** — works on desktop, tablet, and mobile
- **Accessible** — keyboard navigation, screen reader labels, WCAG contrast
- **Embeddable** — designed for iframe embedding on Squarespace or any site

## Severity Scale

| Value | Label        |
|-------|-------------|
| 0     | None        |
| 1     | Minimal     |
| 2     | Mild        |
| 3     | Moderate    |
| 4     | Severe      |
| 5     | Very severe |

## Embedding via iframe

```html
<iframe
  src="https://rikhardfi.github.io/exercise-symptom-mapper/"
  width="100%"
  height="1200"
  frameborder="0"
  style="border: none; max-width: 960px;"
  title="Exercise Symptom Mapper"
></iframe>
```

## Citation

Any use of this tool must include the following citation:

> Mäki-Heikkilä R. Exercise Symptom Mapper [software]. Tampere University; 2026. Available at: https://rikhardfi.github.io/exercise-symptom-mapper/

## Disclaimer

This tool is provided **for demonstration and educational purposes only**. It is not a validated medical device, diagnostic tool, or clinical decision-support system. It must not be used as a substitute for professional medical assessment. No clinical decisions should be based solely on its output. The author assumes no liability for any use of this tool.

## License

Copyright (c) 2026 Rikhard Mäki-Heikkilä, Tampere University. Free to use in its original, unmodified form with attribution. No modification permitted without written permission. See [LICENSE](LICENSE) for full terms.
