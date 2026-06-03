# ADR-008: Content-Anbindung an Upstream-Repo `ki-tomat/kitomat`

**Status:** Proposed (Phase-3-Vorbereitung, 2026-05-28)

## Context

In Phase 1+2 wurde die KI-tomat-Weboberfläche mit **statischen Mockdaten** aus dem Design-Übergabepaket aufgebaut (`web/src/data/*.js`, 1:1 aus `data.jsx` des Remix-Pakets). Diese Daten sind hartcodierte Designer-Beispiele — die 5 „Gold-Artefakte" in der Bibliothek (`kitomat-onboarding-kmu`, `kitomat-eu-ai-act`, `kitomat-handwerk`, `kitomat-review-checkliste`, `kitomat-vertrieb`) sind keine echten Einträge.

Die echten Content-Artefakte liegen im **Upstream-Repo** [ki-tomat/kitomat](https://github.com/ki-tomat/kitomat) in den Ordnern `datasets/`, `prompts/`, `models/`, `schemas/`, `agents/` mit YAML-Metadata pro Artefakt.

Phase 3 soll die UI an dieses Upstream-Repo anschließen. Diese ADR hält die drei realistischen Architektur-Varianten und die Empfehlung fest — die finale Entscheidung trifft die Planungsgruppe vor Phase 3 in einem dedizierten Beschluss.

## Decision

**Noch offen.** Die Entscheidung wird in einem separaten Phase-3-Kickoff getroffen. Diese ADR dokumentiert die drei diskutierten Varianten und die aktuelle Empfehlung der Person A (KI-tomat Web-UI).

### Variante A — Build-Time-Generator (empfohlen)

GitHub Action im Upstream-Repo `ki-tomat/kitomat` schreibt bei jedem Merge auf `main` eine generierte `library.json` (+ `review.json`, `community.json`, …) als PR in den UI-Fork `pfernando-KI/kitomat` oder als Release-Asset. Die UI lädt diese statisch im Build.

- **Vorteil:** Minimaler Aufwand, kein API-Rate-Limit, kein Backend nötig, Content-Repo bleibt strukturell unverändert
- **Nachteil:** Inhalte sind nicht „live" — Verzögerung von 1 Workflow-Lauf
- **Eignung:** Phase 3 MVP, Content-Repo ändert sich seltener als die UI deployt

### Variante B — GitHub-API-Fetch zur Laufzeit

UI ruft `https://api.github.com/repos/ki-tomat/kitomat/contents/...` direkt aus dem Browser, parst die YAML-Metadata pro Datei.

- **Vorteil:** Inhalte sind live, kein zusätzlicher Workflow
- **Nachteil:** GitHub-API-Rate-Limit (60 Req/h unauthentisiert, 5000/h mit Token) — Caching-Strategie nötig; bei jedem Pageload neuer Fetch
- **Eignung:** Niedrig-Traffic-Szenarien oder mit Service-Worker-Cache

### Variante C — Eigenes Backend

API-Layer (FastAPI / Express) sitzt zwischen Content-Repo und UI. Liest periodisch das Content-Repo, persistiert auch User-State (Reviews, Beiträge, Logins für Phase-3-Auth).

- **Vorteil:** Vollständige Phase-3-Architektur, Interaktivität möglich
- **Nachteil:** Größter Aufwand, neuer Service zu betreiben, Hosting-Kosten
- **Eignung:** Wenn Phase 3 auch User-Interaktion (Reviews, Beiträge per Web-Formular) einführt

## Empfehlung

**Variante A** für den ersten Anschluss-Schritt. Begründung:
- UI bleibt statisch deploybar (GitHub Pages, AP7-Workflow läuft weiter)
- Content-Repo bleibt unverändert — keine Phase-Konflikte mit anderen ki-tomat/kitomat-Beiträgen
- Späterer Wechsel auf Variante B oder C bleibt offen (UI-Code ändert sich nur an den Daten-Importen)

Migrations-Pfad falls Variante A produktiv läuft und später Interaktivität nötig wird:
- Variante A → Variante C (Backend übernimmt zusätzlich User-State, Content-Read bleibt statisch im Bundle)

## Consequences (falls Variante A)

- Neues AP („AP8 — Content-Anbindung Build-Time" o. ä.) in Phase 3 nötig
- GitHub Action `generate-library-json.yml` im Upstream-Repo `ki-tomat/kitomat` anlegen
- JSON-Schema für die generierten Dateien festlegen — Vorschlag: identische Struktur wie aktuelle `web/src/data/library.js` (Snapshot-kompatibel)
- `web/src/data/library.js` ersetzt durch `library.json`-Loader (z. B. `import library from '../assets/library.json'`)
- Build-Pipeline um Schritt erweitern: vor `vite build` die generierten JSONs als Asset einbinden
- `web/src/data/`-Module bleiben als Schnittstelle bestehen, intern lesen sie aus den generierten Dateien
- Migrations-Shim-Pattern aus AP3a (Toast) als Vorbild — alte Mockdaten in Phase-3-Tests als Fallback erhalten

## Alternatives considered

- **Variante B + B-Cache via IndexedDB** — verworfen, weil Service-Worker-Komplexität für MVP zu hoch
- **Submodule** (`ki-tomat/kitomat` als Git-Submodule unter `web/content/`) — verworfen, weil große Repos und Versions-Drift problematisch
- **Variante C als MVP** — verworfen, weil Hosting/Auth-Setup für Phase 3 noch nicht entschieden ist (siehe AP-Plan zu OAuth/Auth)

## Offene Fragen für den Phase-3-Kickoff

1. JSON-Schema-Definition pro Content-Typ (library, review, community, …)
2. Wer betreibt den Workflow im Upstream-Repo (Maintainer-Rechte erforderlich)?
3. Wann wird umgeschaltet — bei AP7-Pages-Deploy oder erst danach?
4. Fallback-Strategie wenn der Generator fehlschlägt (alte Mockdaten als Default behalten?)
5. Soll die Generierung auch die Screenshots/Assets aus `ki-tomat/kitomat` mit ausspielen?

## Verweise

- Aktueller Mockdaten-Stand: `web/src/data/library.js` und Geschwister
- Phase-2-Plan: [Phase2_Execution_Plan_KItomat_WebUI.md](../../../Phase2_Execution_Plan_KItomat_WebUI.md)
- Übergabeplan: [Uebergabeplan_KItomat_WebUI.md](../../../Uebergabeplan_KItomat_WebUI.md) — Phase-3-Ausblick
