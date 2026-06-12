# Preflight-Check vor Prompt-Nutzung

Dieser Check wird vor Ausführung von Prompt 1, Prompt 2 oder Prompt 3 durchgeführt.

---

## 1. Pflichtfeldprüfung

Prüfe:

- Sind alle Pflichtfelder vorhanden?
- Sind Pflichtfelder leer?
- Sind Pflichtfelder mit „unbekannt“, „nicht genannt“, „nicht vorhanden“ oder „noch zu klären“ markiert?

Regel:

```text
Leeres Pflichtfeld = Analyse stoppen.
Pflichtfeld mit „unbekannt“ = Analyse erlaubt, aber Unsicherheit markieren.
```

---

## 2. Datenschutzprüfung

Prüfe:

- Sind personenbezogene Daten enthalten?
- Sind sensible Daten enthalten?
- Ist der Datenfreigabestatus bekannt?
- Handelt es sich um synthetische, anonymisierte, freigegebene oder unbekannte Daten?

Pflichtstruktur:

```yaml
datenschutz_check:
  personenbezogene_daten_enthalten: ja | nein | unbekannt
  sensible_daten_enthalten: ja | nein | unbekannt
  datenfreigabe_status: synthetisch | anonymisiert | freigegeben | unbekannt
```

Bei `sensible_daten_enthalten: ja` oder `datenfreigabe_status: unbekannt` muss der Output besonders deutlich als prüfpflichtig markiert werden.

---

## 3. Human-Review-Prüfung

Für dieses Prompt-Paket gilt immer:

```yaml
human_review_required: true
```

Human Review ist besonders relevant bei:

- Lead-Score und Lead-Kategorie,
- nächstem Vertriebschritt,
- CRM-Übernahme,
- Budget-, Timing- oder Entscheidungsannahmen,
- Datenschutz- und IT-Risiken,
- externer Kommunikation mit Leads oder Kunden.

---

## 4. Unsicherheiten

Prüfe:

- Sind Budget, Rolle, Entscheidungsbefugnis und nächster Schritt belegt?
- Sind fehlende Informationen als „unbekannt“ oder „nicht genannt“ markiert?
- Gibt es widersprüchliche Angaben?
- Gibt es relative Terminangaben, die geprüft werden müssen?

---

## 5. Verhalten bei fehlenden Pflichtinformationen

Wenn Pflichtfelder leer sind, nicht mit der fachlichen Analyse starten.

Stattdessen ausgeben:

```markdown
## Fehlende Pflichtinformationen

Die Analyse kann noch nicht zuverlässig durchgeführt werden.

Bitte ergänze:

- [fehlendes Feld 1]
- [fehlendes Feld 2]
- [fehlendes Feld 3]

Wenn eine Information nicht bekannt ist, schreibe „unbekannt“.
```

---

## 6. Verhalten bei unbekannten Pflichtinformationen

Wenn ein Pflichtfeld mit „unbekannt“ markiert ist:

- Analyse fortsetzen,
- Unsicherheit im Ergebnis sichtbar machen,
- keine fehlenden Informationen erfinden,
- bei kritischen Feldern Review-Hinweis ergänzen.

Kritische Felder sind insbesondere:

- Entscheidungsbefugnis,
- Budgethinweis,
- Datenschutzstatus,
- Follow-up-Datum,
- erlaubte Angebote,
- nicht erlaubte Aussagen.
