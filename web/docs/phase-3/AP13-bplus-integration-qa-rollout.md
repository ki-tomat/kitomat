# AP13: Integration, ADRs, QA und Rollout

## Ziel

Phase 3 B+ zusammenfuehren, dokumentieren und deployfaehig machen. AP13 ist der Integrations-PR nach AP8-AP12.

## Branch und PR

- Branch: `chore/ap13-bplus-integration-qa`
- Startpunkt: bestaetigter Integrationsbranch aus AP7.5 nach AP8-AP12
- PR-Ziel: bestaetigter Integrationsbranch aus AP7.5
- Issue-Bezug: <https://github.com/pfernando-KI/kitomat/issues/14>

## Abhaengigkeiten

- AP8 Sites Foundation
- AP9 Content API
- AP10 WebUI Data Bridge
- AP11 Internal Admin Site
- AP12 Contribution Persistence + Handoff

## Scope

- ADR-008 und ADR-009 nur auf Konsistenz pruefen; fachliche ADR-Pflege liegt in AP7.5.
- `web/README.md` und Phase-3-Dokumente aktualisieren.
- Sites Content API als Version speichern, reviewen und danach deployen oder Deployment-Blocker dokumentieren.
- Admin Site als Version speichern, reviewen und danach deployen oder Deployment-Blocker dokumentieren.
- WebUI gegen Content API testen.
- First-Content-Meilenstein pruefen oder als offene organisatorische Abhaengigkeit dokumentieren.
- Rollback-/Resync-Runbook dokumentieren.
- Known Issues und Folge-APs dokumentieren.

## Nicht im Scope

- Keine neuen Features.
- Kein OAuth nachziehen.
- Kein R2-Upload nachziehen.
- Keine automatische PR-Erzeugung.
- Keine Migration der oeffentlichen WebUI weg von GitHub Pages, solange nicht separat entschieden.

## Betroffene Dateien

- `web/docs/decisions/008-content-source.md`
- `web/docs/decisions/009-public-api-internal-admin.md`
- `web/docs/decisions/README.md`
- `web/docs/phase-3/**`
- `web/README.md`
- Optional Deployment-/Env-Doku fuer `sites/**`

## Rollout-Schritte

0. Sites-Verfuegbarkeit bestaetigen: ChatGPT-Business-/Enterprise-Workspace, Sites aktiviert, passende Deploy-Rechte vorhanden. Wenn nicht, B+ stoppen und ADR-008 Alternative A/B neu bewerten.
1. AP7.5 bis AP12 in den bestaetigten Integrationsbranch mergen.
2. Content-Repo-Stand pruefen: Gibt es mindestens ein freigegebenes Nicht-Template-Artefakt? Falls nein, First-Content-Meilenstein als offen markieren.
3. Content API Site in Sites provisionieren oder vorhandenes `project_id` wiederverwenden.
4. Build-Kompatibilitaet pruefen: Worker-kompatible ES-Module, `dist/server/index.js`, `.openai/hosting.json`.
5. Runtime Env setzen:
   - `ALLOWED_ORIGINS`
   - optional `GITHUB_TOKEN` als Secret
   - `CACHE_TTL_SECONDS`
6. D1-Bindings und additive Schema/Migrationen fuer Content API pruefen bzw. anwenden.
7. Content API als saved version an den Git-Commit binden und vor Deployment reviewen.
8. Content API deployen, `/api/status`, `/api/content` und `/api/content/:id` pruefen.
9. Admin Site provisionieren oder vorhandenes `project_id` wiederverwenden.
10. Admin Runtime Env `CONTENT_API_URL` setzen.
11. Admin-D1-Bindings und additive Schema/Migrationen pruefen bzw. anwenden.
12. Admin Site workspace-internen Zugriff setzen (`workspace_all` oder spaeter `custom`).
13. Admin Site als saved version an den Git-Commit binden und vor Deployment reviewen.
14. Admin Site deployen und Status/Inventar pruefen.
15. Admin Access Control pruefen und im PR dokumentieren: Admin Site darf nicht oeffentlich erreichbar sein.
16. WebUI Env `VITE_KITOMAT_CONTENT_API_URL` fuer GitHub-Pages-Build setzen.
17. WebUI Build/Pages pruefen.
18. Phase-3-Abschluss im Issue dokumentieren.

## First-Content-Meilenstein

Der Live-Pfad gilt erst als fachlich verifiziert, wenn mindestens ein freigegebenes Nicht-Template-Artefakt im Content-Repo liegt und ueber `/api/content` sowie die WebUI sichtbar ist. Bis dahin ist eine leere API-Liste mit Mockdaten-Fallback technisch akzeptabel, aber nicht der finale Live-Content-Nachweis.

Falls noch keine echten Artefakte freigegeben sind, AP13 mit einem klar gekennzeichneten Beispiel-Artefakt oder Test-Fixture gegen das Content-Schema pruefen und den echten First-Content-Test als Folgeaufgabe dokumentieren.

## Rollback und Resync

- Wenn die Content API in Production fehlschlaegt, bleibt die WebUI ueber Browser Cache oder Mockdaten nutzbar.
- Letzte funktionierende Sites-Version als Rollback-Kandidat notieren.
- `/api/status` und `sync_runs` pruefen, um GitHub-, Cache- oder Mapping-Fehler zu unterscheiden.
- Manuelles Resync/Cache-Refresh als Runbook-Schritt dokumentieren, falls implementiert; sonst Folge-Issue anlegen.
- Admin Site bei API-Ausfall mit Statushinweis weiter anzeigen, keine internen Daten loeschen.

## Akzeptanzkriterien

- Beide Sites-Artefakte sind buildbar.
- Content API liefert `/api/content` und `/api/status`.
- Admin Site zeigt Status und Inventar.
- WebUI nutzt API-Daten oder Fallback.
- Live-Daten sichtbar gilt erst als erfuellt, wenn der First-Content-Meilenstein erfuellt ist.
- Contribution-Handoff schreibt nicht automatisch.
- ADRs und README sind konsistent.
- Phase-3-Issues #13 und #14 enthalten Abschlusskommentar mit URLs, Teststand und bekannten Grenzen.
- D1-Bindings und Tabellen/Migrationen sind fuer beide Sites vorhanden.
- Admin Site ist nachweislich workspace-intern geschuetzt.
- Save-vs-Deploy-Ablauf ist dokumentiert: saved version, Review, Deployment.
- Rollback-/Resync-Runbook ist dokumentiert.

## Tests

- `node --check` fuer Worker und Build-Skripte.
- Sites Builds mit `SITES_DIST_DIR`, falls `dist/` lokal blockiert.
- `cd web && npm run build`, sofern lokaler `esbuild` nicht durch EPERM blockiert.
- Manuelle Browser-QA: Library, Detail, Dashboard, Contribution.
- CORS-Test von lokaler WebUI gegen Content API.
- Access-Control-Test: Admin Site ohne Workspace-Zugriff darf nicht oeffentlich erreichbar sein.
- Smoke-Test pro Endpoint: `/api/status`, `/api/content`, `/api/content/:id`, Admin State, Admin Notes, Admin Checklist.
- Mapping-Test gegen Beispiel-Artefakt: `artifact_type: model` wird `type: "industry"`, Pflichtfelder und DSGVO-/Hinweisfelder sind vorhanden.
- Cache-/TTL-Test: `ETag`, `If-None-Match`, Stale-on-Error.

## Hinweise fuer Codex/Claude Code

- AP13 darf kleine Integrationsfixes machen, aber keine neuen grossen Funktionen.
- Lokale OneDrive-/Windows-EPERM-Probleme als Umgebung blocker dokumentieren, nicht durch unsichere Workarounds kaschieren.
- Nach erfolgreichem Deployment Produktions-URLs und gesetzte Env-Keys im PR dokumentieren, aber keine Secret-Werte.

## Integrationsbefund Am 2026-06-14

Geprueft gegen `pfernando-KI/kitomat` auf `develop`.

Erfuellt:

- ADR-008 ist auf `Accepted (Phase 3 B+)` gesetzt.
- ADR-009 existiert und dokumentiert die Trennung von Public Content API und interner Admin Site.
- AP9-Indikator vorhanden: `sites/content-api/package.json` beschreibt die Content API als AP9 und enthaelt `js-yaml`.
- AP10-Indikator vorhanden: `web/src/data/liveContent.js` beschreibt die WebUI Data Bridge mit Fallback API -> Browser Cache -> Mockdaten.
- AP11-Indikator vorhanden: `sites/admin/src/worker.js` beschreibt die interne Admin Site, Workspace-Header-Pruefung, Origin-Check und Admin-Endpoints.
- AP12-Indikator vorhanden: `web/src/lib/contributionDraft.js` beschreibt Opt-in-`sessionStorage` und GitHub-Handoff.

Offen oder blockiert:

- `sites/content-api/.openai/hosting.json` enthaelt noch kein `project_id`.
- `sites/admin/.openai/hosting.json` enthaelt noch kein `project_id`.
- Sites-Provisioning, saved version und Production-Deployment wurden noch nicht nachgewiesen.
- Runtime-Environment-Werte (`ALLOWED_ORIGINS`, optional `GITHUB_TOKEN`, `CACHE_TTL_SECONDS`, `CONTENT_API_URL`) wurden noch nicht auf Sites gesetzt.
- D1-Bindings/Migrationen wurden noch nicht produktiv angewendet.
- Admin Access Control wurde noch nicht produktiv getestet.
- First-Content-Meilenstein ist nicht verifiziert. Die lokale Abfrage des Content-Repos war blockiert; AP13 darf nicht behaupten, dass echte Nicht-Template-Artefakte live sichtbar sind, bevor dies separat geprueft wurde.

AP13-Ergebnis fuer diesen Stand:

- AP13 kann als Integrations- und Rollout-Runbook-PR vorbereitet werden.
- AP13 kann noch nicht als vollstaendig abgeschlossenes Deployment markiert werden.
- Nach Merge dieses AP13-Runbooks bleibt ein bewusster Folgepunkt: Sites-Provisioning und Deployment mit dokumentierten URLs.
