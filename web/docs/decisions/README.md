# Architecture Decision Records (ADRs)

Dieser Ordner enthaelt die Architekturentscheidungen der KI-tomat WebUI. Jeder ADR ist eine kurze, datierte Festlegung mit Begruendung und Konsequenzen.

## Format

Jeder ADR folgt dem leichtgewichtigen Schema:

- **Status** - Accepted / Superseded / Deprecated, Datum
- **Context** - Warum diese Entscheidung getroffen werden muss
- **Decision** - Was entschieden wurde
- **Consequences** - Was das fuer nachfolgende Arbeit bedeutet
- **Alternatives considered** - Was verworfen wurde und warum

## Index

| # | Thema | Entscheidung |
|---|---|---|
| [001](001-repo-lokation.md) | Repo-Lokation | Unterordner `web/` im Repository `pfernando-KI/kitomat` |
| [002](002-sprache.md) | Sprache | Deutsch fuer UI/Issues/Commits, Englisch fuer Code-Identifier |
| [003](003-routing.md) | Routing | Hash-Router beibehalten (kein React Router v6 fuer MVP) |
| [004](004-tooling.md) | Tooling | JavaScript, kein TypeScript fuer MVP |
| [005](005-fonts.md) | Fonts | Google Fonts CDN fuer MVP, lokale Einbettung als Phase-2-TODO |
| [006](006-deployment.md) | Deployment | GitHub Pages aus `web/` heraus, CI-Workflow in AP7 |
| [007](007-test-framework.md) | Test-Framework | Vitest, Setup in AP7 |
| [008](008-content-source.md) | Content-Anbindung | B+ Sites Content API mit D1 Cache |
| [009](009-public-api-internal-admin.md) | Public/Internal Split | Oeffentliche Content API getrennt von interner Admin Site |

## Neue ADRs

Spaetere Entscheidungen folgen dem gleichen Schema, fortlaufend nummeriert ab 010.