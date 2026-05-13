# Contributing

Danke, dass du zu KItomat beitragen moechtest. Beitraege sollen klein, nachvollziehbar und reviewfaehig sein.

## Grundregeln

- Genau ein Hauptartefakt pro Person oder Beitrag, bis es mindestens `bronze_candidate`-faehig ist.
- Keine echten personenbezogenen Daten.
- Keine echten Kundendaten.
- Keine internen Unternehmensdokumente.
- Keine erfundenen Quellen.
- Keine Rechtsberatung, kein Audit, keine automatisierte Entscheidung ueber Menschen behaupten.
- Keine Status-Upgrades auf `bronze` ohne Review- und Trust-Gate.

## Artefakt waehlen

Nutze einen dieser Typen:

- Prompt-Paket: `prompts/`
- Datensatz-/Quellenpaket: `datasets/`
- KMU-/Branchenmodell: `models/`

Kopiere den passenden `_template`-Ordner und benenne ihn nach deiner Artefakt-ID.

## Branch-Naming

Fuer Teilnehmer:

```text
participant/p01-<artifact-id>
participant/p02-<artifact-id>
...
participant/p20-<artifact-id>
```

Weitere Branches:

```text
prompt/<category>-<artifact-id>
dataset/<dataset-id>
model/<model-id>
docs/<topic>
```

Keine Klarnamen in Branches, Beispielen oder Metadaten, ausser es gibt ein ausdrueckliches Opt-in.

## Pull Requests

Ein Pull Request sollte enthalten:

- Artefakttyp und Pfad
- Statusvorschlag: `draft` oder `bronze_candidate`
- Hinweis auf Daten-/Quellenrisiken
- Hinweis, ob Peer Review und Trust Review noetig sind
- kurze Liste automatischer Syntax- oder Struktur-Fixes, falls Codex geholfen hat

## Review

Peer Review prueft:

- Verstaendlichkeit
- Nutzbarkeit
- Zielgruppe
- Beispielqualitaet
- Szenario-Triade
- offensichtliche Fachfehler
- offene Fragen

Trust Review prueft nach Risiko:

- Datenschutz
- Quellen
- Lizenz
- sensible Bereiche
- lokale Datei-Uploads

