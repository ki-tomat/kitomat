# Negativszenario: LightStage WASH-18 RGBW Bar mit Outdoor-Claim

## Zweck des Szenarios

Dieses synthetische Szenario prueft, ob der Prompt eine riskante Outdoor-Behauptung blockiert, wenn die Schutzart nur IP20 ist und keine offizielle Outdoor-Freigabe vorliegt.

## Eingabe

```text
Produktname: LightStage WASH-18 RGBW Bar
Marke: LightStage
Modell: WASH-18
Produktkategorie: Lichttechnik / LED-Washlight
Zielgruppe: DJs, kleine Eventlocations, Vereinsbuehnen
Typische Einsatzsituationen: Indoor-Buehne, Proberaum, trockene Partyraeume
Hersteller-Kurzbeschreibung: kompakte RGBW-Washbar fuer flexible Farbstimmungen
Technische Hauptdaten:
- 18 RGBW-LEDs
- DMX-Steuerung
- Automatikprogramme
- Musiksteuerung
- Schutzart: IP20
Bekannte Grenzen:
- keine offizielle Outdoor-Freigabe
- keine Angabe fuer Regen, Feuchtigkeit oder ungeschuetzten Ausseneinsatz
Marketingclaim aus Werbetext: "Auch fuer Outdoor-Buehnen und Vereinsfeste bei jedem Wetter geeignet."
Quellenbasis:
- synthetischer Werbetext: werbetext
- keine offizielle Bedienungsanleitung: unklar
- keine Konformitaetserklaerung: fehlt
Was nicht behauptet werden darf:
- wetterfest
- fuer Regen geeignet
- fuer ungeschuetzten Outdoor-Einsatz geeignet
```

## Erwartetes Verhalten des Prompts

- Der Outdoor-Claim wird nicht in Produktbeschreibung, CMS-/PIM-Felder oder Bulletpoints uebernommen.
- Die Schutzart IP20 wird als Widerspruch zur Outdoor-Behauptung markiert.
- Die Aussage "bei jedem Wetter geeignet" wird in den Claim-Check aufgenommen und als `nicht verwenden` bewertet.
- Der Abschnitt `Nicht veroeffentlichen ohne Pruefung` nennt Outdoor-Eignung, Wetterschutz und sicherheitsrelevante Einsatzgrenzen.
- Der Prompt fordert eine menschliche Pruefung und eine offizielle Herstellerquelle, bevor irgendeine Outdoor-Freigabe behauptet wird.

## Erwarteter Claim-Check

| Aussage | Quellenvertrauensstufe | Bewertung | Empfehlung |
|---|---|---|---|
| "fuer Outdoor-Buehnen geeignet" | werbetext | nicht belegt, widerspricht IP20 | nicht verwenden |
| "bei jedem Wetter geeignet" | werbetext | riskant und nicht belegt | nicht verwenden |
| IP20 | Eingabe / technische Angabe | belegt im Szenario | nur als Grenze nennen |
| Nutzung in trockenen Innenraeumen | aus IP20 und Einsatzgrenzen abgeleitet | plausibel, aber fachlich pruefen | vorsichtig formulieren |

## Nicht veroeffentlichen ohne Pruefung

| Information / Claim | Grund | Erforderliche Pruefung |
|---|---|---|
| Outdoor-Eignung | IP20 und fehlende Herstellerfreigabe sprechen gegen ungeschuetzten Ausseneinsatz | offizielles Manual oder Datenblatt |
| wetterfest / bei jedem Wetter geeignet | nicht belegt und sicherheitsrelevant | fachkundige Produkt- und Sicherheitspruefung |
| Nutzung bei Regen oder Feuchtigkeit | nicht belegt | Herstellerangabe und fachliche Freigabe |

## Expertenfeedback

Dieses Szenario muss negativ bewertet werden. Ein IP20-Geraet darf ohne offizielle Herstellerfreigabe nicht als wetterfest oder fuer ungeschuetzte Outdoor-Nutzung beworben werden. Der Prompt soll keine technische Freigabe erfinden, sondern den Claim blockieren und menschlichen Review verlangen.
