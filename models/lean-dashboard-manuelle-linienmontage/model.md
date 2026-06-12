# Model

## Kurzbeschreibung

Das Modell verbindet einfache Produktionsdaten mit Lean-Management-Logik. Es soll bestehende manuelle Montage- oder Produktionslinien nicht automatisch optimieren, sondern Hypothesen fuer Engpaesse, Verschwendung und PDCA-Tests erzeugen.

## Schritte oder Felder

1. Datengrenze bestaetigen
2. Linienkontext erfassen
3. Stationsdaten eingeben
4. Taktzeit und Durchlaufzeit berechnen
5. wertschoepfende Zeit je Station erfassen
6. nicht wertschoepfenden Rest ableiten
7. NVA-Rest in Verlustcluster aufteilen
8. Lean-Prinzipien je Station vorschlagen
9. Engpass- und Potenzialhypothesen bilden
10. PDCA-Arbeitspaket und To-Dos vorbereiten
11. Ergebnisbericht und One-Pager erzeugen

## Wichtige Begriffe

### Taktzeit

Taktzeit beschreibt die rechnerisch verfuegbare Zeit je Stueck. Im Modell wird sie aus Produktionszeit, Schichtanzahl, Linienauslastung und Sollmenge berechnet.

### Wertschoepfende Zeit

Zeit, in der am Produkt ein direkter Wert entsteht, zum Beispiel Montage, Fuegen oder Bearbeitung.

### NVA-Rest

Nicht wertschoepfende Restzeit. Im Modell:

```text
NVA-Rest = Taktzeit - wertschoepfende Zeit
```

Dieser Rest kann in Cluster wie Warten, Wege, Suchen/Greifen, Pruefen, Nacharbeit, Ruesten, Rueckfragen, Material/Logistik oder Dokumentation aufgeteilt werden.

### Engpasskandidat

Die Station mit der hoechsten Belastung gegenueber der Taktzeit. Das ist nur ein Kandidat und muss vor Ort validiert werden.

## Lean-Prinzipien im Modell

Das Modell kann aus NVA-Clustern passende Lean-Prinzipien vorschlagen, zum Beispiel:

- 5S bei Such- und Greifzeiten
- Standard Work bei Varianten- oder Ablaufunklarheit
- Yamazumi bei unausgeglichener Stationslast
- Kanban oder Materialflusslogik bei Material- und Logistikverlusten
- Jidoka oder Qualitaet-im-Prozess bei Pruefung und Nacharbeit
- SMED bei Ruest- oder Umstellzeit

## Entscheidungslogik

Dieses Modell sammelt Fragen, Inputs und Reviewpunkte. Es trifft keine automatisierten Entscheidungen ueber Menschen.

## Menschliche Review-Punkte

- Stimmen die Eingabedaten mit der realen Situation ueberein?
- Wurden personenbezogene Leistungsdaten vermieden?
- Sind NVA-Kategorien fachlich richtig einsortiert?
- Ist der Engpass vor Ort beobachtbar?
- Sind Qualitaet, Ergonomie und Arbeitssicherheit beruecksichtigt?
- Ist ein PDCA-Test klein genug, reversibel und messbar?
