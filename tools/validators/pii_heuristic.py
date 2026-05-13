#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

PATTERNS = {
    "email": re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
    "phone_like": re.compile(r"\b(?:\+?\d[\d\s()./-]{7,}\d)\b"),
    "iban_like": re.compile(r"\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b"),
    "german_tax_id_like": re.compile(r"\b\d{11}\b"),
}

SCAN_ROOTS = ["prompts", "datasets", "models"]
SCAN_SUFFIXES = {".md", ".txt", ".csv", ".yml", ".yaml", ".json"}


def iter_files() -> list[Path]:
    files: list[Path] = []
    for name in SCAN_ROOTS:
        root = ROOT / name
        if root.exists():
            files.extend(
                path
                for path in root.rglob("*")
                if path.is_file() and path.suffix.lower() in SCAN_SUFFIXES
                and not any(part.startswith("_") for part in path.relative_to(root).parts)
            )
    return sorted(files)


def main() -> int:
    findings: list[str] = []
    for path in iter_files():
        text = path.read_text(encoding="utf-8", errors="ignore")
        for label, pattern in PATTERNS.items():
            for match in pattern.finditer(text):
                line = text.count("\n", 0, match.start()) + 1
                findings.append(f"{path.relative_to(ROOT)}:{line}: possible {label}")
    if findings:
        print("PII heuristic warnings:")
        for finding in findings:
            print(f"- {finding}")
        print("These warnings do not automatically prove PII, but require human review.")
        return 0
    print("PII heuristic scan passed without warnings.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
