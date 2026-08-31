# Abnahme-Checkliste: WebUI & Cloudflare-Cutover

Go/No-Go-Liste fuer die Migration nach `ki-tomat/kitomat`, gemeinsam von Person A
(Repo/WebUI/Pages) und Person B (Cloudflare) durchzugehen. Erst wenn alle Punkte
abgehakt und offene Findings geklaert sind, gilt der Cutover als abgenommen.

- **WebUI:** https://ki-tomat.github.io/kitomat/web/
- **Content-API:** https://kitomat-content-api.ki-tomat.workers.dev
- **Admin:** https://kitomat-admin.ki-tomat.workers.dev

Legende: **[belegt]** = Nachweis liegt vor · **[gemeinsam]** = zusammen pruefen ·
**[Person B]** = Cloudflare-seitig bestaetigen.

## A. WebUI & GitHub Pages (Person A)

- [ ] **[belegt]** Pages-URL laedt ohne Asset-404 (Base-Path `/kitomat/web/`, HTTP 200).
- [ ] **[gemeinsam]** Bibliothek zeigt Live-Daten, Datenquellen-Badge „Live". Zeigt es „Cache", hart neu laden oder anderes Geraet.
- [ ] **[gemeinsam]** Netzwerk-Tab (DevTools): Request geht an `…workers.dev/api/content` (Status live), **nicht** an `api.github.com`.
- [ ] **[gemeinsam]** Detailseite eines echten Artefakts inkl. README-Inhalt.
- [ ] **[gemeinsam]** Dashboard-Zaehler stimmen, keine Leerlisten-Crashes.
- [ ] **[gemeinsam]** Light/Dark sowie 375 px (mobil) und 1280 px (Desktop).
- [ ] **[belegt]** `npm run test:ci` (38/38 lokal) und CI-Check `validate` gruen.

## B. Content-API (Cloudflare, Person B)

- [ ] **[belegt]** `GET /api/status` → JSON.
- [ ] **[belegt]** `GET /api/content` → echte Artefakte, kein `_template`.
- [ ] **[gemeinsam]** `GET /api/content/<id>` → Artefakt inkl. `readme`.
- [ ] **[Person B]** `If-None-Match` → 304; GitHub-Fehler simulieren → `stale`.
- [ ] **[Person B]** Remote-D1 zeigt erwartete Tabellen: `wrangler d1 execute <db> --remote --command "SELECT name FROM sqlite_schema WHERE type='table'"` (beide DBs).
- [ ] **[belegt]** CORS: `access-control-allow-origin: https://ki-tomat.github.io`, Preflight (OPTIONS) → 204.

## C. Admin-Zugang & Firebase-Auth — Sicherheits-Gate (Person B + gemeinsam)

- [ ] **[belegt]** Admin-Link erscheint auf der Live-Seite (Admin-Rolle).
- [ ] **[belegt]** Ohne Login: `GET /api/admin/state` → 403.
- [ ] **[belegt]** Gefaelschter `oai-*`-Header ohne JWT → 403 (keine Impersonation).
- [ ] **[belegt]** JWT falsch signiert / falscher `iss` / `aud` / abgelaufen → abgewiesen (`auth.test.js`, 27 Tests gruen).
- [ ] **[belegt]** POST ohne `Origin` → abgelehnt.
- [ ] **[belegt]** Prod-Bundle: Legacy-/Local-Bypass aus (`[env.dev]` nicht in Prod-vars).
- [ ] **[gemeinsam]** Eingeloggt (`ADMIN_EMAILS`): State/Notes/Checklist funktionieren; XSS-Escape greift (`<script>` in Notiz wird escaped).
- [ ] **[gemeinsam]** Erster Admin-POST gelingt eingeloggt → `ALLOWED_ORIGIN` korrekt (same-origin, kein 403).

## D. Rollback & Betrieb (gemeinsam)

- [ ] **[gemeinsam]** WebUI-Rollback bekannt: Repo-Variablen leeren → Fallback-Modus, Pages-Rebuild.
- [ ] **[Person B]** Sites-Rollback bekannt: `wrangler rollback`; alte pfernando-Deployments bleiben bis zur Abnahme als Fallback.
- [ ] **[belegt]** Repo: `main` protected, Merges nur per PR (`enforce_admins`, 1 Review Pflicht).
- [ ] **[belegt]** Runbook vorhanden: [`cloudflare-cutover-runbook.md`](cloudflare-cutover-runbook.md).

## Abnahme

Mit Bestaetigung erklaeren beide, dass alle Punkte geprueft und offene Findings
geklaert sind. Danach: alte pfernando-Deployments aufraeumen (separater Schritt).

| | Name | Datum |
|---|---|---|
| Person A | | |
| Person B | | |
