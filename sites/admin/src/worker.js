export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/admin/state") {
      return json({
        status: "foundation",
        source: "sites-admin",
        message: "AP8 foundation stub. Admin workflows follow in AP11.",
        contentApiConfigured: Boolean(env.CONTENT_API_URL),
        generatedAt: new Date().toISOString(),
      });
    }

    if (url.pathname.startsWith("/api/admin/")) {
      return json({
        status: "error",
        message: "Admin API write flows are out of scope for AP8.",
      }, 404);
    }

    return new Response(renderHtml(Boolean(env.CONTENT_API_URL)), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function renderHtml(contentApiConfigured) {
  const apiStatus = contentApiConfigured ? "CONTENT_API_URL gesetzt" : "CONTENT_API_URL fehlt";

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>KI-tomat Admin Foundation</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
        padding: 32px;
        background: Canvas;
        color: CanvasText;
      }

      main {
        max-width: 760px;
        margin: 0 auto;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 28px;
      }

      p {
        line-height: 1.5;
      }

      code {
        padding: 2px 6px;
        border-radius: 4px;
        background: color-mix(in srgb, CanvasText 10%, Canvas);
      }
    </style>
  </head>
  <body>
    <main>
      <h1>KI-tomat Admin Foundation</h1>
      <p>AP8 stellt nur die Sites-Grundstruktur bereit. Sync-Status, Inventar, Notizen und Checklisten folgen in AP11.</p>
      <p>Status: <code>${apiStatus}</code></p>
      <p>State-Endpunkt: <code>/api/admin/state</code></p>
    </main>
  </body>
</html>`;
}
