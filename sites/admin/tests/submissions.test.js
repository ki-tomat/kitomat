import { afterEach, describe, expect, it, vi } from 'vitest';

import { createWorker } from '../src/worker.js';

const baseEnv = {
  LOCAL_DEV: 'true',
  ALLOWED_ORIGIN: 'https://admin.example',
  SUBMISSIONS_API_URL: 'https://submissions.example',
  SUBMISSIONS_INTERNAL_SERVICE_TOKEN: 'internal-secret',
};

afterEach(() => vi.unstubAllGlobals());

describe('AP15 review surface', () => {
  it('renders package inspection and all human decisions', async () => {
    const response = await createWorker().fetch(
      new Request('https://admin.example/submissions'),
      baseEnv,
    );
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).toContain('Prüfpaket herunterladen');
    expect(html).toContain('Änderungen anfordern');
    expect(html).toContain('Ablehnen');
    expect(html).toContain('Datenschutz- und PII-Hinweise geprüft');
  });

  it('proxies the private review package with the internal token', async () => {
    let upstreamRequest;
    vi.stubGlobal('fetch', vi.fn(async (url, init) => {
      upstreamRequest = { url, init };
      return new Response(new Uint8Array([80, 75, 3, 4]), {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="demo.zip"',
          'X-Kitomat-Sha256': 'abc123',
        },
      });
    }));
    const response = await createWorker().fetch(
      new Request('https://admin.example/api/admin/submissions/12345678-1234-1234-1234-123456789abc/package'),
      baseEnv,
    );
    expect(response.status).toBe(200);
    expect(upstreamRequest.url).toContain('/internal/submissions/12345678-1234-1234-1234-123456789abc/package');
    expect(upstreamRequest.init.headers['X-Kitomat-Internal-Token']).toBe('internal-secret');
    expect(upstreamRequest.init.headers['Content-Type']).toBeUndefined();
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });

  it('forwards the complete reviewer decision to the submission service', async () => {
    let forwarded;
    vi.stubGlobal('fetch', vi.fn(async (_url, init) => {
      forwarded = JSON.parse(init.body);
      return Response.json({ state: 'approved_for_import' });
    }));
    const response = await createWorker().fetch(
      new Request('https://admin.example/api/admin/submissions/12345678-1234-1234-1234-123456789abc/decision', {
        method: 'POST',
        headers: { Origin: 'https://admin.example', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outcome: 'approved_for_import',
          status: 'silver',
          note: 'Geprüft und nachvollziehbar.',
          checks: { content: true, sources_license: true, privacy: true },
        }),
      }),
      baseEnv,
    );
    expect(response.status).toBe(200);
    expect(forwarded).toMatchObject({
      actor: 'local.admin@example.test',
      role: 'admin',
      outcome: 'approved_for_import',
      status: 'silver',
      checks: { content: true, sources_license: true, privacy: true },
    });
  });
});
