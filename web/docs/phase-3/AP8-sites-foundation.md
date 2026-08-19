# AP8: Sites Foundation

## Ziel

Die Grundlage fuer Phase 3 B+ schaffen: zwei getrennte Sites-Projekte im Repo, eines fuer die oeffentliche read-only Content API und eines fuer die workspace-interne Admin Site. Dieses AP baut Struktur, Hosting-Metadaten und lokale Build-Faehigkeit auf, aber noch keine vollstaendige Content-Synchronisation.

## Branch und PR

- Branch: `feature/ap8-sites-foundation`
- Startpunkt: bestaetigter Integrationsbranch aus AP7.5, bevorzugt `develop`
- PR-Ziel: bestaetigter Integrationsbranch aus AP7.5
- Issue-Bezug: <https://github.com/pfernando-KI/kitomat/issues/14>

## Scope

- `sites/content-api/` als Sites-kompatibles Worker-Projekt neu anlegen oder vorhandenes Skelett aktualisieren.
- `sites/admin/` als separates Sites-kompatibles Worker-Projekt neu anlegen oder vorhandenes Skelett aktualisieren.
- Je Projekt `.openai/hosting.json` mit den Keys `project_id`, `d1`, `r2` dokumentieren. `project_id` fehlt bis zur Provisionierung durch Sites; `d1` ist `DB`, `r2` bleibt `null`.
- Je Projekt `.env.example`, `package.json`, `README.md`, Build-Skript und minimale Worker-Struktur.
- D1-Schema pro Site getrennt halten: Content API nur `content_cache` und `sync_runs`; Admin Site nur `team_notes` und `checklist_items`.
- D1-DDL nur additiv: `CREATE TABLE IF NOT EXISTS`; kein `DROP`/`ALTER` ohne eigenes Migrations-AP.
- Build-Skripte muessen optional `SITES_DIST_DIR` unterstuetzen.
- Vorhandener Worker-Code darf als lauffaehiger Stub erhalten bleiben, auch wenn einzelne Funktionen spaeter in AP9 oder AP11 verfeinert werden.

## Nicht im Scope

- Kein produktives Sites-Deployment.
- Kein GitHub Token setzen.
- Keine WebUI-Anbindung.
- Keine Contribution-Persistenz.
- Keine echten GitHub-Schreibaktionen.

## Betroffene Dateien

- `sites/content-api/**`
- `sites/admin/**`
- Keine Aenderungen an `web/src/`, ausser wenn Build-/Doku-Verweise zwingend noetig sind.

## Implementierungsschritte

1. `sites/content-api/` und `sites/admin/` neu anlegen, falls sie noch nicht existieren.
2. `.openai/hosting.json` pro Site auf Sites-kompatible Metadaten setzen: `project_id` erst nach Provisionierung, `d1: "DB"`, `r2: null`.
3. D1-Schema-Dateien unter `db/schema.sql` getrennt aktuell halten.
4. Build-Skripte so halten, dass sie `dist/server/index.js` und `dist/.openai/hosting.json` erzeugen.
5. `.env.example` mit noetigen Runtime-Keys pflegen:
   - Content API: `GITHUB_TOKEN`, `ALLOWED_ORIGINS`, `CACHE_TTL_SECONDS`
   - Admin: `CONTENT_API_URL`
6. README je Site mit Zweck, Endpunkten und Build-Hinweisen pflegen.
7. Klar dokumentieren: echte Secrets wie `GITHUB_TOKEN` gehoeren in Sites Runtime Environment, nicht in committete `.env`-Dateien und nicht in `.openai/hosting.json`.

## Akzeptanzkriterien

- Beide Sites-Projekte sind getrennt und koennen unabhaengig gebaut werden.
- Content API ist als oeffentlich lesbare Site geplant; Admin Site ist als workspace-interne Site geplant.
- Beide Sites haben getrennte D1-Schemas und keine geteilte Datenbank.
- `.openai/hosting.json` enthaelt keine Secrets und ist kompatibel mit Codex Sites.
- Build funktioniert mit temporaerem Ausgabepfad:
  - `$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-content-api-dist'; npm run build`
  - `$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-admin-dist'; npm run build`
- Keine Secrets stehen in Repo-Dateien.
- Die Admin Site ist als interne Site geplant, nicht als oeffentliche Contentquelle.

## Tests

- `node --check sites/content-api/src/worker.js`
- `node --check sites/admin/src/worker.js`
- `npm run build` pro Site mit der PowerShell-Variante fuer `SITES_DIST_DIR`.

## Hinweise fuer Codex/Claude Code

- Dieses AP ist Infrastruktur-Grundlage. Keine Produktlogik aus AP9-AP13 hineinziehen.
- Wenn ein lokaler `dist/`-Build wegen `EPERM` scheitert, gilt der zentrale Hinweis in `CONTRIBUTING.md`; AP8 selbst bleibt auf die Sites-Struktur fokussiert.

## Lokaler AP8-Startbefund Am 2026-06-10

- `sites/content-api/` und `sites/admin/` existieren lokal als getrennte Sites-Projekte.
- Beide `.openai/hosting.json` enthalten `d1: "DB"` und `r2: null`; `project_id` ist noch nicht gesetzt, weil noch nicht provisioniert wurde.
- Content API D1-Schema ist getrennt und enthaelt `content_cache` und `sync_runs`.
- Admin D1-Schema ist getrennt und enthaelt `team_notes` und `checklist_items`.
- Admin-Notizen verwenden `author_key`, kein `author_email`.
- Echte Secrets stehen nicht in Repo-Dateien; `GITHUB_TOKEN` ist nur als leerer Key in `.env.example` dokumentiert.
- Syntaxchecks bestanden:
  - `node --check sites/content-api/src/worker.js`
  - `node --check sites/admin/src/worker.js`
- Sites-Builds mit temporaerem Ausgabepfad bestanden:
  - `$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-content-api-dist'; npm run build`
  - `$env:SITES_DIST_DIR = Join-Path $env:TEMP 'kitomat-admin-dist'; npm run build`
- Build-Artefakte enthalten jeweils `server/index.js`, `.openai/hosting.json` und `.openai/db/schema.sql`.

Offen:

- Sites-Provisioning wurde noch nicht ausgefuehrt. Damit ist die echte Workspace-Berechtigung weiterhin erst beim ersten `create site`-Schritt bestaetigt.
- Produktive Admin-Daten in D1 bleiben bis zur Datenschutz-/Residency-Klaerung gesperrt.
