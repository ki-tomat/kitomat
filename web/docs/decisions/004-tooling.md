# ADR-004: JavaScript statt TypeScript

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Vite-Templates bieten sowohl JavaScript- als auch TypeScript-Varianten. Das Übergabepaket ist reines JavaScript (JSX via Babel). 7–8 Personen mit unterschiedlichem Erfahrungsstand arbeiten parallel am MVP.

## Decision

Das MVP wird in **JavaScript** umgesetzt. Kein TypeScript. Vite-Template: `react` (nicht `react-ts`).

## Consequences

- Niedrige Einstiegshürde für Teammitglieder ohne TypeScript-Erfahrung.
- Übergabepaket migriert 1:1 ohne Typannotationen — schneller in AP1a, AP3a, AP4–AP6.
- Keine `.d.ts`-Dateien für die Mockdatenstrukturen nötig.
- Verlust statischer Typsicherheit → kompensiert durch klare Mockdaten-Strukturen in `web/src/data/` und Smoke-Tests in AP7.
- TypeScript-Migration als Phase-2-Option möglich (Vite unterstützt `.ts`/`.tsx` ohne Config-Änderung).

## Alternatives considered

- **TypeScript** — höhere Code-Qualität langfristig, aber Vite-Migration ist bereits Refactor-Risiko genug (window.* → ESM). Doppelte Migration im selben Sprint überschreitet realistische Kapazität.
- **JSDoc-Type-Hints** — Kompromiss, aber halb-konsistent in einem 8-Personen-Team kaum durchhaltbar. Verworfen.
