import yaml from "js-yaml";

export function parseYaml(text) {
  try {
    const value = yaml.load(text, { schema: yaml.JSON_SCHEMA });
    if (value === null || value === undefined || typeof value !== "object") {
      return { ok: false, error: "YAML did not produce an object" };
    }
    return { ok: true, value };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
