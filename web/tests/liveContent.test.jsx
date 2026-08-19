import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { LIBRARY } from '../src/data/library.js';

const API_URL = 'https://content-api.test/';
const ENDPOINT = 'https://content-api.test/api/content';

// Ein minimales, vertragskonformes API-Artefakt (AP9-Format).
const apiArtifact = {
  id: 'live-prompt-001',
  title: 'Live Prompt-Paket',
  type: 'prompt',
  typeLabel: 'Prompt-Paket',
  short: 'Aus der Content-API geladen.',
  status: 'gold',
  risk: 'green',
  license: 'CC BY 4.0',
  sources: 'geprüft',
  version: 'v1.0.0',
  contributor: '@live',
  topic: 'Test',
  repoPath: 'prompts/live-prompt-001',
  githubUrl: 'https://github.com/ki-tomat/kitomat/tree/main/prompts/live-prompt-001',
  legal_disclaimer: 'Nur zu Testzwecken.',
  personal_data_possible: false,
  human_review_required: true,
};

function liveResponse(artifacts) {
  return {
    ok: true,
    json: async () => ({
      status: 'live',
      source: 'sites-content-api',
      repo: 'ki-tomat/kitomat',
      branch: 'main',
      loadedAt: '2026-06-10T00:00:00.000Z',
      cacheUpdatedAt: null,
      artifacts,
    }),
  };
}

function githubTreeResponse(paths) {
  return {
    ok: true,
    json: async () => ({
      tree: paths.map((path) => ({ path })),
    }),
  };
}

function githubMetadataResponse(meta) {
  return {
    ok: true,
    text: async () => Object.entries(meta)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n${value.map((v) => `  - "${v}"`).join('\n')}`;
        }
        return `${key}: "${value}"`;
      })
      .join('\n'),
  };
}

// Bridge frisch importieren, damit der modulinterne memorySnapshot pro Test leer ist.
async function loadBridge() {
  vi.resetModules();
  return import('../src/data/liveContent.js');
}

beforeEach(() => {
  localStorage.clear();
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('useLibraryData bridge', () => {
  it('ohne API-URL: laedt Artefakte direkt aus GitHub', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', '');
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(githubTreeResponse([
        'prompts/github-prompt-001/metadata.yml',
        'prompts/_template/metadata.yml',
      ]))
      .mockResolvedValueOnce(githubMetadataResponse({
        id: 'github-prompt-001',
        artifact_type: 'prompt_package',
        title: 'GitHub Prompt-Paket',
        category: 'Test',
        status: 'bronze_candidate',
        language: 'de',
        version: '1.0.0',
        maintainer: '@github',
        license: 'CC-BY-4.0',
        data_risk: 'green',
        ai_act_proximity: 'none',
        sources_status: 'provided',
        target_users: ['KMU'],
        use_case: 'Aus dem oeffentlichen GitHub-Repo geladen.',
      }));
    vi.stubGlobal('fetch', fetchMock);
    const { useLibraryData } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('github');
    expect(result.current.artifacts).toHaveLength(1);
    expect(result.current.artifacts[0].id).toBe('github-prompt-001');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('GitHub-Fallback akzeptiert Ordnernamen, die von metadata.id abweichen', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', '');
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(githubTreeResponse([
        'models/jk-ki-stakeholder-persona-framework/metadata.yml',
      ]))
      .mockResolvedValueOnce(githubMetadataResponse({
        id: 'ki-stakeholder-persona-framework',
        artifact_type: 'model',
        title: 'Perspektive wechseln',
        category: 'consulting',
        status: 'bronze_candidate',
        language: 'de',
        version: '0.1.0',
        maintainer: 'jk',
        license: 'CC-BY-4.0',
        data_risk: 'yellow',
        ai_act_proximity: 'high_risk_adjacent',
        sources_status: 'provided',
        target_users: ['KI-Beraterinnen und -Berater'],
        use_case: 'Stakeholder-Perspektiven entwickeln.',
      }));
    vi.stubGlobal('fetch', fetchMock);
    const { useLibraryData, artifactGithubUrl } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('github');
    expect(result.current.artifacts).toHaveLength(1);
    expect(result.current.artifacts[0].id).toBe('ki-stakeholder-persona-framework');
    expect(result.current.artifacts[0].repoPath).toBe('models/jk-ki-stakeholder-persona-framework');
    expect(artifactGithubUrl(result.current.artifacts[0])).toBe(
      'https://github.com/ki-tomat/kitomat/tree/main/models/jk-ki-stakeholder-persona-framework',
    );
  });

  it('mit API-URL und Live-Daten: zeigt Live-Artefakte', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', API_URL);
    const fetchMock = vi.fn().mockResolvedValue(liveResponse([apiArtifact]));
    vi.stubGlobal('fetch', fetchMock);
    const { useLibraryData, artifactGithubUrl } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // trailing-slash-sicher zusammengesetzt
    expect(fetchMock).toHaveBeenCalledWith(ENDPOINT, expect.any(Object));
    expect(result.current.status).toBe('live');
    expect(result.current.artifacts).toHaveLength(1);
    expect(result.current.artifacts[0].id).toBe('live-prompt-001');
    expect(artifactGithubUrl(result.current.artifacts[0])).toBe(apiArtifact.githubUrl);
  });

  it('leere Live-Liste: faellt auf Mockdaten zurueck (kein Fehler)', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', API_URL);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(liveResponse([])));
    const { useLibraryData } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('fallback');
    expect(result.current.artifacts).toHaveLength(LIBRARY.length);
  });

  it('API-Status error: nicht cachen, Mock-Fallback', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', API_URL);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'error', artifacts: [] }) }),
    );
    const { useLibraryData } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('fallback');
    expect(localStorage.getItem('kitomat_public_content_cache_v1')).toBeNull();
  });

  it('Netzwerkfehler ohne Cache: Mock-Fallback', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', API_URL);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const { useLibraryData } = await loadBridge();

    const { result } = renderHook(() => useLibraryData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBe('fallback');
    expect(result.current.artifacts).toHaveLength(LIBRARY.length);
  });

  it('Netzwerkfehler mit vorhandenem Cache: liefert Cache-Daten', async () => {
    vi.stubEnv('VITE_KITOMAT_CONTENT_API_URL', API_URL);

    // 1. Lauf: Live-Daten -> schreibt localStorage-Cache.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(liveResponse([apiArtifact])));
    let bridge = await loadBridge();
    const first = renderHook(() => bridge.useLibraryData());
    await waitFor(() => expect(first.result.current.status).toBe('live'));
    first.unmount();

    // 2. Lauf: Modul frisch (memorySnapshot leer), API faellt aus -> Cache greift.
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    bridge = await loadBridge();
    const second = renderHook(() => bridge.useLibraryData());
    await waitFor(() => expect(second.result.current.loading).toBe(false));

    expect(second.result.current.status).toBe('cache');
    expect(second.result.current.artifacts).toHaveLength(1);
    expect(second.result.current.artifacts[0].id).toBe('live-prompt-001');
  });
});
