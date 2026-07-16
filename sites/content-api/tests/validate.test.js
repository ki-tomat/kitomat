import { describe, it, expect } from "vitest";
import { validateMinimal } from "../src/validate.js";

function validPrompt() {
  return {
    id: "p1",
    artifact_type: "prompt_package",
    title: "T",
    category: "Onboarding",
    status: "draft",
    language: "DE",
    version: "v1",
    maintainer: "@x",
    license: "CC BY 4.0",
    license_status: "declared",
    data_risk: "green",
    human_review_required: false,
    ai_act_proximity: "none",
    legal_disclaimer: "Beispieltext.",
    sources_status: "checked",
    target_users: ["x"],
    use_case: "use case text",
    required_inputs: ["x"],
    output_format: "Text",
    personal_data_possible: false,
    evaluation_criteria: "ok",
  };
}

describe("validateMinimal", () => {
  it("akzeptiert vollstaendigen prompt_package", () => {
    expect(validateMinimal(validPrompt())).toEqual({ ok: true, errors: [] });
  });

  it("lehnt fehlendes required base field ab", () => {
    const m = validPrompt();
    delete m.legal_disclaimer;
    const res = validateMinimal(m);
    expect(res.ok).toBe(false);
    expect(res.errors.join(" ")).toMatch(/legal_disclaimer/);
  });

  it("lehnt fehlendes prompt-spezifisches Pflichtfeld ab", () => {
    const m = validPrompt();
    delete m.use_case;
    const res = validateMinimal(m);
    expect(res.ok).toBe(false);
    expect(res.errors.join(" ")).toMatch(/use_case/);
  });

  it("lehnt invalides Enum (status) ab", () => {
    const m = validPrompt();
    m.status = "platinum";
    const res = validateMinimal(m);
    expect(res.ok).toBe(false);
    expect(res.errors.join(" ")).toMatch(/status/);
  });

  it("lehnt invalides Enum (sources_status) ab", () => {
    const m = validPrompt();
    m.sources_status = "declared"; // gehoert zu license_status
    const res = validateMinimal(m);
    expect(res.ok).toBe(false);
    expect(res.errors.join(" ")).toMatch(/sources_status/);
  });

  it("akzeptiert alle 7 status-Stufen", () => {
    for (const s of [
      "draft",
      "bronze_candidate",
      "bronze",
      "silver_candidate",
      "silver",
      "gold_candidate",
      "gold",
    ]) {
      const m = validPrompt();
      m.status = s;
      expect(validateMinimal(m).ok).toBe(true);
    }
  });

  it("lehnt non-object input ab", () => {
    expect(validateMinimal(null).ok).toBe(false);
    expect(validateMinimal("text").ok).toBe(false);
  });
});
