# Workflow: KIWerkstatt Leadbearbeitung

Version: v1.0  
Status: Integrationsfassung mit Input-Layer

---

## 1. Prozessübersicht

```text
Rohdaten / Nutzerangabe / CRM / Formular / Gesprächsnotiz
        ↓
Input-Layer
        ↓
Preflight-Check
        ↓
standardisierte Input-Karte
        ↓
Prompt 1, Prompt 2 oder Prompt 3
        ↓
KI-Entwurf
        ↓
Human Review
        ↓
manuelle Übernahme in Vertriebsprozess, CRM oder Gesprächsvorbereitung
```

---

## 2. Schrittfolge

### Schritt 1: Daten erfassen

Daten können manuell oder automatisiert kommen aus:

- CRM-System
- Formular
- E-Mail
- Gesprächsnotiz
- Meeting-Transkript
- CSV oder Tabelle
- manueller Recherche

### Schritt 2: Input-Karte wählen

| Anwendungsfall | Input-Karte |
|---|---|
| Lead bewerten | `input-schema-prompt-1.yml` |
| Gespräch ins CRM überführen | `input-schema-prompt-2.yml` |
| Budget- oder Prioritätseinwand vorbereiten | `input-schema-prompt-3.yml` |

### Schritt 3: Preflight-Check

Vor jeder Prompt-Nutzung wird geprüft:

- Sind alle Pflichtfelder vorhanden?
- Sind fehlende Angaben als `unbekannt` markiert?
- Sind personenbezogene oder sensible Daten enthalten?
- Ist der Datenfreigabestatus bekannt?
- Ist Human Review sichtbar?
- Gibt es Rückfragen vor der Analyse?

### Schritt 4: Prompt ausführen

Der passende Prompt wird mit der standardisierten Input-Karte gestartet.

### Schritt 5: Ergebnis prüfen

Die KI-Ausgabe ist immer ein Entwurf. Sie muss menschlich geprüft werden, bevor sie in CRM, Vertriebsentscheidung oder externe Kommunikation einfließt.

---

## 3. Nicht-Ziele

Der Workflow darf nicht genutzt werden für:

- automatische finale Leadentscheidungen
- ungeprüfte CRM-Einträge
- autonome Kundennachrichten
- Verarbeitung sensibler Echtdaten ohne Freigabe
- erfundene Rabatte, ROI-Zahlen, Quellen, Referenzen oder Fallstudien
