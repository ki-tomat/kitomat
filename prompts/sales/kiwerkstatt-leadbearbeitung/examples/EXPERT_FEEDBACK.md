# Expert Feedback: Szenarien und Learnings

Dieses Dokument gibt Feedback zu den Beispiel-Szenarien und zeigt, worauf bei der praktischen Anwendung zu achten ist.

---

## Szenario 1: Lead-Scoring (Prompt 1)

**Input:** `input-01-lead-scoring.md`  
**Output:** `output-01-lead-scoring.md`

### ✅ Was gut gelungen ist

1. **Klare Struktur:** Lead-Score, Begründung, Unsicherheiten sind sauber getrennt
2. **Nachvollziehbarkeit:** Jeder Score wird mit Kriterien begründet
3. **Markierung von Unsicherheiten:** "Nicht genannt" ist explizit gekennzeichnet, nicht erraten
4. **Handlung:** Der Output liefert einen klaren nächsten Schritt (Kontaktaufnahme, Recherche, etc.)
5. **Vorsicht bei Annahmen:** Keine erfundenen Angaben - z.B. wird nicht von Budget ausgegangen, nur weil es typisch ist

### ⚠️ Worauf du bei der Nutzung achten solltest

1. **ICP-Passung überprüfen:** Der Lead-Score ist für KMU-KI-Beratung optimiert
   - Wenn deine Zielgruppe anders ist (z.B. Enterprise), muss der ICP angepasst werden
   - Beispiel: Handwerksbetriebe sind ein Idealtyp, Tech-Startups wahrscheinlich nicht

2. **Brancheninformationen sind wichtig:**
   - Unbekannte oder neu entstehende Branchen → Score bleibt konservativ
   - Das ist richtig, aber erfordert manuelles Follow-up für Recherche

3. **Lead-Quellen interpretieren:**
   - Ein Lead aus kalter Outreach hat andere Signale als ein Inbound-Lead
   - Der Prompt berücksichtigt das, aber du solltest die Quelle immer angeben

4. **Budget ist nicht alles:**
   - Ein Budget ist ein positives Signal, aber nicht allein entscheidend
   - Ein unbekanntes Budget mit sehr hohem Fit kann trotzdem wertvoll sein

### 🔍 Dinge zum Verbessern (optional)

- **Branchenkontexte:** Könnten mehr Beispiele für häufige Fehleinschätzungen hinzufügen
- **Länderparameter:** Das Paket ist für Deutschland optimiert; internationale Anwendung erfordert Anpassungen
- **Zeitsensitivität:** Saisonale Effekte (z.B. Q4) könnten dokumentiert sein

---

## Szenario 2: CRM-Zusammenfassung (Prompt 2)

**Input:** `input-02-crm-zusammenfassung.md`  
**Output:** `output-02-crm-zusammenfassung.md`

### ✅ Was gut gelungen ist

1. **Treue zum Gespräch:** Der Output basiert auf tatsächlich gesagten Dingen, nicht auf Interpretationen
2. **Markierung von Unsicherheiten:** Z.B. "Gesprächsstimmung: Nicht eindeutig aus Transkript ableitbar"
3. **Struktur für CRM:** Felder sind so geordnet, dass sie direkt in ein CRM passen
4. **Draft-Status:** Klar als "Entwurf – nicht geprüft" gekennzeichnet, nicht als final
5. **AI Estimates getrennt:** Wenn die KI eine Einschätzung macht (z.B. Kaufwahrscheinlichkeit), ist sie ausdrücklich als "AI-Schätzung" markiert

### ⚠️ Worauf du bei der Nutzung achten solltest

1. **Gesprächstranskript vs. Notizen:**
   - Vollständige Transkripte liefern bessere Ergebnisse
   - Handschriftliche Notizen sind anfällig für Missverständnisse
   - Tipp: Nutze Voice-to-Text vor Prompt-Anwendung

2. **Kontaktinformationen:**
   - Stelle sicher, dass du nur anonymisierte oder fiktive Beispiele testest
   - Keine echten Email-Adressen oder Nummern in Test-Daten

3. **CRM-Feldkompatibilität:**
   - Der Prompt liefert generische Felder
   - Dein CRM könnte andere oder zusätzliche Felder brauchen
   - Nutze `input-layer/crm-field-mapping.md` um Felder zu mapppen

4. **Follow-Up-Datum Interpretation:**
   - Die KI versucht, ein Datum abzuleiten, aber ist konservativ
   - Fehlende oder vage Datumsangaben ("bald", "nächste Woche") werden as Unsicherheit markiert
   - Du musst das Follow-Up-Datum noch spezifizieren

5. **Budget-Angaben nicht extrapolieren:**
   - Wenn das Gespräch "Budget ist eingeplant" sagt, wird KEINE konkrete Summe erfunden
   - Das ist richtig und wichtig - aber erfordert, dass du nachhakst

### 🔍 Dinge zum Verbessern (optional)

- **Multi-Speaker Support:** Aktuell beste Ergebnisse mit 1-2 Gesprächspartnern
- **Mehrsprachigkeit:** Deutsch ist optimiert; Englisch funktioniert, andere Sprachen weniger
- **Gesprächsdauer:** Sehr lange Gespräche (>45min) können gekürzt werden, ohne Informationen zu verlieren

---

## Szenario 3: Budgeteinwände (Prompt 3)

**Input:** `input-03-budgeteinwand.md`  
**Output:** `output-03-budgeteinwand.md`

### ✅ Was gut gelungen ist

1. **Respektvolle Tonalität:** Keine Manipulationstechniken, kein "Überreden"
2. **Hypothesen-Denken:** Nicht "der Lead will nicht zahlen", sondern "mögliche Gründe für Einwand"
3. **Mehrere Optionen:** Der Output liefert verschiedene Antwortmöglichkeiten, nicht nur eine
4. **Erlaubte Angebote:** Der Prompt respektiert deine Vorgaben, was du anbieten darfst
5. **Rückzug möglich:** Es wird auch dokumentiert, wann ein sauberer Rückzug die beste Option ist

### ⚠️ Worauf du bei der Nutzung achten solltest

1. **Kontextangabe ist entscheidend:**
   - Gib den bisherigen Gesprächskontext an ("Wir haben über Feature X gesprochen")
   - Je mehr Kontext, desto bessere Suggestionen
   - Ohne Kontext wird der Output zu generisch

2. **"Erlaubte Angebote" spezifizieren:**
   - Was darfst du anbieten? (Rabatt? Extended Trial? Zahlungsplan?)
   - Was nicht? (Gratis Version? Unbegrenzte Nutzung?)
   - Das MUSS du angeben

3. **Gesprächsphase wichtig:**
   - Ein Einwand in Phase 2 (Discovery) erfordert andere Antworten als in Phase 5 (Close)
   - Der Prompt berücksichtigt das, aber du musst die Phase angeben

4. **Manipulation vermeiden:**
   - Der Prompt ist darauf trainiert, KEINE aggressiven Verkaufstechniken zu nutzen
   - Wenn der Output dir zu "weich" vorkommt, ist das RICHTIG, nicht falsch
   - Druck und Manipulation führen zu schlechteren Ergebnissen

5. **Keine erfundenen Rabatte:**
   - Der Prompt wird KEINE konkreten Rabatt-Prozente erfinden
   - "20% Rabatt" wird nicht generiert, wenn nicht explizit erlaubt
   - Das ist eine Sicherheitsmesnahme und richtig so

### 🔍 Dinge zum Verbessern (optional)

- **Produktkenntnisse:** Prompt könnte mit spezifischen Feature-Vorteilen arbeiten (wenn du die hinzufügst)
- **Kundenhistorie:** Long-Term-Kunden vs. Neukunden erfordern unterschiedliche Ansätze
- **Competitive Pressure:** Wenn Konkurrenz eine Rolle spielt, sollte das im Kontext sein

---

## Übergreifende Learnings

### Trust & Safety

✅ **Das Paket macht das richtig:**
- Keine finalen Vertriebsentscheidungen ohne Human Review
- Keine erfundenen Daten (Budget, ROI-Zahlen, Referenzen)
- Datenschutz-Checkpoints vor KI-Verarbeitung
- Human-Review verpflichtend dokumentiert

### Wann dieses Paket funktioniert am besten

✅ **Optimale Einsatzszenarien:**
1. B2B-Vertrieb mit qualifizierten Leads
2. Strukturierte Gespräche mit Notizen/Transkripten
3. Klar definierte ICP und Angebote
4. Teams mit CRM-Disciplin
5. Where Human Review ist verfügbar und praktiziert

### Wann vorsichtig sein

⚠️ **Szenarien mit Limitationen:**
1. Sehr großes Volumen ohne Review-Kapazität → Human Review wird zum Bottleneck
2. Unklar definierte Zielgruppe → ICP muss erst spezifiziert werden
3. Fehlende Gesprächsnotizen → Prompts brauchen Kontext
4. Automatisierte CRM-Integration ohne Prüfung → NICHT ERLAUBT
5. Teams, die auf "Auto-Pilot" arbeiten wollen → Passt nicht

---

## Feedback für Weiterentwicklung

### Für die nächste Version könnten hilfreiche Erweiterungen sein:

1. **Multilingual Support** (EN, FR, ES)
2. **Integration-Guides** für HubSpot, Salesforce, Pipedrive
3. **Video-Tutorials** zur Anwendung
4. **Batch-Processing** für mehrere Leads gleichzeitig
5. **Feedback-Loop:** Wie man die Prompts basierend auf Ergebnissen verbessert

---

## Kontakt für Fragen

Hast du Fragen zu einem Szenario oder möchtest Feedback geben?

- **GitHub Issues:** Nutze das Label `example-feedback`
- **Email:** community@kitomat.local
- **Pull Requests:** Gerne weitere Szenarien beitragen!

---

**Letztes Update:** 2026-05-27  
**Expert Review By:** KIWerkstatt Community
