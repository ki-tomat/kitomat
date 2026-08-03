#!/usr/bin/env python3
"""
Anbieterneutrale Schnittstelle fuer den Review-Agenten.

Der Orchestrator kennt die Review-Regeln, Gates und Statusuebergaenge.
Ein Provider kennt ausschliesslich die zustandslose Kommunikation mit einem
Sprachmodell. Dadurch laesst sich der Anbieter wechseln, ohne den
Review-Prozess umzubauen.

Ein neuer Provider muss nur `PreReviewProvider` implementieren und sich in
`registry.py` eintragen.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Protocol, runtime_checkable


@dataclass
class PhaseRequest:
    """Was der Orchestrator einem Provider fuer genau eine Phase uebergibt.

    Der Provider bekommt niemals das gesamte Repository, sondern nur die
    Dateien, die Stufe 1a freigegeben hat.
    """

    phase_id: str
    phase_name: str
    phase_purpose: str
    artifact_type: str
    artifact_path: str
    metadata: dict
    files: dict[str, str]
    """Pfad -> Inhalt. Nur Textdateien, nur nach bestandenem Sicherheits-Gate."""
    checks: list[dict]
    """Die zu bearbeitenden Pruefpunkte aus review-checks.yml."""
    guardrails: list[str] = field(default_factory=list)
    prior_findings: list[dict] = field(default_factory=list)
    """Befunde frueherer Phasen, damit der Agent nicht widerspruechlich urteilt."""


@dataclass
class CheckResult:
    """Ergebnis eines einzelnen Pruefpunkts."""

    check_id: str
    result: str
    """pass | warn | fail | block | not_applicable | not_assessable"""
    confidence: str = "medium"
    """high | medium | low"""
    finding: str = ""
    recommendation: str = ""
    evidence: list[dict] = field(default_factory=list)


@dataclass
class ProviderResult:
    """Antwort eines Providers fuer eine Phase."""

    phase_id: str
    checks: list[CheckResult]
    narrative: str = ""
    provider: str = "unknown"
    model_id: str = "unknown"
    tokens_in: int = 0
    tokens_out: int = 0
    error: str | None = None


@runtime_checkable
class PreReviewProvider(Protocol):
    """Vertrag, den jeder Anbieter erfuellen muss.

    Regeln, die fuer jede Implementierung gelten:

    - Der Provider entscheidet nichts. Er liefert Befunde, keine Freigaben.
    - Der Provider setzt niemals einen Artefaktstatus.
    - Bei Unsicherheit gibt er `not_assessable` zurueck, nicht `pass`.
    - Er erfindet keine Befunde, um einen Bericht voll wirken zu lassen.
    - Er haelt sich an die Guardrails der Phase, insbesondere an das Verbot,
      den Beitrag zu erweitern oder umzuschreiben.
    """

    name: str

    def review_phase(self, request: PhaseRequest) -> ProviderResult:
        """Bearbeitet genau eine Phase und gibt Befunde je Pruefpunkt zurueck."""
        ...


VALID_RESULTS = {"pass", "warn", "fail", "block", "not_applicable", "not_assessable"}
VALID_CONFIDENCE = {"high", "medium", "low"}


def validate_provider_result(result: ProviderResult, request: PhaseRequest) -> list[str]:
    """Prueft die Antwort eines Providers, bevor sie in den Lauf uebernommen wird.

    Ein Provider ist nicht vertrauenswuerdig, nur weil er antwortet. Diese
    Pruefung verhindert, dass ein fehlerhaftes oder manipuliertes Modell
    unbekannte Pruefpunkte oder unzulaessige Ergebniswerte einschleust.
    """
    errors: list[str] = []
    known = {c["id"] for c in request.checks}
    seen: set[str] = set()

    for check in result.checks:
        if check.check_id not in known:
            errors.append(f"Unbekannter Pruefpunkt: {check.check_id}")
        if check.check_id in seen:
            errors.append(f"Doppelter Pruefpunkt: {check.check_id}")
        seen.add(check.check_id)
        if check.result not in VALID_RESULTS:
            errors.append(f"{check.check_id}: unzulaessiges Ergebnis {check.result!r}")
        if check.confidence not in VALID_CONFIDENCE:
            errors.append(f"{check.check_id}: unzulaessige Confidence {check.confidence!r}")

    missing = known - seen
    if missing:
        errors.append(f"Fehlende Pruefpunkte: {sorted(missing)}")

    return errors
