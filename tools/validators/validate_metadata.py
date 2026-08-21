#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parents[2]

COMMON_REQUIRED = {
    "id",
    "artifact_type",
    "title",
    "category",
    "status",
    "language",
    "version",
    "maintainer",
    "license",
    "license_status",
    "data_risk",
    "human_review_required",
    "ai_act_proximity",
    "legal_disclaimer",
    "sources_status",
}

TYPE_REQUIRED = {
    "prompt_package": {
        "target_users",
        "use_case",
        "required_inputs",
        "output_format",
        "personal_data_possible",
        "evaluation_criteria",
    },
    "dataset_package": {
        "linked_artifacts",
        "data_origin",
        "contains_personal_data",
        "contains_sensitive_data",
        "sources_date",
        "usage_scope",
        "release_asset_required",
    },
    "model": {
        "model_type",
        "target_users",
        "use_case",
        "required_inputs",
        "output_format",
        "application_scope",
        "framework_references",
        "required_review_level",
    },
}

ALLOWED = {
    "artifact_type": {"prompt_package", "dataset_package", "model"},
    "status": {"draft", "bronze_candidate", "bronze", "silver_candidate", "silver", "gold_candidate", "gold"},
    "data_risk": {"green", "yellow", "red"},
    "ai_act_proximity": {"none", "transparency", "high_risk_adjacent", "prohibited_check", "unclear"},
    "sources_status": {"not_required", "missing", "provided", "checked", "unverified"},
    "license_status": {"declared", "unclear", "not_applicable"},
}

COURSE_BLOCKED_STATUS = {"silver", "gold_candidate", "gold"}


def load_yaml(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if yaml is None:
        data = load_simple_yaml_mapping(text)
    else:
        data = yaml.safe_load(text)
    if not isinstance(data, dict):
        raise ValueError("metadata.yml must contain a YAML mapping")
    return data


def load_simple_yaml_mapping(text: str) -> dict:
    """Small fallback for the flat metadata files used in this repo."""
    data: dict[str, object] = {}
    current_key: str | None = None
    for raw_line in text.splitlines():
        line = raw_line.split("#", 1)[0].rstrip()
        if not line.strip():
            continue
        if line.startswith((" ", "\t")):
            item = line.strip()
            if item.startswith("- ") and current_key:
                data.setdefault(current_key, [])
                value = item[2:].strip().strip('"').strip("'")
                if isinstance(data[current_key], list):
                    data[current_key].append(value)
            continue
        if ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        current_key = key.strip()
        value = raw_value.strip()
        if value == "":
            data[current_key] = []
        elif value.lower() == "true":
            data[current_key] = True
        elif value.lower() == "false":
            data[current_key] = False
        elif value.startswith("[") and value.endswith("]"):
            items = [item.strip().strip('"').strip("'") for item in value[1:-1].split(",") if item.strip()]
            data[current_key] = items
        else:
            data[current_key] = value.strip('"').strip("'")
    return data


def iter_metadata_files() -> list[Path]:
    roots = [ROOT / "prompts", ROOT / "datasets", ROOT / "models"]
    files: list[Path] = []
    for root in roots:
        if root.exists():
            files.extend(path for path in root.glob("*/metadata.yml") if not path.parent.name.startswith("_"))
    return sorted(files)


def validate_file(path: Path) -> list[str]:
    errors: list[str] = []
    try:
        data = load_yaml(path)
    except Exception as exc:
        return [f"{path.relative_to(ROOT)}: cannot parse YAML: {exc}"]

    missing = sorted(COMMON_REQUIRED - set(data))
    if missing:
        errors.append(f"{path.relative_to(ROOT)}: missing common fields: {', '.join(missing)}")

    artifact_type = data.get("artifact_type")
    if artifact_type not in TYPE_REQUIRED:
        errors.append(f"{path.relative_to(ROOT)}: invalid artifact_type: {artifact_type!r}")
        return errors

    missing_type = sorted(TYPE_REQUIRED[artifact_type] - set(data))
    if missing_type:
        errors.append(f"{path.relative_to(ROOT)}: missing {artifact_type} fields: {', '.join(missing_type)}")

    for field, allowed in ALLOWED.items():
        value = data.get(field)
        if value is not None and value not in allowed:
            errors.append(f"{path.relative_to(ROOT)}: invalid {field}: {value!r}")

    status = data.get("status")
    if status in COURSE_BLOCKED_STATUS:
        errors.append(f"{path.relative_to(ROOT)}: status {status!r} is not allowed for the MVP course")

    if data.get("status") == "bronze" and data.get("human_review_required") is not True:
        errors.append(f"{path.relative_to(ROOT)}: bronze requires human_review_required: true")

    if data.get("sources_status") in {"missing", "unclear"} and data.get("status") == "bronze":
        errors.append(f"{path.relative_to(ROOT)}: bronze cannot have missing or unclear sources")

    return errors


def main() -> int:
    files = iter_metadata_files()
    if not files:
        print("No metadata files found.")
        return 0
    errors: list[str] = []
    for path in files:
        errors.extend(validate_file(path))
    if errors:
        print("Metadata validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Metadata validation passed for {len(files)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
