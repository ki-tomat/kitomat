# AP13 PR-Notizen: Integration, QA und Rollout

## PR-Titel

AP13: Integration, QA und Rollout-Runbook fuer Phase 3 B+

## PR-Beschreibung

Dieser PR ergaenzt die Integrations- und Rollout-Dokumentation fuer Phase 3 B+.

## Inhalt

- dokumentiert den Integrationsstand nach AP7.5 bis AP12 auf `develop`
- bestaetigt ADR-008/ADR-009 als B+-Grundlage
- haelt Sites-Provisioning und Deployment als noch offene Schritte fest
- dokumentiert First-Content-Meilenstein, Rollback-/Resync-Runbook und QA-Erwartungen
- stellt klar, dass AP13 in diesem Stand ein Runbook-/Status-PR ist, kein abgeschlossenes Production-Deployment

## Verifizierter Stand Am 2026-06-14

- ADR-008: Accepted fuer Phase 3 B+
- ADR-009: Public Content API und Internal Admin Site getrennt
- AP9-Indikator: `sites/content-api/package.json`
- AP10-Indikator: `web/src/data/liveContent.js`
- AP11-Indikator: `sites/admin/src/worker.js`
- AP12-Indikator: `web/src/lib/contributionDraft.js`

## Bewusst Offen

- keine `project_id` in `sites/content-api/.openai/hosting.json`
- keine `project_id` in `sites/admin/.openai/hosting.json`
- Sites-Provisioning nicht ausgefuehrt
- saved version / Deployment nicht ausgefuehrt
- Runtime Env nicht produktiv gesetzt
- D1-Migrationen nicht produktiv angewendet
- Admin Access Control nicht produktiv getestet
- First-Content-Meilenstein nicht verifiziert

## Scope Fuer Den AP13-PR

Diese Dateien gehoeren fachlich zu AP13:

- `web/docs/phase-3/AP13-bplus-integration-qa-rollout.md`
- `web/docs/phase-3/AP13-pr-notes.md`

Optional, falls im Zielbranch noch nicht vorhanden:

- `web/docs/phase-3/README.md`

Diese Dateien gehoeren nicht in diesen AP13-Runbook-PR:

- `sites/**`-Implementierungslogik
- `web/src/**`
- Runtime-Secrets
- `.openai/hosting.json` mit echten `project_id`s, solange Provisioning nicht bewusst durchgefuehrt wurde

## Tests

Dieser PR ist Doku/Runbook. Kein Code-Build erforderlich.

Vor dem spaeteren Deployment-PR muessen erneut laufen:

- Content API Build
- Admin Site Build
- WebUI Build
- Smoke-Tests gegen `/api/status`, `/api/content`, `/api/content/:id`
- Admin State/Notes/Checklist Smoke-Test
- Access-Control-Test fuer Admin Site

## Folgepunkt

Nach diesem PR kann ein separater Deployment-Schritt gestartet werden:

1. Content API Site provisionieren.
2. Admin Site provisionieren.
3. Runtime Env setzen.
4. D1 anwenden.
5. Saved versions erstellen.
6. Production deployen.
7. URLs und Testergebnis dokumentieren.
