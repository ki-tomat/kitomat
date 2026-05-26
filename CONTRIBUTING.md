# Beitragen zum KItomat Prompt-Repository

Danke für dein Interesse, zu diesem Projekt beizutragen! Dieses Dokument gibt dir eine Übersicht über den Beitragsprozess.

## Code of Conduct

Dieses Projekt und alle seine Teilnehmer unterliegen unserem [Code of Conduct](CODE_OF_CONDUCT.md). Durch die Teilnahme erklärst du dich damit einverstanden, diesen einzuhalten.

---

## Arten von Beiträgen

### 1. **Neue Prompt-Pakete**
Wenn du ein neues Prompt-Paket einreichen möchtest:

1. Lese das [Teilnehmerpaket](docs/teilnehmerpaket/README.md)
2. Bestimme deinen Artefakttyp: Prompt-Paket, Datensatz-Paket oder KMU-Modell
3. Erfülle alle Pflichtdateien
4. Führe interne Tests durch
5. Reiche einen Pull Request ein

### 2. **Verbesserungen bestehender Pakete**
- Fehler beheben (Typos, logische Fehler in Prompts)
- Beispiele erweitern
- Dokumentation präzisieren
- Failure-Modes aktualisieren

### 3. **Datensatz- oder Quellenergänzungen**
- Synthetische Testdaten
- Quellenlisten
- Checklisten
- Vorlagen

### 4. **Dokumentation & Meta**
- README oder Workflow-Verbesserungen
- Neue Use Cases dokumentieren
- Community-Erfahrungen teilen

---

## Schritt-für-Schritt Beitragsprozess

### Schritt 1: Fork und Branch

```bash
git clone https://github.com/kitomat/prompts.git
cd prompts
git checkout -b feature/dein-paketname
```

**Branch-Naming:**
- Neue Pakete: `feature/paketname-kategorie`
- Verbesserungen: `improve/paketname-kurzbeschreibung`
- Fehler: `fix/paketname-fehlerdescription`

### Schritt 2: Arbeit durchführen

Wenn du ein neues Paket erstellst:

```
prompts/sales/dein-paket/
├── README.md
├── metadata.yml
├── prompt.md (oder prompt-1.md, prompt-2.md, ...)
├── examples/
│   ├── input-01.md
│   └── output-01.md
├── evaluation.md
├── failure-modes.md
├── workflow.md (optional)
└── datasets/ (optional)
```

**Checkliste vor dem Commit:**

- [ ] Alle Pflichtdateien vorhanden
- [ ] metadata.yml vollständig (keine "tbd" außer bei gemeinsamen Entscheidungen)
- [ ] README ist verständlich
- [ ] Mindestens ein Beispielinput + Output pro Prompt
- [ ] Failure-Modes dokumentiert
- [ ] Keine echten Kundendaten, personenbezogenen Daten oder Geheimnisse
- [ ] Quellen dokumentiert
- [ ] Lizenzstatus klar
- [ ] Datenrisiko klassifiziert (green/yellow/red)

### Schritt 3: Commit & Push

```bash
git add .
git commit -m "Add: neue Prompt-Paket 'dein-paket' für Kategorie"
```

**Commit-Message-Konvention:**

```
[TYPE]: Kurzbeschreibung

TYPE kann sein:
- Add: Neues Paket/Feature
- Improve: Verbesserung existierender Inhalte
- Fix: Fehlerbeseitigung
- Docs: Dokumentation
- Refactor: Umstrukturierung ohne Funktionsänderung
```

Beispiele:
```
Add: Neues Prompt-Paket für Email-Marketing
Improve: Failure-Modes in kiwerkstatt-leadbearbeitung erweitert
Fix: Tippfehler in sales/customer-research/README.md
```

### Schritt 4: Pull Request erstellen

1. Push deinen Branch
2. Öffne einen Pull Request auf GitHub
3. Nutze das PR-Template (wird automatisch vorgeschlagen)
4. Beschreibe:
   - Was machst du?
   - Warum ist es wichtig?
   - Welche Standards erfüllst du?
   - Gibt es offene Fragen?

### Schritt 5: Review-Prozess

Dein PR durchläuft:

**a) Automatische Checks**
- Strukturvalidation (Dateien vorhanden?)
- Metadata-Validierung (YAML korrekt?)
- Lizenzprüfung

**b) Peer Review**
- Mindestens 1 Community Reviewer
- Fokus: Klarheit, Nützlichkeit, Qualität

**c) Trust Review** (falls data_risk: yellow oder red)
- Datenschutz-Prüfung
- Sicherheitsaspekte
- Human-in-the-Loop-Dokumentation

**d) Finale Freigabe**
- Merge durch Maintainer

---

## Standards & Best Practices

### Sprache
- **Primär:** Deutsch
- Englische Varianten in separaten Dateien (z.B. `prompt.de.md` / `prompt.en.md`)

### Formatierung
- Markdown für Dokumentation
- YAML für Konfiguration und Input-Schemata
- Konsistente Struktur für Lesbarkeit

### Datenqualität
- ✅ Synthetische/anonymisierte Beispiele
- ✅ Quellenangaben wo relevant
- ❌ Keine echten Kundendaten
- ❌ Keine Betriebsgeheimnisse
- ❌ Keine personenbezogenen Daten

### Dokumentation
- Jedes Paket muss eine README haben
- Failure-Modes müssen dokumentiert sein
- Grenzen und Risiken müssen explizit genannt werden
- Human-Review-Anforderungen müssen klar sein

---

## Häufig gestellte Fragen (FAQ)

**F: Kann ich ein Paket mehrmals überarbeiten?**
A: Ja! Nach dem Merge kannst du Verbesserungen via neuer PRs einreichen.

**F: Wie lange dauert der Review?**
A: Typisch 5-10 Werktage für Peer Review, +5-10 Tage für Trust Review wenn nötig.

**F: Was ist der Unterschied zwischen bronze_candidate und bronze?**
A: `bronze_candidate` = eingereicht, wartet auf Review. `bronze` = bestätigt und merged.

**F: Kann ich ein Paket als draft einreichen?**
A: Ja, mit `status: draft`. Aber für Merge ist mindestens `bronze_candidate` erforderlich.

**F: Wer darf Trust Review durchführen?**
A: Maintainer des Projekts. Für komplexe Fälle können externe Experten hinzugezogen werden.

---

## Fragen oder Probleme?

- **Dokumentation:** Siehe [docs/](docs/) Ordner
- **Issues:** Öffne ein GitHub Issue mit dem Label `question` oder `help`
- **Diskussionen:** Nutze GitHub Discussions für offene Fragen

---

## Danke!

Danke für deine Zeit und Energie, dieses Projekt zu verbessern! 🙏
