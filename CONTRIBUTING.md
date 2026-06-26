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

## Lokale Build-Hinweise

Auf Windows/OneDrive-Arbeitsplaetzen kann das Anlegen lokaler `dist/`-Ordner mit `EPERM` scheitern. Das ist ein Umgebungsblocker und kein Grund fuer unsichere Workarounds im Code.

Fuer Sites-Builds kann ein temporaerer Ausgabepfad genutzt werden:

```powershell
$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-content-api-dist'; npm run build
$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-admin-dist'; npm run build
```

Wenn auch der WebUI-Build lokal an `esbuild spawn EPERM` scheitert, im PR Syntaxchecks, betroffene Umgebung und den Blocker dokumentieren.

## Externe Beitraege

Externe Community-Beitraege laufen bevorzugt ueber Fork plus Pull Request.

Regeln:

- kein direkter Push auf `main`
- ein Pull Request pro Hauptartefakt oder klar begrenztem Fix
- keine Klarnamen in Beispieldaten oder Metadaten
- keine echten Kunden-, Personen-, HR-, Gesundheits- oder vertraulichen Finanzdaten
- Quellen mit Herkunft, Lizenzstatus und Abrufdatum dokumentieren
- Status maximal `draft` oder `bronze_candidate` vorschlagen
- OpenClaw/Codex-Vorfeedback ist kein Merge- oder Release-Approval

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

## Maintainer Gate

Nur Maintainer entscheiden:

- Merge nach `main`
- finaler Status `bronze`
- Aufnahme in `v0.1-rc`
- Rueckstellung auf `post_mvp`
- oeffentliche Kommunikation
