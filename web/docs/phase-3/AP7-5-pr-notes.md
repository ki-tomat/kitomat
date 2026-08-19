# AP7.5 PR-Notizen: ADRs und Voraussetzungen fuer Phase 3 B+

## PR-Titel

AP7.5: ADRs und Voraussetzungen fuer Phase 3 B+

## PR-Beschreibung

Dieser PR bereinigt die Architekturgrundlage fuer Phase 3 B+ vor AP13:

- ADR-008 wird von der alten Variante-A-Empfehlung auf B+ aktualisiert.
- ADR-009 dokumentiert die Trennung von Public Content API und interner Admin Site.
- Der ADR-Index wird um ADR-009 ergaenzt.
- AP7.5 dokumentiert Branch-Strategie, Sites-Voraussetzungen und offene Datenschutz-/Residency-Punkte.

## Warum Jetzt

Auf `develop` sind AP9-/AP10-/AP11-/AP12-Indikatoren bereits vorhanden, aber die ADR-Grundlage ist noch nicht konsistent:

- ADR-008 steht dort noch auf `Proposed` und empfiehlt Variante A.
- ADR-009 fehlt dort.
- AP13 sollte deshalb erst nach diesem Korrektur-PR als Abschluss-/Rollout-AP starten.

## Scope Fuer Den AP7.5-PR

Diese Dateien gehoeren fachlich zu AP7.5:

- `web/docs/decisions/008-content-source.md`
- `web/docs/decisions/009-public-api-internal-admin.md`
- `web/docs/decisions/README.md`
- `web/docs/phase-3/AP7-5-adr-prerequisites.md`
- `web/docs/phase-3/AP7-5-pr-notes.md`

Diese Dateien gehoeren nicht in AP7.5:

- `sites/**`
- `web/src/**`
- AP8-AP13-Implementierungscode
- echte Sites-Provisionierung oder Deployment

## Verifikation

- Doku-/ADR-Review gegen `develop`.
- Keine Codeaenderungen.
- Kein Build erforderlich.

## Bewusst Offen

- Sites-Provisioning bleibt AP13 bzw. einem bewussten Deployment-Schritt vorbehalten.
- Datenschutz-/Residency-Klaerung fuer produktive Admin-Daten bleibt organisatorischer Blocker.
- AP13 startet erst nach Merge dieses PRs.
