# KI-tomat Web UI

Web-Oberfläche der KItomat-Plattform. Lebt als Unterordner des öffentlichen `kitomat-github-work`-Repos der Planungsgruppe — Begründung siehe [docs/decisions/001-repo-lokation.md](docs/decisions/001-repo-lokation.md).

## Status

**Phase 0 (Vorab-Entscheidungen):** abgeschlossen — siehe [docs/decisions/](docs/decisions/).

**Phase 1 (3-Tage-Sprint):** AP1a Vite-Skeleton + AP2 Designsystem-Doku + AP3a App-Shell.

**Phase 2:** AP1b Daten-ESM, AP3b Modals, AP4–AP6 Views, AP7 Deploy/Tests — ~2–3 Wochen.

## Struktur

```
web/
├── design/kitomat-remix-1/   READ-ONLY Archiv des Übergabepakets
├── docs/
│   └── decisions/            ADRs (Phase 0 + spätere)
├── src/                      (wird in AP1a befüllt)
└── tests/                    (wird in AP7 befüllt)
```

## Setup (ab AP1a verfügbar)

```bash
cd web/
npm install
npm run dev
```

## Beiträge

- Vor dem ersten PR: Wurzel-`AGENTS.md` und (ab AP2) `docs/DESIGN_SYSTEM.md` lesen.
- Branch-Konvention: `feature/<ap-nr>-<kurzname>` von `develop` abzweigen, PR gegen `develop`.
- Architekturentscheidungen werden als ADR in `docs/decisions/` dokumentiert.
