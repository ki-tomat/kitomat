# Architecture Decision Records (ADRs)

Dieser Ordner enthält die in **Phase 0** des KI-tomat-Web-UI-Plans getroffenen Vorab-Entscheidungen. Jeder ADR ist eine kurze, datierte Festlegung mit Begründung und Konsequenzen.

## Format

Jeder ADR folgt dem leichtgewichtigen Schema:

- **Status** — Accepted / Superseded / Deprecated, Datum
- **Context** — Warum diese Entscheidung getroffen werden muss
- **Decision** — Was entschieden wurde
- **Consequences** — Was das für nachfolgende Arbeit bedeutet
- **Alternatives considered** — Was verworfen wurde und warum

## Index

| # | Thema | Entscheidung |
|---|---|---|
| [001](001-repo-lokation.md) | Repo-Lokation | Unterordner `web/` im Repository `pfernando-KI/kitomat` |
| [002](002-sprache.md) | Sprache | Deutsch für UI/Issues/Commits, Englisch für Code-Identifier |
| [003](003-routing.md) | Routing | Hash-Router beibehalten (kein React Router v6 für MVP) |
| [004](004-tooling.md) | Tooling | JavaScript, kein TypeScript für MVP |
| [005](005-fonts.md) | Fonts | Google Fonts CDN für MVP, lokale Einbettung als Phase-2-TODO |
| [006](006-deployment.md) | Deployment | GitHub Pages aus `web/` heraus, CI-Workflow in AP7 |
| [007](007-test-framework.md) | Test-Framework | Vitest, Setup in AP7 |
| [008](008-content-source.md) | Content-Anbindung an Upstream (Phase-3-Vorbereitung) | **Proposed** — drei Varianten dokumentiert, Empfehlung Variante A (Build-Time-Generator). Finale Entscheidung im Phase-3-Kickoff. |

## Neue ADRs

Spätere Entscheidungen folgen dem gleichen Schema, fortlaufend nummeriert ab 009.
