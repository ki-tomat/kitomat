# ADR-005: Google Fonts CDN für MVP

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Das Übergabepaket nutzt **Manrope** (Sans-Serif, Weights 500–700) und **JetBrains Mono** (für Labels, Badges, Code-Snippets), beide aktuell über Google Fonts CDN eingebunden. Bei deutschen Nutzergruppen ist DSGVO-Konformität relevant: Google Fonts CDN überträgt IP-Adressen an Google.

## Decision

Für das **MVP**: Google Fonts CDN beibehalten — gleich wie im Übergabepaket.

Für **Phase 2**: lokale Einbettung der Schriftdateien als verbindliches TODO. Issue dafür in AP7 anlegen, bevor `main` öffentlich beworben wird.

## Consequences

- Schneller Pfad in AP1a — nur `<link>`-Tag in `index.html`, keine npm-Pakete.
- Beim ersten produktiven Launch muss die lokale Einbettung gemacht sein, sonst Datenschutz-Risiko.
- `web/src/assets/fonts/` ist als künftiger Ablageort vorgesehen.
- Stakeholder-Hinweis: GitHub-Pages-URL ist während des MVP-Sprints für interne Reviews gedacht, nicht für öffentliche Bewerbung.

## Alternatives considered

- **Sofort lokal einbetten** — zusätzlicher Tag-1-Aufwand (Font-Lizenzen prüfen, Dateien herunterladen, `@font-face` in `global.css` ergänzen), nicht im 3-Tage-Sprint-Scope.
- **System-Fonts** — verändert die visuelle Identität, vom Designsystem nicht abgedeckt.
