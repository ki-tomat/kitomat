"""Anbieterneutrale Provider-Schicht des KItomat Review-Agenten."""

from .base import (
    CheckResult,
    PhaseRequest,
    PreReviewProvider,
    ProviderResult,
    validate_provider_result,
)
from .openai_compatible import OpenAICompatibleProvider
from .registry import available, get_provider, is_external

__all__ = [
    "CheckResult",
    "PhaseRequest",
    "PreReviewProvider",
    "ProviderResult",
    "OpenAICompatibleProvider",
    "validate_provider_result",
    "available",
    "get_provider",
    "is_external",
]
