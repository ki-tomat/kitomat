---
name: Arbeitspaket (Web UI)
about: Vorlage für KI-tomat Web-UI-Arbeitspakete im web/-Unterordner
title: "[AP?] "
labels: ["area: web"]
assignees: []
---

## Ziel

<!-- Was soll nach diesem Issue anders/besser sein? Ein bis zwei Sätze. -->

## Hintergrund

<!-- Warum ist das wichtig? Welches Problem löst es? Verweis auf Plan / ADR / vorheriges Issue. -->

## Aufgaben

- [ ] Aufgabe 1
- [ ] Aufgabe 2

## Betroffene Dateien

- `web/src/views/...`
- `web/src/components/...`

## Nicht bearbeiten

- `web/design/` (Read-Only-Archiv)
- `web/src/styles/global.css` (nur durch AP2 oder im Designsystem-Issue)

## Abhängigkeiten

<!-- Welche Issues müssen vorher abgeschlossen sein? -->

## Akzeptanzkriterien

- [ ] Funktional korrekt
- [ ] Light + Dark Mode geprüft
- [ ] Responsive bei 375px + 1280px geprüft
- [ ] Screenshot Before/After im PR
- [ ] `npm run build` grün
- [ ] Designsystem eingehalten (CSS-Variablen, vorhandene Komponenten)

## Für KI-Coding-Tools (Claude Code / Codex)

Pflichtlektüre vor dem ersten Commit:

1. `web/README.md`
2. `web/AGENTS.md`
3. `web/docs/DESIGN_SYSTEM.md`

Branch-Konvention: `feature/<ap-nr>-<kurzname>` von `develop`, PR gegen `develop`.
