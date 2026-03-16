# Exercise Symptom Mapper

A clinical tool for mapping respiratory symptoms across exercise stages. Athletes and physicians rate five symptoms (cough, chest tightness, breathlessness, wheezing, mucus production) at eight exercise stages — from rest through maximal exercise to the next morning.

**[Try it live](https://rikhardfi.github.io/exercise-symptom-mapper/)** | [rikhard.fi/oirekuvaaja](https://rikhard.fi/oirekuvaaja)

> **Not a medical device.** This tool is for demonstration and educational purposes only. It is not a validated diagnostic instrument or clinical decision-support system. See [Disclaimer](#disclaimer) below.

---

[Suomeksi / Finnish version below](#oirekuvaaja)

---

## Background

Respiratory symptoms are remarkably common in endurance athletes. In competitive cross-country skiers, asthma prevalence is roughly 20–25% — two to three times higher than in the general population — driven largely by years of breathing cold, dry air at high ventilation rates. Cough is the dominant complaint, reported by over 60% of skiers after exercise, followed by mucus production, wheezing, and breathlessness. Crucially, most athletes are nearly asymptomatic at rest; symptoms build during exercise and often peak *after* it ends, sometimes persisting for hours. This temporal pattern — *when* symptoms appear relative to exercise, not just *whether* they appear — is what matters clinically, because it helps distinguish exercise-induced bronchoconstriction from other causes and guides treatment decisions. This tool was built to capture that pattern in a structured, visual way.

Based on research at Tampere University ([Mäki-Heikkilä 2020](https://doi.org/10.1007/s40279-020-01334-4), [2021](https://doi.org/10.1111/sms.14040), [2022](https://doi.org/10.1136/bmjsem-2022-001315), [2023a](https://doi.org/10.1136/bmjsem-2022-001502), [2023b](https://doi.org/10.1080/22423982.2023.2223359), [dissertation 2024](https://urn.fi/URN:ISBN:978-952-03-3277-8)).

## Features

- **Two rating modes**
  - **Standard mode** — ordinal 0–5 severity scale (None to Very severe)
  - **Clinical VAS mode** — 100 mm Visual Analogue Scale with 1 mm precision
- **VAS mode enhancements**
  - Endpoint anchors: "No symptom" / "Worst imaginable" below each slider
  - Ruler tick marks every 10 mm along the slider track
  - Fixed 100 mm slider width at all screen sizes
  - Multi-column card layout on wide screens (>1100 px)
  - Mobile viewport warning when screen is too small for calibrated VAS
- **Interactive sliders** with real-time chart updates
- **Bilingual** — English and Finnish (FI/EN toggle)
- **Export**
  - **PDF** — vector chart (smooth Bezier curves, distinct point markers and dash patterns per symptom) with data table; no raster images
  - **Excel** — spreadsheet with all values
  - **JSON** — structured data with mode and language metadata
  - **Clipboard** — formatted text summary
- **Responsive** — works on desktop, tablet, and mobile
- **Accessible** — keyboard navigation, screen reader labels, WCAG contrast

## Modes

### Standard mode (default)

| Value | Label        |
|-------|-------------|
| 0     | None        |
| 1     | Minimal     |
| 2     | Mild        |
| 3     | Moderate    |
| 4     | Severe      |
| 5     | Very severe |

Chart Y-axis shows severity labels. PDF and exports include severity text alongside numeric values.

### Clinical VAS mode

Toggle with the **VAS** button in the top bar. Each slider becomes a 100 mm Visual Analogue Scale (0–100, 1 mm steps). The slider track is rendered at exactly 100 mm CSS width, calibrated for tablet use.

- **Endpoint anchors** — "No symptom" (left) and "Worst imaginable" (right) below each slider, translated to Finnish when the language is switched
- **Tick marks** — subtle grey lines at every 10 mm along the track
- **Chart Y-axis** — 0–100 with ticks at 0, 25, 50, 75, 100
- **PDF export** — full-page vector chart drawn with jsPDF primitives (smooth curves, clamped Bezier control points, distinct point markers and dash patterns); data table on page 2
- **Wide-screen layout** — two-column card grid on screens wider than 1100 px; app container widens to 1200 px

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

## Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

Built with Vite, Chart.js, noUiSlider, jsPDF (+autotable), and SheetJS.

## Citation

Any use of this tool must include the following citation:

> Mäki-Heikkilä R. Exercise Symptom Mapper [software]. Tampere University; 2026. Available at: https://rikhardfi.github.io/exercise-symptom-mapper/

## Disclaimer

This tool is provided **for demonstration and educational purposes only**. It is not a validated medical device, diagnostic tool, or clinical decision-support system. It must not be used as a substitute for professional medical assessment. No clinical decisions should be based solely on its output. The author assumes no liability for any use of this tool.

## License

Copyright (c) 2026 Rikhard Mäki-Heikkilä, Tampere University. Free to use in its original, unmodified form with attribution. No modification permitted without written permission. See [LICENSE](LICENSE) for full terms.

---

# Oirekuvaaja

Kliininen työkalu hengitysoireiden kartoittamiseen harjoituksen eri vaiheissa. Urheilijat ja lääkärit arvioivat viisi oiretta (yskä, puristava tunne rintakehällä, hengenahdistus, vinkuminen, limaneritys) kahdeksassa harjoituksen vaiheessa — levosta maksimaaliseen rasitukseen ja seuraavaan aamuun.

**[Kokeile verkossa](https://rikhardfi.github.io/exercise-symptom-mapper/)** | [rikhard.fi/oirekuvaaja](https://rikhard.fi/oirekuvaaja)

> **Ei lääkinnällinen laite.** Työkalu on tarkoitettu ainoastaan demonstraatio- ja opetustarkoituksiin. Se ei ole validoitu diagnostinen instrumentti eikä kliininen päätöksenteon tukijärjestelmä. Katso [Vastuuvapauslauseke](#vastuuvapauslauseke) alla.

## Tausta

Hengitysoireet ovat huomattavan yleisiä kestävyysurheilijoilla. Kilpahiihtäjillä astman esiintyvyys on noin 20–25 % — kaksi–kolminkertainen väestöön verrattuna — johtuen vuosien altistumisesta kylmälle, kuivalle ilmalle suurilla hengitystilavuuksilla. Yskä on hallitseva oire: yli 60 % hiihtäjistä raportoi sitä harjoituksen jälkeen. Ratkaisevan tärkeää on, että useimmat urheilijat ovat lähes oireettomia levossa; oireet kehittyvät harjoituksen aikana ja huipentuvat usein *sen jälkeen*, joskus tuntien ajaksi. Juuri tämä ajallinen malli — *milloin* oireet ilmenevät suhteessa harjoitukseen — on kliinisesti merkittävää, koska se auttaa erottamaan rasituksen aiheuttaman keuhkoputkien supistumisen muista syistä ja ohjaa hoitopäätöksiä. Tämä työkalu on rakennettu tallentamaan tämä kaava jäsennellysti ja visuaalisesti.

Perustuu Tampereen yliopiston tutkimukseen ([Mäki-Heikkilä 2020](https://doi.org/10.1007/s40279-020-01334-4), [2021](https://doi.org/10.1111/sms.14040), [2022](https://doi.org/10.1136/bmjsem-2022-001315), [2023a](https://doi.org/10.1136/bmjsem-2022-001502), [2023b](https://doi.org/10.1080/22423982.2023.2223359), [väitöskirja 2024](https://urn.fi/URN:ISBN:978-952-03-3277-8)).

## Ominaisuudet

- **Kaksi arviointitilaa**
  - **Vakiotila** — luokitteluasteikko 0–5 (Ei oiretta – Erittäin vaikea)
  - **Kliininen VAS-tila** — 100 mm:n visuaalinen analoginen asteikko 1 mm:n tarkkuudella
- **VAS-tilan parannukset**
  - Päätepisteankkurit: "Ei oiretta" / "Pahin mahdollinen" jokaisen liukusäätimen alla
  - Viivaimen asteikkomerkit 10 mm:n välein liukusäätimen radalla
  - Kiinteä 100 mm:n liukusäätimen leveys kaikilla näyttöko'oilla
  - Monisarakkeinen korttinäkymä leveillä näytöillä (>1100 px)
  - Mobiilivaroitus, kun näyttö on liian pieni kalibroidulle VAS:lle
- **Interaktiiviset liukusäätimet** reaaliaikaisella kuvaajapäivityksellä
- **Kaksikielinen** — suomi ja englanti (FI/EN-kytkin)
- **Vienti**
  - **PDF** — vektorikuvaaja (pehmeät Bezier-käyrät, erilliset pistekuviot ja viivatyypit oireittain) ja datataulukko; ei rasterikuvia
  - **Excel** — laskentataulukko kaikilla arvoilla
  - **JSON** — rakenteellinen data tila- ja kielimetatiedoin
  - **Leikepöytä** — muotoiltu tekstiyhteenveto
- **Responsiivinen** — toimii pöytäkoneella, tabletilla ja puhelimella
- **Saavutettava** — näppäimistönavigaatio, ruudunlukijatunnisteet, WCAG-kontrasti

## Tilat

### Vakiotila (oletus)

| Arvo | Kuvaus           |
|------|-----------------|
| 0    | Ei oiretta      |
| 1    | Minimaalinen    |
| 2    | Lievä           |
| 3    | Kohtalainen     |
| 4    | Vaikea          |
| 5    | Erittäin vaikea |

Kuvaajan Y-akseli näyttää vaikeusasteet tekstinä. PDF ja muut viennit sisältävät vaikeusastetekstin numeerisen arvon rinnalla.

### Kliininen VAS-tila

Kytke päälle **VAS**-painikkeesta yläpalkissa. Jokainen liukusäädin muuttuu 100 mm:n visuaaliseksi analogiseksi asteikoksi (0–100, 1 mm:n askelin). Liukusäätimen rata renderöidään tarkalleen 100 mm:n CSS-levyisenä, kalibroitu tablettikäyttöön.

- **Päätepisteankkurit** — "Ei oiretta" (vasen) ja "Pahin mahdollinen" (oikea) jokaisen liukusäätimen alla; kääntyvät automaattisesti kielen vaihtuessa
- **Asteikkomerkit** — hienovaraiset harmaat viivat 10 mm:n välein radalla
- **Kuvaajan Y-akseli** — 0–100, asteikkomerkit kohdissa 0, 25, 50, 75, 100
- **PDF-vienti** — koko sivun vektorikuvaaja jsPDF-piirtoprimitiiveillä (pehmeät käyrät, rajatut Bezier-ohjainpisteet, erilliset pistekuviot ja viiva­tyypit); datataulukko sivulla 2
- **Leveän näytön asettelu** — kahden sarakkeen korttiruudukko yli 1100 px leveillä näytöillä; sovelluksen kehys levenee 1200 px:iin

## Upottaminen iframella

```html
<iframe
  src="https://rikhardfi.github.io/exercise-symptom-mapper/"
  width="100%"
  height="1200"
  frameborder="0"
  style="border: none; max-width: 960px;"
  title="Oirekuvaaja"
></iframe>
```

## Kehitys

```bash
npm install
npm run dev       # Käynnistä kehityspalvelin
npm run build     # Tuotantoversio
npm run preview   # Esikatsele tuotantoversiota
```

Rakennettu: Vite, Chart.js, noUiSlider, jsPDF (+autotable), SheetJS.

## Viittaaminen

Työkalun käytössä on mainittava seuraava viittaus:

> Mäki-Heikkilä R. Exercise Symptom Mapper [ohjelmisto]. Tampereen yliopisto; 2026. Saatavilla: https://rikhardfi.github.io/exercise-symptom-mapper/

## Vastuuvapauslauseke

Työkalu on tarjolla **ainoastaan demonstraatio- ja opetustarkoituksiin**. Se ei ole validoitu lääkinnällinen laite, diagnostinen työkalu eikä kliininen päätöksenteon tukijärjestelmä. Sitä ei saa käyttää ammattimaisen lääketieteellisen arvion korvikkeena. Kliinisiä päätöksiä ei saa perustaa pelkästään sen tuottamiin tuloksiin. Tekijä ei vastaa työkalun käytöstä aiheutuvista vahingoista.

## Lisenssi

Copyright (c) 2026 Rikhard Mäki-Heikkilä, Tampereen yliopisto. Vapaa käyttää alkuperäisessä, muokkaamattomassa muodossaan lähdeviittauksella. Muokkaaminen ei sallittua ilman kirjallista lupaa. Katso [LICENSE](LICENSE) täydelliset ehdot.
