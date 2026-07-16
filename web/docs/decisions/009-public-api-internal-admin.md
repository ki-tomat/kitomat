# ADR-009: Trennung von oeffentlicher Content API und interner Admin Site

**Status:** Accepted (Phase 3 B+, 2026-06-08)

## Context

Die interne Admin-Oberflaeche soll workspace-intern geschuetzt sein. Die oeffentliche WebUI muss jedoch ohne Login Content laden koennen. Eine einzelne geschuetzte Sites-App kann diese beiden Anforderungen nicht sauber gleichzeitig erfuellen.

## Decision

Phase 3 trennt zwei Sites-Projekte:

- `sites/content-api/`: oeffentliche read-only API fuer die WebUI.
- `sites/admin/`: workspace-interne Admin-/Team-Oberflaeche.

Die Admin Site liest die oeffentliche API und speichert interne Teamdaten in eigener D1. Die oeffentliche API speichert nur Content-Cache und Sync-Logs. Beide Sites haben eigene D1-Bindings und keine geteilte Datenbank.

Die Admin Site nutzt Sites Access Control als erste Schutzschicht. Der Worker prueft zusaetzlich serverseitig einen verifizierten Workspace-User-Header, bevor schreibende Admin-Endpunkte akzeptiert werden.

## Consequences

- Oeffentliche Nutzer sehen nur freigegebene, normalisierte Contentdaten.
- Interne Teamdaten bleiben in der Admin Site.
- Eine Fehlkonfiguration der Public API kann nicht direkt Team-Notizen oder Checklisten oeffnen.
- D1 laeuft auf OpenAI-managed Cloudflare-Infrastruktur; vor produktiver Speicherung interner Teamdaten muessen Datenschutz-/Residency-Fragen geklaert sein.
- Bis zur Klaerung speichert die Admin Site keine E-Mail-Adressen in D1, sondern hoechstens pseudonyme Autorenkuerzel.
- CORS der Content API kann fuer eine public read-only API offen sein; restriktive Allowlist ist Pflicht, sobald Credentials, Cookies oder personalisierte Daten ins Spiel kommen.
- Spaetere echte Schreibaktionen brauchen eine neue Entscheidung zu GitHub App, OAuth und Berechtigungen.

## Alternatives considered

- **Eine gemeinsame Site mit Pfad-Trennung:** verworfen, weil eine einzige Access-Control-Fehlkonfiguration beide Bereiche betreffen koennte.
- **Admin als statische Seite mit Browser-Speicher:** verworfen, weil Team-Notizen und Checklisten geraeteuebergreifend erhalten bleiben sollen.
