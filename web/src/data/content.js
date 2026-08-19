export const DATENSCHUTZ_HINWEIS =
  "Verwende ausschließlich synthetische Beispiele, selbst erstellte Musterfälle oder öffentlich nutzbare Quellen mit klarer Herkunft und Lizenz. Keine echten personenbezogenen Daten, keine Kundendaten, keine internen Unternehmensdokumente und keine anonymisierten Echtdaten.";

export const DATENSCHUTZ_KURZ_DONT = [
  "Echte personenbezogene Daten",
  "Echte Kundendaten",
  "Interne Unternehmensdokumente",
  "Anonymisierte Echtdaten",
];

export const DATENSCHUTZ_KURZ_DO = [
  "Synthetische Beispiele",
  "Selbst erstellte Musterfälle",
  "Öffentlich nutzbare Quellen mit Lizenz",
];

export const FAQ_ITEMS = [
  { q: "Was ist KItomat?",
    a: "KItomat ist ein Community-Projekt unseres KI-Consultant-Kurses. Es sammelt und organisiert reviewfähige KI-Arbeitsbausteine – Prompt-Pakete, Quellenpakete und KMU-/Branchenmodelle. Die WebGUI legt sich als Navigations- und Review-Oberfläche über ein öffentliches GitHub-Repository." },
  { q: "Was ist ein Prompt-Paket?",
    a: "Ein Prompt-Paket bündelt einen oder mehrere getestete Prompts inklusive Beispiel-Input, Beispiel-Output, Zielgruppe, Einsatzkontext und bekannten Grenzen. Es ist mehr als ein einzelner Prompt-Schnipsel – es ist ein nachvollziehbarer, dokumentierter Baustein." },
  { q: "Was ist ein Datensatz-/Quellenpaket?",
    a: "Ein Quellenpaket ist eine kuratierte Sammlung von Primär- und Sekundärquellen zu einem Thema (z. B. EU AI Act). Es enthält keine personenbezogenen oder vertraulichen Daten – nur öffentlich nutzbare Materialien mit Lizenzangaben." },
  { q: "Was ist ein KMU-/Branchenmodell?",
    a: "Ein KMU-/Branchenmodell beschreibt typische KI-Use-Cases entlang der Wertschöpfungskette einer Branche oder Unternehmensgröße. Es liefert ein Raster für Strategie- und Workshop-Arbeit, keine repräsentativen Marktdaten." },
  { q: "Was zeigt die Bibliothek?",
    a: "Die Bibliothek zeigt ausschließlich geprüfte und freigegebene KItomat-Artefakte. Beiträge im Entwurfs- oder Review-Status befinden sich im geschützten Review Center und sind für Reviewer:innen und Admins sichtbar." },
  { q: "Wie läuft der Review-Prozess?",
    a: "Einreichung → automatische Vorprüfung durch Validatoren und KI-Agenten → fachlicher Peer Review → Trust Review bei Risiko-, Quellen- oder Datenschutzfragen → Maintainer-Entscheidung über Status, Merge und Freigabe. Erst danach landet ein Artefakt in der Bibliothek." },
  { q: "Welche Daten darf ich nicht verwenden?",
    a: DATENSCHUTZ_HINWEIS },
  { q: "Wie reiche ich einen Beitrag ein?",
    a: "Im Contribution Center wirst du durch sieben Schritte geführt: Typ wählen, Dateien hochladen, KI-Agent prüfen lassen, Metadaten / Quellen / Szenarien / Datenschutz freigeben und am Ende einen Review Request für GitHub vorbereiten. Der KI-Agent macht Vorschläge – der Mensch entscheidet." },
  { q: "Ersetzen KI-Agenten den menschlichen Review?",
    a: "Nein. KI-Agenten unterstützen beim Erkennen fehlender Metadaten, beim Vorschlagen von Beschreibungen, beim Quellen- und Datenschutz-Check und beim Vorbereiten der Szenario-Triade. Die finale Bewertung erfolgt durch Reviewer:innen, Trust-Verantwortliche und Maintainer:innen." },
  { q: "Was bringt mir ein Beitrag?",
    a: "Du baust ein öffentliches, reviewtes Portfolio an KI-Arbeitsbausteinen auf, erhältst Anerkennungs-Badges, vernetzt dich mit anderen Consultants und stärkst gemeinsam einen vertrauenswürdigen KI-Werkzeugkasten für KMU." },
];

export const ROADMAP = [
  { phase: "Jetzt im MVP", color: "tomato",
    items: [
      "Dashboard mit Prozessüberblick",
      "Bibliothek nur mit freigegebenen Artefakten",
      "Contribution Center mit Upload & KI-Agent-Mockup",
      "Review Center mit Pipeline & Reviewer-Sperre",
      "FAQ, Über-Seite, Community-Skizze",
      "GitHub-Verlinkung pro Artefakt",
    ] },
  { phase: "Als Nächstes", color: "amber",
    items: [
      "Echte Issue-/PR-Erzeugung aus dem Contribution Center",
      "GitHub Actions als Trust-Gate-Validatoren",
      "Validierungs- und Risikoreport im Review Center",
      "E-Mail-Benachrichtigung der Reviewer-Gruppe",
    ] },
  { phase: "Später / Post-MVP", color: "slate",
    items: [
      "Login & GitHub-OAuth",
      "Admin-Bereich live",
      "Echter Upload aus der GUI nach GitHub",
      "Discord- und LinkedIn-Anbindung",
      "Belohnungs- und Anerkennungssystem live",
    ] },
  { phase: "Community-Ideen", color: "leaf",
    items: [
      "Community-Forum mit Themen-Threads",
      "Profile mit Skills und Kooperations-Suche",
      "Co-Autorenschaft an Artefakten",
      "Kurs-spezifische Lernpfade",
    ] },
];
