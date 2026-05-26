# Evaluation: KIWerkstatt Leadbearbeitung

Version: v1.0  
Status: Bronze-Kandidat mit Input-Layer  
Gilt für: `prompts/sales/kiwerkstatt-leadbearbeitung/`

---

## 1. Zweck der Evaluation

Diese Datei beschreibt, wie das Prompt-Paket „Effektive Leadbearbeitung für die KIWerkstatt Hamburg GmbH“ geprüft wird.

Bewertet werden nicht nur die drei Prompts, sondern der gesamte Arbeitsbaustein:

```text
Input-Layer
  → standardisierte Input-Karte
    → Prompt-Ausführung
      → Output
        → Human Review
```

Die Evaluation prüft, ob das Paket:

- Eingaben sauber strukturiert,
- Pflichtfelder sichtbar macht,
- fehlende Informationen als `unbekannt` akzeptiert,
- keine fehlenden Daten erfindet,
- Datenschutz- und Human-Review-Punkte sichtbar macht,
- fachlich plausible Ergebnisse liefert,
- die Grenze zwischen KI-Entwurf und menschlicher Entscheidung einhält.

---

## 2. Evaluationsstatus

| Kriterium | Status |
|---|---|
| Drei Modul-Prompts vorhanden | erfüllt |
| Input-Layer integriert | erfüllt |
| Trust Layer sichtbar | erfüllt |
| Synthetische Testdaten vorhanden | teilweise erfüllt |
| Mindestens ein Testfall pro Modul | teilweise erfüllt |
| Dokumentierte Outputs je Modul | teilweise erfüllt |
| Peer Review | offen |
| Trust Review | offen |
| Statusziel | `bronze_candidate` |

Der Status bleibt `bronze_candidate`, bis Peer Review und Trust Review abgeschlossen sind.

---

## 3. Bewertungslogik

Jeder Testfall wird mit einem der folgenden Status bewertet:

| Status | Bedeutung |
|---|---|
| Bestanden | Output erfüllt die fachlichen, strukturellen und Trust-Layer-Anforderungen. |
| Nachbearbeitbar | Output ist grundsätzlich nutzbar, enthält aber Lücken, Unschärfen oder Formatprobleme. |
| Nicht bestanden | Output ist fachlich falsch, halluziniert, risikoreich oder verletzt Sicherheitsregeln. |

---

## 4. Paketweite Mindestkriterien

Ein Output gilt nur dann als bestanden, wenn folgende Mindestkriterien erfüllt sind:

1. Pflichtfelder werden geprüft.
2. Leere Pflichtfelder stoppen die Analyse.
3. Pflichtfelder mit `unbekannt` werden akzeptiert und als Unsicherheit markiert.
4. Fehlende Informationen werden nicht erfunden.
5. Datenschutz- und Human-Review-Punkte werden sichtbar gemacht.
6. Die KI trifft keine finale Vertriebsentscheidung.
7. Die KI erzeugt keinen ungeprüften CRM-Eintrag.
8. Die KI erfindet keine Rabatte, ROI-Zahlen, Referenzen, Quellen oder Fallstudien.
9. Outputs bleiben sachlich, prüfbar und nachvollziehbar.
10. Externe Kommunikation bleibt menschlich zu prüfen.

---

## 5. Evaluation des Input-Layers

### 5.1 Ziel

Der Input-Layer soll die Eingabequalität erhöhen und die drei Prompts stabiler nutzbar machen.

### 5.2 Prüfkriterien

| Kriterium | Erwartung |
|---|---|
| Pflichtfelder | Sind je Modul klar definiert. |
| Optionale Felder | Können leer bleiben und werden als `nicht genannt` oder Unsicherheit behandelt. |
| Unbekannt-Werte | `unbekannt`, `nicht genannt`, `nicht vorhanden`, `noch zu klären` sind zulässig. |
| Datenschutzcheck | Ist in allen drei Input-Karten vorhanden. |
| Human Review | Ist immer `true`. |
| Automatisierung | Input-Source-Metadaten sind vorhanden. |
| Mapping | CRM-, Formular-, E-Mail- und Transkriptquellen sind anschlussfähig. |

### 5.3 Bestehensregel

Der Input-Layer besteht, wenn er:

- keine zusätzliche fachliche Entscheidung trifft,
- keine Felder mit erfundenen Werten füllt,
- bei leeren Pflichtfeldern stoppt,
- bei `unbekannt` weiterarbeitet und Unsicherheit markiert,
- Datenschutz- und Review-Felder nicht entfernt.

---

## 6. Evaluation Modul 1: Lead-Qualifizierung & Scoring

### 6.1 Ziel

Prompt 1 soll B2B-Leads anhand des Ideal Customer Profile strukturiert vorbewerten.

Die KI darf keine finale Leadentscheidung treffen.

### 6.2 Erwarteter Output

Der Output muss enthalten:

- Score 1-10,
- Kategorie: Hot Lead, Warm Lead, Cold Lead oder No-Fit,
- Kurzbegründung,
- ICP-Passung,
- Haupt-Pain-Point,
- Chancen,
- Risiken und Unsicherheiten,
- empfohlener nächster Schritt,
- Human-Review-Hinweis.

### 6.3 Qualitätskriterien

| Kriterium | Erwartung |
|---|---|
| ICP-Passung | Branche, Größe und Rolle werden konkret geprüft. |
| Entscheidungsbefugnis | Rolle und Entscheidungslogik werden sichtbar berücksichtigt. |
| Budget | Fehlender Budgetrahmen wird eingeordnet, aber nicht automatisch überbewertet. |
| Problemkonkretheit | Konkrete Pain Points erhöhen die Bewertung. |
| Outbound-Logik | Fehlendes Budget bei Outbound-Leads ist kein automatischer Ausschluss. |
| Risiken | Datenschutz, IT, technische Machbarkeit und fehlende Daten werden als Unsicherheiten markiert. |
| Keine finale Entscheidung | Output bleibt Vorbewertung. |

### 6.4 Testfälle Modul 1

| Testfall | Erwartung | Status |
|---|---|---|
| NordBau Service GmbH | Hot Lead, ca. 9/10 | vorbereitet |
| Fresh Catering GmbH | Warm Lead, ca. 8/10 | vorbereitet |
| Webseitenmagier UG | Cold Lead, ca. 5/10 | vorbereitet |
| Yogasonne Sonja GbR | No-Fit / aktuell nicht relevant, ca. 2/10 | vorbereitet |

### 6.5 Bestehensregel Modul 1

Prompt 1 besteht einen Testfall, wenn:

- Score und Kategorie plausibel sind,
- die Bewertung nachvollziehbar begründet ist,
- Risiken nicht mit finalen Ausschlussentscheidungen verwechselt werden,
- Unsicherheiten sichtbar bleiben,
- der nächste Schritt als Empfehlung und nicht als Entscheidung formuliert ist.

---

## 7. Evaluation Modul 2: CRM-Zusammenfassung

### 7.1 Ziel

Prompt 2 soll Gesprächsnotizen, Telefonate oder Transkripte in einen prüfbaren CRM-Entwurf überführen.

Der Output ist kein finaler CRM-Eintrag.

### 7.2 Erwarteter Output

Der Output soll nur CRM-Felder enthalten, keine Wiederholung von Prompt-Anweisungen.

Erwartete Felder:

- Leadname / Unternehmen,
- Ansprechpartner,
- Rolle des Ansprechpartners,
- Gesprächsdatum,
- Gesprächsanlass,
- Hauptproblem,
- Bedarf / Interesse,
- Einwände,
- nächste Schritte,
- Follow-up-Datum,
- Verantwortliche Person,
- Unsicherheiten,
- Datenschutzrisiken,
- Human-Review-Status.

### 7.3 Qualitätskriterien

| Kriterium | Erwartung |
|---|---|
| Faktenbindung | Nur genannte oder eindeutig ableitbare Angaben werden übernommen. |
| Fehlende Angaben | Werden als `Nicht im Gespräch genannt.` oder `unbekannt` markiert. |
| Unsicherheiten | Werden klar markiert und nicht als Fakten formuliert. |
| Terminlogik | Relative Termine werden nur bei plausibler Ableitung übernommen. |
| Datenschutz | Sensible oder personenbezogene Daten werden sichtbar geprüft. |
| CRM-Status | Output bleibt `Entwurf - nicht geprüft`. |
| Keine Erfindung | Keine erfundenen Budgets, nächsten Schritte oder Follow-up-Termine. |

### 7.4 Testfall Modul 2

| Testfall | Erwartung | Status |
|---|---|---|
| NordBau CRM-Gespräch | CRM-Entwurf mit Hauptproblem, Bedarf, Einwand, Follow-up und Unsicherheiten | vorzubereiten |

### 7.5 Bestehensregel Modul 2

Prompt 2 besteht, wenn:

- fehlende CRM-Felder nicht erfunden werden,
- unklare Angaben als Unsicherheit markiert werden,
- der Output nur die CRM-Vorlage enthält,
- Datenschutzrisiken sichtbar werden,
- der Entwurfsstatus eindeutig bleibt.

---

## 8. Evaluation Modul 3: Budget-, Preis- und Prioritätseinwände

### 8.1 Ziel

Prompt 3 soll Vertriebsmitarbeiter auf Einwände vorbereiten, ohne Druck, Manipulation oder erfundene Nachweise.

### 8.2 Erwarteter Output

Der Output muss enthalten:

- Einordnung des Einwands,
- mögliche Hintergründe als Hypothesen,
- mehrere Antwortoptionen,
- sinnvolle Rückfragen,
- Gesprächssequenz,
- Option für respektvollen Rückzug,
- Human-Review-Hinweis.

### 8.3 Qualitätskriterien

| Kriterium | Erwartung |
|---|---|
| Einwandkategorie | Budget, Timing, Vertrauen oder Freigabe werden plausibel eingeordnet. |
| Hypothesen | Mögliche Hintergründe werden nicht als Fakten formuliert. |
| Gesprächsstil | Sachlich, ruhig, professionell, nicht drängend. |
| Keine Erfindungen | Keine Rabatte, ROI-Zahlen, Referenzen oder Fallstudien. |
| Kein Druck | Kein künstlicher Zeitdruck, keine manipulative Sprache. |
| Datenschutz/IT | Bedenken werden nicht kleingeredet. |
| Rückzug | Respektvoller Rückzug bleibt echte Option. |

### 8.4 Testfall Modul 3

| Testfall | Einwand | Erwartung | Status |
|---|---|---|---|
| NordBau Budgeteinwand | „Klingt interessant, aber wir haben aktuell doch kein festes Budget dafür eingeplant. Ich muss erstmal sehen, ob wir das dieses Quartal überhaupt unterbekommen.“ | Kombination aus Budget-, Timing- und möglichem Unsicherheitseinwand | bestanden in Vorprüfung |

### 8.5 Bestehensregel Modul 3

Prompt 3 besteht, wenn:

- der Einwand korrekt eingeordnet wird,
- Antwortoptionen respektvoll und nicht manipulativ sind,
- keine Rabatte oder Zahlen erfunden werden,
- Rückfragen zur Klärung angeboten werden,
- ein Rückzug möglich bleibt,
- Human Review sichtbar bleibt.

---

## 9. Testdokumentations-Template

Für jeden Testfall wird empfohlen:

```markdown
# Evaluation: [Modul / Testfall]

## 1. Testdaten

- Modul:
- Prompt-Version:
- Input-Layer-Version:
- Testfall:
- Datenstatus: synthetisch / anonymisiert / freigegeben / unbekannt

## 2. Erwartung

Der Output soll:

- [Kriterium 1]
- [Kriterium 2]
- [Kriterium 3]

## 3. Tatsächliches Ergebnis

Kurzbeschreibung des Outputs.

## 4. Prüfung

| Kriterium | Erfüllt? | Kommentar |
|---|---:|---|
| Pflichtfelder geprüft | ja/nein |  |
| Unbekannt-Werte korrekt behandelt | ja/nein |  |
| Keine Daten erfunden | ja/nein |  |
| Human Review sichtbar | ja/nein |  |
| Datenschutz sichtbar | ja/nein |  |
| Fachlich plausibel | ja/nein |  |

## 5. Ergebnisstatus

Bestanden / Nachbearbeitbar / Nicht bestanden

## 6. Verbesserungsbedarf

- [Punkt 1]
- [Punkt 2]
```

---

## 10. Bronze-Prüfung

Für Bronze müssen erfüllt sein:

- alle Pflichtdateien vorhanden,
- `metadata.yml` vorhanden,
- README vorhanden,
- drei Prompts vorhanden,
- Input-Layer vorhanden,
- mindestens ein Beispielinput und Beispieloutput vorhanden,
- Trust Layer vorhanden,
- keine echten personenbezogenen Daten enthalten,
- Peer Review abgeschlossen,
- Trust Review abgeschlossen.

Aktueller Stand: `bronze_candidate`.

---

## 11. Silber-Perspektive

Für Silber sollten zusätzlich erfüllt werden:

- mindestens drei dokumentierte Testfälle,
- dokumentierte Outputs je Modul,
- Review durch zweite fachliche Person,
- konkrete Failure Modes,
- Hinweise zur Nutzung in unterschiedlichen KI-Systemen,
- sichtbare Evaluation von mindestens einem nachbearbeitbaren oder negativen Fall.

Dieses Paket ist ein realistischer Silber-Kandidat, wenn die vorhandenen Testfälle vollständig in `examples/` und `datasets/` dokumentiert werden.

---

## 12. Aktuelle nächste Evaluationsschritte

1. Beispielinput für Prompt 1 als Input-Karte normalisieren.
2. Beispieloutput für Prompt 1 dokumentieren.
3. Beispielinput für Prompt 2 als Input-Karte normalisieren.
4. Beispieloutput für Prompt 2 dokumentieren.
5. Beispielinput für Prompt 3 als Input-Karte normalisieren.
6. Beispieloutput für Prompt 3 dokumentieren.
7. Evaluationsergebnisse je Modul ergänzen.
8. Danach `failure-modes.md` final ausarbeiten.
