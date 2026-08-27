# Cloudflare Cutover Runbook

Dieses Runbook fuehrt Workstream B ohne Custom Domain durch. Die WebUI bleibt auf GitHub Pages. Geheimnisse, Login-Codes und Zahlungsdaten gehoeren weder in dieses Dokument noch in Git.

## 1. Konto und Namenswerte

1. Cloudflare-Konto mit 2FA und Workers-Free-Plan verwenden; kein Zero-Trust-Checkout und keine Zahlungsdaten erforderlich.
2. Die tatsaechliche `workers.dev`-Subdomain festhalten.
3. Firebase-Projekt `KI-tomat` im Spark-Tarif ohne Zahlungsmethode anlegen; Google Analytics deaktiviert lassen.
4. Firebase-Web-App `KI-tomat Admin` registrieren und Google als Sign-in-Provider aktivieren.
5. `ki-tomat.github.io` und die tatsaechliche Admin-Worker-Domain als autorisierte Firebase-Auth-Domains eintragen.
6. Im von Firebase angelegten Google-OAuth-Webclient die Admin-Worker-Redirect-URI `https://<admin-worker>.<subdomain>.workers.dev/__/auth/handler` ergaenzen.
7. Die initialen Admin-E-Mail-Adressen fuer `ADMIN_EMAILS` festlegen.
8. `npx wrangler login` und `npx wrangler whoami` ausfuehren.

## 2. EU-D1 anlegen

In `sites/content-api`:

```bash
npx wrangler d1 create kitomat-content-api --jurisdiction eu
npx wrangler d1 execute kitomat-content-api --remote --file db/schema.sql
npx wrangler d1 execute kitomat-content-api --remote --command "SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name"
```

In `sites/admin`:

```bash
npx wrangler d1 create kitomat-admin --jurisdiction eu
npx wrangler d1 execute kitomat-admin --remote --file db/schema.sql
npx wrangler d1 execute kitomat-admin --remote --command "SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name"
```

Die ausgegebenen Datenbank-IDs ersetzen die Platzhalter in den beiden `wrangler.toml`-Dateien.

## 3. Worker und Firebase Auth bootstrappen

1. Content-API-Konfiguration mit der tatsaechlichen `workers.dev`-Subdomain vervollstaendigen und deployen.
2. Firebase-Projekt-ID, API-Key, Auth-Domain und Web-App-ID in `sites/admin/wrangler.toml` eintragen. Als `FIREBASE_AUTH_DOMAIN` wird die Admin-Worker-Domain verwendet.
3. Der Admin-Worker proxyt `/__/auth/*` zur Firebase-Hosting-Domain, damit Redirect-Login auch bei blockiertem Drittanbieter-Speicher funktioniert.
4. Der Admin-Worker muss Firebase-Signatur, `iss`, `aud`, `exp`, `iat`, `auth_time`, `sub` und bestaetigte E-Mail pruefen, bevor D1 angesprochen wird.
5. Initiale Admins setzen und deployen:

```bash
npx wrangler secret put ADMIN_EMAILS
npm run deploy
```

## 4. Smoke-Tests und Pages-Cutover

1. `/api/status`, `/api/content`, eine Detailroute, ETag/304 und CORS testen.
2. Die Content-Anzahl mit den aktuellen Nicht-Template-`metadata.yml` im Repository vergleichen; nicht dauerhaft auf eine Zahl festschreiben.
3. Admin-APIs ohne Firebase-ID-Token sowie mit gefaelschten Legacy-Headern abweisen.
4. Per Google/Firebase einloggen; State, Notiz Anlegen/Loeschen, Rollen, Checkliste und Audit testen.
5. GitHub-Variable `KITOMAT_CONTENT_API_URL` setzen, Pages deployen und im Netzwerk-Tab den Worker-Request bestaetigen.
6. Erst danach `KITOMAT_ADMIN_SITE_URL` setzen und Pages erneut deployen.

## 5. Rollback und Abschluss

- Bei Problemen die betroffene GitHub-Variable leeren und Pages neu deployen.
- Alte Codex-Sites sieben stabile Tage als Fallback erhalten.
- Erst danach alte Deployments und `.openai/hosting.json` in einem separaten, menschlich freigegebenen Schritt entfernen.
