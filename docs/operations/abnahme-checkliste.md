# Abnahme-Checkliste: WebUI & Cloudflare-Cutover

Go/No-Go-Liste fuer die Migration nach `ki-tomat/kitomat`, gemeinsam von Person A
(Repo/WebUI/Pages) und Person B (Cloudflare) durchzugehen. Erst wenn alle Punkte
abgehakt und offene Findings geklaert sind, gilt der Cutover als abgenommen.

- **WebUI:** https://ki-tomat.github.io/kitomat/web/
- **Content-API:** https://kitomat-content-api.ki-tomat.workers.dev
- **Admin:** https://kitomat-admin.ki-tomat.workers.dev

Legende: **[belegt]** = Nachweis liegt vor · **[gemeinsam]** = zusammen pruefen ·
**[Person B]** = Cloudflare-seitig bestaetigen.

**Aufgabenteilung nach Betriebssystem** (jeder Punkt hat eine „So testen"-Zeile):

- 🍎 **Person A (Mac):** die WebUI-Grundpruefungen a1 und a7.
- 🪟 **Person B (Windows, Codex):** alle uebrigen Punkte — inklusive aller
  **[gemeinsam]**- und **[Person B]**-Punkte. Befehle laufen in PowerShell bzw.
  ueber Codex; `curl.exe` und `npx wrangler` sind unter Windows verfuegbar.

Bereits mit **[belegt]** markierte Punkte sind schon nachgewiesen — die „So testen"-Zeile
ist dort ein optionaler Gegencheck.

## A. WebUI & GitHub Pages (Person A)

- [ ] **[belegt]** Pages-URL laedt ohne Asset-404 (Base-Path `/kitomat/web/`, HTTP 200).
  - _So testen (🍎 Mac · Person A):_ In Chrome/Safari `https://ki-tomat.github.io/kitomat/web/` oeffnen — Seite und Kacheln laden, keine kaputten Bilder. Optional Rechtsklick → „Untersuchen" → Reiter „Console": keine roten 404-Fehler zu `/kitomat/web/assets/`.
- [ ] **[gemeinsam]** Bibliothek zeigt Live-Daten, Datenquellen-Badge „Live". Zeigt es „Cache", hart neu laden oder anderes Geraet.
  - _So testen (🪟 Windows · Person B):_ In Edge/Chrome die WebUI → „Bibliothek". Badge oben rechts muss „Live" zeigen. Steht dort „Cache": `Strg`+`Umschalt`+`R` (hart neu laden) oder ein privates Fenster (`Strg`+`Umschalt`+`N`).
- [ ] **[gemeinsam]** Netzwerk-Tab (DevTools): Request geht an `…workers.dev/api/content` (Status live), **nicht** an `api.github.com`.
  - _So testen (🪟 Windows · Person B):_ `F12` → Reiter „Netzwerk" → „Cache deaktivieren" anhaken → Seite neu laden → im Filter `content` eintippen. Es muss ein Request an `kitomat-content-api.ki-tomat.workers.dev/api/content` (Status 200) erscheinen, **nicht** an `api.github.com`.
- [ ] **[gemeinsam]** Detailseite eines echten Artefakts inkl. README-Inhalt.
  - _So testen (🪟 Windows · Person B):_ In der Bibliothek ein Artefakt anklicken (z. B. „Perspektive wechseln"). Die Detailseite zeigt den README-Text.
- [ ] **[gemeinsam]** Dashboard-Zaehler stimmen, keine Leerlisten-Crashes.
  - _So testen (🪟 Windows · Person B):_ „Dashboard" oeffnen — die Zaehlerkacheln zeigen plausible Zahlen (> 0), keine Fehlermeldung/leere Liste.
- [ ] **[gemeinsam]** Light/Dark sowie 375 px (mobil) und 1280 px (Desktop).
  - _So testen (🪟 Windows · Person B):_ Theme-Umschalter (Sonne/Mond) testen. Fenster schmal (~375 px) und breit (~1280 px) ziehen — Layout bleibt intakt. In Edge: `F12` → Geraetesymbol (Umschalt fuer Mobilansicht).
- [ ] **[belegt]** `npm run test:ci` (38/38 lokal) und CI-Check `validate` gruen.
  - _So testen (🍎 Mac · Person A):_ Einfachster Weg — PR #34 auf GitHub oeffnen, unten muessen die Checks `validate` und `build` gruen sein. Alternativ im Terminal: `cd web && npm ci && npm run test:ci` (erwartet 38/38 gruen).

## B. Content-API (Cloudflare, Person B)

- [ ] **[belegt]** `GET /api/status` → JSON.
  - _So testen (🪟 Windows · Person B):_ Im Browser `https://kitomat-content-api.ki-tomat.workers.dev/api/status` oeffnen → JSON. Oder Codex/PowerShell: `curl.exe -sS https://kitomat-content-api.ki-tomat.workers.dev/api/status`.
- [ ] **[belegt]** `GET /api/content` → echte Artefakte, kein `_template`.
  - _So testen (🪟 Windows · Person B):_ `https://kitomat-content-api.ki-tomat.workers.dev/api/content` oeffnen → Liste echter Artefakte, `status: live`, keine `_template`-Eintraege.
- [ ] **[gemeinsam]** `GET /api/content/<id>` → Artefakt inkl. `readme`.
  - _So testen (🪟 Windows · Person B):_ Eine echte ID aus `/api/content` nehmen und `…/api/content/<id>` oeffnen → Feld `readme` ist vorhanden.
- [ ] **[Person B]** `If-None-Match` → 304; GitHub-Fehler simulieren → `stale`.
  - _So testen (🪟 Windows · Person B, Codex/PowerShell):_ ETag holen: `curl.exe -sS -D - https://kitomat-content-api.ki-tomat.workers.dev/api/content -o NUL` → Zeile `etag:`. Dann erneut mit `curl.exe -sS -D - -H "If-None-Match: <etag>" https://kitomat-content-api.ki-tomat.workers.dev/api/content -o NUL` → `HTTP/2 304`. GitHub-Ausfall simulieren → Status `stale`.
- [ ] **[Person B]** Remote-D1 zeigt erwartete Tabellen: `wrangler d1 execute <db> --remote --command "SELECT name FROM sqlite_schema WHERE type='table'"` (beide DBs).
  - _So testen (🪟 Windows · Person B, Codex):_ Im Ordner `sites/content-api` bzw. `sites/admin`: `npx wrangler d1 execute <db> --remote --command "SELECT name FROM sqlite_schema WHERE type='table'"` → erwartete Tabellen erscheinen.
- [ ] **[belegt]** CORS: `access-control-allow-origin: https://ki-tomat.github.io`, Preflight (OPTIONS) → 204.
  - _So testen (🪟 Windows · Person B, Codex/PowerShell):_ `curl.exe -sS -D - -H "Origin: https://ki-tomat.github.io" https://kitomat-content-api.ki-tomat.workers.dev/api/content -o NUL` → Header `access-control-allow-origin: https://ki-tomat.github.io`. Preflight: dieselbe URL mit `-X OPTIONS -H "Access-Control-Request-Method: GET"` → `204`.

## C. Admin-Zugang & Firebase-Auth — Sicherheits-Gate (Person B + gemeinsam)

- [ ] **[belegt]** Admin-Link erscheint auf der Live-Seite (Admin-Rolle).
  - _So testen (🪟 Windows · Person B):_ WebUI oeffnen, Rolle auf „Admin" schalten (Rollen-Umschalter) → der Admin-/Schloss-Link erscheint.
- [ ] **[belegt]** Ohne Login: `GET /api/admin/state` → 403.
  - _So testen (🪟 Windows · Person B):_ Im Browser (ausgeloggt) oder `curl.exe -sS -o NUL -w "%{http_code}" https://kitomat-admin.ki-tomat.workers.dev/api/admin/state` → `403`.
- [ ] **[belegt]** Gefaelschter `oai-*`-Header ohne JWT → 403 (keine Impersonation).
  - _So testen (🪟 Windows · Person B, Codex/PowerShell):_ `curl.exe -sS -o NUL -w "%{http_code}" -X POST https://kitomat-admin.ki-tomat.workers.dev/api/admin/notes -H "oai-authenticated-user-email: test@evil.tld" -H "Content-Type: application/json" -d "{}"` → `403`.
- [ ] **[belegt]** JWT falsch signiert / falscher `iss` / `aud` / abgelaufen → abgewiesen (`auth.test.js`, 27 Tests gruen).
  - _So testen (🪟 Windows · Person B, Codex):_ Im Ordner `sites/admin`: `npm ci; npm test` → `auth.test.js` 27/27 gruen.
- [ ] **[belegt]** POST ohne `Origin` → abgelehnt.
  - _So testen (🪟 Windows · Person B):_ Belegt via `auth.test.js` (Origin-Pruefung). Ein echter Live-Test braucht ein gueltiges Login und wird bei c8 mit abgedeckt.
- [ ] **[belegt]** Prod-Bundle: Legacy-/Local-Bypass aus (`[env.dev]` nicht in Prod-vars).
  - _So testen (🪟 Windows · Person B, Codex):_ `sites/admin/wrangler.toml` pruefen — `LOCAL_DEV` steht nur unter `[env.dev.vars]`, nicht in den Prod-`[vars]`. `npm run predeploy` (Config-Validator) laeuft ohne Fehler.
- [ ] **[gemeinsam]** Eingeloggt (`ADMIN_EMAILS`): State/Notes/Checklist funktionieren; XSS-Escape greift (`<script>` in Notiz wird escaped).
  - _So testen (🪟 Windows · Person B):_ Mit einer `ADMIN_EMAILS`-Adresse via Google einloggen (`https://kitomat-admin.ki-tomat.workers.dev`). State/Notizen/Checkliste sind bedienbar. XSS-Test: Notiz mit Text `<script>alert(1)</script>` anlegen → wird als Text angezeigt, kein Popup.
- [ ] **[gemeinsam]** Erster Admin-POST gelingt eingeloggt → `ALLOWED_ORIGIN` korrekt (same-origin, kein 403).
  - _So testen (🪟 Windows · Person B):_ Nach dem Login eine Notiz anlegen → wird gespeichert (kein 403). Bestaetigt, dass `ALLOWED_ORIGIN` korrekt gesetzt ist.

## D. Rollback & Betrieb (gemeinsam)

- [ ] **[gemeinsam]** WebUI-Rollback bekannt: Repo-Variablen leeren → Fallback-Modus, Pages-Rebuild.
  - _So testen (🪟 Windows · Person B — nur Kenntnis, nicht ausfuehren):_ GitHub → `ki-tomat/kitomat` → Settings → Secrets and variables → Actions → Variables: die `KITOMAT_*`-Variablen leeren und den Deploy-Workflow neu starten → WebUI faellt auf Fallback-Modus.
- [ ] **[Person B]** Sites-Rollback bekannt: `wrangler rollback`; alte pfernando-Deployments bleiben bis zur Abnahme als Fallback.
  - _So testen (🪟 Windows · Person B — nur Kenntnis):_ `npx wrangler rollback` je Worker bekannt; die alten pfernando-Deployments bleiben bis zur Abnahme unangetastet als Fallback.
- [ ] **[belegt]** Repo: `main` protected, Merges nur per PR (`enforce_admins`, 1 Review Pflicht).
  - _So testen (🪟 Windows · Person B):_ GitHub → Settings → Branches → Regel fuer `main`: 1 Review Pflicht und „Include administrators" (enforce_admins) sichtbar.
- [ ] **[belegt]** Runbook vorhanden: [`cloudflare-cutover-runbook.md`](cloudflare-cutover-runbook.md).
  - _So testen (🪟 Windows · Person B):_ Datei `docs/operations/cloudflare-cutover-runbook.md` auf GitHub/`main` existiert.

## Abnahme

Mit Bestaetigung erklaeren beide, dass alle Punkte geprueft und offene Findings
geklaert sind. Danach: alte pfernando-Deployments aufraeumen (separater Schritt,
siehe [`legacy-teardown.md`](legacy-teardown.md)).

| | Name | Datum |
|---|---|---|
| Person A | | |
| Person B | | |
