# AGENTS.md — KI-Coding-Regeln für `web/`

Diese Datei gilt für **alle Beiträge im `web/`-Unterordner** (KI-tomat Weboberfläche). Für Content-Beiträge im Hauptordner siehe die [Wurzel-AGENTS.md](../AGENTS.md).

## Pflichtlektüre vor dem ersten PR

1. [`web/README.md`](README.md) — Installation, npm-Workflow, Projektübersicht
2. Diese Datei — Scope-, Design-, Daten- und PR-Regeln
3. [`web/docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — verbindliche UI-Regeln, alle Tokens
4. [`web/docs/decisions/`](docs/decisions/) — Architekturentscheidungen (ADRs) der Phase 0

## Scope-Regeln

- Ändere nur Dateien, die zum zugewiesenen Issue gehören.
- Keine Refactorings außerhalb des Issue-Scopes — wenn etwas auffällt, neues Issue öffnen.
- Keine neuen npm-Pakete ohne Diskussion im Issue-Kommentar.
- `web/design/kitomat-remix-1/` ist **READ-ONLY** — Quellarchiv des Übergabepakets.
- Keine Änderungen am Wurzel-`README.md`, Wurzel-`AGENTS.md` oder anderen Top-Level-Dateien des Hauptrepos.

## Designsystem-Regeln

- Verwende CSS-Variablen (`var(--tomato)`, nicht `#E63329`).
- Nutze vorhandene Komponenten aus `web/src/components/` statt Neuerstellung.
- Neue Komponenten müssen Token aus `web/src/styles/global.css` verwenden.
- Kein Inline-Style außer für dynamisch berechnete Werte (z. B. eine User-spezifische Avatar-Farbe).
- Light + Dark + Mobile (375px) + Desktop (1280px) testen, bevor du den PR öffnest.

## Daten-Regeln

- `web/src/data/` enthält nur **Mockdaten** — keine produktive API-Logik, kein Fetch.
- Datenstrukturen aus `web/src/data/` nicht ohne Issue-Diskussion ändern.
- Neue Felder in Mockdaten mit `// TODO(api): …`-Kommentar markieren.
- Keine personenbezogenen Daten, keine echten Kundendaten, keine internen Dokumente.

## Commit- und Branch-Regeln

- Branch von `develop` abzweigen: `feature/<ap-nr>-<kurzname>` (z. B. `feature/ap4-library-detail`).
- PR gegen `develop`, nie gegen `main`.
- Kleine, reviewbare Commits bevorzugen.
- Commit-Messages: Scope englisch, Beschreibung deutsch (siehe [ADR-002](docs/decisions/002-sprache.md)). Beispiel: `feat(library): Filter nach Risiko hinzugefügt`.
- Annahmen als Kommentar im Code oder im PR-Body dokumentieren.

## UI-Änderungen

- Screenshot vor + nach der Änderung im PR anhängen.
- Light-Mode UND Dark-Mode getestet.
- Responsive bei 375px (Mobile) und 1280px (Desktop) getestet.
- `npm run build` lokal grün, bevor du pushst.

## Was nicht zu tun ist

- **Kein direkter Push** auf `main` oder `develop`.
- Keine neuen Farben außerhalb des Designsystems.
- Keine produktive Auth-Logik (Login ist Demo/Mockup bis Phase 3 — siehe Plan).
- Keine Änderung an `web/design/` (Read-Only-Archiv).
- Kein TypeScript (siehe [ADR-004](docs/decisions/004-tooling.md)).
- Kein React-Router-Wechsel (siehe [ADR-003](docs/decisions/003-routing.md)).

## Definition of Done (vor PR-Merge)

1. Alle Aufgaben im Issue-Checklist abgehakt
2. `npm run dev` lokal lauffähig
3. `npm run build` ohne Fehler
4. Light-Mode + Dark-Mode visuell geprüft
5. Responsive bei 375px + 1280px geprüft
6. Designsystem eingehalten (CSS-Variablen, vorhandene Komponenten)
7. Screenshot Before/After im PR
8. Keine unbeabsichtigten Seiteneffekte in anderen Views
9. PR-Beschreibung vollständig (Was/Warum/Testschritte)
10. Mindestens 1 Approval (oder Self-Merge bei privater Fork-Entwicklung)
