#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

REQUIRED_FILES = {
    "prompts": [
        "prompt.md",
        "README.md",
        "metadata.yml",
        "examples/input-01.md",
        "examples/output-01.md",
        "evaluation.md",
        "failure-modes.md",
    ],
    "datasets": [
        "README.md",
        "metadata.yml",
        "sources.md",
        "license.md",
        "usage.md",
    ],
    "models": [
        "model.md",
        "README.md",
        "metadata.yml",
        "application-guide.md",
        "examples/example-01.md",
        "sources.md",
        "failure-modes.md",
    ],
}

PLACEHOLDERS = [
    "TODO",
    "TBD",
    "lorem ipsum",
    "Replace with",
    "replace-with",
    "pXX",
]

SCENARIO_TERMS = ["positiv", "nachbearbeitbar", "negativ"]


def iter_artifact_dirs(root_name: str) -> list[Path]:
    root = ROOT / root_name
    if not root.exists():
        return []
    return sorted(path for path in root.iterdir() if path.is_dir() and not path.name.startswith("_"))


def check_required_files(root_name: str, artifact_dir: Path) -> list[str]:
    errors = []
    for rel in REQUIRED_FILES[root_name]:
        if not (artifact_dir / rel).exists():
            errors.append(f"{artifact_dir.relative_to(ROOT)}: missing required file {rel}")
    return errors


def check_placeholders(artifact_dir: Path) -> list[str]:
    errors = []
    for path in artifact_dir.rglob("*"):
        if path.is_file() and path.suffix in {".md", ".yml", ".yaml"}:
            text = path.read_text(encoding="utf-8", errors="ignore")
            for placeholder in PLACEHOLDERS:
                if placeholder in text:
                    errors.append(f"{path.relative_to(ROOT)}: placeholder remains: {placeholder}")
    return errors


def check_scenario_triad(artifact_dir: Path) -> list[str]:
    text = "\n".join(
        path.read_text(encoding="utf-8", errors="ignore").lower()
        for path in artifact_dir.rglob("*.md")
    )
    missing = [term for term in SCENARIO_TERMS if term not in text]
    if missing:
        return [f"{artifact_dir.relative_to(ROOT)}: missing scenario terms: {', '.join(missing)}"]
    return []


def main() -> int:
    errors: list[str] = []
    checked = 0
    for root_name in REQUIRED_FILES:
        for artifact_dir in iter_artifact_dirs(root_name):
            checked += 1
            errors.extend(check_required_files(root_name, artifact_dir))
            errors.extend(check_placeholders(artifact_dir))
            errors.extend(check_scenario_triad(artifact_dir))
    if errors:
        print("Completeness validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Completeness validation passed for {checked} artifact dirs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

