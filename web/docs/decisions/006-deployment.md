# ADR-006: GitHub Pages aus `web/` heraus

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Das MVP muss für die KItomat-Planungsgruppe und Reviewer online erreichbar sein. Mögliche Hosts: GitHub Pages, Netlify, Vercel. Da das Repo bereits auf GitHub liegt und keine Server-Side-Rendering oder API-Routes nötig sind (siehe [ADR-003](003-routing.md)), ist GitHub Pages der pragmatischste Weg.

## Decision

Deployment via **GitHub Pages** aus dem Unterordner `web/` heraus. CI-Workflow in `.github/workflows/deploy-web.yml`, Aufgabe von AP7. Vite-Konfiguration: `base: '/kitomat-github-work/web/'`.

## Consequences

- Kein zusätzliches Hosting-Konto, kein externer Vendor.
- `base`-Pfad muss zwingend gesetzt sein, sonst brechen Asset-Pfade (CSS, Logos).
- Lokale Vorschau via `npm run preview` testet den Base-Pfad mit; Sanity-Check in AP7.
- Build-Output landet auf `gh-pages`-Branch oder Pages-Artifact (Workflow-Variante in AP7 entscheiden).
- Phase-Vorbedingung: Repository-Settings → Pages → Source = `gh-pages` (oder GitHub Actions Artifact) muss von einem Maintainer aktiviert werden, bevor AP7 deployt.

## Alternatives considered

- **Netlify / Vercel** — schöne Preview-URLs pro PR, aber zusätzlicher Account-Overhead und SSO-Konfiguration. Phase-2-Option.
- **Eigenes Hosting (Hetzner, Uberspace)** — Overkill für statisches MVP.
- **Deployment erst in Phase 2** — verworfen, MVP-Demo braucht öffentlich erreichbare URL für Stakeholder-Reviews.
