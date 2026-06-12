# Sources und Quellenstatus

## Zweck

Diese Datei dokumentiert, welche Inhalte eigene Ausarbeitung, synthetisches Beispiel, offizielle externe Referenz oder nachrangige Quelle sind. Sie ersetzt keine Lizenzpruefung und keine technische Freigabe.

## Grundsatz fuer das oeffentliche Repo

- Eigene Prompts, Templates, Checklisten, Szenarien und Auswertungen koennen als Paketinhalt gepflegt werden.
- Externe Hersteller-PDFs, Manuals, Produkt-Sheets und DOCX-Volltexte werden nicht direkt in das oeffentliche Repo uebernommen.
- Externe Dokumente werden nur als Quellenreferenz mit Herausgeber, Dokumenttitel, Dokumenttyp, Abrufdatum, Quellen-/Nutzungsstatus und Nutzungshinweis dokumentiert.
- Fehlende URLs, Abrufdaten oder Lizenzangaben bleiben transparent als Reviewpunkt markiert.

## Quellenliste

| source_id | publisher | document_title | url_or_origin | document_type | retrieved_at | license_status | usage_note | trust_level | contains_full_text |
|---|---|---|---|---|---|---|---|---|---|
| SRC-FUTURELIGHT-MANUAL-001 | Steinigke / Futurelight | FUTURELIGHT IP PLB-420 Moving Head Beam Bedienungsanleitung / User Manual | https://www.steinigke.de/en/mpn51838830-futurelight-ip-plb-420-moving-head-beam.html | offizielles Manual, verlinkt ueber Hersteller-Produktseite | 2026-05-19 | official_reference_clear_no_fulltext_redistribution | Nur als offizielle technische Referenz und Quellenhinweis nutzen; keine PDF-/Manual-Volltexte im Repo veroeffentlichen | offiziell | nein |
| SRC-FUTURELIGHT-SHEET-001 | Steinigke / Futurelight | FUTURELIGHT IP PLB-420 Moving Head Beam Produktuebersicht / technische Spezifikationen | https://www.steinigke.de/en/mpn51838830-futurelight-ip-plb-420-moving-head-beam.html | offizielle Produktseite / Spezifikationsquelle | 2026-05-19 | official_reference_clear_no_fulltext_redistribution | Fuer Attribut-, Artikelnummer-, GTIN- und Claim-Pruefung nutzen; keine PDF-/Sheet-Volltexte im Repo veroeffentlichen | offiziell | nein |
| SRC-BLACKMAGIC-MANUAL-001 | Blackmagic Design | ATEM Mini Installation and Operation Manual | https://documents.blackmagicdesign.com/UserManuals/ATEM_Mini_Manual.pdf | offizielles Manual / Installation and Operation Manual | 2026-05-19 | official_reference_clear_no_fulltext_redistribution | Nur als offizielle Referenz fuer das nachbearbeitbare Szenario nutzen; keine PDF-/Manual-Volltexte im Repo veroeffentlichen | offiziell | nein |
| SRC-WERBETEXT-001 | Eigene synthetisierte Kursunterlage | Werbetext zum FUTURELIGHT IP PLB-420 | aus lokaler Briefing-Unterlage abgeleiteter Werbetext, nicht Bestandteil des Upload-Pakets | Werbetext / Testmaterial | 2026-05-19 | own_or_course_context_reference_no_fulltext_publication | Nur nachrangig fuer Claim-Pruefung nutzen; nicht als harte technische Quelle verwenden; Volltext nicht im Repo veroeffentlichen | werbetext | nein |
| SRC-LIGHTSTAGE-SYNTH-001 | Eigene synthetische Ausarbeitung | LightStage WASH-18 RGBW Bar Outdoor-Claim-Negativszenario | `examples/negative-scenario-lightstage-wash-18-ip20-outdoor-claim.md` | synthetisches Szenario | 2026-05-19 | eigene Ausarbeitung | Testet Bremslogik bei IP20 und Outdoor-Claims | synthetisch | nein |

## Szenarioquellen

### Positiv-Szenario: FUTURELIGHT IP PLB-420 Moving Head Beam

Dieses realitaetsnahe Positiv-Szenario basiert auf offiziellen Herstellerreferenzen und einem nachrangigen Werbetext. Die Originaldateien bleiben lokale Referenzen und werden nicht als Volltext im oeffentlichen Prompt-Paket veroeffentlicht.

### Nachbearbeitbares Szenario: Blackmagicdesign ATEM Mini Extreme ISO G2

Dieses Szenario basiert auf einem offiziellen, modelluebergreifenden Manual. Weil ein separates Produktdatenblatt oder Hersteller-Sheet fuer finale CMS-/PIM-Felder fehlt, bleiben MPN, GTIN/EAN, Masse, Gewicht, Lieferumfang und einzelne Anschlussdetails offene Pruefpunkte.

### Negativ-Szenario: LightStage WASH-18 RGBW Bar

Dieses Beispiel ist vollstaendig synthetisch und dient zur Pruefung der Bremslogik bei widerspruechlichen Outdoor-Claims und IP20.

## Datenschutz

Es wurden keine echten Kundendaten, personenbezogenen Supportfaelle oder vertraulichen internen Dokumente als Datensatz aufgenommen. Nutzer sollen keine echten personenbezogenen oder vertraulichen Daten in das Prompt-Paket eingeben.

## Offene Reviewpunkte

- Bei Peer Review pruefen lassen, ob die Herstellerlinks weiterhin aktuell sind.
- Lizenz-/Nutzungsstatus externer Herstellerdokumente bleibt auf Quellenreferenz ohne Volltext-Weiterveroeffentlichung begrenzt.
- Sicherstellen, dass `Beispieldaten/` und `Eigendokumentation/` nicht in ein oeffentliches Repo hochgeladen werden.
