import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { Miniflare } from "miniflare";
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCHEMA_SQL = readFileSync(join(ROOT, "db/schema.sql"), "utf8");

let workerScript;
let mf;
let outboundRoutes = {};

function setRoutes(routes) {
  outboundRoutes = routes;
}

function jsonRoute(payload, status = 200) {
  return {
    body: JSON.stringify(payload),
    status,
    headers: { "content-type": "application/json" },
  };
}

function textRoute(text, status = 200) {
  return { body: text, status, headers: { "content-type": "text/plain" } };
}

function errorRoute(status = 500) {
  return { body: "stubbed error", status };
}

async function bundleWorker() {
  const result = await build({
    entryPoints: [join(ROOT, "src/worker.js")],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    write: false,
  });
  return result.outputFiles[0].text;
}

async function buildMf() {
  const m = new Miniflare({
    modules: true,
    script: workerScript,
    scriptPath: "worker.mjs",
    d1Databases: { DB: "ap9-test" },
    bindings: { ALLOWED_ORIGINS: "", CACHE_TTL_SECONDS: "1800" },
    compatibilityDate: "2024-09-01",
    outboundService: async (request) => {
      const url = new URL(request.url);
      const key = url.hostname + url.pathname + (url.search ?? "");
      const route = outboundRoutes[key] ?? outboundRoutes[url.hostname + url.pathname];
      if (!route) {
        return new Response("not stubbed: " + url.toString(), { status: 599 });
      }
      return new Response(route.body, { status: route.status ?? 200, headers: route.headers });
    },
  });
  const db = await m.getD1Database("DB");
  const statements = SCHEMA_SQL
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    await db.prepare(stmt).run();
  }
  return { mf: m, db };
}

beforeAll(async () => {
  workerScript = await bundleWorker();
  const built = await buildMf();
  mf = built.mf;
});

afterAll(async () => {
  if (mf) await mf.dispose();
});

beforeEach(async () => {
  const db = await mf.getD1Database("DB");
  await db.prepare("DELETE FROM content_cache").run();
  await db.prepare("DELETE FROM sync_runs").run();
  outboundRoutes = {};
});

const TREE_URL =
  "api.github.com/repos/ki-tomat/kitomat/git/trees/main?recursive=1";

function metadataPromptYaml(id = "prompt-demo", overrides = {}) {
  const meta = {
    id,
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
    legal_disclaimer: "Beispieltext.",
    sources_status: "checked",
    target_users: ["KMU"],
    use_case: "Einstiegs-Prompt.",
    required_inputs: ["Branche"],
    output_format: "Text",
    personal_data_possible: false,
    evaluation_criteria: "Klarheit",
    ...overrides,
  };
  return Object.entries(meta)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join("\n");
}

describe("GET /api/status", () => {
  it("ohne Cache -> status=empty", async () => {
    const res = await mf.dispatchFetch("http://test/api/status");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("empty");
    expect(body.artifactCount).toBe(0);
    expect(body.cacheUpdatedAt).toBeNull();
  });
});

describe("GET /api/content", () => {
  it("leerer Tree (nur _template/) -> live + leere Liste", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [
          { path: "prompts/_template/metadata.yml", type: "blob" },
          { path: "datasets/_template/metadata.yml", type: "blob" },
          { path: "README.md", type: "blob" },
        ],
      }),
    });
    const res = await mf.dispatchFetch("http://test/api/content");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("live");
    expect(body.artifacts).toEqual([]);
    expect(res.headers.get("etag")).toMatch(/^"[0-9a-f]+"$/);
    expect(res.headers.get("cache-control")).toContain("max-age=");
  });

  it("ein valides Artefakt -> in Antwort enthalten", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "prompts/prompt-demo/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/metadata.yml":
        textRoute(metadataPromptYaml()),
    });
    const res = await mf.dispatchFetch("http://test/api/content");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("live");
    expect(body.artifacts).toHaveLength(1);
    expect(body.artifacts[0].id).toBe("prompt-demo");
    expect(body.artifacts[0].type).toBe("prompt");
  });

  it("If-None-Match mit gleichem ETag -> 304", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({ tree: [] }),
    });
    const first = await mf.dispatchFetch("http://test/api/content");
    const etag = first.headers.get("etag");
    expect(etag).toBeTruthy();
    // Innerhalb TTL -> Cache, gleicher Body, gleicher ETag.
    const second = await mf.dispatchFetch("http://test/api/content", {
      headers: { "if-none-match": etag },
    });
    expect(second.status).toBe(304);
  });

  it("GitHub-Fehler ohne Cache -> status=error, leere Liste", async () => {
    setRoutes({
      [TREE_URL]: errorRoute(502),
    });
    const res = await mf.dispatchFetch("http://test/api/content");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("error");
    expect(body.artifacts).toEqual([]);
  });

  it("GitHub-Fehler mit vorhandenem Cache -> status=stale", async () => {
    // 1) Cache fuellen
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "prompts/prompt-demo/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/metadata.yml":
        textRoute(metadataPromptYaml()),
    });
    await mf.dispatchFetch("http://test/api/content");
    // 2) Cache veralten lassen
    const db = await mf.getD1Database("DB");
    const oldTs = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    await db
      .prepare("UPDATE content_cache SET updated_at = ?1")
      .bind(oldTs)
      .run();
    // 3) GitHub jetzt down
    setRoutes({ [TREE_URL]: errorRoute(502) });
    const res = await mf.dispatchFetch("http://test/api/content");
    const body = await res.json();
    expect(body.status).toBe("stale");
    expect(body.artifacts).toHaveLength(1);
  });

  it("artifact_type-vs-Ordner-Drift -> Artefakt fehlt, sync_runs-Eintrag mit drift-Reason", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "models/drifted/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/models/drifted/metadata.yml":
        // artifact_type=prompt_package in models/-Ordner
        textRoute(metadataPromptYaml("drifted")),
    });
    const res = await mf.dispatchFetch("http://test/api/content");
    const body = await res.json();
    expect(body.artifacts).toHaveLength(0);
    const db = await mf.getD1Database("DB");
    const row = await db
      .prepare("SELECT message FROM sync_runs ORDER BY id DESC LIMIT 1")
      .first();
    expect(row?.message ?? "").toMatch(/type-drift/);
  });

  it("invalides YAML (Required-Feld fehlt) -> Artefakt fehlt + sync_runs validate-Reason", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "prompts/incomplete/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/incomplete/metadata.yml":
        textRoute(metadataPromptYaml("incomplete", { use_case: undefined })),
    });
    const res = await mf.dispatchFetch("http://test/api/content");
    const body = await res.json();
    expect(body.artifacts).toHaveLength(0);
    const db = await mf.getD1Database("DB");
    const row = await db
      .prepare("SELECT message FROM sync_runs ORDER BY id DESC LIMIT 1")
      .first();
    expect(row?.message ?? "").toMatch(/validate/);
  });
});

describe("GET /api/content/:id", () => {
  it("unbekannte ID -> 404-JSON", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({ tree: [] }),
    });
    const res = await mf.dispatchFetch("http://test/api/content/unknown");
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.status).toBe("error");
  });

  it("bekannte ID mit README -> readme im Body", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "prompts/prompt-demo/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/metadata.yml":
        textRoute(metadataPromptYaml()),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/README.md":
        textRoute("# Prompt Demo\n\nLong text."),
    });
    const res = await mf.dispatchFetch("http://test/api/content/prompt-demo");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.artifact.id).toBe("prompt-demo");
    expect(body.artifact.readme).toContain("Prompt Demo");
  });

  it("bekannte ID ohne README -> Artefakt ohne readme-Feld (Fehler nicht-fatal)", async () => {
    setRoutes({
      [TREE_URL]: jsonRoute({
        tree: [{ path: "prompts/prompt-demo/metadata.yml", type: "blob" }],
      }),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/metadata.yml":
        textRoute(metadataPromptYaml()),
      "raw.githubusercontent.com/ki-tomat/kitomat/main/prompts/prompt-demo/README.md":
        errorRoute(404),
    });
    const res = await mf.dispatchFetch("http://test/api/content/prompt-demo");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.artifact.id).toBe("prompt-demo");
    expect(body.artifact.readme).toBeUndefined();
  });
});

describe("OPTIONS Preflight", () => {
  it("liefert 204 mit CORS-Headern", async () => {
    const res = await mf.dispatchFetch("http://test/api/content", {
      method: "OPTIONS",
    });
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBeTruthy();
    expect(res.headers.get("access-control-allow-methods")).toMatch(/GET/);
  });
});
