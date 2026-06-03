# ADR-001: Repo-Lokation als Unterordner `web/`

**Status:** Accepted (Phase 0, aktualisiert 2026-06-03)

## Context

Das KI-tomat-Web-UI-?bergabepaket musste in ein gemeinsam entwickelbares GitHub-Repository ?berf?hrt werden. F?r Phase 2 wird die Weboberfl?che im Repository `pfernando-KI/kitomat` entwickelt. Gleichzeitig bleibt `ki-tomat/kitomat` als Content-Upstream f?r echte Artefakte und sp?tere Phase-3-Anbindung relevant.

## Decision

Die Weboberfl?che lebt unter `web/` als Unterordner mit eigenem `package.json` und eigener Vite-Konfiguration. Web-spezifische Dokumentation liegt unter `web/`; das Designpaket bleibt als Read-only-Archiv unter `web/design/kitomat-remix-1/`.

## Consequences

- Ein gemeinsamer PR- und Review-Workflow f?r die Web UI in `pfernando-KI/kitomat`.
- GitHub-Pages-Workflow baut explizit aus `web/`.
- F?r AP7 ist als Zielpfad `/kitomat/web/` vorgesehen, sofern die Web UI unter `https://pfernando-KI.github.io/kitomat/web/` ver?ffentlicht wird.
- Content-Links in der UI k?nnen bewusst auf `ki-tomat/kitomat` zeigen; Web-UI-Entwicklungslinks zeigen auf `pfernando-KI/kitomat`.

## Alternatives considered

- **Separates Repo `kitomat-web`** ? saubere Trennung, aber zus?tzlicher Verwaltungsaufwand.
- **Content-Repo direkt als UI-Repo** ? verworfen f?r Phase 2, weil die Web UI zuerst als Fork/Arbeitsstand stabilisiert wird.
