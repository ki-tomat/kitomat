// AP9 Public Content API Worker.
//
// Routen:
//   GET /api/status          -> Cache-/Sync-Status
//   GET /api/content         -> Liste normalisierter Artefakte (mit ETag)
//   GET /api/content/:id     -> Einzelartefakt mit lazy nachgeladenem README
//   OPTIONS *                -> CORS Preflight
//   sonst                    -> kurzer JSON-Identifier (200)

import { fetchTree, fetchRaw, filterArtifactPaths } from "./github.js";
import { parseYaml } from "./parse.js";
import { validateMinimal } from "./validate.js";
import { mapToArtifact, folderForArtifactType } from "./mapping.js";
import { getList, setList, logSyncRun, lastSyncRun, isFresh } from "./cache.js";
import { computeEtag, matchesIfNoneMatch } from "./etag.js";
import { parseAllowlist, corsHeaders } from "./cors.js";

const REPO_OWNER = "ki-tomat";
const REPO_NAME = "kitomat";
const REPO = `${REPO_OWNER}/${REPO_NAME}`;
const BRANCH = "main";
const DEFAULT_TTL_SECONDS = 1800;

function jsonResponse(payload, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function readTtl(env) {
  const raw = env.CACHE_TTL_SECONDS;
  if (!raw) return DEFAULT_TTL_SECONDS;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return DEFAULT_TTL_SECONDS;
  return parsed;
}

async function loadFromGitHub(env, fetchImpl) {
  const startedAt = new Date().toISOString();
  let tree;
  try {
    tree = await fetchTree({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      branch: BRANCH,
      token: env.GITHUB_TOKEN,
      fetchImpl,
    });
  } catch (err) {
    return { ok: false, startedAt, error: err.message };
  }

  const candidates = filterArtifactPaths(tree);
  const artifacts = [];
  const skips = [];

  for (const c of candidates) {
    try {
      const yamlText = await fetchRaw({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        branch: BRANCH,
        path: c.path,
        token: env.GITHUB_TOKEN,
        fetchImpl,
      });
      const parsed = parseYaml(yamlText);
      if (!parsed.ok) {
        skips.push({ path: c.path, reason: `parse: ${parsed.error}` });
        continue;
      }
      const meta = parsed.value;
      const validation = validateMinimal(meta);
      if (!validation.ok) {
        skips.push({ path: c.path, reason: `validate: ${validation.errors.join("; ")}` });
        continue;
      }
      const expectedFolder = folderForArtifactType(meta.artifact_type);
      if (expectedFolder && expectedFolder !== c.folder) {
        skips.push({
          path: c.path,
          reason: `type-drift: artifact_type=${meta.artifact_type} but folder=${c.folder}`,
        });
        continue;
      }
      if (meta.id !== c.id) {
        skips.push({
          path: c.path,
          reason: `id-mismatch: yaml id=${meta.id} but folder id=${c.id}`,
        });
        continue;
      }
      artifacts.push(mapToArtifact(meta, { repo: REPO, branch: BRANCH }));
    } catch (err) {
      skips.push({ path: c.path, reason: `fetch: ${err.message}` });
    }
  }

  return {
    ok: true,
    startedAt,
    finishedAt: new Date().toISOString(),
    artifacts,
    skips,
  };
}

function listPayload({ status, artifacts, loadedAt, cacheUpdatedAt }) {
  return {
    status,
    source: "sites-content-api",
    repo: REPO,
    branch: BRANCH,
    loadedAt,
    cacheUpdatedAt,
    artifacts,
  };
}

async function respondList(request, env, payload, ttl) {
  // ETag bildet den inhaltlichen Teil ab (Artefakte + cacheUpdatedAt), nicht
  // den volatilen Server-Status oder loadedAt. So liefert ein Refresh innerhalb
  // der TTL denselben ETag, der naechste Live-Sync bekommt einen neuen.
  const etag = await computeEtag({
    artifacts: payload.artifacts,
    cacheUpdatedAt: payload.cacheUpdatedAt,
  });
  const ifNoneMatch = request.headers.get("if-none-match");
  const allowlist = parseAllowlist(env.ALLOWED_ORIGINS);
  const headers = {
    ...corsHeaders(request.headers.get("origin"), allowlist),
    "ETag": etag,
    "Cache-Control": `public, max-age=${ttl}`,
  };
  if (matchesIfNoneMatch(ifNoneMatch, etag)) {
    return new Response(null, { status: 304, headers });
  }
  return jsonResponse(payload, { status: 200, headers });
}

async function handleList(request, env, { fetchImpl }) {
  const ttl = readTtl(env);
  const cached = await getList(env.DB);
  const now = new Date().toISOString();

  if (cached && isFresh(cached.updatedAt, ttl)) {
    return await respondList(request, env, listPayload({
      status: "cache",
      artifacts: cached.value.artifacts ?? [],
      loadedAt: now,
      cacheUpdatedAt: cached.updatedAt,
    }), ttl);
  }

  const load = await loadFromGitHub(env, fetchImpl);
  if (load.ok) {
    const value = { artifacts: load.artifacts };
    await setList(env.DB, value, "live", load.finishedAt);
    await logSyncRun(env.DB, {
      startedAt: load.startedAt,
      finishedAt: load.finishedAt,
      status: "live",
      artifactCount: load.artifacts.length,
      message: load.skips.length > 0 ? `skips: ${JSON.stringify(load.skips)}` : null,
    });
    return await respondList(request, env, listPayload({
      status: "live",
      artifacts: load.artifacts,
      loadedAt: now,
      cacheUpdatedAt: load.finishedAt,
    }), ttl);
  }

  // GitHub-Fehler
  await logSyncRun(env.DB, {
    startedAt: load.startedAt,
    finishedAt: new Date().toISOString(),
    status: "error",
    artifactCount: 0,
    message: load.error,
  });

  if (cached) {
    return await respondList(request, env, listPayload({
      status: "stale",
      artifacts: cached.value.artifacts ?? [],
      loadedAt: now,
      cacheUpdatedAt: cached.updatedAt,
    }), ttl);
  }

  return await respondList(request, env, listPayload({
    status: "error",
    artifacts: [],
    loadedAt: now,
    cacheUpdatedAt: null,
  }), ttl);
}

async function handleDetail(request, env, id, { fetchImpl }) {
  const ttl = readTtl(env);
  const cached = await getList(env.DB);
  let artifacts = cached?.value?.artifacts ?? null;
  let cacheUpdatedAt = cached?.updatedAt ?? null;
  let listStatus = cached ? (isFresh(cached.updatedAt, ttl) ? "cache" : "stale") : "missing";

  if (!cached || !isFresh(cached.updatedAt, ttl)) {
    const load = await loadFromGitHub(env, fetchImpl);
    if (load.ok) {
      const value = { artifacts: load.artifacts };
      await setList(env.DB, value, "live", load.finishedAt);
      await logSyncRun(env.DB, {
        startedAt: load.startedAt,
        finishedAt: load.finishedAt,
        status: "live",
        artifactCount: load.artifacts.length,
        message: load.skips.length > 0 ? `skips: ${JSON.stringify(load.skips)}` : null,
      });
      artifacts = load.artifacts;
      cacheUpdatedAt = load.finishedAt;
      listStatus = "live";
    }
  }

  const allowlist = parseAllowlist(env.ALLOWED_ORIGINS);
  const cors = corsHeaders(request.headers.get("origin"), allowlist);

  if (!artifacts || artifacts.length === 0) {
    return jsonResponse({ status: "error", message: "Artifact not found" }, { status: 404, headers: cors });
  }

  const artifact = artifacts.find((a) => a.id === id);
  if (!artifact) {
    return jsonResponse({ status: "error", message: "Artifact not found" }, { status: 404, headers: cors });
  }

  let readme;
  if (artifact.repoPath) {
    try {
      readme = await fetchRaw({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        branch: BRANCH,
        path: `${artifact.repoPath}/README.md`,
        token: env.GITHUB_TOKEN,
        fetchImpl,
      });
    } catch (_err) {
      readme = undefined;
    }
  }

  const payload = {
    status: listStatus,
    source: "sites-content-api",
    repo: REPO,
    branch: BRANCH,
    loadedAt: new Date().toISOString(),
    cacheUpdatedAt,
    artifact: readme !== undefined ? { ...artifact, readme } : artifact,
  };

  return jsonResponse(payload, {
    status: 200,
    headers: { ...cors, "Cache-Control": `public, max-age=${ttl}` },
  });
}

async function handleStatus(request, env) {
  const ttl = readTtl(env);
  const cached = await getList(env.DB);
  const last = await lastSyncRun(env.DB);
  const allowlist = parseAllowlist(env.ALLOWED_ORIGINS);
  const payload = {
    status: cached ? (isFresh(cached.updatedAt, ttl) ? "cache" : "stale") : "empty",
    source: "sites-content-api",
    cacheUpdatedAt: cached?.updatedAt ?? null,
    artifactCount: cached?.value?.artifacts?.length ?? 0,
    ttlSeconds: ttl,
    lastSyncStartedAt: last?.started_at ?? null,
    lastSyncFinishedAt: last?.finished_at ?? null,
    lastSyncStatus: last?.status ?? null,
    lastSyncMessage: last?.message ?? null,
  };
  return jsonResponse(payload, {
    status: 200,
    headers: corsHeaders(request.headers.get("origin"), allowlist),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowlist = parseAllowlist(env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request.headers.get("origin"), allowlist),
      });
    }

    // Test-Hook: erlaubt Vitest, fetch fuer GitHub-Calls zu stubben,
    // ohne globalThis.fetch zu patchen.
    const fetchImpl = env.__FETCH ?? globalThis.fetch;

    if (request.method !== "GET") {
      return jsonResponse({ status: "error", message: "Method not allowed" }, {
        status: 405,
        headers: corsHeaders(request.headers.get("origin"), allowlist),
      });
    }

    if (url.pathname === "/api/status") {
      return await handleStatus(request, env);
    }

    if (url.pathname === "/api/content") {
      return await handleList(request, env, { fetchImpl });
    }

    if (url.pathname.startsWith("/api/content/")) {
      const id = url.pathname.slice("/api/content/".length);
      if (id && !id.includes("/")) {
        return await handleDetail(request, env, id, { fetchImpl });
      }
    }

    return jsonResponse(
      {
        status: "ok",
        service: "kitomat-content-api",
        endpoints: ["/api/status", "/api/content", "/api/content/:id"],
      },
      { status: 200, headers: corsHeaders(request.headers.get("origin"), allowlist) }
    );
  },
};
