# KI-tomat Internal Admin Site

Workspace-interne Admin-Grundlage fuer Phase 3 B+. AP8 legt nur das Sites-Projekt, Build-Artefakt und D1-Schema an. Die eigentlichen Admin-Views und Schreibfluesse folgen in AP11.

## Sites Foundation

- `.openai/hosting.json` enthaelt die logischen Bindings fuer Sites. `project_id` wird erst nach der Provisionierung durch Sites gesetzt.
- D1-Binding: `DB`.
- R2 wird in Phase 3 nicht genutzt und bleibt `null`.
- Diese Site nutzt eine eigene D1-Datenbank nur fuer `team_notes` und `checklist_items`.
- Team-Notizen speichern kein E-Mail-Feld, sondern nur ein pseudonymes `author_key`.
- Echte Secrets werden in Sites Runtime Environment gesetzt, nicht im Repo.

## Funktionen

- Content API Status
- Artefakt-Inventar
- Sync-/Fehleruebersicht
- Team-Notizen
- Release-Checkliste

In AP8 ist nur eine Foundation-Seite mit `/api/admin/state` enthalten.

## Runtime Environment

- `CONTENT_API_URL`: URL der Public Content API Site.

## Build

```bash
npm run build
```
