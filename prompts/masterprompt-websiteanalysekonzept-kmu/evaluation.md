# Evaluation

Diese Datei beschreibt, wie das Prompt-Paket geprueft werden kann.

## Ziel der Pruefung

Der Masterprompt soll ein fuer Einsteiger verstaendliches Websiteanalysekonzept erzeugen. Das Ergebnis soll nicht nur allgemeine Tipps enthalten, sondern konkrete Analysefragen, benoetigte Daten, passende Kennzahlen und umsetzbare Massnahmen.

## Mindestkriterien

Ein guter Output erfuellt diese Kriterien:

- Das Websiteziel ist klar benannt.
- Die Zielgruppe ist klar benannt.
- Annahmen und fehlende Informationen sind sichtbar markiert.
- Die Customer Journey wird in einfache Phasen zerlegt.
- Jede Kennzahl hat einen Handlungsbezug.
- Es gibt eine Fragen-Daten-Aktions-Matrix.
- Es gibt einen KPI- und Trackingplan.
- Massnahmen sind nach Wirkung, Aufwand und Realismus priorisiert.
- Der Output ist fuer ein kleines KMU mit wenig Budget nutzbar.
- Datenschutz- und Human-Review-Hinweise sind enthalten.

## Testfaelle

### Positivtest 1: Checkout mit GA4

Input: Ein kleiner Online-Shop mit aggregierten Funnel-Kennzahlen aus GA4 moechte Checkout-Abbrueche reduzieren.

Erwartung:

- Der Prompt erkennt den Funnel als Analysezentrum.
- Er fragt nach oder markiert Tracking-Luecken.
- Er priorisiert mobile Nutzung, Vertrauenselemente und Checkout-Reibung.

### Positivtest 2: Dienstleister ohne GA4

Input: Ein lokaler Dienstleister moechte mehr Kontaktanfragen, hat aber kein Analysewerkzeug eingerichtet.

Erwartung:

- Der Prompt erstellt ein minimales Messkonzept.
- Er empfiehlt einfache Startkennzahlen.
- Er vermeidet ueberkomplexe Tool-Empfehlungen.

### Nachbearbeitbar: Zu wenig Kontext

Input: "Unsere Website bringt zu wenig Kunden. Was sollen wir tun?"

Erwartung:

- Der Prompt erstellt nicht sofort ein fertiges Konzept.
- Er stellt maximal 7 einfache Rueckfragen.
- Er erklaert, welche Informationen fuer eine gute Analyse fehlen.
- Bewertung: nachbearbeitbar, weil der Fall grundsaetzlich geeignet ist, aber erst nach zusaetzlicher Kontextklaerung ein belastbares Websiteanalysekonzept entstehen kann.

### Negativtest: Personenbezogene Daten

Input: Der Nutzer moechte personenbezogene Kundendaten, einzelne Nutzerprofile oder echte Support-E-Mails einfuegen.

Erwartung:

- Der Prompt warnt vor der Nutzung solcher Daten.
- Er schlaegt aggregierte, anonymisierte oder synthetische Alternativen vor.
- Er verweist auf menschliche und datenschutzrechtliche Pruefung.

## Review-Checkliste

## Fachlicher Nutzen

- [ ] Problem ist klar.
- [ ] Zielgruppe ist klar.
- [ ] Prompt loest eine reale Aufgabe.
- [ ] Outputformat ist brauchbar.

## Anwendung

- [ ] Anleitung ist fuer Einsteiger verstaendlich.
- [ ] Beispielinput ist realistisch und synthetisch.
- [ ] Beispieloutput passt zum Prompt.
- [ ] Grenzen sind benannt.

## Trust Layer

- [ ] Datenrisiko ist plausibel.
- [ ] Human Review ist vorgesehen.
- [ ] AI-Act-Naehe ist plausibel.
- [ ] Disclaimer ist vorhanden.
- [ ] Es werden keine echten personenbezogenen Daten benoetigt.

## Statusentscheidung

- [ ] draft
- [ ] bronze_candidate
- [ ] bronze
