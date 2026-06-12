# Beispielinput 01: Lead-Scoring NordBau Service GmbH

Gilt für: `prompts/prompt-1-lead-scoring.md`

---

```yaml
prompt_id: prompt_1_lead_scoring

unternehmen: "NordBau Service GmbH"
branche: "Handwerksbetrieb / Gebäudeservice"
unternehmensgroesse: "80 Mitarbeitende"

ansprechpartner_name: "nicht genannt"
ansprechpartner_rolle: "Geschäftsführer"
entscheidungsbefugnis:
  wert: unklar

leadquelle:
  wert: inbound

ausgangssituation: >
  Viele Anfragen kommen per E-Mail und Telefon rein, werden aber nicht sauber im CRM erfasst.

pain_points:
  - "schlechte CRM-Pflege"
  - "lange Reaktionszeiten"
  - "Vertrieb verliert Übersicht"

positive_kaufsignale:
  - "Budgetrahmen vorhanden"
  - "Geschäftsführer möchte Pilotprojekt"
  - "konkretes Problem benannt"

negative_signale:
  - "nicht genannt"

risiken_und_unsicherheiten:
  - "Datenschutzprüfung notwendig"
  - "interne IT muss eingebunden werden"
  - "konkrete Budgethöhe nicht genannt"

budgethinweis: "Budgetrahmen vorhanden, konkrete Höhe nicht genannt"

genannte_tools:
  - "CRM-System, Name nicht genannt"

datenschutz_check:
  personenbezogene_daten_enthalten: unbekannt
  sensible_daten_enthalten: unbekannt
  datenfreigabe_status: synthetisch

input_source:
  typ: manuell
  system: "nicht zutreffend"
  record_id: "synthetisch-lead-001"
  imported_at: "YYYY-MM-DD"
  mapped_by: manuell
  mapping_confidence: hoch

zusatznotizen: "Testfall für starke ICP-Passung mit Reviewbedarf bei Datenschutz und IT."

human_review_required: true
```
