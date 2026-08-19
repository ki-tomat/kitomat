# AP7.5: ADRs und Voraussetzungen vor Phase 3 B+

## Ziel

Vor dem Start von AP8 sicherstellen, dass die Architekturentscheidung fuer Phase 3 B+ im Zielbranch nachvollziehbar dokumentiert ist und die Sites-Voraussetzungen praktisch erfuellt sind. Dieses AP ist ein kurzer Vorab-Check, kein Implementierungs-AP.

## Branch und PR

- Branch: `docs/ap7-5-phase3-bplus-prerequisites`
- Startpunkt: geplanter Integrationsbranch, bevorzugt `develop`; falls `develop` nicht existiert, vom Team bestaetigten Ersatzbranch verwenden
- PR-Ziel: gleicher Integrationsbranch
- Issue-Bezug: <https://github.com/pfernando-KI/kitomat/issues/14>

## Scope

- ADR-008 auf Status `Accepted` mit Entscheidung `Variante B+` pruefen oder aktualisieren.
- ADR-009 zur Trennung Public Content API und Internal Admin Site pruefen oder anlegen.
- Branch-Strategie klaeren: `develop` vorhanden und aktuell, sonst README/APs auf den bestaetigten Integrationsbranch anpassen.
- Sites-Verfuegbarkeit vor AP8 bestaetigen: berechtigter ChatGPT-Business-/Enterprise-Workspace, Sites aktiviert, Deploy-Rechte vorhanden.
- Datenschutz-/Residency-Offenpunkt fuer D1 dokumentieren, bevor interne Teamdaten gespeichert werden.

## Nicht im Scope

- Keine Sites-Projekte anlegen.
- Keine WebUI- oder Worker-Codeaenderungen.
- Keine Content-Repo-Befuellung.
- Keine Entscheidung zu Custom Domain, OAuth, R2 oder automatischen PRs.

## Akzeptanzkriterien

- ADR-008 beschreibt B+ als akzeptierte Phase-3-Entscheidung.
- ADR-009 existiert und trennt Public API und interne Admin Site mit getrennten D1-Datenbanken.
- README benennt Sites-Verfuegbarkeit als Punkt 0 vor AP8.
- Der Integrationsbranch ist bestaetigt und in den AP-Dateien konsistent.
- Falls Sites nicht verfuegbar ist, wird Phase 3 B+ gestoppt und ADR-008 Alternative A/B erneut bewertet.

## Hinweise fuer Codex/Claude Code

- Wenn ADR-008/ADR-009 lokal schon existieren, nicht neu erfinden, sondern gegen den Zielbranch abgleichen.
- Keine vertraulichen Workspace- oder Abo-Details in die Doku schreiben; nur Ergebnis und offene Blocker dokumentieren.

## Lokaler Vorab-Befund Am 2026-06-10

Dieser Abschnitt dokumentiert den Start von AP7.5 im lokalen Arbeitsstand. Er ersetzt nicht den finalen PR gegen den bestaetigten Integrationsbranch.

- Aktueller lokaler Branch: `feature/ap5-contribution-community`.
- Arbeitsbaum ist nicht sauber; es liegen bereits offene Aenderungen und ungetrackte Dateien aus Phase-3-/WebUI-Arbeiten vor. Deshalb wurde nicht automatisch auf einen neuen AP7.5-Branch gewechselt.
- `develop` existiert lokal und remote; `develop` und `origin/develop` zeigen auf denselben Commit.
- `origin/HEAD` zeigt auf `origin/main`.
- `origin/develop` liegt nach lokalem Stand vor `origin/main` und bleibt damit plausibler Integrationsbranch fuer Phase 3. Das Team sollte diese Branch-Strategie vor dem AP7.5-PR bestaetigen.
- Team-Bestaetigung am 2026-06-10: `develop` bleibt der Ziel- und Integrationsbranch fuer Phase 3.
- ADR-008 existiert lokal und steht auf `Accepted (Phase 3 B+)`.
- ADR-009 existiert lokal und dokumentiert die Trennung von Public Content API und interner Admin Site.
- Sites-Werkzeuge sind in dieser Codex-Umgebung sichtbar, inklusive Site-Erstellung, Environment-Verwaltung, Access-Konfiguration und Deployment. Die echte Workspace-Berechtigung ist erst beim ersten Provisioning sicher bestaetigt.

Offen vor Abschluss von AP7.5:

- Sauberen AP7.5-Branch vom bestaetigten Integrationsbranch erstellen, sobald der Arbeitsbaum dafuer geordnet ist.
- Mit Workspace-/Projektverantwortlichen bestaetigen, dass Codex Sites im genutzten ChatGPT-Business-/Enterprise-Workspace aktiviert und deploybar ist.
- Datenschutz-/Residency-Offenpunkt fuer D1 organisatorisch klaeren oder als Blocker fuer produktive Admin-Daten festhalten.

## GitHub-Befund Am 2026-06-14

Dieser Befund wurde gegen `pfernando-KI/kitomat` auf `develop` geprueft.

- `develop` enthaelt bereits AP9-/AP10-/AP11-/AP12-Indikatoren:
  - `sites/content-api/package.json` beschreibt die Content API als AP9.
  - `web/src/data/liveContent.js` beschreibt die WebUI Data Bridge als AP10.
  - `sites/admin/src/worker.js` beschreibt die interne Admin Site als AP11.
  - `web/src/views/Contribution.jsx` enthaelt AP12-Persistenz-/Handoff-Logik.
- `ADR-008` auf `develop` ist noch veraltet:
  - Status `Proposed`.
  - Empfehlung `Variante A`.
  - keine finale B+-Entscheidung.
- `ADR-009` fehlt auf `develop`.
- Beide Sites haben auf `develop` noch keine `project_id` in `.openai/hosting.json`; Sites-Provisioning/Deployment ist damit noch offen.
- AP13 sollte deshalb nicht als Abschluss-AP starten, bevor AP7.5 gemerged ist.

Empfohlener AP7.5-PR-Scope:

- `web/docs/decisions/008-content-source.md`
- `web/docs/decisions/009-public-api-internal-admin.md`
- `web/docs/decisions/README.md`
- `web/docs/phase-3/AP7-5-adr-prerequisites.md`
- optional `web/docs/phase-3/AP7-5-pr-notes.md`

Nicht im AP7.5-PR:

- `sites/**`
- `web/src/**`
- AP8-AP13-Implementierungscode
- Deployment-/Provisioning-Aenderungen
