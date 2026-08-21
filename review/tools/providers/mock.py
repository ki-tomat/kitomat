#!/usr/bin/env python3
"""
Mock-Provider: regelbasierte Ersatzimplementierung ohne Sprachmodell.

Zweck
-----
Das Paket ist damit vollstaendig lauffaehig, bevor ueber Anbieter, Budget und
Datenschutz entschieden ist. Wer den Review-Agenten ausprobieren, den Workflow
testen oder das Cockpit befuellen will, braucht keinen API-Key.

Was er ist
----------
Eine Sammlung einfacher, nachvollziehbarer Heuristiken auf dem Dateitext.
Sie liefern realistische, aber bewusst grobe Befunde.

Was er nicht ist
----------------
Kein Ersatz fuer die inhaltliche Pruefung. Alles, was echtes Sprachverstaendnis
braucht, gibt er als `not_assessable` mit `confidence: low` zurueck. Das ist
ehrlicher als ein erfundenes `pass` und macht im Cockpit sofort sichtbar,
welche Punkte ein echter Agent uebernehmen muss.
"""
from __future__ import annotations

import re

from .base import CheckResult, PhaseRequest, ProviderResult

NAME = "mock"

# Punkte, die der Mock deterministisch beurteilen kann.
# Alle uebrigen werden bewusst als not_assessable zurueckgegeben.
TEXT_SIGNALS = {
    "use.target_group_clear": [
        r"zielgruppe", r"fuer wen", r"für wen", r"target_users", r"adressat",
    ],
    "use.instructions_usable": [
        r"anwendung", r"anleitung", r"schritt", r"vorgehen", r"so nutzt",
    ],
    "limits.failure_modes_concrete": [
        r"failure", r"grenzen", r"fehler", r"funktioniert nicht", r"riskant",
    ],
    "trust.disclaimer_present": [
        r"disclaimer", r"keine rechtsberatung", r"orientierungshilfe",
        r"ersetzt keine", r"legal_disclaimer",
    ],
    "scenario.expert_feedback": [
        r"expertenfeedback", r"expertenhinweis", r"fachliche einordnung",
        r"woran ein experte", r"aus fachlicher sicht",
    ],
    "prompt.structure_complete": [
        r"abbruch", r"nicht verwenden", r"human review", r"grenzen",
    ],
    "limits.recency_risk": [
        r"stand:", r"aktualit", r"kann sich aendern", r"kann sich ändern",
        r"abrufdatum",
    ],
}

# Formulierungen, die auf unzulaessige Freigabebehauptungen hindeuten.
#
# Achtung, hier steckt eine Falle: Ein gutes Artefakt enthaelt fast immer
# einen Disclaimer wie "ersetzt keine Rechtsberatung". Ein reiner
# Stichwortabgleich findet dort das Wort "Rechtsberatung" und meldet genau
# das Gegenteil dessen, was der Fall ist. Deshalb prueft `_red_flag` den
# Kontext vor jedem Treffer auf Verneinungen.
RED_FLAG_PHRASES = {
    "limits.no_legal_advice": [
        r"rechtsberatung", r"rechtsverbindlich", r"wir garantieren",
        r"audit(?:iert|bestaetigt)", r"dsgvo-konform(?:itaet)?\s+(?:bestaetigt|garantiert)",
    ],
    "limits.no_automated_decisions": [
        r"automatisch (?:ueber|über) (?:bewerber|mitarbeitende|personen) entsch",
        r"entscheidet selbstaendig ueber", r"ohne menschliche pruefung freigeben",
    ],
    "potential.overconfidence": [
        r"garantiert", r"in jedem fall", r"immer korrekt", r"zu 100\s?%",
        r"fehlerfrei",
    ],
}

# Verneinungen im Umfeld eines Treffers. Steht eine davon davor, ist die
# Formulierung eine Abgrenzung und kein Problem.
NEGATIONS = re.compile(
    r"\b(?:kein|keine|keinen|keiner|nicht|ersetzt|weder|ohne|statt|"
    r"stellt\s+keine|ist\s+keine|bietet\s+keine)\b"
)
NEGATION_WINDOW = 60


class MockProvider:
    """Regelbasierter Provider ohne externen Aufruf."""

    name = NAME

    def __init__(self, model_id: str = "mock-rules-v1") -> None:
        self.model_id = model_id

    # ------------------------------------------------------------------
    def review_phase(self, request: PhaseRequest) -> ProviderResult:
        corpus = "\n".join(request.files.values()).lower()
        results: list[CheckResult] = []

        for check in request.checks:
            cid = check["id"]

            if cid in RED_FLAG_PHRASES:
                results.append(self._red_flag(cid, corpus))
            elif cid in TEXT_SIGNALS:
                results.append(self._signal(cid, corpus))
            else:
                results.append(
                    CheckResult(
                        check_id=cid,
                        result="not_assessable",
                        confidence="low",
                        finding="Der Mock-Provider kann diesen Punkt nicht beurteilen. "
                                "Ein Sprachmodell oder ein Mensch muss ihn bewerten.",
                    )
                )

        return ProviderResult(
            phase_id=request.phase_id,
            checks=results,
            narrative=self._narrative(request),
            provider=self.name,
            model_id=self.model_id,
        )

    # ------------------------------------------------------------------
    def _signal(self, check_id: str, corpus: str) -> CheckResult:
        hits = [p for p in TEXT_SIGNALS[check_id] if re.search(p, corpus)]
        if hits:
            return CheckResult(
                check_id=check_id,
                result="pass",
                confidence="low",
                finding=f"Stichwortpruefung erfolgreich ({len(hits)} Treffer). "
                        "Nur ein Formhinweis, keine inhaltliche Bewertung.",
            )
        return CheckResult(
            check_id=check_id,
            result="warn",
            confidence="low",
            finding="Keine der erwarteten Formulierungen gefunden. "
                    "Menschliche Pruefung erforderlich.",
        )

    def _red_flag(self, check_id: str, corpus: str) -> CheckResult:
        hits, negated = [], 0

        for pattern in RED_FLAG_PHRASES[check_id]:
            for match in re.finditer(pattern, corpus):
                before = corpus[max(0, match.start() - NEGATION_WINDOW):match.start()]
                if NEGATIONS.search(before):
                    negated += 1          # Abgrenzung, kein Problem
                else:
                    hits.append(match.group())

        if hits:
            # Bewusst nur "warn", nicht "fail". Ein Stichwortabgleich ist kein
            # Beleg fuer eine unzulaessige Behauptung - er ist ein Verdacht.
            # Ein "fail" wuerde ueber den Schweregrad P0 das Gate blockieren,
            # und das darf eine Heuristik nicht ausloesen.
            return CheckResult(
                check_id=check_id,
                result="warn",
                confidence="low",
                finding=f"Auffaellige Formulierung im Stichwortabgleich: "
                        f"{', '.join(repr(h) for h in hits[:3])}. Ohne Sprachmodell "
                        "nicht entscheidbar, ob es sich um eine Behauptung oder eine "
                        "Abgrenzung handelt.",
                recommendation="Stelle im Text pruefen und bestaetigen oder entschaerfen.",
            )

        note = "Keine auffaelligen Formulierungen im Stichwortabgleich."
        if negated:
            note += (f" {negated} Treffer waren Abgrenzungen wie "
                     "'ersetzt keine Rechtsberatung' und wurden nicht gewertet.")
        return CheckResult(
            check_id=check_id,
            result="pass",
            confidence="low",
            finding=note,
        )

    def _narrative(self, request: PhaseRequest) -> str:
        return (
            f"[Mock-Provider] Phase {request.phase_id} regelbasiert bearbeitet. "
            f"{len(request.files)} Dateien gelesen. Diese Befunde ersetzen keine "
            "inhaltliche Pruefung durch ein Sprachmodell."
        )
