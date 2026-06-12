# Effektive Leadbearbeitung für die KIWerkstatt Hamburg GmbH

Prompt-Paket für strukturierte Leadbearbeitung in kleinen und mittleren Unternehmen.

**Pfad im Repository:** `prompts/sales/kiwerkstatt-leadbearbeitung/`  
**Status:** `bronze_candidate`  
**Sprache:** Deutsch  
**Artefakttyp:** Prompt-Paket  
**Kategorie:** Sales / Vertrieb / CRM / KI-Beratung  
**Datenrisiko:** Gelb  
**Human Review:** Erforderlich

---

## 1. Kurzbeschreibung

Dieses Prompt-Paket unterstützt Vertriebsmitarbeiter, kleine Agenturen, selbstständige B2B-Dienstleister und KI-Berater dabei, Leads strukturierter zu bearbeiten.

Das Paket wurde für die fiktive **KIWerkstatt Hamburg GmbH** entwickelt. Die KIWerkstatt ist eine kleine B2B-KI-Beratung, die KMU bei KI-Einführung, Prompt Engineering und Prozessoptimierung unterstützt.

Das Hauptangebot der KIWerkstatt ist ein vierwöchiges KI-Einstiegspaket für KMU, bestehend aus:

- KI-Potenzialanalyse
- Prompt-Workshop
- Prozessauswahl
- Pilotkonzept

Der Schwerpunkt dieses Prompt-Pakets liegt auf drei neuralgischen Punkten der Leadbearbeitung:

1. Lead-Qualifizierung und Scoring
2. Gesprächs- und Meetingzusammenfassung für CRM
3. Umgang mit Budget-, Preis- und Prioritätseinwänden im Vertrieb

Die Prompts liefern strukturierte Voranalysen, Entwürfe und Gesprächsvorbereitungen. Sie ersetzen keine Vertriebsentscheidung, keine CRM-Freigabe und keine fachliche Prüfung durch einen Menschen.

---

## 2. Zielgruppe

Dieses Prompt-Paket richtet sich an:

- Vertriebsmitarbeiter in KMU
- kleine Agenturen
- selbstständige B2B-Dienstleister
- KI-Berater mit Vertriebsaufgaben
- Teams, die ihre Leadbearbeitung strukturierter dokumentieren und prüfen möchten

---

## 3. Enthaltene Module

| Modul | Datei | Zweck |
|---|---|---|
| 1 | `prompts/prompt-1-lead-scoring.md` | B2B-Leads anhand des ICP strukturiert vorbewerten |
| 2 | `prompts/prompt-2-crm-zusammenfassung.md` | Gesprächsnotizen oder Transkripte in einen prüfbaren CRM-Entwurf überführen |
| 3 | `prompts/prompt-3-budgeteinwaende.md` | Budget-, Preis- und Prioritätseinwände respektvoll vorbereiten |

---

## 4. Input-Layer

Dieses Paket enthält einen vorgeschalteten **Input-Layer**.

Der Input-Layer überführt manuelle oder automatisierte Eingaben in standardisierte Input-Karten. Dadurch werden Pflichtfelder sichtbar, fehlende Informationen können als `unbekannt` markiert werden und Datenschutz- sowie Human-Review-Punkte werden früh geprüft.

Dateien:

- `input-layer/input-layer-konzept.md`
- `input-layer/preflight-check.md`
- `input-layer/input-schema-prompt-1.yml`
- `input-layer/input-schema-prompt-2.yml`
- `input-layer/input-schema-prompt-3.yml`
- `input-layer/crm-field-mapping.md`

Grundlogik:

```text
Nutzer / CRM / Formular / Transkript / CSV
        ↓
Input-Layer
        ↓
standardisierte Input-Karte
        ↓
Prompt 1, 2 oder 3
        ↓
KI-Ergebnis
        ↓
Human Review
```

---

## 5. Empfohlener Workflow

1. Eingabedaten in das passende Kurzformular oder die YAML-Input-Karte übertragen.
2. Preflight-Check ausführen.
3. Leere Pflichtfelder ergänzen oder ausdrücklich als `unbekannt` markieren.
4. Passenden Prompt mit der standardisierten Input-Karte ausführen.
5. Ergebnis menschlich prüfen.
6. Erst nach Human Review in CRM, Follow-up oder Kundengespräch übernehmen.

---

## 6. Trust Layer

```yaml
data_risk: yellow
personal_data_possible: true
human_review_required: true
ai_act_proximity: transparency
```

Begründung:

- Lead- und CRM-Daten können personenbezogene oder vertrauliche Informationen enthalten.
- Ergebnisse können Vertriebspriorisierung beeinflussen.
- Outputs können in CRM-Systeme oder Kundengespräche einfließen.
- Deshalb ist Human Review verpflichtend.

---

## 7. Was dieses Paket nicht leisten darf

Dieses Prompt-Paket darf nicht verwendet werden, um:

- Leads automatisch und final auszusortieren
- CRM-Einträge ungeprüft produktiv zu übernehmen
- personenbezogene Echtdaten unkontrolliert zu verarbeiten
- Rabatte, ROI-Zahlen, Referenzen oder Fallstudien zu erfinden
- manipulative Vertriebssprache zu erzeugen
- rechtliche, steuerliche oder datenschutzrechtliche Bewertungen zu ersetzen
- vollständige Vertriebsautomatisierung ohne menschliche Prüfung umzusetzen

---

## 8. Repository-Struktur

```text
prompts/sales/kiwerkstatt-leadbearbeitung/
├── README.md
├── metadata.yml
├── workflow.md
├── input-layer/
│   ├── input-layer-konzept.md
│   ├── preflight-check.md
│   ├── input-schema-prompt-1.yml
│   ├── input-schema-prompt-2.yml
│   ├── input-schema-prompt-3.yml
│   └── crm-field-mapping.md
├── prompts/
│   ├── prompt-1-lead-scoring.md
│   ├── prompt-2-crm-zusammenfassung.md
│   └── prompt-3-budgeteinwaende.md
├── examples/
├── datasets/
└── variants/
```

---

## 9. Review-Status

Dieses Paket ist als `bronze_candidate` vorbereitet.

Für Bronze müssen mindestens erfüllt sein:

- alle Pflichtdateien vorhanden
- `metadata.yml` vollständig und valide
- mindestens ein Beispielinput und Beispieloutput vorhanden
- Trust Layer dokumentiert
- keine echten personenbezogenen Daten enthalten
- Peer Review durchgeführt
- Trust Review ohne Blocker abgeschlossen

---

## 10. Rechtlicher und fachlicher Hinweis

Dieses Artefakt ist eine Arbeits- und Orientierungshilfe.

Es ersetzt keine fachliche, rechtliche, datenschutzrechtliche oder vertriebliche Prüfung. Die KI-Ausgaben dürfen nicht als automatische Entscheidung genutzt werden. Leadbewertung, CRM-Übernahme, Follow-up-Planung und externe Kommunikation müssen durch eine verantwortliche Person geprüft und freigegeben werden.


## PR- und Abgabevorbereitung

Für die Einreichung im Community-Repository oder in einem GitHub Pull Request liegt eine vorbereitete Beschreibung vor:

- `PR_DESCRIPTION.md`

Der Status bleibt bis zum abgeschlossenen Peer Review und Trust Review bei `bronze_candidate`.
