# Application Guide: KI-Stakeholder-Persona-Framework

## Schritt 1 — Routing: Quick oder Full?

Beantworte zwei Fragen:

**Frage 1:** Geht es um eine bekannte oeffentliche Person, einen realen unbekannten Stakeholder oder eine komplementaere Persona?
- Bekannte Person → Pfad A
- Realer Stakeholder → Pfad B
- Komplementaere Persona → Pfad C

**Frage 2:** Einmalige Exploration oder Vorbereitung auf eine reale Situation?
- Exploration → Quick-Pfad (minimales Intake)
- Reale Vorbereitung → Full-Pfad (vollstaendiger Intake)

---

## Schritt 2 — Granularitaet waehlen

Waehle vor dem Intake — nicht danach:

- **Minimal:** Ich brauche eine schnelle Orientierung, keinen tiefen Dialog.
- **Standard:** Ich bereite mich auf ein konkretes Gespraech vor.
- **Tief:** Ich will eine vollstaendige Simulation oder eine komplementaere Persona auf Massschneiderniveau.

---

## Schritt 3 — Modus waehlen

- **Lesen:** Persona-Profil lesen, keine Interaktion.
- **Testen:** Ich lege Argumente vor, die Persona reagiert.
- **Sprechen:** Vollstaendiger Dialog — Persona antwortet als Person bis zum Signal "Stopp".

---

## Pfad A — Bekannte Person oder Archetyp

### Intake
1. KI prueft vorhandenes Wissen zur Person und deklariert es kurz.
2. Wissensdatum wird genannt.
3. Luecken werden durch gezielte Fragen geschlossen.
4. Granularitaet und Modus werden bestaetigt.

### Simulation starten
Nutzer beschreibt Thema. KI tritt in die Rolle ein.

### Wichtig
Bei oeffentlichen Figuren gilt das Transparenz-Protokoll:
- *(belegt)* — aus dokumentierten Quellen
- *(Ableitung)* — konsistent, aber nicht direkt belegt
- *(Spekulation)* — genuiner Unsicherheitsbereich

---

## Pfad B — Reale unbekannte Stakeholder

### Intake (Pflicht: alle drei Bloecke)

**Block 1 — Selbstprofil:**
Verwende `worksheet/intake-pfad-b.md`, Abschnitt A.
Kurze Beschreibung eigenes Kommunikationsprofil, Ziel, Rolle.

**Block 2 — Rollenbasierte Interessen:**
Fuer jede Person im Raum: Funktion und typische Interessen dieser Funktion.

**Block 3 — Individuelle Charakteristika (Pflicht):**
Was weisst du ueber diese konkreten Personen ueber ihre Rolle hinaus?
Offenheit fuer Innovationen, bekannte Dynamiken, Vorerfahrungen, Konflikte?

Wenn Block 3 leer bleibt: KI weist explizit darauf hin — Simulation bleibt auf Archetyp-Niveau.

### Persona-Empfehlung
Nach dem Intake: KI prueft ob fuer diesen Use Case weitere Personas sinnvoll waeren, die der Nutzer nicht genannt hat (z.B. Eventmanager, Kommunikationsverantwortliche).

### Multi-Persona-Simulation
- Nutzer kann Persona direkt ansprechen: "Was denkt [Rolle] dazu?"
- Nutzer kann Fokus setzen: "Ich moechte jetzt nur mit [Rolle] sprechen."
- Bei Konflikt zwischen Personas: Nutzer moderiert. KI haelt nur bei Blockade an.

### Debrief nach Simulation
Nach "Stopp": KI bietet kurze Auswertung an.
Format: Wer war ueberzeugt, wer skeptisch, was war der kritischste Einwand, was sollte anders adressiert werden.

> **Hinweis:** Wenn der Use Case HR, Recruiting, Leistungsbewertung, Legal, Datenschutz, Betriebsrat, Finance oder Compliance betrifft — oder Entscheidungen ueber Menschen vorbereitet: Ergebnisse vor Nutzung durch einen Fachexperten pruefen lassen.

---

## Pfad C — Komplementaere Persona

### Intake

#### Minimal / Standard
Selbstprofil-Snapshot (Kommunikationsstil, Staerken, Tendenzen) + Rollenarchetyp.

#### Tief
Nutze `worksheet/intake-pfad-c-tief.md` vollstaendig.
Alle drei Schichten sind Pflicht:
- Schicht 1: Erweitertes Selbstprofil
- Schicht 2: Sparringspartner-Bedarf
- Schicht 3: Archetyp-Dekonstruktion

### Profil-Kalibrierung
Nach der Profil-Darstellung: Nutzer bestaetigt, korrigiert oder ergaenzt.
Wenn das Profil falsch ist: gezielt korrigieren, kein Neustart noetig.

**Komplementaritaets-Richtung waehlen:**
- Aus Luecken ableiten: Persona fuellt was fehlt.
- Aus Entwicklungsrichtung ableiten: Persona verkoerpert wer ich werden will oder brauche.

### Persona-Ableitung
Alle drei Schichten kombiniert → kalibrierte Persona. Kein generischer Archetyp.

---

## Korrekturen waehrend der Simulation

**Kontext-Update:**
Signal: "Ich ergaenze: [neue Info]"
KI bestaetigt, nennt was sich aendert, setzt fort.

**Persona-Korrektur:**
Signal: "So redet er/sie nicht."
KI fragt: Ton, Inhalt oder beides? Nutzer beschreibt oder zeigt Korrektur. Simulation setzt fort.

---

## Persona-Profil speichern

Nach tiefer Simulation: KI fragt ob Profil gespeichert werden soll.

Exportformat:
```
## Persona-Profil: [Name / Typ]
Pfad: A / B / C
Kontext: [Use Case]
Kernmerkmale: [5-7 Punkte]
Briefing-Basis: [Stakeholder-Infos / Selbstprofil-Snapshot]
Letzte Kalibrierung: [Datum]
Korrekturen: [falls vorhanden]
```

In der naechsten Session als Briefing einsetzen — kurze Bestaetigung ob noch aktuell, dann weiter.
