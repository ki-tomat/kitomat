#!/usr/bin/env python3
"""
Registrierung der verfuegbaren Provider.

Einen neuen Anbieter anbinden:

1. Wenn er OpenAI-kompatibel ist (die meisten sind es), reicht ein Eintrag
   unten mit `build_generic` oder eine kleine Funktion in
   `openai_compatible.py`. Kein neuer Code noetig.
2. Sonst neue Datei `providers/<name>.py` anlegen und `PreReviewProvider`
   erfuellen.
3. Unten in `_BUILDERS` eintragen.
4. Aufruf mit `--provider <name>`.

Am Review-Prozess, an den Gates oder am Schema aendert sich dabei nichts.
Das ist der Zweck der Trennung.
"""
from __future__ import annotations

import os
from typing import Callable

from .base import PreReviewProvider
from .mock import MockProvider
from .openai_compatible import build_generic, build_ollama, build_openrouter


def _build_mock() -> PreReviewProvider:
    return MockProvider()


_BUILDERS: dict[str, Callable[[], PreReviewProvider]] = {
    # Standard. Ruft nichts auf, uebertraegt nichts, kostet nichts.
    "mock": _build_mock,

    # Lokales Modell. Die Beitraege verlassen den Rechner nicht.
    # Vorbereitung: ollama pull qwen2.5:7b && ollama serve
    "ollama": build_ollama,

    # Ein Zugang, viele Modelle. Braucht OPENROUTER_API_KEY.
    "openrouter": build_openrouter,

    # Beliebiger OpenAI-kompatibler Dienst ueber LLM_BASE_URL und LLM_MODEL.
    # Damit laesst sich auch Mistral direkt anbinden.
    "llm": build_generic,
}

# Provider, die Daten an einen externen Dienst senden. Wird fuer Hinweise
# und spaeter fuer die Freigabepflicht gebraucht.
EXTERNAL = {"openrouter", "llm"}


def available() -> list[str]:
    return sorted(_BUILDERS)


def is_external(name: str) -> bool:
    return name in EXTERNAL


def get_provider(name: str | None = None) -> PreReviewProvider:
    """Liefert den gewuenschten Provider.

    Reihenfolge: Argument, dann Umgebungsvariable KITOMAT_REVIEW_PROVIDER,
    sonst der Mock. Der Mock ist der sichere Standard - er ruft nichts auf
    und uebertraegt nichts.
    """
    name = name or os.environ.get("KITOMAT_REVIEW_PROVIDER", "mock")
    if name not in _BUILDERS:
        raise SystemExit(
            f"Unbekannter Provider {name!r}. Verfuegbar: {', '.join(available())}"
        )
    return _BUILDERS[name]()
