# Beispielanwendung 01

Dieses Beispiel ist synthetisch.

## Kontext

Eine fiktive Montagelinie fuer Baugruppe X soll im Rahmen eines KVP-Workshops analysiert werden. Die Daten enthalten keine echten Personen, Kunden oder Produktgeheimnisse.

## Eingaben

- Produktionszeit pro Schicht: 420 Minuten
- Schichtanzahl: 1
- Linienauslastung: 100 Prozent
- Sollmenge: 140 Stueck
- Stationsanzahl: 6
- Gesamtmitarbeitende: 7

## Beispielhafte Stationsdaten

| Station | Mitarbeitende | Wertschoepfend min/Teil | Beobachteter NVA-Schwerpunkt |
|---|---:|---:|---|
| Vormontage | 1 | 2,45 | Greifwege moderat |
| Fuegen | 1 | 2,10 | Suchen, Rueckfragen |
| Schrauben | 1 | 2,25 | Pruefen, kurze Wartezeit |
| Komplettierung | 1 | 2,65 | Suchen, Wege, Material |
| Endpruefung | 2 | 3,40 | Pruefen, Nacharbeit |
| Verpackung | 1 | 1,40 | Wege, Material |

## Positives Szenario

### Situation

Ein Produktionsteam nutzt ausschliesslich synthetische oder ausreichend anonymisierte Stationsdaten. Ziel ist ein KVP-Workshop fuer eine bestehende manuelle Montagelinie.

### Erwartetes Verhalten

Das Modell berechnet oder strukturiert Taktzeit, Durchlaufzeit, Stationslast, NVA-Rest und Engpasskandidaten. Es erzeugt Lean-Hypothesen, PDCA-Arbeitspaket, To-Dos und einen Bericht.

### Expertenfeedback

Das Szenario ist geeignet. Die Ergebnisse bleiben Hypothesen und werden vor Ort validiert. Die Daten enthalten keine personenbezogenen Risiken.

## Nachbearbeitbares Szenario

### Situation

Ein Team hat Stationszeiten erfasst, aber die Trennung zwischen wertschoepfender Zeit und NVA-Rest ist unscharf. Manche Notizen enthalten interne Produktdetails.

### Erwartetes Verhalten

Das Modell kann erste Hinweise geben, aber das Paket darf nicht direkt als belastbare Analyse ausgegeben werden.

### Expertenfeedback

Nachbearbeitung erforderlich: Daten anonymisieren, wertschoepfende Zeit und NVA klarer trennen, Review-Rollen ergaenzen, Shopfloor-Beobachtung nachholen und vertrauliche Details aus Exporten entfernen.

## Negatives Szenario

### Situation

Eine Fuehrungskraft moechte das Modell nutzen, um einzelne Mitarbeitende nach Geschwindigkeit zu vergleichen und daraus Leistungsentscheidungen abzuleiten.

### Erwartetes Verhalten

Dieses Szenario darf nicht verwendet werden. Das Artefakt ist fuer Prozessanalyse, nicht fuer personenbezogene Leistungsbewertung gedacht.

### Expertenfeedback

Ablehnen oder stoppen. Daten entfernen, Zweck korrigieren und nur anonymisierte Prozessdaten auf Stations- oder Linienebene verwenden. Bei Unsicherheit Trust Review einholen.

## Erwartete Ausgabe

- Taktzeit wird nachvollziehbar berechnet.
- Stationslasten werden gegen den Takt verglichen.
- NVA-Rest wird pro Station sichtbar.
- Die Komplettierung kann als Engpasskandidat erscheinen.
- Suchen, Wege und Material koennen als wichtige NVA-Cluster sichtbar werden.
- Passende Lean-Prinzipien wie 5S, Standard Work, Materialfluss oder Yamazumi werden als Hypothesen vorgeschlagen.
- Ein PDCA-Arbeitspaket und eine To-Do-Liste werden vorbereitet.

## Menschliches Expertenfeedback

Die Auswertung ist als Workshop-Vorbereitung plausibel. Vor Umsetzung muessen die Zeiten am Shopfloor beobachtet, Materialbereitstellung geprueft und Auswirkungen auf Qualitaet, Ergonomie und Arbeitssicherheit bewertet werden.
