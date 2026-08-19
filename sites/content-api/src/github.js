// Minimaler GitHub-Client fuer Tree- und Raw-Zugriff.
// fetchImpl ist injizierbar, damit Tests stubben koennen.

const USER_AGENT = "kitomat-sites-content-api";

function authHeaders(token) {
  const headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": USER_AGENT,
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function fetchTree({ owner, repo, branch, token, fetchImpl = globalThis.fetch }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const res = await fetchImpl(url, { headers: authHeaders(token) });
  if (!res.ok) {
    throw new Error(`GitHub tree fetch failed: ${res.status} ${res.statusText}`);
  }
  const body = await res.json();
  if (!Array.isArray(body.tree)) {
    throw new Error("GitHub tree response missing 'tree' array");
  }
  return body.tree;
}

export async function fetchRaw({ owner, repo, branch, path, token, fetchImpl = globalThis.fetch }) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  const headers = {
    "User-Agent": USER_AGENT,
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetchImpl(url, { headers });
  if (!res.ok) {
    const err = new Error(`GitHub raw fetch failed: ${res.status} ${path}`);
    err.status = res.status;
    throw err;
  }
  return await res.text();
}

const METADATA_PATTERN = /^(prompts|datasets|models)\/([^/_][^/]*)\/metadata\.yml$/;

export function filterArtifactPaths(tree) {
  const results = [];
  for (const entry of tree) {
    if (entry.type !== "blob") continue;
    const match = METADATA_PATTERN.exec(entry.path);
    if (!match) continue;
    results.push({
      path: entry.path,
      folder: match[1],
      id: match[2],
    });
  }
  return results;
}

export const _testing = { METADATA_PATTERN };
