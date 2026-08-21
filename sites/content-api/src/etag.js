// ETag = SHA-256-Hash ueber den normalisierten Response-Body.
//
// Wichtig: der Hash deckt den vollstaendigen Body ab, nicht nur cacheUpdatedAt
// oder die ID-Liste. Damit aendert sich der ETag genau dann, wenn sich der
// Inhalt aendert - keine veralteten 304, keine nutzlosen Reloads.

function deterministicReplacer(_key, value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const sorted = {};
    for (const k of Object.keys(value).sort()) sorted[k] = value[k];
    return sorted;
  }
  return value;
}

export function canonicalize(value) {
  return JSON.stringify(value, deterministicReplacer);
}

export async function computeEtag(value) {
  const text = canonicalize(value);
  const encoded = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return `"${hex}"`;
}

export function matchesIfNoneMatch(headerValue, etag) {
  if (!headerValue) return false;
  return headerValue.split(",").map((s) => s.trim()).includes(etag);
}
