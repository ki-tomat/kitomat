# Pull Request: Prompt-Paket „KIWerkstatt Leadbearbeitung“

## Kurzbeschreibung

Dieser Pull Request ergänzt ein deutschsprachiges Prompt-Paket für die strukturierte Leadbearbeitung im B2B-Vertrieb.

Das Paket wurde für die fiktive **KIWerkstatt Hamburg GmbH** entwickelt und unterstützt Vertriebsmitarbeiter, kleine Agenturen, selbstständige B2B-Dienstleister und KI-Berater bei drei wiederkehrenden Aufgaben:

1. Lead-Qualifizierung & Scoring
2. Gesprächs- und Meetingzusammenfassung für CRM
3. Umgang mit Budget-, Preis- und Prioritätseinwänden im Vertrieb

Das Paket ist als **Bronze-Kandidat** vorbereitet. Es enthält Prompts, Input-Layer, Beispiele, synthetische Datensätze, Evaluation, Failure Modes und Review-Checkliste.

---

## Ziel des Beitrags

Der Beitrag soll kein einzelner Prompt sein, sondern ein wiederverwendbares Prompt-Paket für ein öffentliches Community-Repository.

Das Paket verfolgt folgende Ziele:

- Leadbearbeitung strukturierter und nachvollziehbarer machen
- freie Nutzereingaben über standardisierte Input-Karten stabilisieren
- CRM-Entwürfe prüfbarer machen
- Einwandbehandlung respektvoll und nicht manipulativ vorbereiten
- Datenschutz-, Trust-Layer- und Human-Review-Punkte früh sichtbar machen
- spätere Automatisierung über CRM, Formulare, Tabellen oder Workflows vorbereiten

---

## Enthaltene Dateien

```text
prompts/sales/kiwerkstatt-leadbearbeitung/
├── README.md
├── metadata.yml
├── workflow.md
├── evaluation.md
├── failure-modes.md
├── review.md
├── PR_DESCRIPTION.md
├── prompts/
│   ├── prompt-1-lead-scoring.md
│   ├── prompt-2-crm-zusammenfassung.md
│   └── prompt-3-budgeteinwaende.md
├── input-layer/
│   ├── input-layer-konzept.md
│   ├── preflight-check.md
│   ├── input-schema-prompt-1.yml
│   ├── input-schema-prompt-2.yml
│   ├── input-schema-prompt-3.yml
│   └── crm-field-mapping.md
├── examples/
│   ├── input-01-lead-scoring.md
│   ├── output-01-lead-scoring.md
│   ├── input-02-crm-zusammenfassung.md
│   ├── output-02-crm-zusammenfassung.md
│   ├── input-03-budgeteinwand.md
│   └── output-03-budgeteinwand.md
└── datasets/
    ├── synthetische-leads.md
    ├── synthetisches-crm-gespraech.md
    └── budgeteinwaende.md
```

---

## Was wurde umgesetzt?

### 1. Prompt-Paket angelegt

Das Paket enthält drei Module:

| Modul | Zweck | Datei |
|---|---|---|
| Lead-Scoring | Leads anhand des ICP strukturiert vorbewerten | `prompts/prompt-1-lead-scoring.md` |
| CRM-Zusammenfassung | Gesprächsnotizen in prüfbare CRM-Entwürfe überführen | `prompts/prompt-2-crm-zusammenfassung.md` |
| Budgeteinwände | Antwortoptionen auf Budget-, Preis- und Prioritätseinwände vorbereiten | `prompts/prompt-3-budgeteinwaende.md` |

### 2. Input-Layer integriert

Der vorgeschaltete Input-Layer überführt manuelle oder automatisierte Eingaben in standardisierte Input-Karten.

Er enthält:

- Kurzlogik für standardisierte Eingabe
- Preflight-Check
- YAML-Input-Schema je Modul
- CRM- und Quellen-Mapping
- Regeln für fehlende Pflichtfelder
- Erlaubnis für Werte wie `unbekannt`, `nicht genannt`, `nicht vorhanden`, `noch zu klaeren`
- Datenschutzcheck und Human-Review-Pflicht

### 3. Beispiele und Datensätze dokumentiert

Alle Beispiele sind synthetisch.

Enthalten sind:

- Lead-Scoring-Beispiel auf Basis NordBau Service GmbH
- CRM-Zusammenfassungsbeispiel mit fiktivem Gespräch
- Budgeteinwand-Beispiel mit dokumentierter Antwortlogik
- synthetische Lead-Datensätze
- synthetische Gesprächs- und Einwanddaten

### 4. Trust Layer umgesetzt

Das Paket ist eingestuft als:

```yaml
data_risk: yellow
personal_data_possible: true
human_review_required: true
ai_act_proximity: transparency
```

Begründung:

- Lead-, Gesprächs- und CRM-Daten können personenbezogene oder vertrauliche Informationen enthalten.
- Ergebnisse können Vertriebspriorisierung beeinflussen.
- Outputs können in CRM-Systeme oder Kundengespräche einfließen.
- Menschliche Prüfung bleibt daher verpflichtend.

---

## Was darf das Paket nicht?

Das Paket darf nicht verwendet werden, um:

- Leads automatisch final auszusortieren
- CRM-Einträge ungeprüft produktiv zu übernehmen
- Rabatte, ROI-Zahlen, Referenzen oder Fallstudien zu erfinden
- manipulative Vertriebssprache zu erzeugen
- Datenschutz- oder IT-Bedenken kleinzureden
- echte personenbezogene Daten in öffentlichen Beispielen zu verwenden
- fachliche, rechtliche oder datenschutzrechtliche Prüfung zu ersetzen

---

## Review-Status

```yaml
status: bronze_candidate
review_status: pending
merge_allowed: false
```

Der Merge sollte erst erfolgen, wenn folgende Reviews abgeschlossen sind:

- [ ] Peer Review
- [ ] Trust Review
- [ ] Prüfung der synthetischen Beispieldaten
- [ ] Prüfung der Input-Layer-Pflichtfelder
- [ ] Prüfung der Failure Modes
- [ ] Prüfung, dass keine echten personenbezogenen Daten enthalten sind

---

## Bronze-Checkliste

- [x] Zweck und Zielgruppe klar beschrieben
- [x] Prompt-Paket-Struktur vorhanden
- [x] Drei Prompt-Module vorhanden
- [x] Input-Layer vorhanden
- [x] `metadata.yml` vorhanden
- [x] `workflow.md` vorhanden
- [x] `evaluation.md` vorhanden
- [x] `failure-modes.md` vorhanden
- [x] `review.md` vorhanden
- [x] Beispielinput und Beispieloutput je Modul vorhanden
- [x] synthetische Datensätze vorhanden
- [x] Trust Layer dokumentiert
- [x] Human Review verpflichtend
- [x] keine echten personenbezogenen Daten in Beispielen
- [ ] Peer Review abgeschlossen
- [ ] Trust Review abgeschlossen
- [ ] Freigabeentscheidung dokumentiert

---

## Noch offen nach diesem PR

Vor einer Statusänderung von `bronze_candidate` auf `bronze` sind noch nötig:

1. Peer Review durch eine zweite Person
2. Trust Review durch Kursleitung, QA- oder Trust-Rolle
3. Entscheidung, ob Maintainer und Contributor in `metadata.yml` final gesetzt werden
4. Optional: Test mit einem zweiten Modell oder einer zweiten Plattform
5. Optional: Ergänzung weiterer Testfälle für Silber-Kandidatur

---

## Vorgeschlagene Merge-Entscheidung

**Empfehlung:** Noch nicht direkt als `bronze` mergen, sondern als **reviewfähigen Bronze-Kandidaten** einreichen.

Der Inhalt ist weitgehend vollständig, aber Peer Review und Trust Review stehen noch aus.

Vorgeschlagener Zielstatus nach Review:

```yaml
status: bronze
review_status: approved
merge_allowed: true
```
