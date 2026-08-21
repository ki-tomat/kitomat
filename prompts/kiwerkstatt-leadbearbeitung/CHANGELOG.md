# Changelog: kiwerkstatt-leadbearbeitung

Alle Änderungen und Versionen dieses Prompt-Pakets sind hier dokumentiert.

---

## [0.1.0] – 2026-05-27

**Status:** `bronze_candidate` (Initial Release zur Community)

### ✨ Features

#### Neue Prompts
- **Prompt 1: Lead-Scoring (v2.4)** – B2B-Lead-Qualifizierung anhand ICP, mit Input-Layer-Integration und präzisierten Scoring-Kriterien
- **Prompt 2: CRM-Zusammenfassung (v2.4)** – Gesprächsnotizen/Transkripte in CRM-Entwürfe, mit Unterscheidung Fakten vs. KI-Einschätzungen
- **Prompt 3: Budgeteinwände (v2.2)** – Respektvoller Umgang mit Budget-, Preis- und Prioritätseinwänden, mit Optionen und Rückzugsszenarien

#### Input-Layer (Neu für dieses Release)
- Input-Layer-Konzept mit YAML-Schemata
- Preflight-Check für Datenschutz und Validierung
- CRM-Feldmapping-Dokumentation
- Standardisierte Input-Karten pro Prompt

#### Dokumentation
- Umfassendes README mit Zielgruppe und Workflow
- Detaillierte metadata.yml mit Versionierung und Trust-Layer
- Großes evaluation.md zur Prüfmethodik
- 441 Zeilen failure-modes.md mit kritischen Controls
- Drei vollständige Beispiel-Szenarien (Input + Output)
- Datasets mit synthetischen Testdaten

#### Community-Ready Files (Neu)
- MAINTAINERS.md – Verantwortlichkeiten und Governance
- USAGE_CHECKLIST.md – Quick-Start für Nutzer
- EXPERT_FEEDBACK.md – Learnings und Best Practices
- PR_DESCRIPTION.md – für GitHub Pull Request
- review.md – Review-Status und Anforderungen

### 🔒 Trust & Safety
- `data_risk: yellow` (angemessen für Lead-/CRM-Daten)
- `human_review_required: true` durchgängig dokumentiert
- Explizite Verbote: Keine erfundenen Rabatte, ROI-Zahlen, Referenzen
- Datenschutz-Checkpoints im Input-Layer integriert

### 📝 Metadata
- `artifact_type: prompt_package` (korrekt klassifiziert)
- `status: bronze_candidate` (für initiales Review)
- `license: CC-BY-4.0` (Open Source, mit Namensnennung)
- Vollständige Modulfeinstellungen mit Input-Schemata

### 🎯 Zielgruppe
- Vertriebsmitarbeiter in KMU
- Kleine Agenturen
- Selbstständige B2B-Dienstleister
- KI-Berater mit Vertriebsaufgaben

### 🔧 Technische Details
- **Sprache:** Deutsch (primär), English-Ready für zukünftige Varianten
- **Format:** Markdown für Dokumentation, YAML für Konfiguration
- **Kompatibilität:** Claude, ChatGPT, Open-Source Models (getestet mit Haiku)
- **Größe:** ~2.3 MB Total (prompts + docs + datasets)

---

## Roadmap für zukünftige Releases

### [0.2.0] – Geplant Q3 2026 (Silver-Level)
- [ ] English-Varianten der Prompts
- [ ] Zusätzliche Test-Cases für Edge-Cases
- [ ] Expert-Review durchführen (externe Vertriebsexperten)
- [ ] API-Integration Guide (für Automatisierung)
- [ ] Video-Tutorial (5-10 Min Übersicht)
- [ ] Batch-Processing Support

### [0.3.0] – Geplant Q4 2026 (Silver→Gold Transition)
- [ ] CRM-System Integrationen (Salesforce, HubSpot, Pipedrive)
- [ ] Multilingual Support (FR, ES, IT, NL)
- [ ] Performance-Optimierung (schnellere Prompt-Ausführung)
- [ ] Feedback-Loop-Dokumentation
- [ ] Community-Beiträge integrieren

### [1.0.0] – Geplant Q1 2027 (Gold-Level)
- [ ] Stabilität und Produktionsreife
- [ ] Automatisierte Testing-Suite
- [ ] Monitoring und Observability
- [ ] Long-term Support (LTS) Version

---

## Version History – Detailliert

### v2.4 (Lead-Scoring & CRM-Summary)
**Datum:** 2026-05-15  
**Changes:**
- Input-Layer-Integration vollständig
- Outbound-Lead-Szenarien hinzugefügt
- Schärfung von negativen Signalen
- CRM-Feldmapping verfeinert
- Trennung Fakten/Einschätzungen präzisiert

### v2.2 (Budgeteinwände)
**Datum:** 2026-05-10  
**Changes:**
- Vier Einwandkategorien definiert
- Manipulation-Verbot explizit gemacht
- Rückzugs-Szenarien dokumentiert
- Stilrichtlinien verfeinert

---

## Known Limitations

### Bekannte Limitations dieser Version (0.1.0)

1. **Sprachabhängigkeit:** Optimiert für Deutsch, Englisch funktioniert, andere Sprachen begrenzt
2. **ICP-Spezifität:** Prompt 1 ist für KMU-KI-Beratung optimiert; andere ICPs erfordern Anpassung
3. **Beispiel-Abdeckung:** Nur je 1 Hauptszenario pro Prompt (weitere Varianten in v0.2)
4. **CRM-Integration:** Generische Feldmappings, spezifische CRMs brauchen Anpassung (wird in v0.2 addressiert)
5. **Automatisierung:** Erfordert noch manuelles Input-Handling; API-Integration folgt in v0.2

### Tracking von Limitations

Limitations werden als GitHub Issues mit Label `limitation` getracked und in kommenden Versionen addressiert.

---

## Breaking Changes

Keine Breaking Changes in diesem Release (Initial Release).

---

## Migration Guide (falls zutreffend)

N/A – Initial Release, keine früheren Versionen.

---

## Contributors & Acknowledgments

**Lead Developer:** JochenTDM  
**Conceptualization:** KIWerkstatt Community Team  
**Documentation:** KItomat Project  

Vielen Dank an alle, die Feedback und Testing beigetragen haben! 🙏

---

## Versioning Policy

Dieses Projekt folgt [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** (z.B. 1.2.3)
- **MAJOR:** Breaking changes, fundamental restructuring
- **MINOR:** New features, non-breaking enhancements
- **PATCH:** Bug fixes, small improvements

**Release Cycle:**
- Patch-Releases: Beliebig häufig (sofort bei kritischen Bugs)
- Minor-Releases: Monatlich (planned)
- Major-Releases: Quartalsweise (planned)

---

## How to Report Changes

Hast du Verbesserungsvorschläge oder Bug-Reports?

1. **GitHub Issues:** Beschreibe das Problem/Feature
2. **Pull Requests:** Für konkrete Verbesserungen
3. **Email:** community@kitomat.local für sensible Themen

---

**Changelog Version:** 1.0  
**Last Updated:** 2026-05-27  
**Maintained by:** KIWerkstatt Community Team
