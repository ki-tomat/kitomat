# ADR-007: Vitest als Test-Framework

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Der ursprüngliche Übergabepaket-Plan ließ ein Test-Framework offen. Für ein 7–8-Personen-Team mit parallelen PRs ist mindestens ein Smoke-Test-Layer sinnvoll, um Regressionen früh zu erkennen. Vite bringt mit Vitest ein eng integriertes Pendant zu Jest mit, das ohne separate Konfiguration läuft.

## Decision

**Vitest** als Test-Framework. Setup in **AP7**, nicht in AP1a. Mindestens ein Smoke-Test pro View, der das Rendering ohne Fehler bestätigt.

## Consequences

- `web/tests/` als Ablage für `.test.jsx`-Dateien neben den jeweiligen Views.
- npm-Skripte: `npm test` (interactive), `npm run test:ci` (one-shot für CI).
- Dependencies in AP7: `vitest`, `@testing-library/react`, `jsdom` (Browser-Umgebung-Mock).
- CI-Workflow (`.github/workflows/deploy-web.yml`) führt `npm run test:ci` vor dem Build aus — Deployment bricht bei rotem Test.
- Tests sind in Phase 2 erweiterbar (Integration-Tests, E2E via Playwright als spätere Option).

## Alternatives considered

- **Jest** — etablierter, aber Konfigurationsaufwand mit Vite höher (esbuild- vs. babel-Transform-Konflikte).
- **Playwright direkt** — E2E ist wertvoller, aber zu schwer für MVP-Phase. Phase-2-Option.
- **Keine Tests** — verworfen, in einem 8-Personen-Team ohne Tests Merge-Konflikte schwerer zu validieren.
