# KI-tomat Sites Content API

Read-only API-Grundlage fuer Phase 3 B+. AP8 legt nur das Sites-Projekt, Build-Artefakt und D1-Schema an. Das echte Lesen aus `ki-tomat/kitomat`, Normalisierung und Caching folgen in AP9.

## Sites Foundation

- `.openai/hosting.json` enthaelt die logischen Bindings fuer Sites. `project_id` wird erst nach der Provisionierung durch Sites gesetzt.
- D1-Binding: `DB`.
- R2 wird in Phase 3 nicht genutzt und bleibt `null`.
- Diese Site nutzt eine eigene D1-Datenbank nur fuer `content_cache` und `sync_runs`.
- Echte Secrets werden in Sites Runtime Environment gesetzt, nicht im Repo.

## Endpunkte

- `GET /api/content`
- `GET /api/content/:id`
- `GET /api/status`

In AP8 liefern diese Endpunkte nur Foundation-/Leerantworten.

## Runtime Environment

- `GITHUB_TOKEN` optional, secret. Erhoeht GitHub API Rate Limits. Nie im Browser verwenden.
- `ALLOWED_ORIGINS` kommagetrennte CORS-Allowlist.
- `CACHE_TTL_SECONDS` optional, Default 1800.

## Build

```bash
npm run build
```

D1-Schema: `db/schema.sql`.
