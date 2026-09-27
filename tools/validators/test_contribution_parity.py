#!/usr/bin/env python3
"""Run Python validators against a package emitted from the shared JS fixture."""
from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent))
import validate_completeness as completeness
import validate_metadata as metadata

fixture = ROOT / "web/tests/fixtures/contribution-parity.json"
with tempfile.TemporaryDirectory(prefix="kitomat-parity-") as raw:
    temporary = Path(raw)
    subprocess.run(["node", str(ROOT / "tools/ap14/generate-fixture.mjs"), str(fixture), str(temporary)], check=True)
    metadata.ROOT = temporary
    completeness.ROOT = temporary
    artifact = temporary / "prompts/synthetischer-paritaetstest"
    errors = metadata.validate_file(artifact / "metadata.yml")
    errors += completeness.check_required_files("prompts", artifact)
    errors += completeness.check_placeholders(artifact)
    errors += completeness.check_scenario_triad(artifact)
    if errors:
        raise SystemExit("Parity validation failed:\n- " + "\n- ".join(errors))
print("Contribution JS/Python parity fixture passed.")
