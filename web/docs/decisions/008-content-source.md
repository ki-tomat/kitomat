# ADR-008: Content-Anbindung per Sites Content API

**Status:** Accepted (Phase 3 B+, 2026-06-08)

## Context

Die WebUI aus Phase 1 und 2 nutzt statische Mockdaten. Phase 3 soll echte Inhalte aus `ki-tomat/kitomat` anzeigen. Eine rein browserseitige GitHub-API-Anbindung waere einfach, aber anfaellig fuer Rate-Limits und Fehlerzustaende. Ein vollstaendiges Backend mit OAuth und GitHub-App-Schreibrechten ist fuer Phase 3 zu gross.

## Decision

Phase 3 nutzt **B+**: Eine oeffentliche read-only Sites Content API liest `ki-tomat/kitomat` serverseitig, normalisiert Artefakte und cached Ergebnisse in D1. Die oeffentliche WebUI bleibt zunaechst auf GitHub Pages und laedt Daten ueber `VITE_KITOMAT_CONTENT_API_URL`.

Die interne administrative Ebene wird als separates, workspace-internes Sites-Projekt umgesetzt. Sie nutzt die Content API und eigene D1-Tabellen fuer Team-Notizen und Release-Checklisten.

B+ steht unter zwei Vorbedingungen: Codex Sites muss im ChatGPT-Business-/Enterprise-Workspace verfuegbar und fuer das Team deploybar sein; ausserdem gelten die Content-Repo-Schemas unter `ki-tomat/kitomat/schemas/` als verbindlicher Input-Contract fuer die Normalisierung.

## Consequences

- `web/` bleibt als oeffentliche GitHub-Pages-WebUI bestehen.
- `sites/content-api/` ist oeffentlich lesbar und enthaelt keine Schreibaktionen.
- `sites/admin/` ist intern geschuetzt und dient Team-Koordination, QA und Release-Arbeit.
- GitHub-Tokens liegen nur als Sites-Environment-Variable vor, nie im Browser.
- Fallback-Reihenfolge in der WebUI: Sites API -> Browser Cache -> Mockdaten.
- Wenn das Content-Repo anfangs nur `_template/`-Ordner enthaelt, ist eine leere Live-Liste erwartbar; fachlich verifiziert ist der Live-Pfad erst nach dem First-Content-Meilenstein.
- D1 laeuft auf OpenAI-managed Cloudflare-Infrastruktur; Datenschutz-/Residency-Fragen muessen vor produktiver Speicherung interner Teamdaten geklaert sein.
- Automatische PR-Erzeugung, OAuth, R2-Uploads und produktive Admin-Aktionen bleiben Folgephase.

## Alternatives considered

- **Variante B rein im Browser:** weniger Infrastruktur, aber schwaecher bei Rate-Limits und Fehlern.
- **Variante C eigenes Backend:** maechtiger, aber zu gross fuer den Phase-3-Zeitrahmen.
- **Alles auf Sites migrieren:** moeglich, aber fuer Phase 3 unnoetig riskant, solange GitHub Pages funktioniert.