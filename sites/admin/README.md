# KI-tomat Internal Admin Worker

Interner Cloudflare Worker fuer Administration. Firebase Authentication stellt den Google-Login bereit; der Worker validiert jedes Firebase-ID-Token selbst und nutzt zusaetzlich ein eigenes D1-gestuetztes Rollenmodell.

## Cloudflare Runtime

- `wrangler.toml` enthaelt Workername, oeffentliche Runtime-Variablen und das D1-Binding.
- `.openai/hosting.json` bleibt waehrend der Abnahme nur als Rollback-Hinweis erhalten.
- D1-Binding: `DB`; Service-Binding `CONTENT_API` fuer den internen Aufruf des Content-Workers.
- R2 wird in Phase 3 nicht genutzt und bleibt `null`.
- Diese Site nutzt eine eigene D1-Datenbank fuer Rollen, Team-Notizen, Checklisten, Artefakt-Status-Overlays und Audit-Log.
- Team-Notizen speichern zur nachvollziehbaren Zuordnung die bestaetigte Admin-E-Mail als `author_key`.
- `ADMIN_EMAILS` wird mit `wrangler secret put ADMIN_EMAILS` gesetzt und nicht eingecheckt.

## Funktionen

- Content API Status
- Artefakt-Inventar
- Sync-/Fehleruebersicht
- Team-Notizen
- Release-Checkliste
- Nutzer- und Rollenverwaltung
- Admin-only Zugriff auf die Admin-Site
- Artefaktstatus-Overlays
- Audit Log fuer Admin-Aktionen

## Rollenmodell

Nur Personen mit Rolle `admin` duerfen die Admin-Site nutzen. Eine Person kann mehrere Rollen besitzen, z. B. `contributor` und `admin`.

Vorbereitete Rollen:

- `admin`: Vollzugriff, Rollenvergabe, Statuspflege.
- `maintainer`: Inhalts- und Release-Verantwortung.
- `reviewer`: Review-Rolle fuer Artefaktpruefungen.
- `contributor`: Beitragsrolle ohne Admin-Zugang.
- `viewer`: Leserolle fuer spaetere interne Uebersichten.

Wichtig fuer externe Personen: Die D1-Rolle allein reicht nicht. Die Person muss sich mit einer von Firebase bestaetigten Google-E-Mail anmelden. Danach entscheidet die feste `ADMIN_EMAILS`-Allowlist zusammen mit dem D1-Rollenmodell, ob die Admin-Seite freigegeben wird.

## Initiale Admins

Initiale Admins werden ueber das Cloudflare-Secret `ADMIN_EMAILS` gesetzt.

Beispiel:

```text
ADMIN_EMAILS=oschwenker@wbsedu.de,patrizia@example.com
```

`patrizia@example.com` ist ein Platzhalter und muss vor Deployment durch die echte Login-E-Mail ersetzt werden.

Ein automatischer First-Admin-Mechanismus ist bewusst nicht vorhanden. Der erste Admin kommt ausschliesslich aus `ADMIN_EMAILS`.

## Runtime Environment

- `CONTENT_API_URL`: URL der Public Content API Site.
- `ADMIN_EMAILS`: komma-separierte Liste initialer Admin-E-Mails.
- `ALLOWED_ORIGIN`: erforderliche, exakte Admin-Worker-Origin fuer POST-Endpunkte.
- `FIREBASE_PROJECT_ID`: unveraenderliche Firebase-Projekt-ID; zugleich `aud` des ID-Tokens.
- `FIREBASE_API_KEY`: oeffentliche Web-App-Konfiguration von Firebase.
- `FIREBASE_AUTH_DOMAIN`: Firebase-Auth-Domain der Web-App.
- `FIREBASE_APP_ID`: oeffentliche Firebase-Web-App-ID.

Die Firebase-Webwerte sind keine Server-Secrets und duerfen in `wrangler.toml` stehen. `ADMIN_EMAILS` bleibt dagegen ein Cloudflare-Secret.

## Build

```bash
npm run build
npm test
npm run deploy:dry-run
```

Das D1-Schema wird einmalig und ausdruecklich remote initialisiert:

```bash
npx wrangler d1 execute kitomat-admin --remote --file db/schema.sql
```
