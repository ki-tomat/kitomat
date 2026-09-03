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

- [x] **[belegt]** Pages-URL laedt ohne Asset-404 (Base-Path `/kitomat/web/`, HTTP 200).
  - _So testen (🍎 Mac · Person A):_ In Chrome/Safari `https://ki-tomat.github.io/kitomat/web/` oeffnen — Seite und Kacheln laden, keine kaputten Bilder. Optional Rechtsklick → „Untersuchen" → Reiter „Console": keine roten 404-Fehler zu `/kitomat/web/assets/`.
  - _Nachweis (03.09.2026, Person A):_ Auf macOS (Chrome) geprueft — Seite und Assets luden mit HTTP 200, keine 404 in der Console.
- [x] **[belegt]** Bibliothek zeigt Live-Daten, Datenquellen-Badge „Live". Zeigt es „Cache", hart neu laden oder anderes Geraet.
  - _So testen (🪟 Windows · Person B):_ In Edge/Chrome die WebUI → „Bibliothek". Badge oben rechts muss „Live" zeigen. Steht dort „Cache": `Strg`+`Umschalt`+`R` (hart neu laden) oder ein privates Fenster (`Strg`+`Umschalt`+`N`).
  - _Nachweis (03.09.2026, Person A):_ Auf macOS geprueft — Badge zeigte nach Cache-Refresh „Live".
- [x] **[belegt]** Netzwerk-Tab (DevTools): Request geht an `…workers.dev/api/content` (Status live), **nicht** an `api.github.com`.
  - _So testen (🪟 Windows · Person B):_ `F12` → Reiter „Netzwerk" → „Cache deaktivieren" anhaken → Seite neu laden → im Filter `content` eintippen. Es muss ein Request an `kitomat-content-api.ki-tomat.workers.dev/api/content` (Status 200) erscheinen, **nicht** an `api.github.com`.
  - _Nachweis (03.09.2026, Person A):_ Auf macOS (DevTools → Netzwerk) geprueft — Request ging an `kitomat-content-api.ki-tomat.workers.dev/api/content` (200), nicht an `api.github.com`.
- [x] **[belegt]** Detailseite eines echten Artefakts inkl. README-Inhalt.
  - _So testen (🪟 Windows · Person B):_ In der Bibliothek ein Artefakt anklicken (z. B. „Perspektive wechseln"). Die Detailseite zeigt den README-Text.
  - _Nachweis (03.09.2026, Person A):_ Auf macOS geprueft — Detailseite eines echten Artefakts mit README-Inhalt.
- [x] **[belegt]** Dashboard-Zaehler stimmen, keine Leerlisten-Crashes.
  - _So testen (🪟 Windows · Person B):_ „Dashboard" oeffnen — die Zaehlerkacheln zeigen plausible Zahlen (> 0), keine Fehlermeldung/leere Liste.
  - _Nachweis (03.09.2026, Person A):_ Auf macOS geprueft — Dashboard-Zaehler plausibel (> 0), keine Leerlisten-Crashes.
- [x] **[belegt]** Light/Dark sowie 375 px (mobil) und 1280 px (Desktop).
  - _So testen (🪟 Windows · Person B):_ Theme-Umschalter (Sonne/Mond) testen. Fenster schmal (~375 px) und breit (~1280 px) ziehen — Layout bleibt intakt. In Edge: `F12` → Geraetesymbol (Umschalt fuer Mobilansicht).
  - _Nachweis (03.09.2026, Person A):_ Auf macOS geprueft — Light/Dark und Breiten 375 px / 1280 px in Ordnung.
- [x] **[belegt]** `npm run test:ci` (38/38 lokal) und CI-Check `validate` gruen.
  - _So testen (🍎 Mac · Person A):_ Einfachster Weg — PR #34 auf GitHub oeffnen, unten muessen die Checks `validate` und `build` gruen sein. Alternativ im Terminal: `cd web && npm ci && npm run test:ci` (erwartet 38/38 gruen).
  - _Nachweis (03.09.2026, Person A):_ Auf macOS geprueft — CI-Checks `validate` + `build` grün auf den PRs.

## B. Content-API (Cloudflare, Person B)

- [ ] **[belegt]** `GET /api/status` → JSON.
  - _So testen (🪟 Windows · Person B):_ Im Browser `https://kitomat-content-api.ki-tomat.workers.dev/api/status` oeffnen → JSON. Oder Codex/PowerShell: `curl.exe -sS https://kitomat-content-api.ki-tomat.workers.dev/api/status`.
- [ ] **[belegt]** `GET /api/content` → echte Artefakte, kein `_template`.
  - _So testen (🪟 Windows · Person B):_ `https://kitomat-content-api.ki-tomat.workers.dev/api/content` oeffnen → Liste echter Artefakte, `status: live`, keine `_template`-Eintraege.
- [ ] **[belegt]** `GET /api/content/<id>` → Artefakt inkl. `readme`.
  - _So testen (🪟 Windows · Person B):_ Eine echte ID aus `/api/content` nehmen und `…/api/content/<id>` oeffnen → Feld `readme` ist vorhanden.
  - _Nachweis (02.09.2026, Person B):_ `GET /api/content/ki-stakeholder-persona-framework` → HTTP 200; Artefakt „Perspektive wechseln“ geladen; Feld `readme` vorhanden und mit 2.550 Zeichen befüllt.
  - _Hinweis:_ Die Antwort meldete `status: cache`. Der Detail-Endpunkt funktioniert; der Status sollte beim vorherigen `/api/content`-Prüfpunkt separat beobachtet werden.
- [ ] **[belegt]** `If-None-Match` → 304; GitHub-Fehler simulieren → `stale`.
  - _So testen (🪟 Windows · Person B, Codex/PowerShell):_ ETag holen: `curl.exe -sS -D - https://kitomat-content-api.ki-tomat.workers.dev/api/content -o NUL` → Zeile `etag:`. Dann erneut mit `curl.exe -sS -D - -H "If-None-Match: <etag>" https://kitomat-content-api.ki-tomat.workers.dev/api/content -o NUL` → `HTTP/2 304`. GitHub-Ausfall simulieren → Status `stale`.
  -  _Nachweis (03.09.2026, Person B):_ ETag
  `"f45e2f75ebd4417bfa5483872f84fb2fa42683c4e66e9aecfda7587401944934"`
  abgerufen und anschließend mit `If-None-Match` gesendet.
  Ergebnis: `HTTP/1.1 304 Not Modified`.
- [ ] **[belegt]** Remote-D1 zeigt erwartete Tabellen: `wrangler d1 execute <db> --remote --command "SELECT name FROM sqlite_schema WHERE type='table'"` (beide DBs).
  - _So testen (🪟 Windows · Person B, Codex):_ Im Ordner `sites/content-api` bzw. `sites/admin`: `npx wrangler d1 execute <db> --remote --command "SELECT name FROM sqlite_schema WHERE type='table'"` → erwartete Tabellen erscheinen.
  - _Nachweis (03.09.2026, Person B):_ Remote-D1-Schema beider Datenbanken
  mit Wrangler 4.128.0 geprüft. `kitomat-content-api` enthält `content_cache`
  und `sync_runs`. `kitomat-admin` enthält `team_notes`, `checklist_items`,
  `admin_users`, `admin_user_roles`, `artifact_status_overrides` und
  `audit_log`. Beide Abfragen erfolgreich; keine Schreibvorgänge.
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
- [ ] **[belegt]** Eingeloggt (`ADMIN_EMAILS`): State/Notes/Checklist funktionieren; XSS-Escape greift (`<script>` in Notiz wird escaped).
  - _So testen (🪟 Windows · Person B):_ Mit einer `ADMIN_EMAILS`-Adresse via Google einloggen (`https://kitomat-admin.ki-tomat.workers.dev`). State/Notizen/Checkliste sind bedienbar. XSS-Test: Notiz mit Text `<script>alert(1)</script>` anlegen → wird als Text angezeigt, kein Popup.
- [ ] **[belegt]** Erster Admin-POST gelingt eingeloggt → `ALLOWED_ORIGIN` korrekt (same-origin, kein 403).
  - _So testen (🪟 Windows · Person B):_ Nach dem Login eine Notiz anlegen → wird gespeichert (kein 403). Bestaetigt, dass `ALLOWED_ORIGIN` korrekt gesetzt ist.
  - _Nachweis (03.09.2026, Person B):_ Eingeloggt eine Testnotiz angelegt.
    Die Notiz wurde ohne 403 gespeichert und anschließend mit Benutzer und
    Zeitstempel im Bereich „Team-Notizen“ angezeigt. 

## D. Rollback & Betrieb (gemeinsam)

- [ ] **[belegt]** WebUI-Rollback bekannt: Repo-Variablen leeren → Fallback-Modus, Pages-Rebuild.
  - _So testen (🪟 Windows · Person B — nur Kenntnis, nicht ausfuehren):_ GitHub → `ki-tomat/kitomat` → Settings → Secrets and variables → Actions → Variables: die `KITOMAT_*`-Variablen leeren und den Deploy-Workflow neu starten → WebUI faellt auf Fallback-Modus.
  - _Nachweis (03.09.2026, Person B):_ Rollback-Ablauf anhand von Runbook,
    Pages-Workflow und WebUI-Fallback-Code geprüft. Lokaler Fallback-Test
    erfolgreich (8/8). Produktive Variablen wurden gemäß Testanweisung nicht
    verändert und kein Pages-Rebuild ausgelöst.
- [ ] **[Person B]** Sites-Rollback bekannt: `wrangler rollback`; alte pfernando-Deployments bleiben bis zur Abnahme als Fallback.
  - _So testen (🪟 Windows · Person B — nur Kenntnis):_ `npx wrangler rollback` je Worker bekannt; die alten pfernando-Deployments bleiben bis zur Abnahme unangetastet als Fallback.
  - _Nachweis (03.09.2026, Person B):_ Rollback-Syntax geprüft und vorhandene
  Versionen beider Cloudflare-Worker read-only aufgelistet. Für Content-API
  und Admin sind mehrere rückrollbare Versionen vorhanden. Kein Rollback
  ausgeführt; D1 bleibt bei einem Worker-Rollback bestehen. Die alten
  pfernando-Sites sind weiterhin aktiv und wurden nicht verändert.
- _Finding:_ Der Zugriff auf die alten Sites ist derzeit eingeschränkt.
  Die alte Content-API ist daher kein unmittelbar öffentlicher
  Drop-in-Fallback für die WebUI.
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
| Person A | @pfernando-KI | 2026-09-03 |
| Person B | | |
