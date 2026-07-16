import { describe, it, expect } from "vitest";
import {
  mapToArtifact,
  TYPE_MAP,
  SOURCES_LABELS,
  AI_ACT_LABELS,
  folderForArtifactType,
} from "../src/mapping.js";

const REPO_CTX = { repo: "ki-tomat/kitomat", branch: "main" };

function basePromptMeta() {
  return {
    id: "prompt-demo",
    artifact_type: "prompt_package",
    title: "Demo Prompt",
    category: "Onboarding",
    status: "draft",
    language: "DE",
    version: "v1.0.0",
    maintainer: "@demo",
    license: "CC BY 4.0",
    license_status: "declared",
    data_risk: "green",
    human_review_required: false,
    ai_act_proximity: "transparency",
    legal_disclaimer: "Nur als Beispiel.",
    sources_status: "checked",
    target_users: ["KMU"],
    use_case: "Einstiegs-Prompt fuer KMU-Mitarbeitende.",
    required_inputs: ["Branche"],
    output_format: "Text",
    personal_data_possible: false,
    evaluation_criteria: "Klarheit",
  };
}

function baseDatasetMeta() {
  return {
    id: "dataset-demo",
    artifact_type: "dataset_package",
    title: "Demo Dataset",
    category: "Recht & Regulierung",
    status: "bronze_candidate",
    language: "DE / EN",
    version: "v0.9.1",
    maintainer: "@tarek",
    license: "Mixed",
    license_status: "declared",
    data_risk: "yellow",
    human_review_required: true,
    ai_act_proximity: "high_risk_adjacent",
    legal_disclaimer: "Quellen pruefen.",
    sources_status: "provided",
    linked_artifacts: [],
    data_origin: "Oeffentliche Primaerquellen",
    contains_personal_data: false,
    contains_sensitive_data: false,
    sources_date: "2025-Q4",
    usage_scope: "Recherche",
  };
}

function baseModelMeta() {
  return {
    id: "model-demo",
    artifact_type: "model",
    title: "Demo Branchenmodell",
    category: "Branchenmodell",
    status: "silver",
    language: "DE",
    version: "v1.0.0",
    maintainer: "@miriam",
    license: "CC BY 4.0",
    license_status: "declared",
    data_risk: "green",
    human_review_required: false,
    ai_act_proximity: "none",
    legal_disclaimer: "Qualitatives Modell.",
    sources_status: "not_required",
    model_type: "Use-Case-Raster",
    target_users: ["Berater:innen"],
    use_case: "Use-Case-Strukturierung fuer Handwerksbetriebe.",
    required_inputs: ["Branche"],
    output_format: "Tabelle",
    application_scope: "Operativer Bereich",
    framework_references: [],
    required_review_level: "peer",
  };
}

describe("mapping/TYPE_MAP", () => {
  it("prompt_package -> prompt", () => expect(TYPE_MAP.prompt_package).toBe("prompt"));
  it("dataset_package -> dataset", () => expect(TYPE_MAP.dataset_package).toBe("dataset"));
  it("model -> industry", () => expect(TYPE_MAP.model).toBe("industry"));
});

describe("mapping/folderForArtifactType", () => {
  it("prompt_package -> prompts", () => expect(folderForArtifactType("prompt_package")).toBe("prompts"));
  it("dataset_package -> datasets", () => expect(folderForArtifactType("dataset_package")).toBe("datasets"));
  it("model -> models", () => expect(folderForArtifactType("model")).toBe("models"));
});

describe("mapping/SOURCES_LABELS deckt alle 5 Enum-Werte ab", () => {
  it.each([
    ["not_required", "Nicht erforderlich"],
    ["missing", "Quellen fehlen"],
    ["provided", "Quellen vorhanden"],
    ["checked", "Geprueft"],
    ["unverified", "Ungeprueft"],
  ])("%s -> %s", (key, label) => expect(SOURCES_LABELS[key]).toBe(label));
});

describe("mapping/AI_ACT_LABELS deckt alle 5 Enum-Werte ab", () => {
  it.each([
    "none",
    "transparency",
    "high_risk_adjacent",
    "prohibited_check",
    "unclear",
  ])("%s ist gesetzt", (key) => expect(typeof AI_ACT_LABELS[key]).toBe("string"));
});

describe("mapToArtifact/prompt", () => {
  it("setzt type, typeLabel, repoPath und sources-Label", () => {
    const a = mapToArtifact(basePromptMeta(), REPO_CTX);
    expect(a.type).toBe("prompt");
    expect(a.typeLabel).toBe("Prompt-Paket");
    expect(a.repoPath).toBe("prompts/prompt-demo");
    expect(a.githubUrl).toBe("https://github.com/ki-tomat/kitomat/tree/main/prompts/prompt-demo");
    expect(a.sources).toBe("Geprueft");
    expect(a.aiAct).toBe(AI_ACT_LABELS.transparency);
    expect(a.audience).toBe("KMU");
    expect(a.context).toBe("Einstiegs-Prompt fuer KMU-Mitarbeitende.");
    expect(a.personal_data_possible).toBe(false);
  });
});

describe("mapToArtifact/dataset", () => {
  it("uebernimmt DSGVO-Felder und data_origin", () => {
    const a = mapToArtifact(baseDatasetMeta(), REPO_CTX);
    expect(a.type).toBe("dataset");
    expect(a.typeLabel).toBe("Quellenpaket");
    expect(a.repoPath).toBe("datasets/dataset-demo");
    expect(a.contains_personal_data).toBe(false);
    expect(a.contains_sensitive_data).toBe(false);
    expect(a.data_origin).toBe("Oeffentliche Primaerquellen");
    expect(a.sources).toBe("Quellen vorhanden");
  });
});

describe("mapToArtifact/model->industry", () => {
  it("setzt type=industry und typeLabel=KMU-/Branchenmodell", () => {
    const a = mapToArtifact(baseModelMeta(), REPO_CTX);
    expect(a.type).toBe("industry");
    expect(a.typeLabel).toBe("KMU-/Branchenmodell");
    expect(a.repoPath).toBe("models/model-demo");
    expect(a.aiAct).toBe(AI_ACT_LABELS.none);
    expect(a.sources).toBe("Nicht erforderlich");
  });
});

describe("mapToArtifact/Defaults", () => {
  it("title leer -> id", () => {
    const meta = { ...basePromptMeta(), title: "" };
    const a = mapToArtifact(meta, REPO_CTX);
    expect(a.title).toBe("prompt-demo");
  });
  it("data_risk fehlt -> yellow", () => {
    const meta = { ...basePromptMeta() };
    delete meta.data_risk;
    const a = mapToArtifact(meta, REPO_CTX);
    expect(a.risk).toBe("yellow");
  });
  it("use_case leer -> short Fallback-Text", () => {
    const meta = { ...basePromptMeta(), use_case: "" };
    const a = mapToArtifact(meta, REPO_CTX);
    expect(a.short).toBe("Keine Kurzbeschreibung vorhanden.");
  });
});
