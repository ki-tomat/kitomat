# ADR-001: Repo-Lokation als Unterordner `web/`

**Status:** Accepted (Phase 0, 2026-05-27)

## Context

Das KI-tomat-Web-UI-Übergabepaket muss in ein gemeinsam entwickelbares GitHub-Repository überführt werden. Die KItomat-Planungsgruppe betreibt bereits das öffentliche Repo `kitomat-github-work` für Content (Datasets, Prompts, Schemas, Agenten-Configs). Es stellte sich die Frage, ob die Weboberfläche ein eigenes Standalone-Repo `kitomat-web` werden soll oder als Unterordner in das bestehende Repo wandert.

## Decision

Die Weboberfläche lebt unter `kitomat-github-work/web/` als Unterordner mit eigenem `package.json` und eigener Vite-Konfiguration. Bestehende Top-Level-Dateien (`README.md`, `AGENTS.md`, `CONTRIBUTING.md`) bleiben für den Content-Teil reserviert. Web-spezifische Pendants liegen unter `web/` (`web/README.md`, `web/AGENTS.md`).

## Consequences

- Ein gemeinsames Repo statt zwei → ein Issue-Tracker, ein PR-Workflow, eine Mitgliederliste.
- `.github/` bleibt auf Repo-Wurzel-Ebene. Issue-Templates trennen über Frontmatter `area: content` vs. `area: web`.
- Wurzel-AGENTS.md verweist mit Markdown-Link auf `web/AGENTS.md` (keine Symlinks — Git-unfreundlich).
- GitHub-Pages-Workflow muss explizit aus `web/` bauen und mit `base: '/kitomat-github-work/web/'` deployen (siehe [ADR-006](006-deployment.md)).
- Release-Zyklen Content vs. Web sind gekoppelt — vor einem Web-Release muss der Content-Stand stabil sein.

## Alternatives considered

- **Separates Repo `kitomat-web`** — saubere Trennung, aber zweiter Verwaltungs-Overhead (Permissions, Issues, CI) für ein 7–8-Personen-Team zu schwer.
- **Phase-0-Entscheidung vertagen** — verworfen, blockiert AP1a sofort.
