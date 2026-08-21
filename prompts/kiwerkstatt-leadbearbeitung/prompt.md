# Effektive Leadbearbeitung fuer die KIWerkstatt

Dieses Paket enthaelt drei spezialisierte Prompt-Module fuer die menschlich
gepruefte Bearbeitung von B2B-Leads. Waehle vor der Nutzung genau ein Modul:

1. [Lead-Qualifizierung und Scoring](prompts/prompt-1-lead-scoring.md)
2. [CRM-Zusammenfassung](prompts/prompt-2-crm-zusammenfassung.md)
3. [Vorbereitung auf Budget-, Preis- und Prioritaetseinwaende](prompts/prompt-3-budgeteinwaende.md)

## Gemeinsamer Ablauf

1. Waehle das Modul passend zur aktuellen Vertriebsaufgabe.
2. Uebertrage die Angaben in die zugehoerige Input-Karte unter `input-layer/`.
3. Fuehre den [Preflight-Check](input-layer/preflight-check.md) aus.
4. Fuehre das ausgewaehlte Prompt-Modul mit der geprueften Input-Karte aus.
5. Pruefe Ergebnis, Annahmen und Unsicherheiten vor jeder weiteren Verwendung.

## Verbindliche Regeln

- Verwende keine echten personenbezogenen oder vertraulichen Daten ohne
  dokumentierte Freigabe.
- Erfinde keine Fakten, Rabatte, Referenzen, Quellen oder ROI-Zahlen.
- Markiere fehlende Angaben und Unsicherheiten deutlich.
- Triff keine automatische oder finale Vertriebsentscheidung.
- Uebernimm Ergebnisse nicht ungeprueft in ein CRM oder in externe
  Kommunikation.
- `human_review_required: true` gilt fuer jedes Modul und jedes Ergebnis.

Das kanonische positive Beispiel fuer Modul 1 befindet sich in
[`examples/input-01.md`](examples/input-01.md) und
[`examples/output-01.md`](examples/output-01.md). Weitere nachbearbeitbare und
negative Szenarien sind in den zusaetzlichen Beispielen sowie in
[`failure-modes.md`](failure-modes.md) dokumentiert.
