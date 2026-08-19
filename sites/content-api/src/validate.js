// Mini-Validator fuer KI-tomat Artefakt-Metadata.
//
// SCHEMA-DRIFT-HINWEIS:
//   required-Listen und Enum-Werte sind aus schemas/*.json haendisch gespiegelt.
//   Referenzierter Schema-Stand: origin/develop @ commit a5b0b84 (2026-06-09).
//   Wenn sich schemas/metadata.schema.json, prompt-package.schema.json,
//   dataset-package.schema.json oder model.schema.json aendert, muss diese
//   Datei nachgezogen werden (Folge-Issue im AP9-PR verlinken).

const METADATA_REQUIRED = [
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
];

const PROMPT_REQUIRED = [
  "target_users",
  "use_case",
  "required_inputs",
  "output_format",
  "personal_data_possible",
  "evaluation_criteria",
];

const DATASET_REQUIRED = [
  "linked_artifacts",
  "data_origin",
  "contains_personal_data",
  "contains_sensitive_data",
  "sources_date",
  "usage_scope",
];

const MODEL_REQUIRED = [
  "model_type",
  "target_users",
  "use_case",
  "required_inputs",
  "output_format",
  "application_scope",
  "framework_references",
  "required_review_level",
];

const ENUMS = {
  artifact_type: ["prompt_package", "dataset_package", "model"],
  status: ["draft", "bronze_candidate", "bronze", "silver_candidate", "silver", "gold_candidate", "gold"],
  license_status: ["declared", "unclear", "not_applicable"],
  data_risk: ["green", "yellow", "red"],
  ai_act_proximity: ["none", "transparency", "high_risk_adjacent", "prohibited_check", "unclear"],
  sources_status: ["not_required", "missing", "provided", "checked", "unverified"],
};

const TYPE_SPECIFIC_REQUIRED = {
  prompt_package: PROMPT_REQUIRED,
  dataset_package: DATASET_REQUIRED,
  model: MODEL_REQUIRED,
};

export function validateMinimal(meta) {
  const errors = [];

  if (!meta || typeof meta !== "object") {
    return { ok: false, errors: ["Metadata is not an object"] };
  }

  for (const key of METADATA_REQUIRED) {
    if (meta[key] === undefined || meta[key] === null || meta[key] === "") {
      errors.push(`Missing required base field: ${key}`);
    }
  }

  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (meta[field] !== undefined && !allowed.includes(meta[field])) {
      errors.push(`Invalid enum for ${field}: ${meta[field]}`);
    }
  }

  const typeRequired = TYPE_SPECIFIC_REQUIRED[meta.artifact_type];
  if (typeRequired) {
    for (const key of typeRequired) {
      if (meta[key] === undefined || meta[key] === null || meta[key] === "") {
        errors.push(`Missing required ${meta.artifact_type} field: ${key}`);
      }
    }
  }

  return { ok: errors.length === 0, errors };
}

export const _testing = { METADATA_REQUIRED, PROMPT_REQUIRED, DATASET_REQUIRED, MODEL_REQUIRED, ENUMS };
