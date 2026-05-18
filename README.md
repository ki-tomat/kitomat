# KItomat

![KItomat logo](assets/brand/kitomat.png)

Frische KI-Ressourcen. Reife Ideen.

KItomat ist ein offenes GitHub-Repository fuer reviewfaehige KI-Arbeitsbausteine. Ziel ist nicht eine moeglichst grosse Prompt-Sammlung, sondern ein vertrauenswuerdiger Bestand aus fachlich strukturierten Paketen, nachvollziehbaren Quellen, synthetischen Beispielen und menschlicher Review-Logik.

## Artefakte

KItomat startet mit drei Artefakttypen:

1. Prompt-Pakete
2. Datensatz-/Quellenpakete
3. KMU-/Branchenmodelle

Die erste Website-Stufe ist ein statischer GitHub Pages Katalog. SDK, MCP, Obsidian, komplexe Integrationen, Logins, Datenbanken und automatisierte Distribution sind Post-MVP oder Stretch.

## Qualitaetsprinzip

Ein gutes Artefakt zeigt nicht nur, was eine KI ausgeben soll. Es dokumentiert:

- Zielgruppe und Einsatzkontext
- erlaubte Eingaben und erwartete Outputs
- Quellen oder Quellenstatus
- synthetische Beispiele
- positive, nachbearbeitbare und negative Szenarien
- Grenzen, Failure Modes und menschliche Kontrollpunkte
- Trust-Layer-Metadaten

## Sicherheitsgrenzen

Nicht erlaubt im MVP:

- echte personenbezogene Daten
- echte Kundendaten
- interne Unternehmensdokumente
- Bewerbungsunterlagen echter Personen
- Gesundheitsdaten
- vertrauliche Finanzdaten
- personenbezogene E-Mails
- anonymisierte interne Echtdaten
- urheberrechtlich unklare Volltexte
- lokale Datei-Uploads ohne klare Herkunft, Lizenz und Trust Review

## Mitmachen

KItomat ist oeffentlich, aber nicht offen fuer direkte Veroeffentlichung ohne Review.

1. Waehle genau ein Hauptartefakt: Prompt, Datensatz/Quelle oder Modell.
2. Nutze das passende Template.
3. Fuelle `metadata.yml` vollstaendig aus.
4. Ergaenze ein synthetisches Beispiel und eine Szenario-Triade.
5. Markiere Quellen, Risiken und offene Review-Fragen.
6. Reiche per Pull Request, Fork oder ueber den Maintainer-Import ein.
7. Warte auf Validatoren, Vorpruefung und menschliche Review.

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) und [docs/getting-started.md](docs/getting-started.md).

Maintainer-Setup: [docs/admin-github-setup.md](docs/admin-github-setup.md). OpenClaw-Vorpruefung: [docs/openclaw-pre-review.md](docs/openclaw-pre-review.md).

Community Flow: [docs/community-contribution-flow.md](docs/community-contribution-flow.md).

Wichtige Guides:

- [Teilnehmer-Step-by-Step](docs/guides/participant-step-by-step.md)
- [Externe Beitraege](docs/guides/external-contributor-step-by-step.md)
- [Import-Batches](docs/guides/import-batch-step-by-step.md)
- [Download-Assets](docs/guides/download-assets-step-by-step.md)
- [GitHub Pages Katalog](docs/guides/github-pages-catalog-plan.md)
- [Projektstatus und Gap-Analyse](docs/operations/project-status-and-gap-analysis.md)
- [Release Readiness v0.1-rc](docs/operations/release-readiness-v0.1-rc.md)

## Statusmodell

Im Kurs/MVP regulaer erlaubt:

- `draft`
- `bronze_candidate`
- `bronze`

Optional nur bei echten dokumentierten Tests:

- `silver_candidate`

Nicht regulaer im MVP:

- `silver`
- `gold_candidate`
- `gold`

Codex und andere agentische KI-Tools duerfen Struktur, Syntax und formale Readiness pruefen. Fachliche Freigabe, Trust Review, Merge und Release bleiben menschliche Entscheidungen.

## Reviewed-only Regel

Direkte Veroeffentlichung ueber `main` ist nicht der normale Beitragsweg. Beitraege laufen ueber Pull Request, Validatoren und mindestens eine menschliche Review. Maintainer entscheiden Merge, Status und Release-Aufnahme.

## Downloads

Kleine Beispiele, Quellenlisten, Templates und Metadaten bleiben im Repo. Groessere Datensatz- oder Quellenpakete werden als GitHub Release Assets bereitgestellt und im GitHub Pages Katalog verlinkt. Jedes Download-Paket braucht Version, Groesse, SHA-256-Pruefsumme, Lizenzstatus, Quellenstatus, Datenrisiko und menschliche Review.
