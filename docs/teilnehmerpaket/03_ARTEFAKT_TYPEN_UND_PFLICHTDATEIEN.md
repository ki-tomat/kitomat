# 03 - Artefakttypen und Pflichtdateien

## A - Prompt-Paket

Ein Prompt-Paket ist mehr als ein einzelner Prompt. Es beschreibt Zweck, Anwendung, Eingaben, Beispiele, Auswertung und Grenzen.

Pflichtdateien:

```text
prompt.md
README.md
metadata.yml
examples/input-01.md
examples/output-01.md
evaluation.md
failure-modes.md
```

Optional:

- `workflow.md`
- Varianten fuer ChatGPT, Claude oder Codex
- Verweis auf Datensatz-/Quellenpaket

## B - Datensatz-/Quellenpaket

Ein Datensatz-/Quellenpaket liefert geprueften Kontext fuer Prompts oder Modelle.

Pflichtdateien:

```text
README.md
metadata.yml
sources.md
license.md
usage.md
```

Enthalten kann sein:

- synthetische Beispieldaten
- Quellenliste
- Checkliste
- Vorlage
- kurze eigene Zusammenfassung mit Quellenangabe
- Kontextpaket

Groessere Dateien werden als GitHub Release Assets bereitgestellt, nicht direkt ins Git-Repo geladen.

## C - KMU-/Branchenmodell

Ein Modell ist ein Denk-, Beratungs- oder Prozessframework fuer KMU oder eine Nischenanwendung.

Pflichtdateien:

```text
model.md
README.md
metadata.yml
application-guide.md
canvas/ oder worksheet/
examples/example-01.md
sources.md
failure-modes.md
```

Wichtig:

- Die fachliche Substanz kommt vom Teilnehmer.
- KI darf strukturieren, aber nicht die Expertise erfinden.
- Quellen, Grenzen und Review-Fragen muessen sichtbar sein.

## Gemeinsame Metadaten

Jedes Artefakt braucht unter anderem:

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

Erlaubte Status im Kurs:

- `draft`
- `bronze_candidate`
- `bronze`

Nicht im Kurs als finaler Status:

- `silver`
- `gold_candidate`
- `gold`

