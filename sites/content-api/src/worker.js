export default {
  async fetch(request) {
    const url = new URL(request.url);
    const headers = corsHeaders();

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/api/status") {
      return json({
        status: "foundation",
        source: "sites-content-api",
        message: "AP8 foundation stub. GitHub loading follows in AP9.",
        cacheUpdatedAt: null,
        artifactCount: 0,
      }, 200, headers);
    }

    if (url.pathname === "/api/content") {
      return json({
        status: "foundation",
        source: "sites-content-api",
        repo: "ki-tomat/kitomat",
        branch: "main",
        loadedAt: new Date().toISOString(),
        cacheUpdatedAt: null,
        artifacts: [],
      }, 200, headers);
    }

    if (url.pathname.startsWith("/api/content/")) {
      return json({
        status: "error",
        message: "Artifact not found. AP9 implements live content lookup.",
      }, 404, headers);
    }

    return json({
      status: "ok",
      service: "kitomat-content-api",
      phase: "AP8 foundation",
    }, 200, headers);
  },
};

function json(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
