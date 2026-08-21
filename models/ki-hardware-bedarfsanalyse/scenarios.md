# Szenario-Triade

Diese Szenario-Triade zeigt, wann das Modell gut funktioniert, wann Nacharbeit noetig ist und wann es keine konkrete Hardwareempfehlung geben darf.

Alle Szenarien sind synthetisch bzw. anonymisiert und enthalten keine echten Kundendaten.

## 1. Positives Szenario: Soloberaterin mit Hybrid-Strategie

### Eingabe

Eine selbststaendige Beraterin moechte Cloud-KI weiter nutzen, aber sensible Zwischenstaende und lokale Workflow-Experimente kontrollierter verarbeiten. Sie arbeitet allein, hat ein begrenztes Budget, keine Medienlast und moechte mittelfristig lokale Wissensbasis- und Agentenworkflows testen.

### Erwartetes Ergebnis

- Zielklasse: Klasse 3 in leichter, kompakter Auspraegung
- Alternative: Klasse 2 als Pilot- oder Uebergangsloesung
- Ampel: Gelb
- Keine konkrete Produktempfehlung ohne aktuelle Quellenpruefung
- Offene Punkte zu Datenarten, lokaler Wissensbasis und Betriebsaufwand

### Expertenfeedback

Das Szenario ist passend, weil Nutzung, Datenlage, Nutzerzahl und Zielkonflikte ausreichend klar sind. Das Modell kann eine nachvollziehbare Empfehlungstendenz ableiten, ohne eine konkrete Kaufentscheidung vorwegzunehmen.

### Risiko

Die lokale Loesung koennte ueberdimensioniert werden, wenn der tatsaechliche lokale Workload klein bleibt.

### Naechster Schritt

Worksheet vervollstaendigen, lokale Datenarten klaeren und eine kleine Shortlist fuer Klasse 2 und Klasse 3 vorbereiten.

## 2. Nachbearbeitbares Szenario: KMU mit gemeinsamer Coding-LLM

### Eingabe

Ein KMU mit 10 Mitarbeitenden nutzt bereits Cloud-KI und moechte zusaetzlich eine lokale Coding-LLM fuer gemeinsame Nutzung bereitstellen. Ziel ist ein lokales Modell in der groesseren Mittelklasse. Mehrere Mitarbeitende sollen teilweise gleichzeitig zugreifen. Das Budget ist grob vorhanden, aber Betriebsmodell, gleichzeitige Nutzerzahl und Adminverantwortung sind noch nicht geklaert.

### Erwartetes Ergebnis

- Zielklasse: Klasse 3 oder Klasse 6 light pruefen
- Ampel: Gelb
- Keine konkrete Produktempfehlung
- Rueckfragen zu Parallelitaet, Betrieb, Modellgroesse, Rollen und Backup
- Hinweis auf Mehrnutzerlast, KV-Cache, Session-Management und Betriebsmodell

### Expertenfeedback

Die Richtung ist plausibel, aber fuer eine konkrete Hardwareentscheidung fehlen zentrale Angaben. Das Modell soll hier nicht sofort ein Geraet nennen, sondern die kritischen Luecken sichtbar machen.

### Risiko

Ein Einzelplatzsystem koennte faelschlich als Teamloesung geplant werden. Parallelitaet, Betrieb und Wartung wuerden dann unterschaetzt.

### Naechster Schritt

Maximal drei Rueckfragen stellen:

1. Wie viele gleichzeitige Sessions sind realistisch?
2. Wer betreibt und wartet die lokale Umgebung?
3. Ist die lokale LLM produktiv geplant oder nur als Pilot?

## 3. Negatives Szenario: Vertrauliche Dokumente mit unklarer Freigabe

### Eingabe

Ein Unternehmen moechte "sofort eine KI-Workstation" fuer vertrauliche Dokumente und potenziell KI-VO-nahe Prozesse kaufen. Budget ist unklar, Cloud-Nutzung ist vielleicht verboten, Nutzerzahl und Datenarten sind unklar. Trotzdem wird eine konkrete Geraeteliste angefordert.

### Erwartetes Ergebnis

- Ampel: Rot
- Keine konkrete Hardwareempfehlung
- Hinweis auf Datenschutz-, Rechts-, IT- und Betriebspruefung
- Erst Bedarfsaufnahme und Worksheet vervollstaendigen
- Maximal drei Rueckfragen stellen

### Expertenfeedback

Dieses Szenario ist fuer eine direkte Empfehlung ungeeignet. Sensible Daten, unklare Cloud-Policy, unklare Nutzerzahl und rechtliche Naehe verhindern eine serioese Produktauswahl.

### Risiko

Eine vorschnelle Produktempfehlung koennte Datenschutz, Governance, Betrieb und Beschaffungssicherheit gefaehrden.

### Naechster Schritt

Keine Hardware nennen. Zuerst Datenlage, Cloud-Policy, Nutzerzahl, Budget und verantwortlichen Betrieb klaeren.
