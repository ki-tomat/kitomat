# Failure Modes: Auftragsklärung mit SCS und Coverdale-Zielscheibe

## Bekannte Schwachstellen

### 1. Zu vager Kurzbrief → oberflächliche SCS-Analyse

**Symptom:** Situation = Wiederholung des Kurzbriefs. Complication = „das ist schwierig". Solution = „wir wollen es besser machen."  
**Ursache:** Weniger als 3 Sätze Input oder kein Kontext zu Auftraggeber und Treiber.  
**Gegenmaßnahme:** Kurzbrief auf mind. 5 Sätze erweitern. Explizit benennen: Wer beauftragt, was ist das Problem, was ist bereits gescheitert.

---

### 2. Complication wird als bloße Schwierigkeit formuliert

**Symptom:** Complication beschreibt Aufwand oder Risiken, aber keinen strukturellen Treiber.  
**Ursache:** SCS-Logik ist nicht intuitiv — viele formulieren Complication als „das ist aufwendig weil…"  
**Gegenmaßnahme:** Im Prompt-Text ist ein Hinweis eingebaut. Falls Output trotzdem schwach: Nachfragen mit „Was passiert, wenn dieses Projekt nicht stattfindet?"

---

### 3. Stakeholder-Quadrant bleibt unscharf

**Symptom:** Nur eine Stakeholder-Gruppe benannt, keine Unterscheidung strategisch/operativ.  
**Ursache:** Auftraggeber-Perspektive fehlt im Kurzbrief.  
**Gegenmaßnahme:** Kurzbrief ergänzen um „Wer beauftragt mich?" und „Für wen ist das Ergebnis relevant?"

---

### 4. Cross-Check wird übersprungen oder ist trivial

**Symptom:** Cross-Check lautet: „Alle Quadranten sind konsistent."  
**Ursache:** KI neigt zu Bestätigungen wenn Prompt das nicht explizit verhindert.  
**Gegenmaßnahme:** Prompt enthält explizite Aufforderung zur Absicherungsfrage auch bei scheinbarer Konsistenz. Falls Output trotzdem trivial: Prompt erneut ausführen mit Hinweis „Finde mindestens eine offene Frage."

---

### 5. Endpoint-Datum bleibt generisch

**Symptom:** Endergebnis-Quadrant enthält „zeitnah" oder „Q3" ohne konkretes Datum.  
**Ursache:** Kein Datum im Kurzbrief genannt.  
**Gegenmaßnahme:** Im Kurzbrief Zeitrahmen oder Deadline nennen. Alternativ: Output als Gesprächsgrundlage nutzen und Datum im Auftraggeber-Gespräch fixieren.

---

### 6. Nicht für sensible Projektinhalte geeignet

**Symptom:** Kurzbrief enthält Kundennamen, interne Finanzdaten oder personenbezogene Informationen.  
**Ursache:** Prompt gibt keine Datenschutz-Hinweise.  
**Gegenmaßnahme:** Kurzbrief vor Eingabe anonymisieren. Keine echten Kundennamen, Vertragssummen oder personenbezogenen Daten verwenden. Output in datenschutzkonformer Umgebung erstellen.

---

### 7. Coverdale-Zielscheibe wird mit Projektplan verwechselt

**Symptom:** Nutzer füllt Zielscheibe mit Arbeitspaketen und Meilensteinen statt mit Klärungsfragen.  
**Ursache:** Der Name „Zielscheibe" klingt nach Planung — die Zielscheibe ist aber ein Klärungstool, kein Gantt-Chart.  
**Gegenmaßnahme:** README lesen. Die Zielscheibe klärt den Auftrag — die operative Planung folgt danach.
