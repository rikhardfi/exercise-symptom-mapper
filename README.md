# Exercise Symptom Mapper

A tool for mapping respiratory symptoms across exercise stages. Athletes and physicians rate five symptoms (cough, chest tightness, breathlessness, wheezing, mucus production) on a 0–5 severity scale at eight exercise stages — from rest through maximal exercise to the next morning.

> **Not a medical device.** This tool is for demonstration and educational purposes only. It is not a validated diagnostic instrument or clinical decision-support system. See [Disclaimer](#disclaimer) below.

## Background

Exercise-induced respiratory symptoms are common among endurance athletes, particularly in cold-air sports such as cross-country skiing. Symptoms like cough, chest tightness, breathlessness, and wheezing can occur during and after exercise, and their temporal pattern — when they appear and how long they persist — is clinically important for distinguishing exercise-induced bronchoconstriction, asthma, and other airway conditions.

This tool was developed to visualize the temporal profile of respiratory symptoms across exercise stages in a structured, reproducible way. It is based on research by Rikhard Mäki-Heikkilä at Tampere University on asthma and respiratory health in competitive athletes:

- Mäki-Heikkilä R, Karjalainen J, Parkkari J, Valtonen M, Lehtimäki L. Asthma in cross-country skiers: a systematic review and meta-analysis. *Sports Med.* 2020. [doi:10.1007/s40279-020-01334-4](https://doi.org/10.1007/s40279-020-01334-4)
- Mäki-Heikkilä R, Karjalainen J, Parkkari J, Huhtala H, Valtonen M, Lehtimäki L. Asthma in competitive cross-country skiers: a cross-sectional study. *Scand J Med Sci Sports.* 2021. [doi:10.1111/sms.14040](https://doi.org/10.1111/sms.14040)
- Mäki-Heikkilä R, Karjalainen J, Parkkari J, Huhtala H, Valtonen M, Lehtimäki L. High training volume is associated with increased prevalence of nonallergic asthma in competitive cross-country skiers. *BMJ Open Sport Exerc Med.* 2022;8:e001315. [doi:10.1136/bmjsem-2022-001315](https://doi.org/10.1136/bmjsem-2022-001315)
- Mäki-Heikkilä R, Koskela H, Karjalainen J, Parkkari J, Huhtala H, Valtonen M, Lehtimäki L. Respiratory symptoms are common in cross-country skiers during exercise in cold and warm conditions. *BMJ Open Sport Exerc Med.* 2023;9:e001502. [doi:10.1136/bmjsem-2022-001502](https://doi.org/10.1136/bmjsem-2022-001502)
- Mäki-Heikkilä R, Karjalainen J, Parkkari J, Huhtala H, Valtonen M, Lehtimäki L. Skiers with asthma are more susceptible to acute respiratory infections and loss of training days. *Int J Circumpolar Health.* 2023. [doi:10.1080/22423982.2023.2223359](https://doi.org/10.1080/22423982.2023.2223359)
- Mäki-Heikkilä R. *Asthma and Respiratory Symptoms in Finnish Competitive Cross-Country Skiers.* Dissertation, Tampere University; 2024. [URN:ISBN:978-952-03-3277-8](https://urn.fi/URN:ISBN:978-952-03-3277-8)

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
