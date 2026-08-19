# ADR-006: GitHub Pages aus `web/` heraus

**Status:** Accepted (Phase 0, aktualisiert 2026-06-03)

## Context

Das MVP muss f?r die KItomat-Planungsgruppe und Reviewer online erreichbar sein. Die Web UI ist eine statische React/Vite-App mit Hash-Routing und ben?tigt keine Server-Side-Rendering- oder API-Routes.

## Decision

Deployment via **GitHub Pages** aus dem Unterordner `web/` heraus. Der CI-Workflow `.github/workflows/deploy-web.yml` ist Aufgabe von AP7. F?r den geplanten Pages-Pfad `https://pfernando-KI.github.io/kitomat/web/` soll der Workflow `VITE_BASE_PATH=/kitomat/web/` setzen. Lokal und in Forks bleibt `base: './'` als Fallback robust.

## Consequences

- Kein zus?tzliches Hosting-Konto.
- AP7 muss den finalen Pages-Pfad im Workflow setzen und mit `npm run preview` pr?fen.
- Build-Output aus `web/dist` wird als GitHub-Pages-Artifact deployed.
- Repo-Settings ? Pages ? Source = GitHub Actions muss durch einen Maintainer aktiviert werden.

## Alternatives considered

- **Netlify / Vercel** ? Preview-URLs pro PR, aber zus?tzlicher Account-Aufwand.
- **gh-pages Branch** ? m?glich, aber GitHub-Actions-Artifact ist f?r AP7 sauberer.
- **`base: './'` dauerhaft** ? robust f?r Hash-Routing, aber der Pages-Workflow soll den realen Zielpfad explizit testen.
