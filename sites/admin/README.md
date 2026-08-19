# KI-tomat Internal Admin Site

Workspace-interne Admin-Grundlage fuer Phase 3 B+. Die Site nutzt Sites-Login als aeussere Zugangsschicht und ein eigenes D1-gestuetztes Rollenmodell fuer echte Admin-Rechte.

## Sites Foundation

- `.openai/hosting.json` enthaelt die logischen Bindings fuer Sites. `project_id` wird erst nach der Provisionierung durch Sites gesetzt.
- D1-Binding: `DB`.
- R2 wird in Phase 3 nicht genutzt und bleibt `null`.
- Diese Site nutzt eine eigene D1-Datenbank fuer Rollen, Team-Notizen, Checklisten, Artefakt-Status-Overlays und Audit-Log.
- Team-Notizen speichern kein Klartext-Autorenprofil, sondern nur einen kurzen `author_key`.
- Echte Secrets werden in Sites Runtime Environment gesetzt, nicht im Repo.

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

Wichtig fuer externe Personen: Die D1-Rolle allein reicht nicht. Die Person muss zusaetzlich ueber Sites/Workspace-Zugriff auf diese Admin-Site zugelassen werden. Danach entscheidet das D1-Rollenmodell, ob die Admin-Seite freigegeben wird.

## Initiale Admins

Initiale Admins werden ueber die Sites Runtime Environment Variable `ADMIN_EMAILS` gesetzt.

Beispiel:

```text
ADMIN_EMAILS=oschwenker@wbsedu.de,patrizia@example.com
```

`patrizia@example.com` ist ein Platzhalter und muss vor Deployment durch die echte Login-E-Mail ersetzt werden.

Optionaler Notfall-Mechanismus:

```text
ALLOW_FIRST_ADMIN_BOOTSTRAP=true
```

Damit wird die erste authentifizierte Person Admin, falls noch keine Admin-Rolle existiert. Fuer produktive Nutzung sollte das nach dem Bootstrap wieder auf `false` stehen.

## Runtime Environment

- `CONTENT_API_URL`: URL der Public Content API Site.
- `ADMIN_EMAILS`: komma-separierte Liste initialer Admin-E-Mails.
- `ALLOWED_ORIGIN`: optionaler Origin-Schutz fuer POST-Endpunkte.
- `ALLOW_FIRST_ADMIN_BOOTSTRAP`: optionaler Erstadmin-Bootstrap, default `false`.

## Build

```bash
npm run build
```
