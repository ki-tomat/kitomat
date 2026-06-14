# Quellen und Framework-Referenzen

## Zweck dieser Datei

Diese Datei dokumentiert die Quellen, Frameworks, Projektvorgaben und internen Bezugspunkte, auf denen das Modell basiert.

Sie dient nicht als wissenschaftliche Literaturliste, sondern als nachvollziehbare Quellen- und Referenzdokumentation für das Repository-Artefakt.

## 1. Projekt- und Repository-Vorgaben

### 1.1 Zielbild und Scope

**Quelle:** `00_ZIELBILD_UND_SCOPE.md`  
**Typ:** Projektvorgabe / Scope-Dokument  
**Verwendung im Modell:** Grundlage für Artefakttyp, Umfang, Pflichtdateien, Datenschutzgrenzen und Repository-Statuslogik.  
**Relevanz:** hoch  
**Lizenzstatus:** projektintern / vom Kursmaterial bereitgestellt  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Verwendete Punkte:

- Scope bleibt auf drei Hauptartefakte begrenzt:
  - Prompt-Pakete
  - Datensatz-/Quellenpakete
  - KMU-/Branchenmodelle
- Das Modell wird als KMU-/Branchenmodell eingeordnet.
- Keine Erweiterung zu SaaS, App, Marketplace, Login-System oder Plattformprodukt.
- Pflichtdateien für KMU-/Branchenmodelle:
  - `model.md`
  - `README.md`
  - `metadata.yml`
  - `application-guide.md`
  - `canvas/` oder `worksheet/`
  - `examples/example-01.md`
  - `sources.md`
  - `failure-modes.md`
- Keine echten Kundendaten, keine personenbezogenen E-Mails, keine vertraulichen Finanzdaten, keine Gesundheitsdaten, keine internen Kundendokumente.
- Synthetische Daten, Musterfälle, Checklisten, Vorlagen und kurze eigene Zusammenfassungen sind erlaubt.

### 1.2 Repository-Struktur und Artefakte

**Quelle:** `03_REPOSITORY_STRUKTUR_UND_ARTEFAKTE.md`  
**Typ:** Repository-Standard  
**Verwendung im Modell:** Grundlage für Dateistruktur, Pflichtfelder, Metadatenlogik und Model-spezifische Anforderungen.  
**Relevanz:** hoch  
**Lizenzstatus:** projektintern / vom Kursmaterial bereitgestellt  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Verwendete Punkte:

- Gemeinsame Pflichtfelder:
  - `id`
  - `artifact_type`
  - `title`
  - `category`
  - `status`
  - `language`
  - `version`
  - `maintainer`
  - `license`
  - `license_status`
  - `data_risk`
  - `human_review_required`
  - `ai_act_proximity`
  - `legal_disclaimer`
  - `sources_status`
- Model-spezifische Pflichtfelder:
  - `model_type`
  - `target_users`
  - `use_case`
  - `required_inputs`
  - `output_format`
  - `application_scope`
  - `framework_references`
  - `required_review_level`

### 1.3 Qualität, Trust Layer und Review

**Quelle:** `06_QUALITAET_TRUST_LAYER_REVIEW.md`  
**Typ:** Qualitäts- und Review-Standard  
**Verwendung im Modell:** Grundlage für Statuslogik, Datenrisiko, AI-Act-Nähe, Disclaimer, Review-Checkliste und Failure-Modes.  
**Relevanz:** hoch  
**Lizenzstatus:** projektintern / vom Kursmaterial bereitgestellt  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Verwendete Punkte:

- Lieferbar heißt reviewfähig, ehrlich im Status und frei von unzulässigen Daten- oder Quellenrisiken.
- Fachliche Freigabe bleibt menschlich.
- Reguläre Kursstatus:
  - `draft`
  - `bronze_candidate`
  - `bronze`
- Kein `bronze` ohne:
  - valide Metadaten
  - Pflichtdateien
  - Beispiel
  - Trust Layer
  - Peer Review
  - notwendige Trust-Prüfung
  - Maintainer-Freigabe
- Datenrisiko:
  - `green`
  - `yellow`
  - `red`
- AI-Act-Nähe:
  - `none`
  - `transparency`
  - `high_risk_adjacent`
  - `prohibited_check`
  - `unclear`
- Bei DSGVO-, Compliance- oder rechtlicher Nähe:
  - keine Rechtsberatung
  - kein Audit
  - keine automatisierte Entscheidung
  - `human_review_required: true`
  - klarer Disclaimer

## 2. Sakizli-Frameworks

### 2.1 Sakizli-Konsultationsmodell

**Quelle:** `sakizli-konsultationsmodell.pdf`  
**Typ:** Beratungs- und Konsultationsmodell  
**Verwendung im Modell:** Hauptorientierung für Praxisnähe, Phasenlogik, Marketingbezug, Reflexion, Handlungsempfehlungen, Evaluation und ethisch-governance-orientierte Einbettung.  
**Relevanz:** sehr hoch  
**Lizenzstatus:** Kursmaterial / bereitgestellte Quelle  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Übernommene Modellprinzipien:

- praxisorientierte Beratung
- Verbindung von KI, Marketing, Reflexion und Handlungsempfehlungen
- systematische Analyse von Ausgangslagen
- Entwicklung konkreter Maßnahmen
- Pilotierung und Evaluation
- Berücksichtigung von Ethik, Transparenz und Verantwortung

Rolle im eigenen Modell:

Das Sakizli-Konsultationsmodell ist die passendste Hauptgrundlage, weil das hier entwickelte Modell nicht primär juristisch oder technisch ist, sondern ein praktisches Beratungs-Workbook für kleine Unternehmen im Online-Marketing.

### 2.2 Sakizli 5-Phasen-Beratungsmodell

**Quelle:** `sakizli-5-phasen-beratungsmodell.pdf` und `sakizli-5-phasen-kompakt (1).pdf`  
**Typ:** Beratungsmodell / Phasenmodell  
**Verwendung im Modell:** Strukturvorlage für Anamnese, Analyse, Lösungsentwicklung, Umsetzung, Dokumentation und Evaluation.  
**Relevanz:** hoch  
**Lizenzstatus:** Kursmaterial / bereitgestellte Quelle  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Übernommene Prinzipien:

- Vorbereitung und Anamnese
- Analyse und Problemdefinition
- Beratung und Lösungsentwicklung
- Umsetzung und Dokumentation
- Evaluation und Nachbereitung
- Risiko- und Chancenbewertung
- Priorisierung
- Maßnahmenplanung
- Monitoring und KPIs

Anpassung im eigenen Modell:

Das ursprüngliche 5-Phasen-Modell wurde für diesen Anwendungsfall auf sechs Phasen erweitert, weil die Daten- und Wissenssammlung bei kleinen KMU besonders wichtig ist.

### 2.3 Sakizli-Fragenerweiterung / Fragenmodell

**Quelle:** `sakizli-fragenerweiterung (1).pdf`  
**Typ:** Fragenmodell / Zielklärungsmodell  
**Verwendung im Modell:** Grundlage für Anamnese, Zielklärung, GROW-Logik, 5-Why-Fragen, iterative Klärung und strukturierte Workbook-Fragen.  
**Relevanz:** hoch  
**Lizenzstatus:** Kursmaterial / bereitgestellte Quelle  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Übernommene Prinzipien:

- sokratische Klärungsfragen
- Zielklärung
- Reality / Ausgangslage
- Options / Lösungsoptionen
- Will / nächste Schritte
- 5-Why-Logik
- iterative Rückkopplung
- Dokumentation von Anpassungen
- transparente Zusammenführung in einen Handlungsplan

## 3. Unterrichts- und Transkriptbezüge

### 3.1 Transkript Tag 6, Teil 2

**Quelle:** `Transkript Tag 6 part 2.docx`  
**Typ:** Unterrichtstranskript / Projektbesprechung  
**Verwendung im Modell:** Grundlage für Szenario-Validierung, Bedeutung von Datensätzen, Unterschied zwischen ungesteuerter und strukturierter KI-Nutzung, Bäckerei-Beispiel und iterative Ausarbeitung.  
**Relevanz:** sehr hoch  
**Lizenzstatus:** Kursmaterial / Transkript  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Verwendete Punkte:

- Ohne Modell kann ChatGPT in unterschiedliche Richtungen schweifen.
- Strukturierte KI-Nutzung mit Beratungsmodell führt zu besseren Ergebnissen.
- Datensätze und Quellen sind entscheidend.
- Der Prompt allein reicht nicht aus.
- Qualitative Daten wie Ort, Produkte, Tradition, regionale Besonderheiten und Events verbessern die Ausarbeitung.
- End-to-End-Tests sollen zeigen, wie ein echter Nutzer den Prozess nutzt.
- Validierung in drei Kategorien:
  - positiv validierbar
  - nachbearbeitbar
  - negativ / nicht nutzbar

### 3.2 Transkript Tag 5

**Quelle:** `Transkript Tag 5 (1).docx`  
**Typ:** Unterrichtstranskript / Community-Projekt-Kontext  
**Verwendung im Modell:** Grundlage für den Fokus auf praxisnahe KMU-Modelle, nutzbare Frameworks, Community-Projekt und KI-Consulting-Nutzen.  
**Relevanz:** hoch  
**Lizenzstatus:** Kursmaterial / Transkript  
**Abruf-/Bearbeitungsstand:** 2026-05-09

Verwendete Punkte:

- Modelle und Frameworks sollen für KMU direkt nutzbar sein.
- Das Thema ist wichtig und heikel, deshalb praxisnah statt nur theoretisch.
- Unternehmen sollen analysieren können, wo sie stehen und was sie brauchen.
- Modelle können als Einstieg dienen, bevor komplexe Tools oder Workflows eingeführt werden.
- KI-Consultants können solche Modelle zur Vorbereitung und Strukturierung von Beratungsgesprächen nutzen.

## 4. Eigene fachliche Strukturierung dieses Modells

**Quelle:** eigene Ausarbeitung auf Basis der oben genannten Kursmaterialien und Nutzeranforderungen  
**Typ:** eigene Synthese / Beratungsmodell  
**Verwendung im Modell:** Entwicklung der sechs Phasen, Worksheets, Beispiele, Failure Modes und Review-Logik.  
**Relevanz:** sehr hoch  
**Lizenzstatus:** vorgeschlagen CC-BY-4.0, finale Entscheidung durch Projekt-/Kursleitung  
**Bearbeitungsstand:** 2026-05-09

Eigene Modellentscheidungen:

- Fokus auf Kleinstunternehmen bis 10 Mitarbeitende
- branchenübergreifende Anwendung
- Schwerpunkt Online-Marketing
- Praxis-Workbook statt theoretischem Framework
- sechs Phasen statt fünf
- drei Beispielanwendungen:
  - lokale Bäckerei
  - Medienunternehmen / Blogartikel
  - E-Mail-Folge mit Leadmagnet
- Datenrisiko bewusst auf `yellow`
- menschliche Prüfung verpflichtend
- keine automatische Veröffentlichung
- keine echten Kundendaten
- keine Rechtsberatung

## 5. Quellenstatus

```yaml
sources_status: provided
```

Begründung:

- Die zentralen Framework- und Projektquellen sind benannt.
- Die verwendeten Kursmaterialien sind dokumentiert.
- Die eigenen Modellentscheidungen sind als eigene Synthese gekennzeichnet.
- Es werden keine externen Volltexte übernommen.
- Für rechtliche oder regulatorische Detailaussagen sind weitere offizielle Quellen nötig, falls das Modell über die Orientierung hinaus produktiv verwendet werden soll.

## 5.1 Quellenfreigabe nach Peer Review

Aktueller Stand:

- Quellen sind benannt und eingeordnet.
- Es werden keine externen Volltexte übernommen.
- Kursmaterialien, Transkripte und Sakizli-Dateien sind als Kurs- bzw. Projektquellen dokumentiert.
- Eine öffentliche Weitergabe oder öffentliche Referenzierung dieser Kursmaterialien ist noch nicht abschließend durch Kursleitung oder Rechteinhaber freigegeben.

Konsequenz:

- Für `bronze_candidate` ist der Quellenstatus ausreichend dokumentiert.
- Für `bronze` oder öffentliche Veröffentlichung muss die Quellenfreigabe menschlich bestätigt werden.
- Bis zur Freigabe dürfen Kursmaterialien nur als interne Referenzen verstanden werden.

## 6. Offene Quellen- und Review-Fragen

Vor einer höheren Statusstufe sollten folgende Punkte geprüft werden:

- Sind alle Sakizli-Dateien im finalen Repository korrekt referenziert?
- Darf auf die Kursmaterialien im öffentlichen Repository direkt verwiesen werden oder nur intern? Status: offen bis Kursleitungs-/Rechtefreigabe.
- Soll das Modell externe offizielle Quellen zu DSGVO, Newsletter-Einwilligung oder EU-AI-Act nur verlinken oder bewusst vermeiden?
- `ai_act_proximity` wurde nach Pre-Review konservativ auf `unclear` gesetzt, weil Newsletter-, Support-, Bewertungs- und Kontaktanfrage-Kontexte DSGVO- und Einwilligungsnähe haben können.
- Wird das Modell als allgemeines Workbook oder als Beratungsartefakt für KI-Consultants veröffentlicht?
- Ist `data_risk: yellow` ausreichend oder muss für bestimmte E-Mail-/Newsletter-Anwendungen eine strengere Markierung ergänzt werden?
- Soll das Medienunternehmen-Beispiel wegen möglicher Supportdaten als `yellow` besonders gekennzeichnet werden?

## 7. Quellen-Gate

Vor `bronze` muss geprüft sein:

- keine sensiblen Echtdaten
- keine echten Kundendaten
- keine personenbezogenen Support- oder Newsletterdaten
- keine erfundenen Quellen
- keine unklaren Volltexte
- Quellenstatus dokumentiert
- Disclaimer vorhanden
- Trust Review durchgeführt
- Peer Review durchgeführt
- Maintainer-Freigabe erfolgt

## 8. Empfohlener Disclaimer für Quellen und Nutzung

Dieses Modell ist eine Arbeits- und Orientierungshilfe. Es ersetzt keine fachliche, rechtliche oder datenschutzrechtliche Prüfung. Vor produktiver Nutzung sind Kontext, Daten, Quellen und Ergebnis durch eine verantwortliche Person zu prüfen.

Die genannten Szenarien sind fiktiv und synthetisch. Sie enthalten keine echten Kundendaten und dürfen nicht ohne Prüfung auf reale Unternehmensdaten übertragen werden.

Bei unklaren, hochriskanten oder rechtlich relevanten Anwendungen ist qualifizierte juristische oder datenschutzrechtliche Beratung einzubeziehen.
