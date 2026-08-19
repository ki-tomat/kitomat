// Feld-Mapping von metadata.yml auf das WebUI-Artefakt-Format.
//
// SCHEMA-DRIFT-HINWEIS:
//   SOURCES_LABELS und AI_ACT_LABELS spiegeln Enum-Werte aus
//   schemas/metadata.schema.json (Stand origin/develop @ a5b0b84, 2026-06-09).
//   Bei Schema-Aenderungen Folge-Issue.
//
// QUELLE DER WAHRHEIT FUER DEN TYP:
//   artifact_type-Feld in der YAML, nicht der Ordnername.
//   Ordner-Drift wird im Worker erkannt und nach sync_runs geloggt;
//   das Artefakt wird uebersprungen statt stillschweigend uebernommen.

export const TYPE_MAP = {
  prompt_package: "prompt",
  dataset_package: "dataset",
  model: "industry",
};

export const TYPE_LABELS = {
  prompt: "Prompt-Paket",
  dataset: "Quellenpaket",
  industry: "KMU-/Branchenmodell",
};

// sources_status: not_required | missing | provided | checked | unverified
// (declared gehoert zu license_status, nicht hierher.)
export const SOURCES_LABELS = {
  not_required: "Nicht erforderlich",
  missing: "Quellen fehlen",
  provided: "Quellen vorhanden",
  checked: "Geprueft",
  unverified: "Ungeprueft",
};

// ai_act_proximity: none | transparency | high_risk_adjacent | prohibited_check | unclear
// Texte sind Vorschlag, vor Merge vom Fachverantwortlichen final zu bestaetigen.
export const AI_ACT_LABELS = {
  none: "Kein AI-Act-Bezug",
  transparency: "Transparenzpflichten (Art. 50)",
  high_risk_adjacent: "Naehe zu Hochrisiko-Anwendung - Einzelfallpruefung",
  prohibited_check: "Auf verbotene Praxis zu pruefen (Art. 5)",
  unclear: "AI-Act-Einordnung unklar",
};

const FOLDER_FOR_TYPE = {
  prompt: "prompts",
  dataset: "datasets",
  industry: "models",
};

export function folderForArtifactType(artifactType) {
  return FOLDER_FOR_TYPE[TYPE_MAP[artifactType]];
}

const SHORT_FALLBACK = "Keine Kurzbeschreibung vorhanden.";

function shortFromUseCase(useCase) {
  if (typeof useCase !== "string" || useCase.length === 0) return SHORT_FALLBACK;
  const trimmed = useCase.trim();
  if (trimmed.length <= 180) return trimmed;
  return trimmed.slice(0, 177) + "...";
}

function audienceToString(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return undefined;
}

export function mapToArtifact(meta, { repo, branch }) {
  const type = TYPE_MAP[meta.artifact_type];
  const folder = FOLDER_FOR_TYPE[type];
  const repoPath = folder && meta.id ? `${folder}/${meta.id}` : undefined;
  const githubUrl = repoPath
    ? `https://github.com/${repo}/tree/${branch}/${repoPath}`
    : undefined;

  const context =
    typeof meta.use_case === "string" && meta.use_case.length > 0
      ? meta.use_case
      : (meta.artifact_type === "model" && typeof meta.application_scope === "string"
          ? meta.application_scope
          : undefined);

  const artifact = {
    id: meta.id,
    title: meta.title && meta.title.length > 0 ? meta.title : meta.id,
    type,
    typeLabel: TYPE_LABELS[type],
    status: meta.status,
    risk: meta.data_risk ?? "yellow",
    aiAct: AI_ACT_LABELS[meta.ai_act_proximity] ?? meta.ai_act_proximity,
    license: meta.license,
    license_status: meta.license_status,
    language: meta.language,
    version: meta.version,
    contributor: meta.maintainer,
    topic: meta.category,
    audience: audienceToString(meta.target_users),
    context,
    sources: SOURCES_LABELS[meta.sources_status] ?? meta.sources_status,
    short: shortFromUseCase(meta.use_case),
    repoPath,
    githubUrl,
    legal_disclaimer: meta.legal_disclaimer,
    personal_data_possible: meta.personal_data_possible,
    human_review_required: meta.human_review_required,
  };

  if (meta.artifact_type === "dataset_package") {
    artifact.contains_personal_data = meta.contains_personal_data;
    artifact.contains_sensitive_data = meta.contains_sensitive_data;
    if (typeof meta.data_origin === "string") {
      artifact.data_origin = meta.data_origin;
    }
  }

  return artifact;
}
