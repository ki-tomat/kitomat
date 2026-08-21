#!/usr/bin/env python3
"""
Adapter fuer OpenAI-kompatible Endpunkte.

Deckt in einer Datei ab: OpenRouter, Ollama (lokal), Mistral, Groq, LM Studio,
vLLM und jeden anderen Dienst mit `/chat/completions`. Das ist praktisch ein
Standard geworden - deshalb muss fuer einen Anbieterwechsel kein Code
geaendert werden, nur zwei Umgebungsvariablen.

Bewusst ohne externe Abhaengigkeiten. Nur `urllib` aus der Standardbibliothek,
damit das Paket weiterhin mit `pyyaml` und `jsonschema` auskommt.

Grundregeln, die hier technisch durchgesetzt werden
---------------------------------------------------
1. Der Schluessel kommt ausschliesslich aus der Umgebung. Nie aus einer Datei
   im Repository, nie aus einem Argument.
2. Die Modell-ID wird protokolliert - und zwar die, die der Dienst
   zurueckmeldet, nicht die angefragte. Nur so sind Laeufe reproduzierbar.
3. Bei jedem Fehler liefert der Adapter `not_assessable`, niemals `pass`.
   Ein Ausfall darf nie wie ein bestandener Review aussehen.
4. Das Modell bekommt nur Dateien, die Stufe 1a freigegeben hat.
5. Antworten werden gegen die erwartete Pruefpunktliste validiert, bevor sie
   in den Lauf uebernommen werden.
"""
from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.request

from .base import CheckResult, PhaseRequest, ProviderResult

DEFAULT_TIMEOUT = 120
DEFAULT_RETRIES = 2
MAX_FILE_CHARS_IN_PROMPT = 12_000


SYSTEM_PROMPT = """\
Du bist der Pre-Review-Agent fuer KItomat, eine Community-Plattform fuer
wiederverwendbare KI-Arbeitsbausteine.

Deine Aufgabe ist eine kritische Pruefung eingereichter Beitraege. Du
respektierst den bestehenden Beitrag: Du schreibst keine neue Version, du
erfindest keine neuen Zielgruppen, du erweiterst den Scope nicht und du
lieferst keine Roadmap-Ideen.

Unveraenderliche Regeln:

- Du entscheidest nichts. Du gibst Hinweise, keine Freigaben.
- Du vergibst niemals einen Artefaktstatus wie bronze, silver oder gold.
- Du behauptest keine rechtliche, datenschutzrechtliche oder Audit-Freigabe.
- Wenn du einen Punkt mit dem vorliegenden Material nicht entscheiden kannst,
  antwortest du mit "not_assessable". Das ist ein zulaessiges und erwuenschtes
  Ergebnis. Rate nicht.
- Du erfindest keine Kritik, damit ein Bericht voll wirkt. Wenn nichts zu
  bemaengeln ist, sagst du das.
- Du kannst nicht pruefen, ob eine angegebene Quelle existiert oder das
  aussagt, was behauptet wird. Bei quellenbezogenen Punkten antwortest du
  daher hoechstens mit "warn" oder "not_assessable", niemals mit "pass" auf
  Basis einer Vermutung.

Achte besonders auf Verneinungen. Ein Satz wie "Dieses Artefakt ersetzt keine
Rechtsberatung" ist eine korrekte Abgrenzung und kein Verstoss.

Du antwortest ausschliesslich mit JSON. Kein Vorwort, kein Nachwort, keine
Code-Fences.
"""


RESPONSE_SHAPE = """\
Antworte mit genau diesem JSON-Aufbau:

{
  "narrative": "Zwei bis vier Saetze zu dieser Phase. Sachlich, ueber das Artefakt, nicht ueber Personen.",
  "checks": [
    {
      "id": "<exakte Pruefpunkt-ID aus der Liste>",
      "result": "pass | warn | fail | block | not_applicable | not_assessable",
      "confidence": "high | medium | low",
      "finding": "Was du festgestellt hast. Leer lassen, wenn nichts zu sagen ist.",
      "recommendation": "Was konkret zu tun waere. Nur bei warn, fail oder block.",
      "evidence": [{"file": "pfad/datei.md", "quote": "kurzes woertliches Zitat"}]
    }
  ]
}

Gib fuer jeden Pruefpunkt der Liste genau einen Eintrag zurueck. Keine
zusaetzlichen IDs, keine Dopplungen.
"""


class OpenAICompatibleProvider:
    """Spricht mit jedem Dienst, der `/chat/completions` anbietet."""

    def __init__(
        self,
        name: str,
        base_url: str,
        model_id: str,
        api_key_env: str | None = None,
        api_key_required: bool = True,
        extra_headers: dict[str, str] | None = None,
        timeout: int = DEFAULT_TIMEOUT,
        retries: int = DEFAULT_RETRIES,
        temperature: float = 0.0,
    ) -> None:
        self.name = name
        self.base_url = base_url.rstrip("/")
        self.model_id = model_id
        self.timeout = timeout
        self.retries = retries
        self.temperature = temperature
        self.extra_headers = extra_headers or {}
        self.resolved_model: str | None = None

        self.api_key = os.environ.get(api_key_env, "") if api_key_env else ""
        if api_key_required and not self.api_key:
            raise SystemExit(
                f"Kein Schluessel gefunden. Bitte Umgebungsvariable {api_key_env} setzen.\n"
                f"Windows:  set {api_key_env}=...\n"
                f"Linux:    export {api_key_env}=...\n"
                f"Details: review/docs/BETRIEB.md, Abschnitt 'Provider anbinden'."
            )

    # ------------------------------------------------------------------
    def review_phase(self, request: PhaseRequest) -> ProviderResult:
        prompt = self._build_prompt(request)
        try:
            raw, usage, model = self._call(prompt)
        except Exception as exc:  # noqa: BLE001
            return self._all_unassessable(request, f"Modellaufruf fehlgeschlagen: {exc}")

        try:
            parsed = self._parse(raw)
        except ValueError as exc:
            return self._all_unassessable(request, f"Antwort nicht lesbar: {exc}")

        wanted = {c["id"] for c in request.checks}
        results: list[CheckResult] = []
        seen: set[str] = set()

        for item in parsed.get("checks", []):
            cid = str(item.get("id", "")).strip()
            if cid not in wanted or cid in seen:
                continue      # unbekannte oder doppelte IDs verwerfen
            seen.add(cid)
            results.append(CheckResult(
                check_id=cid,
                result=self._safe_result(item.get("result")),
                confidence=self._safe_confidence(item.get("confidence")),
                finding=str(item.get("finding") or "")[:2000],
                recommendation=str(item.get("recommendation") or "")[:2000],
                evidence=self._safe_evidence(item.get("evidence")),
            ))

        # Was das Modell ausgelassen hat, gilt als unbeurteilt - nicht als bestanden.
        for cid in sorted(wanted - seen):
            results.append(CheckResult(
                check_id=cid,
                result="not_assessable",
                confidence="low",
                finding="Das Modell hat zu diesem Punkt nichts geliefert.",
            ))

        return ProviderResult(
            phase_id=request.phase_id,
            checks=results,
            narrative=str(parsed.get("narrative") or "")[:8000],
            provider=self.name,
            model_id=model or self.model_id,
            tokens_in=usage.get("prompt_tokens", 0),
            tokens_out=usage.get("completion_tokens", 0),
        )

    # ------------------------------------------------------------------
    def _build_prompt(self, request: PhaseRequest) -> list[dict]:
        teile = [
            f"# Phase {request.phase_id}: {request.phase_name}",
            f"\nZweck dieser Phase: {request.phase_purpose}",
            f"\nArtefakt: {request.artifact_path}  (Typ: {request.artifact_type})",
        ]

        if request.guardrails:
            teile.append("\n## Grenzen fuer diese Phase\n")
            teile += [f"- {g}" for g in request.guardrails]

        teile.append("\n## Zu pruefende Punkte\n")
        for check in request.checks:
            zeile = f"- **{check['id']}** — {check['label']}"
            if check.get("rule"):
                zeile += f"\n  Regel: {check['rule']}"
            teile.append(zeile)

        if request.metadata:
            teile.append("\n## Metadaten des Beitrags\n```yaml")
            for key in ("id", "artifact_type", "status", "data_risk",
                        "human_review_required", "ai_act_proximity",
                        "license_status", "sources_status", "legal_disclaimer"):
                if key in request.metadata:
                    teile.append(f"{key}: {request.metadata[key]}")
            teile.append("```")

        if request.prior_findings:
            teile.append("\n## Befunde frueherer Phasen\n")
            teile += [f"- [{f['phase']}] {f['check']}: {f['result']} — {f['finding'][:180]}"
                      for f in request.prior_findings[:15]]

        teile.append("\n## Dateien des Beitrags\n")
        for pfad, inhalt in request.files.items():
            gekuerzt = inhalt[:MAX_FILE_CHARS_IN_PROMPT]
            if len(inhalt) > MAX_FILE_CHARS_IN_PROMPT:
                gekuerzt += "\n[... gekuerzt ...]"
            teile.append(f"\n### {pfad}\n```\n{gekuerzt}\n```")

        teile.append("\n" + RESPONSE_SHAPE)

        return [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": "\n".join(teile)},
        ]

    # ------------------------------------------------------------------
    def _call(self, messages: list[dict]) -> tuple[str, dict, str]:
        payload = {
            "model": self.model_id,
            "messages": messages,
            "temperature": self.temperature,
            "response_format": {"type": "json_object"},
        }
        headers = {"Content-Type": "application/json", **self.extra_headers}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        letzter_fehler: Exception | None = None
        for versuch in range(self.retries + 1):
            try:
                req = urllib.request.Request(
                    f"{self.base_url}/chat/completions",
                    data=json.dumps(payload).encode("utf-8"),
                    headers=headers,
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    body = json.loads(resp.read().decode("utf-8"))

                inhalt = body["choices"][0]["message"]["content"]
                usage = body.get("usage", {}) or {}
                # Die tatsaechlich gelieferte Modellversion protokollieren,
                # nicht die angefragte. Aliase wie "latest" wandern sonst
                # unbemerkt auf eine neue Version.
                model = body.get("model", self.model_id)
                self.resolved_model = model
                return inhalt, usage, model

            except urllib.error.HTTPError as exc:
                detail = exc.read().decode("utf-8", errors="ignore")[:300]
                letzter_fehler = RuntimeError(f"HTTP {exc.code}: {detail}")
                if exc.code in (400, 401, 403, 404):
                    break            # dauerhafte Fehler nicht wiederholen
            except Exception as exc:  # noqa: BLE001
                letzter_fehler = exc

            if versuch < self.retries:
                time.sleep(2 ** versuch)

        raise letzter_fehler or RuntimeError("Unbekannter Fehler")

    # ------------------------------------------------------------------
    @staticmethod
    def _parse(raw: str) -> dict:
        text = raw.strip()
        # Manche Modelle verpacken JSON trotz Anweisung in Code-Fences.
        fence = re.match(r"^```(?:json)?\s*(.*?)\s*```$", text, re.S)
        if fence:
            text = fence.group(1)
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            # Letzter Versuch: das erste vollstaendige JSON-Objekt herausschneiden
            start, ende = text.find("{"), text.rfind("}")
            if start == -1 or ende <= start:
                raise ValueError("kein JSON gefunden")
            data = json.loads(text[start:ende + 1])
        if not isinstance(data, dict):
            raise ValueError("JSON ist kein Objekt")
        return data

    @staticmethod
    def _safe_result(value) -> str:
        erlaubt = {"pass", "warn", "fail", "block", "not_applicable", "not_assessable"}
        v = str(value or "").strip().lower()
        return v if v in erlaubt else "not_assessable"

    @staticmethod
    def _safe_confidence(value) -> str:
        v = str(value or "").strip().lower()
        return v if v in {"high", "medium", "low"} else "low"

    @staticmethod
    def _safe_evidence(value) -> list[dict]:
        if not isinstance(value, list):
            return []
        out = []
        for item in value[:5]:
            if not isinstance(item, dict) or not item.get("file"):
                continue
            eintrag = {"file": str(item["file"])[:300]}
            if item.get("quote"):
                eintrag["quote"] = str(item["quote"])[:500]
            if isinstance(item.get("line"), int) and item["line"] > 0:
                eintrag["line"] = item["line"]
            out.append(eintrag)
        return out

    def _all_unassessable(self, request: PhaseRequest, grund: str) -> ProviderResult:
        """Bei jedem Fehler: alles offen lassen, nichts durchwinken."""
        return ProviderResult(
            phase_id=request.phase_id,
            checks=[CheckResult(check_id=c["id"], result="not_assessable",
                                confidence="low", finding=grund)
                    for c in request.checks],
            narrative=f"Diese Phase konnte nicht geprueft werden. {grund}",
            provider=self.name,
            model_id=self.model_id,
            error=grund,
        )


# ---------------------------------------------------------------------------
def build_openrouter() -> OpenAICompatibleProvider:
    """OpenRouter - ein Zugang, viele Modelle.

    Umgebungsvariablen:
        OPENROUTER_API_KEY   Pflicht. Schluessel von openrouter.ai
        OPENROUTER_MODEL     optional, Standard siehe unten

    Hinweis zur Modellwahl: Eine feste Version waehlen, keinen Alias wie
    ":latest". Sonst aendert sich das Pruefverhalten unbemerkt.
    """
    return OpenAICompatibleProvider(
        name="openrouter",
        base_url="https://openrouter.ai/api/v1",
        model_id=os.environ.get("OPENROUTER_MODEL", "mistralai/mistral-small-latest"),
        api_key_env="OPENROUTER_API_KEY",
        extra_headers={
            "HTTP-Referer": "https://github.com/ki-tomat/kitomat",
            "X-Title": "KItomat Review-Agent",
        },
    )


def build_ollama() -> OpenAICompatibleProvider:
    """Ollama - Modell laeuft lokal auf dem eigenen Rechner.

    Fuer dieses Projekt besonders passend: Die Beitraege verlassen den Rechner
    nicht. Damit entfaellt die Datenschutzfrage beim Anbieter vollstaendig.

    Vorbereitung:
        ollama pull qwen2.5:7b
        ollama serve

    Umgebungsvariablen:
        OLLAMA_MODEL   optional, Standard qwen2.5:7b
        OLLAMA_HOST    optional, Standard http://localhost:11434
    """
    host = os.environ.get("OLLAMA_HOST", "http://localhost:11434").rstrip("/")
    return OpenAICompatibleProvider(
        name="ollama",
        base_url=f"{host}/v1",
        model_id=os.environ.get("OLLAMA_MODEL", "qwen2.5:7b"),
        api_key_env=None,
        api_key_required=False,
        timeout=300,          # lokale Modelle brauchen laenger
    )


def build_generic() -> OpenAICompatibleProvider:
    """Beliebiger OpenAI-kompatibler Dienst.

    Umgebungsvariablen:
        LLM_BASE_URL   Pflicht, z. B. https://api.mistral.ai/v1
        LLM_MODEL      Pflicht, versionierte Modell-ID
        LLM_API_KEY    Pflicht
    """
    base = os.environ.get("LLM_BASE_URL")
    model = os.environ.get("LLM_MODEL")
    if not base or not model:
        raise SystemExit(
            "LLM_BASE_URL und LLM_MODEL muessen gesetzt sein.\n"
            "Beispiel:\n"
            "  set LLM_BASE_URL=https://api.mistral.ai/v1\n"
            "  set LLM_MODEL=mistral-small-2506\n"
            "  set LLM_API_KEY=..."
        )
    return OpenAICompatibleProvider(
        name="llm",
        base_url=base,
        model_id=model,
        api_key_env="LLM_API_KEY",
    )
