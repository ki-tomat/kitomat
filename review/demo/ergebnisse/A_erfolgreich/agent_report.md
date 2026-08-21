# Review-Bericht

**Artefakt:** `prompts/demo-angebotstexte-handwerk`  
**Typ:** prompt_package  
**Lauf:** `rev-20260803-001`  
**Datum:** 2026-08-03T09:50:17Z  
**Regelwerk:** 1.0.0  
**Provider:** mock

## Gesamtergebnis

**Ampel: GELB**  
**Empfehlung:** Peer Review starten  
**Statusvorschlag:** `bronze_candidate` (Empfehlung, keine Vergabe)

Gesamtampel yellow. Ergebnisse: 28x not_assessable, 24x pass, 1x warn. 28 Punkte warten auf menschliche Bestaetigung.

## Phasen

| Phase | Ampel | Gate | Titel |
|---|---|---|---|
| `phase-0` | gruen | passed | Orientierung und Sicherheits-Gate |
| `phase-1` | gelb | passed | Potenzial, Grenzfaelle und blinde Flecken |
| `phase-2` | gelb | passed | Pflichtdateien und Struktur |
| `phase-3` | gelb | passed | Metadaten, Lizenz und Trust Layer |
| `phase-4` | gelb | passed | Peer Review |
| `phase-5` | gelb | passed | Szenario-Triade und Tests |
| `phase-6` | gelb | passed | Rueckmeldung und Statusvorschlag |

### Orientierung und Sicherheits-Gate

Deterministische Vorpruefung von prompts/demo-angebotstexte-handwerk. 7 Dateien erfasst und gehasht. PII-Vorfilter entfernte 0 Falschtreffer (Datum, DOI, Zahlenspanne) vor dem Abgleich.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `pass`  | - | Artefaktordner gefunden und eindeutig |  |
| `pass`  | - | Artefakttyp erkannt | Erkannter Typ: prompt_package. |
| `pass`  | - | Scope-Sperre gesetzt | 7 Dateien mit SHA-256 eingefroren. |
| `pass`  | - | Keine eindeutigen PII-Treffer im Beitrag | 0 Rohtreffer, 0 vom Vorfilter entfernt, 0 blockierend. |
| `pass`  | - | Keine unklaren lokalen Datei-Uploads |  |
| `pass`  | - | Kein Klarname statt Teilnehmercode | maintainer='p12' |

### Potenzial, Grenzfaelle und blinde Flecken

[Mock-Provider] Phase phase-1 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `not_assessable`  | P1 | Zweck und Einsatzgrenzen aus dem Material ableitbar | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P3 | Realistisches Potenzial benannt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Blinde Flecken geprueft | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Grenzfaelle durchgespielt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Failure Map erstellt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `pass`  | - | Beitrag klingt nicht zu sicher | Keine auffaelligen Formulierungen im Stichwortabgleich. |

### Pflichtdateien und Struktur

[Mock-Provider] Phase phase-2 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `pass`  | - | Alle Pflichtdateien vorhanden | Alle Pflichtdateien vorhanden. |
| `pass`  | - | Keine Platzhalter im Inhalt | Keine Platzhalter gefunden. |
| `pass`  | - | Metadatendatei heisst metadata.yml | Metadatendatei heisst korrekt metadata.yml. |
| `not_assessable`  | P2 | Dateiliste, Verweise und Metadaten stimmen ueberein | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Keine fachfremden oder versehentlich mitgelieferten Dateien | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Begleitartefakte eingeordnet | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |

### Metadaten, Lizenz und Trust Layer

[Mock-Provider] Phase phase-3 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `pass`  | - | Alle 15 Pflichtfelder vorhanden | Alle 15 Pflichtfelder vorhanden. |
| `pass`  | - | Feldwerte innerhalb der erlaubten Enums | Alle Feldwerte innerhalb der erlaubten Enums. |
| `pass`  | - | Status im Kurs zulaessig | Status 'bronze_candidate' ist im Kurs zulaessig. |
| `not_assessable`  | P1 | Kein zu hoch behaupteter Status | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | data_risk plausibel | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | human_review_required korrekt gesetzt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | ai_act_proximity plausibel | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `pass`  | - | Passender Disclaimer vorhanden | Stichwortpruefung erfolgreich (4 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `not_assessable`  | P0 | Sensible Bereiche erkannt und eingeordnet | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | Lizenzstatus ehrlich | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | Quellen mit Herkunft und Abrufdatum | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P0 | Starke Behauptungen offiziell oder primaer belegt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P0 | Keine urheberrechtlich unklaren Volltexte | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |

### Peer Review

[Mock-Provider] Phase phase-4 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `not_assessable`  | P1 | Problem ist konkret | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `pass`  | - | Zielgruppe klar benannt | Stichwortpruefung erfolgreich (2 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `pass`  | - | Anleitung fuer Fremde nutzbar | Stichwortpruefung erfolgreich (1 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `not_assessable`  | P2 | Nutzen in zwei Minuten verstaendlich | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | Beispiele vorhanden, realistisch und synthetisch | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Beispielinput und Beispieloutput passen zusammen | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `pass`  | - | Master Prompts vollstaendig strukturiert | Stichwortpruefung erfolgreich (2 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `pass`  | - | Failure Modes konkret | Stichwortpruefung erfolgreich (2 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `pass`  | - | Keine Rechts-, Audit- oder Beratungssprache | Keine auffaelligen Formulierungen im Stichwortabgleich. |
| `warn`  | P2 | Aktualitaetsrisiko markiert | Keine der erwarteten Formulierungen gefunden. Menschliche Pruefung erforderlich. |
| `pass`  | - | Keine automatisierte Entscheidung ueber Menschen | Keine auffaelligen Formulierungen im Stichwortabgleich. |

### Szenario-Triade und Tests

[Mock-Provider] Phase phase-5 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `pass`  | - | Positives Szenario vorhanden | Begriff 'positiv' in den Markdown-Dateien gefunden. |
| `pass`  | - | Nachbearbeitbares Szenario vorhanden | Begriff 'nachbearbeitbar' in den Markdown-Dateien gefunden. |
| `pass`  | - | Negatives Szenario vorhanden | Begriff 'negativ' in den Markdown-Dateien gefunden. |
| `pass`  | - | Expertenfeedback zu den Szenarien dokumentiert | Stichwortpruefung erfolgreich (1 Treffer). Nur ein Formhinweis, keine inhaltliche Bewertung. |
| `not_assessable`  | P2 | Szenarien sind ehrlich und pruefbar | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P0 | Alle Testdaten synthetisch | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | Behauptete Tests sind dokumentiert | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |

### Rueckmeldung und Statusvorschlag

[Mock-Provider] Phase phase-6 regelbasiert bearbeitet. 7 Dateien gelesen. Diese Befunde ersetzen keine inhaltliche Pruefung durch ein Sprachmodell.

| Ergebnis | Schwere | Pruefpunkt | Befund |
|---|---|---|---|
| `not_assessable`  | P2 | Contributor-Feedback erzeugt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P2 | Maintainer-Handoff erzeugt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P0 | Statusvorschlag als Empfehlung markiert | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |
| `not_assessable`  | P1 | Noetige menschliche Entscheidung benannt | Der Mock-Provider kann diesen Punkt nicht beurteilen. Ein Sprachmodell oder ein Mensch muss ihn bewerten. |

---

_Dieser Bericht ist keine Freigabe, kein Merge, keine Veroeffentlichung und keine rechtliche, technische oder datenschutzrechtliche Pruefung. Die Entscheidung trifft ein Mensch._
