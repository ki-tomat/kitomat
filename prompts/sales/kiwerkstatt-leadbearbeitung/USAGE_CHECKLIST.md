# Quick-Start Checklist: Leadbearbeitung mit diesem Paket

Schneller Überblick, wie du die Prompts praktisch einsetzt.

---

## 📋 VOR DER ERSTEN NUTZUNG

- [ ] README.md gelesen
- [ ] Deine Zielgruppe (ICP) definiert
- [ ] Deine erlaubten Angebote dokumentiert
- [ ] CRM-System vorbereitet (oder Dokumentationssystem)
- [ ] Team briefing durchgeführt: "Das ist kein Auto-Pilot"
- [ ] Human-Review-Verantwortungen geklärt

---

## 🎯 MODULE WÄHLEN

### Modul 1: Lead-Scoring (Prompt 1)
**Nutze diesen Prompt wenn:**
- Du einen neuen Lead bewertet möchtest
- Vor dem ersten Kontakt eine Vorqualifizierung brauchst
- Du nicht weißt, ob ein Lead in deinen ICP passt

**Input brauchst du:**
- Unternehmen / Branche
- Unternehmensgröße
- Ansprechpartner-Rolle
- Wie du den Lead gefunden hast
- Was das Unternehmen tut / welche Probleme es hat

**Zeit:** ~5 Minuten Vorbereitung, ~2 Minuten Prompt-Ausführung

---

### Modul 2: CRM-Zusammenfassung (Prompt 2)
**Nutze diesen Prompt wenn:**
- Du ein Gespräch oder Meeting geführt hast
- Du die Informationen strukturiert im CRM dokumentieren möchtest
- Du aus Notizenzu einer CRM-Eintrags kommen willst

**Input brauchst du:**
- Gesprächstranskript oder strukturierte Notizen
- Datumund Uhrzeit des Gesprächs
- Ziel des Gesprächs
- Wer war dabei?

**Zeit:** ~10 Minuten Notizen zusammenfassen, ~2 Minuten Prompt-Ausführung

---

### Modul 3: Budgeteinwände (Prompt 3)
**Nutze diesen Prompt wenn:**
- Ein Lead einen Budget-, Preis- oder Zeiteinwand äußert
- Du respektvolle Gegenargumente brauchst
- Du nicht überreden, sondern verstehen möchtest

**Input brauchst du:**
- Bisheriger Gesprächskontext
- Der konkrete Einwand (Worte?)
- Gesprächsphase (Early Discovery / Close?)
- Was darfst du anbieten? (Rabatt, Trial, Zahlungsplan?)
- Dein Ziel (Überzeugung, Rückzug, Recherche?)

**Zeit:** ~5 Minuten Input vorbereiten, ~2 Minuten Prompt-Ausführung

---

## 🔄 WORKFLOW PRO MODUL

### Schritt 1️⃣: Input vorbereiten

**Für alle Module:**
- Nutze das Input-Layer-Schema (YAML oder Formular)
- Fullfill Pflichtfelder
- Fehlende Infos als `unbekannt` markieren (nicht erfinden!)
- Datenschutz-Checkbox: Keine echten personenbezogenen Daten?

**Input-Schema findest du in:**
- `input-layer/input-schema-prompt-1.yml` (Lead-Scoring)
- `input-layer/input-schema-prompt-2.yml` (CRM-Summary)
- `input-layer/input-schema-prompt-3.yml` (Budgeteinwände)

---

### Schritt 2️⃣: Preflight-Check

- [ ] Alle Pflichtfelder gefüllt?
- [ ] Keine echten Kundendaten enthalten?
- [ ] Keine Betriebsgeheimnisse?
- [ ] Datumsformate korrekt? (YYYY-MM-DD)
- [ ] Branchencode/Rolle bekannt?

Nutze: `input-layer/preflight-check.md`

---

### Schritt 3️⃣: Prompt ausführen

**In deinem AI-Tool:**
1. Kopiere den Prompt aus `prompts/prompt-X-*.md`
2. Ersetze Platzhalter mit deinen Input-Daten
3. Führe aus (Claude, ChatGPT, Llama, etc.)

**Oder automatisiert:**
- API-Call mit vorbereiteter Input-Karte
- Returns strukturiertes Output-Format

---

### Schritt 4️⃣: Output prüfen

**Kritische Punkte:**
- [ ] Alle Felder ausgefüllt (oder `unbekannt` gekennzeichnet)?
- [ ] Keine erfundenen Details (z.B. konkrete Budget-Summen)?
- [ ] Begründungen logisch?
- [ ] Unsicherheiten gekennzeichnet?
- [ ] Status ist "Entwurf – nicht geprüft"?

**Dauer:** ~5-10 Minuten

---

### Schritt 5️⃣: Human Review (VERPFLICHTEND)

**Diese Punkte MUSS eine Person prüfen:**

- [ ] Lead-Kategorisierung (Modul 1): Stimmt die Einstufung?
- [ ] CRM-Feldmappung (Modul 2): Passen die Daten ins dein CRM?
- [ ] Angebote (Modul 3): Entsprechen die Suggestionen deiner Strategie?
- [ ] Datenschutz: Keine Risiken beim weitere Kontakt?
- [ ] Nächste Schritte: Sind sie im Kontext sinnvoll?

**Reviewer:** Sales Manager, Team Lead, Compliance (je nach Kontext)

**Dauer:** ~5-15 Minuten

---

### Schritt 6️⃣: Übernahme in Systeme

**Nach Approval:**
- [ ] CRM-Eintrag erstellen (oder Update)
- [ ] Follow-Up calendared
- [ ] Team informiert
- [ ] Status in Tracking aktualisiert

---

## ⏱️ ZEITBUDGET PRO LEAD

| Schritt | Dauer |
|---------|-------|
| Input vorbereiten | 5 min |
| Preflight-Check | 2 min |
| Prompt ausführen | 2 min |
| Output prüfen | 5-10 min |
| Human Review | 10-15 min |
| **Gesamt** | **24-34 min** |

**Tipps zum schneller werden:**
- Input-Template vorbereiten (Wiederverwendung)
- Batch-Prompts ausführen (5-10 Leads gleichzeitig)
- Review-Prozess automatisieren (Approval-Workflow)

---

## 🚨 KRITISCHE REGELN

### ❌ DAS DARFST DU NICHT

- Ergebnisse ohne Human Review ins CRM übernehmen
- Budget-Angaben erfinden oder extrapolieren
- Diese Prompts für automatische Leadfilterung ohne Prüfung nutzen
- Manipulation oder aggressive Verkaufstechniken basierend auf Output
- Echte Kundendaten ohne Anonymisierung verwenden
- Transkripte mit personenbezogenen Daten hochladen

### ✅ DAS SOLLTEST DU MACHEN

- Human Review verpflichtend machen
- Unsicherheiten dokumentieren
- Datenschutz vorab prüfen
- Feedback-Loop: Was funktioniert? Was nicht?
- Regelmäßig Prompts überprüfen (Drift vermeiden)

---

## 📞 HÄUFIGE SZENARIEN

### Szenario A: Neuer Lead aus der Website
```
1. Input-Schema füllen (Lead-Scoring Modul)
2. Preflight-Check: Alle Felder? Keine echten Daten?
3. Prompt 1 ausführen
4. Sales Manager prüft: Passt zu unserem ICP?
5. Falls JA: Kontaktaufnahme vorbereiten
6. Falls NEIN: Zu Nurture-List oder archivieren
```

### Szenario B: Nach dem Demo-Call
```
1. Transkript/Notizen sammeln
2. Input-Schema füllen (CRM-Summary Modul)
3. Preflight-Check
4. Prompt 2 ausführen
5. Sales Manager prüft CRM-Draft
6. CRM-Eintrag erstellen/updaten
7. Follow-Up calendared
```

### Szenario C: Kunde sagt "zu teuer"
```
1. Kontext dokumentieren (was wurde besprochen?)
2. Input-Schema füllen (Budgeteinwand Modul)
3. Preflight-Check
4. Prompt 3 ausführen
5. Sales Manager prüft Suggessionen
6. Choose best option & communicate
7. Dokumentiere outcome
```

---

## 🔧 TROUBLESHOOTING

| Problem | Lösung |
|---------|--------|
| Output ist zu generisch | Input-Details erhöhen, Kontext erweitern |
| Output stimmt nicht mit unserem CRM | `input-layer/crm-field-mapping.md` nutzen |
| Prompt dauert zu lange | Kürzere Inputs, weniger Detail |
| Zu viele "unbekannt"-Markierungen | Input-Sammlung verbessern |
| Human Review wird zum Bottleneck | Team-Schulung, Approval-Workflow |

---

## 📈 METRIKEN ZUM TRACKEN

Um zu messen, ob das Paket funktioniert:

- **Lead-Score Genauigkeit:** % der Scores, die sich bei Kontakt bestätigen
- **CRM-Coverage:** % der Leads mit vollständigen CRM-Einträgen
- **Human-Review Turnaround:** Durchschnittliche Zeit bis Approval
- **Einwand-Erfolgsquote:** % der "Budgeteinwand"-Szenarien, die zu Deals führen
- **Time-Saving:** Minuten eingespart vs. manuelle Datenerfassung

---

## 💡 BEST PRACTICES

1. **Standardisierte Input-Sammlung:** Template-basiert, nicht freestyle
2. **Weekly Review:** 1x wöchentlich schauen, welche Szenarien gut laufen
3. **Feedback zur KI:** Wenn Output nicht hilft, dokumentieren & Prompt anpassen
4. **Team Training:** Regelmäßig zeigen, wie man richtig inputs vorbereitet
5. **Datenschutz Culture:** "Keine echten Daten" sollte selbstverständlich sein

---

## 📚 WEITERE RESSOURCEN

- `README.md` – Überblick und Konzept
- `workflow.md` – Detaillierter Prozess
- `failure-modes.md` – Was schiefgehen kann
- `examples/EXPERT_FEEDBACK.md` – Learnings aus Szenarien
- `input-layer/` – Technische Input-Dokumentation

---

**Version:** 0.1.0  
**Letztes Update:** 2026-05-27  
**Kontakt:** community@kitomat.local
