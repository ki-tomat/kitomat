# Nutzung

## Wann verwenden?

Nutze dieses Quellen-/Datensatzpaket, wenn Eventtechnik-Produkte quellenbewusst fuer CMS, PIM, Shoptexte, FAQ, Supportantworten oder Claim-Checks vorbereitet werden sollen.

Geeignet ist es besonders fuer:

- Lichttechnik-Produkte
- PA-/Audio-Produkte
- Video-/Broadcast-Produkte
- technische Produkte mit vielen Attributen, Grenzen und Kompatibilitaeten
- Produktinformationen aus Manual, Datenblatt, Werbetext und strukturierten Notizen

## Empfohlener Ablauf

1. `templates/source-trust-template.md` nutzen, um jede Quelle einzuordnen.
2. `templates/document-intake-template.md` nutzen, um Rohdokumente in strukturierte Daten zu ueberfuehren.
3. passende Attributcheckliste aus `checklists/` auswaehlen.
4. fehlende Pflichtfelder und sicherheitskritische Angaben markieren.
5. `checklists/claim-check-template.md` und `checklists/contradiction-checklist.md` anwenden.
6. riskante Aussagen in `Nicht veroeffentlichen ohne Pruefung` verschieben.
7. strukturierte Daten an das Prompt-Paket `product-message-support-alignment` uebergeben.
8. Ergebnis fachlich, rechtlich und quellenbezogen pruefen.

## Quellenvertrauensstufen

Nutze genau diese Stufen:

| Stufe | Bedeutung | Nutzung |
|---|---|---|
| `offiziell` | offizielles Manual, Datenblatt, Hersteller-Sheet, technische Zeichnung, Konformitaetserklaerung | hoechste Prioritaet fuer technische Fakten |
| `werbetext` | Herstellerwebsite, Broschuere, Produktclaim, Marketingtext | nur nachrangig; Claims pruefen |
| `extern` | Rezensionen, Community-Hinweise, Foren, Erfahrungsberichte | nur als Hinweis auf Nutzung oder Supportfragen |
| `unklar` | unbekannte oder widerspruechliche Quelle | nicht als Fakt verwenden |

## Nicht verwenden fuer

Dieses Paket darf nicht genutzt werden als Ersatz fuer:

- technische Freigaben
- Sicherheitsbewertungen
- Normenpruefungen
- Rigging-, Statik- oder Traglastbewertungen
- elektrische Sicherheitsfreigaben
- Rechtsberatung
- Herstellerfreigaben

## Datenregeln

Nicht eingeben oder veroeffentlichen:

- echte Kundennamen
- echte E-Mail-Adressen
- echte Supporttickets
- vertrauliche interne Dokumente
- ungeklaerte Volltexte
- Hersteller-PDFs ohne geklaerte Nutzungsrechte

Erlaubt sind:

- eigene Checklisten
- eigene Templates
- synthetische Szenarien
- eigene Zusammenfassungen
- Quellenreferenzen mit Reviewpunkte fuer fehlende URLs, Abrufdaten oder Lizenzinformationen

## Human Review Gate

Alle produktbezogenen Ergebnisse muessen vor einer Uebernahme in CMS, PIM, Shop, Support-Wissensdatenbank oder Marketing durch eine fachkundige Person geprueft werden.
