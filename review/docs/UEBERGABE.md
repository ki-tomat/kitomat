# Übergabe des Review-Moduls

**Stand:** 2. August 2026
**Erstellt von:** Review-Team (Ibrahim Günes)
**Branch:** `review/pre-review-wizard`
**Für:** wer immer als Nächstes daran arbeitet

Dieses Dokument ist der Einstieg, wenn Sie das Review-Modul übernehmen. Es sagt
ehrlich, was funktioniert, was nur behauptet ist und wo die nächsten Schritte
liegen.

---

## 1. In einem Absatz

Der Review-Agent prüft eingereichte KItomat-Beiträge in sieben Phasen gegen
einen Katalog aus 55 Prüfpunkten und vergibt einen Ampelstatus. Vor jedem
Modellaufruf läuft eine rein lokale Sicherheitsprüfung, die Beiträge mit
personenbezogenen Daten stoppt, bevor irgendetwas übertragen wird. Ein
menschlicher Reviewer sieht das Ergebnis im Cockpit, kann jeden Befund
übersteuern und gibt die Gates einzeln frei. Der Agent entscheidet nichts:
keinen Merge, keinen Status, keine Freigabe.

Das Paket läuft **ohne API-Schlüssel** — mit einem Mock-Provider, der die Kette
vollständig durchspielt. Ein echtes Sprachmodell ist eine Datei und eine
Registrierungszeile.

---

## 2. Was Sie zuerst tun sollten

```bash
python -m pip install pyyaml jsonschema

# Testsuite — belegt, dass die Gates greifen
python3 review/tests/run_tests.py --repo .

# Ein echter Beitrag durch die volle Kette
python3 review/tools/run_review.py . models/kmu-ki-online-marketing-workbook
```

Danach `review/wizard/KItomat_Review_Wizard_v2.html` im Browser öffnen und die
erzeugte `review_run.json` hineinziehen. In fünf Minuten haben Sie das ganze
System gesehen.

**Danach lesen:** `ARCHITEKTUR.md` (wie es funktioniert),
`SCHNITTSTELLEN.md` (wo es KItomat berührt), `BETRIEB.md` (wie man es
betreibt).

---

## 3. Stand: was fertig ist

| Teil | Zustand | Belegt durch |
|---|---|---|
| Prüfkatalog, 55 Punkte | fertig | jeder Punkt mit Quellenangabe im Projektbestand |
| `review_run.schema.json` | fertig | Schema-Validierung in der Testsuite |
| Stufe 1a (Phase 0) | fertig | an 7 echten Beiträgen + 3 Fixtures geprüft |
| Gate-Engine | fertig | 9 Einzeltests der Bedingungen |
| Orchestrator, 7 Phasen | fertig | End-to-End-Lauf in der Testsuite |
| Provider-Schnittstelle | fertig | Mock erfüllt sie |
| Mock-Provider | fertig | läuft ohne Netzzugriff |
| Berichte, 3 Stück | fertig | Erzeugung in der Testsuite geprüft |
| Reviewer-Cockpit | fertig | manuell geprüft |
| GitHub-Workflows | **geschrieben, nie gelaufen, bewusst nicht aktiv** | siehe Abschnitt 4a |
| Testsuite, 3 Fixtures | fertig | — |
| Dokumentation | fertig | dieses Verzeichnis |

---

## 4. Was ehrlich noch fehlt

| Lücke | Auswirkung | Aufwand |
|---|---|---|
| **Kein Provider gegen einen echten Endpunkt erprobt** | Adapter für Ollama, OpenRouter und beliebige OpenAI-kompatible Dienste sind gebaut, aber nie gegen einen laufenden Dienst getestet. Mit `mock` liefern alle inhaltlichen Prüfpunkte `not_assessable`. | 1–2 Stunden mit Schlüssel oder lokalem Modell |
| **Workflows nie in GitHub gelaufen** | YAML ist plausibel, aber ungetestet. Erfahrungsgemäß braucht so etwas 2–3 Korrekturläufe. | ein halber Tag |
| **Kein Cache nach Commit-SHA** | Mehrfaches Setzen des Labels startet den Agenten erneut und kostet erneut. | 2 Stunden |
| **`review/intake/` als Zwischenablage** | Der Eingang funktioniert. Nicht umgesetzt ist eine automatische Übernahme nach `prompts/`, `datasets/` oder `models/` nach bestandenem Review — das macht bislang ein Mensch. | halber Tag |
| **Nur 3 Fixtures** | Abgedeckt sind PII, Vollständigkeit, Fehlalarme. Nicht abgedeckt: `data_risk: red`, Trust-Eskalation, Fork-Fall. | je Fixture ~1 Stunde |
| **Gate-Logik doppelt** | Python und JavaScript müssen von Hand synchron gehalten werden. | Struktur überdenken |
| **E-Mail-Schritt ungetestet** | Ohne Secrets nie gelaufen. | 1 Stunde |

**Die wichtigste Einschränkung:** Von 55 Prüfpunkten sind 15 deterministisch
und getestet. Die übrigen 40 sind definiert, laufen durch die Kette, liefern
aber ohne echten Provider kein fachliches Urteil. Wer das Paket übernimmt,
sollte das dem Projektowner gegenüber nicht anders darstellen.

---

## 4a. Die zwei Wege in den Review

### Weg 1 — Manuell über `review/intake/` (funktioniert sofort)

Für Beiträge, die nicht als Pull Request kommen. Die Kursunterlagen sehen
das ausdrücklich vor: Wer nicht pushen kann, gibt die Dateien beim Dozenten
ab.

```bash
# Paket nach review/intake/<ordnername>/ legen, dann:
python3 review/tools/run_review.py . review/intake/<ordnername>
```

Der Agent liest `artifact_type` aus `metadata.yml` — der Pfad verrät hier ja
nichts — und leitet daraus den künftigen Zielpfad ab. Im Ergebnis stehen
beide: `artifact.path` (wohin es gehört) und `source.intake_path` (wo es
gefunden wurde).

Dieser Weg braucht **keine Workflows, kein Label, keine Secrets**. Er ist
auch der einfachste, um den Agenten überhaupt auszuprobieren.

Details: `review/intake/README.md`.

### Weg 2 — Automatisch über GitHub

**Aktuell nicht aktiv.** Der Agent läuft bislang nur von Hand:

```bash
python3 review/tools/run_review.py . models/<artefakt>
```

### Warum die Workflows nicht aktiv sind

Die beiden Dateien liegen unter `review/workflows/` und **nicht** unter
`.github/workflows/`. Das ist Absicht, kein Versehen: Im Zielverzeichnis
würden sie sofort greifen. Solange sie danebenliegen, sind es Vorlagen und
das Repository verhält sich unverändert.

Ebenso fehlt das Label `review-required` im Repository noch.

### Scharfschalten

| Schritt | Aufwand |
|---|---|
| Label `review-required` anlegen (Einstellungen → Labels) | 2 Minuten |
| Beide Dateien aus `review/workflows/` nach `.github/workflows/` kopieren | 2 Minuten |
| Secrets `MAIL_SERVER`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `REVIEWER_MAIL_GROUP` | 30 Minuten |
| Testlauf mit einem echten Pull Request und Nacharbeit | ein halber Tag |

Ohne die Mail-Secrets wird der Versandschritt übersprungen. Der Lauf gilt
trotzdem als erfolgreich, und der Kurzstatus erscheint als Kommentar am Pull
Request.

### Abweichung von der ursprünglichen Vorgabe

Der Projektowner hatte formuliert: *„…sollte eine Mail an die
Reviewer-Gruppe gehen und der Agent kicked off."* Also erst die Mail, dann
der Agent.

Umgesetzt ist die umgekehrte Reihenfolge:

```
Label gesetzt → Agent prüft → E-Mail mit dem Ergebnis
```

**Begründung:** So enthält die Mail bereits den Ampelstatus. Der Reviewer
sieht auf einen Blick, ob es sich lohnt, den Beitrag zu öffnen — und ob es
eilig ist. Bei der ursprünglichen Reihenfolge käme eine Mail mit dem Inhalt
„es ist etwas angekommen", und das Ergebnis müsste separat nachgesehen
werden.

Diese Abweichung wurde beim Übergabetermin am 3. August offen angesprochen.
Wer die ursprüngliche Reihenfolge möchte, ergänzt einen zweiten Mail-Schritt
am Anfang von `review-agent-run.yml` — das ist ein Block von etwa zehn
Zeilen und ändert sonst nichts.

### Was der Trigger nicht ist

Der native GitHub-Status „Review required" aus der Branch-Protection ist
etwas anderes als ein Label. Er erscheint automatisch an jedem Pull Request
ohne Approval, ist nicht steuerbar und lässt sich technisch **nicht** als
Auslöser für einen Workflow verwenden. Deshalb das Label. Diese Auslegung
wurde am 2. August festgelegt und vom Projektowner bestätigt.

---

## 5. Bekannte Risiken

**Die Workflows sind ungetestet.** Besonders die `workflow_run`-Kette und der
`download-artifact`-Schritt über Workflow-Grenzen hinweg sind erfahrungsgemäß
fehleranfällig. Rechnen Sie mit Nacharbeit.

**Der PII-Vorfilter ist eine Abwägung.** Die Messung vom 1. August ergab: 85
von 85 Treffern des Musters `phone_like` waren Fehlalarme (Abrufdaten,
DOI-Fragmente, Zahlenspannen). Deshalb blockiert dieses Muster nicht mehr,
sondern meldet nur. Der Preis: Eine echte Telefonnummer im Fließtext würde
nicht mehr automatisch stoppen, sondern nur zur Sichtung markiert. Die
Begründung samt Messwerten steht als Kommentar in `review-checks.yml`.

**Fork-PRs sind konstruiert, nicht erprobt.** Die Zwei-Workflow-Lösung ist der
übliche Weg, wurde hier aber nie gegen einen echten Fork getestet.

**Ein Sprachmodell kann Quellen nicht verifizieren.** Deshalb sind
`sources.declared` und `sources.strong_claims_backed` als `human_mandatory`
markiert. Wer diese Markierung entfernt, um Klicks zu sparen, hebelt genau die
Prüfung aus, für die das Projekt existiert.

---

## 6. Offene Entscheidungen des Projektowners

Diese Punkte kann kein Entwickler allein klären:

1. **Provider und Budget.** Welcher Anbieter, wer trägt die Kosten, wo liegt
   der Schlüssel?
2. **Reviewer-Verteiler.** Welche Adresse bekommt die Benachrichtigung?
3. **Fork-Beiträge.** Sollen externe Beiträge unterstützt werden? Wenn nein,
   vereinfacht sich der Workflow erheblich.
4. **`phone_like`-Abwägung.** Ist die Entscheidung aus Abschnitt 5 mitgetragen?
5. **Sichtbarkeit.** Aktuell liegen alle Berichte öffentlich in
   `review/results/`. Das war eine bewusste Entscheidung — mit der Auflage,
   dass Berichte Artefakte bewerten, nicht Personen.

---

## 7. Empfohlene Reihenfolge für die Weiterarbeit

1. **Workflows in einem Testrepository zum Laufen bringen.** Bis das steht, ist
   alles andere Theorie.
2. **Provider anbinden**, sobald die Entscheidung da ist. Anleitung in
   `BETRIEB.md`, Abschnitt 4.
3. **Fixtures ergänzen**, besonders `data_risk: red` und die Trust-Eskalation.
4. **Cache nach Commit-SHA**, sobald echte Kosten entstehen.
5. **Übernahme aus `review/intake/`** automatisieren, wenn regelmäßig
   Beiträge ohne Pull Request eingehen.

---

## 8. Wenn Sie mit einer KI weiterarbeiten

Das Paket ist dafür vorbereitet. Ein sinnvoller Einstiegsprompt:

```text
Du arbeitest am KItomat Review-Modul in der Branch review/pre-review-wizard.

Lies zuerst in dieser Reihenfolge:
  review/docs/UEBERGABE.md      — Stand und offene Punkte
  review/docs/ARCHITEKTUR.md    — wie es funktioniert
  review/docs/SCHNITTSTELLEN.md — Grenzen zum Hauptprojekt
  review/policy/review-checks.yml — was geprüft wird

Unveränderliche Regeln:
  - Der Agent entscheidet nichts: kein Merge, kein Status, keine Freigabe.
  - Gates öffnen nur über nachprüfbare Bedingungen, nie über eine
    Modellbewertung.
  - Phase 0 läuft vor jedem Modellaufruf. Bei einem Treffer wird nichts
    übertragen.
  - Es wird ausschließlich nach review/ geschrieben. main, prompts, datasets
    und models bleiben unberührt.
  - Prüfregeln ändert man in review-checks.yml, nicht im Code.

Nach jeder Änderung:
  python3 review/tests/run_tests.py --repo .

Gib mir zuerst eine kurze Bestandsaufnahme und einen Änderungsplan,
bevor du etwas änderst.
```

Die Datei `review-checks.yml` enthält bei jedem Prüfpunkt eine
`source`-Angabe. Wer wissen will, warum etwas geprüft wird, findet dort das
Ursprungsdokument. Das ist wichtiger als es klingt: Ohne diese Rückverweise
ist nach drei Monaten nicht mehr nachvollziehbar, welche Regel aus dem Kurs
stammt und welche jemand erfunden hat.

---

## 9. Was Sie nicht ändern sollten, ohne es zu wissen

| Stelle | Warum |
|---|---|
| `audit.human_decision_required` immer `true` | Zusage an den Projektowner |
| Erlaubte Werte in `status_suggestion` | Kein finaler Status durch den Agenten |
| Gate-Bedingungen in `gate_engine.py` | Wenn eine Modellbewertung ein Gate öffnet, ist die Trennung aufgehoben |
| Hard Stop vor Übertragung | Die einzige Absicherung gegen Datenabfluss |
| `not_assessable` als gültiges Ergebnis | Ohne diesen Wert erfindet ein Modell ein `pass` |

Diese fünf Punkte sind der Kern. Alles andere ist Handwerk.

---

## 10. Kontakt

Fragen zum Aufbau: dieses Verzeichnis. Fragen zur Abstimmung mit dem
Hauptprojekt: `SCHNITTSTELLEN.md`. Fragen zu Entscheidungen, die hier als
offen markiert sind: an den Projektowner.

Das Konzeptpapier, das der Projektowner abgenommen hat, liegt als
`KONZEPT_KI_REVIEW_AGENT.md` beim Review-Team.
