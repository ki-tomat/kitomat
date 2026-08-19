# Input-Layer-Konzept für das Prompt-Paket „KIWerkstatt Leadbearbeitung“

Version: v1.1  
Status: bereinigte Integrationsfassung  
Projektkontext: Community-Projekt / Prompt-Bibliothek / KIWerkstatt Hamburg GmbH  
Zielbereich: Leadbearbeitung im B2B-Vertrieb

---

## 1. Zweck

Der Input-Layer ist ein vorgeschalteter Eingabe- und Normalisierungsbereich für das Prompt-Paket „Effektive Leadbearbeitung für die KIWerkstatt Hamburg GmbH“.

Er unterstützt die drei Module:

1. Lead-Qualifizierung & Scoring
2. Gesprächs- und Meetingzusammenfassung für CRM
3. Umgang mit Budget-, Preis- und Prioritätseinwänden im Vertrieb

Der Input-Layer trifft keine fachliche Entscheidung.  
Er überführt manuelle oder automatisierte Eingaben in standardisierte Input-Karten.

---

## 2. Ziel

Der Input-Layer soll:

- Pflichtfelder sichtbar machen,
- freie Texteingaben strukturieren,
- fehlende Informationen als „unbekannt“ erlauben,
- Datenschutz- und Trust-Layer-Punkte früh markieren,
- Human Review vor der Prompt-Ausführung sichtbar machen,
- spätere Automatisierung über CRM, Formulare, Tabellen oder Workflows vorbereiten,
- die drei Prompts fachlich stabil halten.

---

## 3. Grundprinzip

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

Die Prompts sollen nicht mehr mit ungeordnetem Freitext gestartet werden, sondern mit einer standardisierten Input-Karte.

---

## 4. Zulässige Werte bei fehlenden Informationen

Nutzer sollen keine Informationen erfinden müssen.

Zulässige Werte:

```text
unbekannt
nicht genannt
nicht vorhanden
noch zu klären
```

Regel:

- Leeres Pflichtfeld → Analyse stoppen und fehlende Informationen auflisten.
- Pflichtfeld mit Wert „unbekannt“ → Analyse darf starten, Unsicherheit muss aber im Ergebnis markiert werden.
- Optionales leeres Feld → als „nicht genannt“ oder Unsicherheit behandeln.

---

## 5. Eingabevarianten

### 5.1 Kurzformular

Für schnelle manuelle Nutzung.

Geeignet für:

- ungeübte Nutzer,
- schnelle Lead-Erfassung,
- manuelle Gesprächsvorbereitung,
- einfache Testszenarien.

### 5.2 Standardisierte YAML-Input-Karte

Für saubere Prüfung und Wiederverwendbarkeit.

Geeignet für:

- dokumentierte Testfälle,
- Community-Repository,
- strukturierte Prompt-Nutzung,
- spätere Automatisierung.

### 5.3 Automatisiertes Mapping

Für spätere Integration mit:

- CRM-Systemen,
- Formular-Tools,
- Tabellen,
- n8n / Make / Zapier,
- Meeting-Transkripten,
- E-Mail-Systemen.

Automatisierung darf nur Daten übertragen und normalisieren.  
Bewertung, CRM-Übernahme und externe Kommunikation bleiben menschlich zu prüfen.

---

## 6. Trust-Layer-Standard

Für alle drei Input-Karten gilt:

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

## 7. Standard-Datenschutzcheck

Jede Input-Karte enthält künftig:

```yaml
datenschutz_check:
  personenbezogene_daten_enthalten: ja | nein | unbekannt
  sensible_daten_enthalten: ja | nein | unbekannt
  datenfreigabe_status: synthetisch | anonymisiert | freigegeben | unbekannt
```

Für öffentliche Beispiele dürfen nur synthetische oder freigegebene Daten verwendet werden.

---

## 8. Standard-Automatisierungsmetadaten

Für manuelle und automatisierte Eingaben wird folgende Struktur empfohlen:

```yaml
input_source:
  typ: manuell | crm | formular | email | transkript | csv | recherche | unbekannt
  system:
  record_id:
  imported_at:
  mapped_by: manuell | automation | unbekannt
  mapping_confidence: hoch | mittel | niedrig | unbekannt
```

Diese Felder verbessern Nachvollziehbarkeit, spätere Automatisierung und Reviewfähigkeit.
