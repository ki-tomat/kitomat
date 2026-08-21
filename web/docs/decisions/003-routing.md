# ADR-003: Hash-Router beibehalten

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Das Übergabepaket nutzt einen einfachen, useState-basierten Hash-Router (`#/dashboard`, `#/detail/id-xxx`). Bei der Vite-Migration stellte sich die Frage, ob auf React Router v6 (mit BrowserRouter) gewechselt werden soll.

## Decision

Der bestehende Hash-Router wird **unverändert übernommen**. Kein React Router v6 für das MVP.

## Consequences

- Keine Server-Konfiguration nötig — funktioniert auf jedem statischen Hoster, inklusive GitHub Pages (siehe [ADR-006](006-deployment.md)) ohne 404-Rewrites.
- 1:1-Migration aus dem Übergabepaket — geringeres Refactor-Risiko in AP3a.
- URLs enthalten `#` — kosmetisch unschön, aber funktional gleichwertig.
- Tiefe Links (`#/detail/id-xxx`) funktionieren ohne Server-Config.

## Alternatives considered

- **React Router v6 mit BrowserRouter** — saubere URLs, aber benötigt Server-seitige Rewrites oder hash-Fallback bei statischem Hosting. Migrations-Aufwand in AP3a deutlich höher. Phase-2-Option, falls schöne URLs später gefordert.
- **TanStack Router** — Overkill für 10 Views ohne Datenladen pro Route.
