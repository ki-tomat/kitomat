# ADR-002: Sprach-Konvention

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Das Team kommuniziert auf Deutsch. Das Übergabepaket enthält deutsche UI-Texte. Gleichzeitig sollen Claude Code und Codex am Repo arbeiten, und der Code soll für künftige internationale Mitwirkende lesbar bleiben.

## Decision

- **Deutsch** für: UI-Texte, Issue-Titel und -Bodies, Commit-Messages, PR-Beschreibungen, Markdown-Dokumentation.
- **Englisch** für: Code-Identifier (Variablen-, Funktions-, Komponentennamen), Code-Kommentare, Datei- und Branch-Namen.

## Consequences

- React-Komponenten heißen `Header`, `LibraryView`, `RoleSwitcher` — nicht `Kopfzeile` / `BibliotheksAnsicht`.
- CSS-Klassen aus dem Übergabepaket bleiben unverändert (englisch, z. B. `.card`, `.badge-green`).
- Mockdaten-Feldnamen in Englisch (`title`, `riskLevel`); Feldwerte in Deutsch (UI-Strings).
- Commit-Beispiel: `feat(library): Filter nach Risiko hinzugefügt` — Scope englisch, Beschreibung deutsch.

## Alternatives considered

- **Vollständig Englisch** — verworfen, erhöht Einstiegshürde für nicht-englischsprachige Teammitglieder bei Issues und PRs.
- **Vollständig Deutsch** — verworfen, deutsche Identifier kollidieren mit React-/Vite-Ökosystem-Konventionen und brechen die Lesbarkeit für externe Tools.
