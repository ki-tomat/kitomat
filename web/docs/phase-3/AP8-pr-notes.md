# AP8 PR-Notizen: Sites Foundation

## PR-Titel

AP8: Sites Foundation fuer Content API und Admin Site

## PR-Beschreibung

Dieser PR legt die Grundlage fuer Phase 3 B+:

- neues Sites-Projekt `sites/content-api/` als oeffentliche read-only API-Grundlage
- neues Sites-Projekt `sites/admin/` als interne Admin-Grundlage
- getrennte D1-Schemas fuer Content API und Admin Site
- Sites-kompatible Build-Ausgabe mit `server/index.js` und `.openai/hosting.json`
- Foundation-Worker ohne AP9-/AP11-Produktlogik
- zentrale Windows-/OneDrive-Build-Hinweise in `CONTRIBUTING.md`

Bewusst nicht enthalten:

- kein echtes Sites-Deployment
- keine `project_id`
- kein GitHub-Live-Loader
- keine Admin-Schreibfluesse
- keine produktiven Admin-Daten in D1

## Scope Fuer Den AP8-PR

Diese Dateien gehoeren fachlich zu AP8:

- `sites/content-api/**`
- `sites/admin/**`
- `web/docs/phase-3/AP8-sites-foundation.md`
- `CONTRIBUTING.md` mit zentralem Windows-/OneDrive-Build-Hinweis

Diese Dateien gehoeren nicht in einen reinen AP8-PR, auch wenn sie lokal offen sein koennen:

- `web/src/**` ausserhalb der Sites-Anbindung
- `web/docs/decisions/**` ausser ADR-Pflege aus AP7.5
- `web/docs/phase-3/AP7-5-adr-prerequisites.md`
- alte Phase-2-/AP5-Artefakte, Logs und lokale Entwicklungsdateien

## Aenderungszusammenfassung

- Zwei getrennte Sites-Projekte angelegt:
  - `sites/content-api/`
  - `sites/admin/`
- Je Site `.openai/hosting.json` mit `d1: "DB"` und `r2: null`.
- `project_id` bleibt leer, bis Sites wirklich provisioniert wird.
- Je Site `package.json`, `.env.example`, `README.md`, `scripts/build.mjs`, `src/worker.js` und `db/schema.sql`.
- Worker sind bewusst nur Foundation-Stubs. GitHub-Live-Loader, D1-Cache-Verhalten und Admin-Schreibfluesse bleiben AP9/AP11.
- Content API D1-Schema enthaelt nur `content_cache` und `sync_runs`.
- Admin D1-Schema enthaelt nur `team_notes` und `checklist_items`.
- Admin-Notizen verwenden `author_key`, kein E-Mail-Feld.
- Keine Secrets in Repo-Dateien; Runtime-Secrets gehoeren in Sites.

## Verifikation

Ausgefuehrt am 2026-06-10:

```powershell
node --check sites/content-api/src/worker.js
node --check sites/admin/src/worker.js
$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-content-api-dist'; npm run build
$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-admin-dist'; npm run build
```

Beide Builds erzeugen:

- `server/index.js`
- `.openai/hosting.json`
- `.openai/db/schema.sql`

## Bewusst Offen

- Kein produktives Sites-Deployment in AP8.
- Kein `project_id`, solange noch nicht provisioniert wurde.
- Echte Workspace-Berechtigung wird erst beim bewussten Sites-Provisioning bestaetigt.
- Produktive Admin-Daten in D1 bleiben bis Datenschutz-/Residency-Klaerung gesperrt.

## Lokaler Git-Hinweis

Beim Vorbereiten am 2026-06-10 konnte nicht gestaged werden, weil `.git/index.lock` existiert und gleichzeitig Git-Prozesse liefen. Die Sperrdatei wurde nicht geloescht und keine Git-Prozesse wurden beendet. Vor dem finalen Commit erst Git-Prozesse schliessen bzw. den Git-Zustand pruefen.
