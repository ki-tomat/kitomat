// CORS-Logik fuer Public Read-only Content API.
//
// - ALLOWED_ORIGINS leer -> "*" (Public Read-only, kein Credentials).
// - ALLOWED_ORIGINS gesetzt -> Allowlist, Request-Origin zurueckspiegeln wenn Treffer.

const COMMON_HEADERS = {
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
  "Vary": "Origin",
};

export function parseAllowlist(value) {
  if (typeof value !== "string" || value.trim() === "") return [];
  return value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
}

export function corsHeaders(requestOrigin, allowlist) {
  const headers = { ...COMMON_HEADERS };
  if (!allowlist || allowlist.length === 0) {
    headers["Access-Control-Allow-Origin"] = "*";
    return headers;
  }
  if (requestOrigin && allowlist.includes(requestOrigin)) {
    headers["Access-Control-Allow-Origin"] = requestOrigin;
  }
  return headers;
}
