# KI-tomat Cloudflare Content API

Read-only Cloudflare Worker fuer den Inhalt aus `ki-tomat/kitomat`, inklusive Normalisierung, D1-Cache, ETag und Stale-Fallback.

## Cloudflare Runtime

- `wrangler.toml` enthaelt Workername, oeffentliche Runtime-Variablen und das D1-Binding.
- `.openai/hosting.json` bleibt waehrend der Abnahme nur als Rollback-Hinweis erhalten.
- D1-Binding: `DB`.
- R2 wird in Phase 3 nicht genutzt und bleibt `null`.
- Diese Site nutzt eine eigene D1-Datenbank nur fuer `content_cache` und `sync_runs`.
- Echte Secrets werden als Cloudflare-Worker-Secrets gesetzt, nicht im Repo.

## Endpunkte

- `GET /api/content`
- `GET /api/content/:id`
- `GET /api/status`

## Runtime Environment

- `GITHUB_TOKEN` optional, secret. Erhoeht GitHub API Rate Limits. Nie im Browser verwenden.
- `ALLOWED_ORIGINS` kommagetrennte CORS-Allowlist.
- `CACHE_TTL_SECONDS` optional, Default 1800.

## Build

```bash
npm run build
npm test
npm run deploy:dry-run
```

D1-Schema: `db/schema.sql`.

Remote-Initialisierung:

```bash
npx wrangler d1 execute kitomat-content-api --remote --file db/schema.sql
```
