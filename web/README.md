# KI-tomat Web UI

Web-Oberfl?che der KItomat-Plattform im Repository `pfernando-KI/kitomat`. Die App lebt im Unterordner `web/` und ist eine React/Vite Single Page App mit Hash-Routing.

## Status

Phase 2 ist bis AP6 weitgehend umgesetzt: App-Shell, Datenmodule, Modals, Dashboard, Bibliothek, Detail, Contribution, Community, MyRequests, FAQ, About, Review Center und Admin-Bereich sind vorhanden. AP7 bleibt offen: Smoke-Tests, GitHub-Pages-Workflow, finaler Release auf `main` und Tag `v0.2.0`.

## Setup

```bash
cd web
npm install
npm run dev
```

Die lokale App l?uft standardm??ig unter `http://localhost:5173/`. Beispiele f?r Hash-Routen:

```text
#/dashboard
#/library
#/detail/kitomat-onboarding-kmu
#/contribution
#/review
#/admin
```

## Build

```bash
cd web
npm run build
npm run preview
```

Nach AP7 kommen zus?tzlich `npm run test` und `npm run test:ci` hinzu.

## Struktur

```
web/
??? design/kitomat-remix-1/   READ-ONLY Archiv des ?bergabepakets
??? docs/                     Designsystem und ADRs
??? src/                      produktive React/Vite-App
??? tests/                    folgt in AP7
```

## Regeln

- `web/design/kitomat-remix-1/` bleibt unver?ndert.
- Produktive Views, Komponenten und Daten liegen unter `web/src/`.
- Die App nutzt Hash-Routing, keinen React Router.
- Sichtbare Artefakt- und Community-Links zeigen bewusst auf das Content-Upstream-Repo `ki-tomat/kitomat`; Web-UI-Entwicklung und PRs laufen hier im Fork `pfernando-KI/kitomat`.
