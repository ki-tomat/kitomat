## Archetyp: Legal / Datenschutz

*Das neue KI-Tool liegt zur Prüfung auf ihrem Schreibtisch — bevor irgendetwas freigegeben wird, will sie wissen, welche Datenflüsse wohin gehen, ob die Zweckbindung eingehalten wird und welche Rechtsgrundlage trägt.*

### Entscheidungslogik
Der Rechts- und Datenschutz-Stakeholder bewertet KI-Einführungen primär nach ihrem **Risikoprofil** gemäß dem EU AI Act 2024 (Hochrisiko-KI bei Beschäftigungsentscheidungen) und prüft gleichzeitig die **DSGVO-Konformität** (Art. 22 DSGVO, EDPB-Guidelines 2018). Zentrale Prüfpunkte:

1. **Risikoklassifizierung:** Ist das System Hochrisiko (z. B. automatisierte Leistungsbewertung, Einstellung)?
2. **Rechtsgrundlage:** Liegt eine zulässige Grundlage vor, die den Anforderungen von Lukács & Váradi (2023) entspricht?
3. **Folgenabschätzung:** Erforderlich ist eine DPIA, die Zweckbindung, Datenminimierung und Speicherbegrenzung prüft.
4. **Mensch-in-der-Schleife:** Sicherstellung von menschlicher Überwachung, weil Explainability allein nicht ausreicht (Hamon et al., 2022) und ein echtes „Recht auf Erklärung" fehlt (Wachter et al., 2017).
5. **Dokumentationspflicht:** Aufzeichnung von Verarbeitungsvorgängen, Modell-Versionen, Test- und Audit-Ergebnissen.

### Kommunikationspräferenzen
- **Formale Schriftstücke:** Risiko- und Compliance-Berichte, DPIA-Vorlagen, Vertragsklauseln
- **Präzise Kurzbriefe** (max. 1–2 Seiten) mit klaren Handlungsaufforderungen
- **Frühzeitige Einbindung:** Legal will nicht kurz vor Rollout, sondern beim Use-Case-Steckbrief beteiligt werden
- **Technisch-juristische Hybridsprache:** Nicht rein visuell, nicht rein technisch — immer mit rechtlicher Bewertung ergänzt

Was blockiert: vage Aussagen wie „die Daten bleiben sicher", „wir speichern nichts", „das regelt der Anbieter", unklare Trainingsdaten.

### Haltung gegenüber KI-Adoption
Grundsätzlich **risikoavers, aber nicht innovationsfeindlich**. Legal erkennt das Potenzial von KI, verlangt jedoch Nachweise für Governance-Reife. Die Haltung lautet: „Ja, aber nur governable."

**Treiber:** Vertrauenswürdige AI, klare Risikoklassifikation, nachvollziehbare Kontrollen, frühzeitige Einbindung.

**Blocker:** Unklare Rechtsgrundlagen, nicht beherrschbare Vendor-Risiken, intransparente Modelle, fehlende Schutzmaßnahmen.

**Häufige Einwände:** „Ist das Profiling oder automatisierte Entscheidung?", „Welche AI-Act-Pflichten greifen?", „Können wir die Entscheidung erklären?", „Welche Daten gehen wohin?"

### Prompt-Empfehlungen
1. **Risiko-Check:** „Klassifiziere das vorgesehene KI-System gemäß EU AI Act (verboten / Hochrisiko / geringes Risiko) und begründe die Einordnung."
2. **DSGVO-Prüfung:** „Identifiziere eine geeignete Rechtsgrundlage gemäß Art. 6 DSGVO für die geplante Datenverarbeitung."
3. **DPIA-Unterstützung:** „Liste die erforderlichen Elemente einer Datenschutz-Folgenabschätzung (Zweckbindung, Datenminimierung, Speicherbegrenzung, Sicherheitsmaßnahmen) auf."
4. **Mensch-in-der-Schleife:** „Beschreibe, wie menschliche Überwachung und Intervention im Entscheidungsprozess gewährleistet werden können."
5. **Explainability-Ergänzung:** „Nenne neben einer Modell-Erklärung zwei weitere Schutzmaßnahmen (z. B. Counterfactual-Analyse, Audit-Trail), die über reine Explainability hinausgehen."

Tonalität: präzise, formal, dokumentationsorientiert. Immer konkrete Use-Case-Beschreibung voranstellen.

### Sprachkalibrierung

**Ton-Register:** Analytisch / Kooperativ  
**Intensität:** Mittel  
**Was funktioniert:** Frühzeitig einbinden, nicht kurz vor Rollout. Semantic Triplet: „Rechtsgrundlage klären, Zweckbindung prüfen, Audit-Trail sichern" — zeigt, dass du die richtigen Fragen bereits gestellt hast. Formale Schriftstücke (DPIA, Risikoklassifikation) als Gesprächsbasis, nicht als Nachlieferung.  
**Was nicht funktioniert:** Vage Zusicherungen wie „die Daten bleiben sicher" ohne Dokumentation — erhöht Misstrauen statt es zu senken.  
**Individuelle Abweichung:** Wenn der reale Legal-Verantwortliche stark vom Archetyp abweicht → Artefakt 1, Pfad B, Block 3.

### Quellen
1. Europäische Union (2024). *Regulation (EU) 2024/1689 — Artificial Intelligence Act*. EUR-Lex.
2. EDPB / Article 29 Working Party (2018). *Guidelines on Automated Individual Decision-Making and Profiling*. EDPB.
3. Lukács, A., & Váradi, S. (2023). *GDPR-compliant AI-based automated decision-making in the world of work*. Computer Law & Security Review. DOI: 10.1016/j.clsr.2023.105848
4. Hamon, R., et al. (2022). *Bridging the gap between AI and explainability in the GDPR*. IEEE Computational Intelligence Magazine. DOI: 10.1109/MCI.2021.3129960
5. Wachter, S., Mittelstadt, B., & Floridi, L. (2017). *Why a Right to Explanation of Automated Decision-Making Does Not Exist in the GDPR*. International Data Privacy Law. DOI: 10.1093/idpl/ipx005
