# sources.md

## Quellenstatus

Dieses Dokument beschreibt den Quellen- und Datenstatus des Prompt-Pakets.

```text
Paket-ID: google-unternehmensprofil-leitfaden-assistent
Artefakttyp: Prompt-Paket
Status: draft
Quellenstatus: documented
Datenrisiko: green
```

---

## 1. Zweck der Quellenangaben

Das Prompt-Paket unterstützt Nutzer bei der Erstellung, Prüfung und Optimierung eines Google Unternehmensprofils.

Für die fachliche Rahmung wurden öffentliche Google-Hilfeseiten genutzt. Die Inhalte wurden nicht kopiert, sondern als Orientierung für eigene Zusammenfassungen, Sicherheitsregeln, Prüfhinweise und Failure Modes verwendet.

Das Paket enthält keine echten Unternehmensdaten, keine Kundendaten und keine personenbezogenen Echtdaten.

---

## 2. Verwendete öffentliche Quellen

### Google Business Profile Help Center: Unternehmensprofil verwalten

- Quelle: Google Business Profile Help
- Thema: Bearbeitung und Verwaltung von Unternehmensprofilen
- Relevanz: Basisdaten, Kontaktdaten, Öffnungszeiten, Fotos, Profilverwaltung
- URL: https://support.google.com/business/
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

### Google Business Profile Learning Center

- Quelle: Google Business Profile Learning Center
- Thema: Einrichtung, Bestätigung, Bearbeitung, Fotos/Videos, Rezensionen, Beiträge und Kontaktinformationen
- URL: https://support.google.com/business/answer/15697615
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

### Guidelines for representing your business on Google

- Quelle: Google Business Profile Help
- Thema: Richtlinien zur korrekten Darstellung von Unternehmen auf Google
- URL: https://support.google.com/business/answer/3038177
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

### Tips to get more reviews

- Quelle: Google Business Profile Help
- Thema: Bewertungen anfragen und mit Bewertungen umgehen
- URL: https://support.google.com/business/answer/3474122
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

### Create a Google link or QR code to request reviews

- Quelle: Google Business Profile Help
- Thema: Link oder QR-Code für Bewertungsanfragen
- URL: https://support.google.com/business/answer/16816815
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

### Manage customer reviews

- Quelle: Google Business Profile Help
- Thema: Rezensionen lesen, beantworten und verwalten
- URL: https://support.google.com/business/answer/3474050
- Abrufdatum: 2026-05-19
- Quellenstatus: öffentlich

---

## 3. Nicht verwendete Quellen

Für dieses Paket wurden nicht verwendet:

```text
- echte Kundendaten
- echte Rezensionen
- echte Unternehmensprofile
- interne Unternehmensdokumente
- bezahlte Datenbanken
- geschützte Volltexte
- personenbezogene E-Mails
- vertrauliche Finanz- oder Gesundheitsdaten
```

---

## 4. Datenstatus der Beispiele

Alle Beispielunternehmen sind synthetisch.

| Beispiel | Status | Hinweis |
|---|---|---|
| Café Morgenrot Leipzig | synthetisch | frei erfundenes Beispiel für neues Profil |
| Salon Haarwerk Köln | synthetisch | frei erfundenes Beispiel für Profil-Audit |

Die Beispiele sind so formuliert, dass sie realistisch wirken, aber keine echten Unternehmen abbilden sollen.

---

## 5. Lizenz- und Nutzungsstatus

| Bereich | Status |
|---|---|
| Prompt-Paket | selbst erstellt |
| Beispieltexte | synthetisch / selbst erstellt |
| Quellen | öffentliche Referenzen |
| Lizenzstatus | dokumentiert |
| Empfohlene Veröffentlichung | GitHub-Repository im Community-Projekt |

Die konkrete Projektlizenz sollte vor dem Merge mit der Lizenz des Ziel-Repositorys abgeglichen werden.

---

## 6. Grenzen

Die Quellenlage kann sich ändern. Google kann Funktionen, Richtlinien, Kategorien, Rezensionen-Logik oder Freigabeprozesse aktualisieren.

Deshalb gilt:

```text
- Richtlinienfragen immer als Prüfpunkte behandeln.
- Keine Freigabe durch Google garantieren.
- Keine Ranking-Garantie geben.
- Keine offiziellen Kategorien erfinden.
- Vor echter Veröffentlichung Unternehmensdaten prüfen.
```

---

## 7. Quellenbewertung

```text
sources_status: documented
license_status: self_created_with_public_references
data_risk: green
human_review_required: true
```

Das Paket ist damit quellen- und datenbezogen für einen Draft- oder Review-Status geeignet.
