// AP10 — Public WebUI Data Bridge
//
// Liest Bibliotheksdaten bevorzugt aus der oeffentlichen Sites Content API (AP9),
// faellt aber ohne API sauber zurueck. Fallback-Reihenfolge:
//
//   1. Sites Content API  (VITE_KITOMAT_CONTENT_API_URL gesetzt)
//   2. Public GitHub API  (read-only Fallback, solange Sites public blockiert ist)
//   3. Browser Cache      (localStorage, TTL)
//   4. Mockdaten          (web/src/data/library.js)
//
// Status-Werte fuer die Datenquellenanzeige:
// 'live' | 'github' | 'cache' | 'stale' | 'fallback'.
// Vertrag und Feld-Mapping stammen aus AP9 (sites-content-api). AP10 dupliziert den
// Vertrag nicht, sondern konsumiert ihn nur.

import { useEffect, useState } from 'react';
import { LIBRARY } from './library.js';
import { contentArtifactUrl } from '../lib/links.js';

const CACHE_KEY = 'kitomat_public_content_cache_v1';
// TTL fuer den Browser-Cache. Bewusst konservativ; die API setzt zusaetzlich
// eigene Cache-Control-Header serverseitig.
const CACHE_TTL_MS = 30 * 60 * 1000;
const CONTENT_REPO = {
  owner: 'ki-tomat',
  name: 'kitomat',
  branch: 'main',
};
// Nur diese API-Status gelten als verwertbare Datenquelle. Alles andere
// (z. B. 'error' oder der AP8-Foundation-Stub 'foundation') faellt auf Cache/Mock.
const LIVE_STATUSES = ['live', 'cache', 'stale'];
const TYPE_MAP = {
  prompt_package: 'prompt',
  dataset_package: 'dataset',
  model: 'industry',
};
const TYPE_LABELS = {
  prompt: 'Prompt-Paket',
  dataset: 'Quellenpaket',
  industry: 'KMU-/Branchenmodell',
};
const FOLDER_FOR_TYPE = {
  prompt: 'prompts',
  dataset: 'datasets',
  industry: 'models',
};
const SOURCES_LABELS = {
  not_required: 'Nicht erforderlich',
  missing: 'Quellen fehlen',
  provided: 'Quellen vorhanden',
  checked: 'Geprueft',
  unverified: 'Ungeprueft',
};
const AI_ACT_LABELS = {
  none: 'Kein AI-Act-Bezug',
  transparency: 'Transparenzpflichten',
  high_risk_adjacent: 'Naehe zu Hochrisiko-Anwendung',
  prohibited_check: 'Auf verbotene Praxis zu pruefen',
  unclear: 'AI-Act-Einordnung unklar',
};

// In-Memory-Snapshot der letzten erfolgreichen Live-Antwort. Vermeidet beim
// Wechsel zwischen Views (Library -> Detail -> Library) ein Flackern auf Mock.
let memorySnapshot = null;

// VITE_KITOMAT_CONTENT_API_URL wird beim Build ins Bundle geschrieben. Ohne die
// Variable ist Mockdaten-Modus gewollt und kein Fehler.
export function getContentApiBase() {
  const raw = import.meta.env && import.meta.env.VITE_KITOMAT_CONTENT_API_URL;
  // trailing-slash-sicher zusammensetzen
  return raw ? String(raw).trim().replace(/\/$/, '') : '';
}

function contentEndpoint(base) {
  return base + '/api/content';
}

function parseScalar(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null') return null;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseSimpleYaml(text) {
  const out = {};
  let listKey = null;

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && listKey) {
      out[listKey].push(parseScalar(listMatch[1]));
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      listKey = null;
      continue;
    }

    const [, key, rawValue = ''] = keyMatch;
    if (rawValue.trim() === '') {
      out[key] = [];
      listKey = key;
    } else {
      out[key] = parseScalar(rawValue);
      listKey = null;
    }
  }

  return out;
}

function shortFromUseCase(useCase) {
  if (typeof useCase !== 'string' || !useCase.trim()) {
    return 'Keine Kurzbeschreibung vorhanden.';
  }
  const trimmed = useCase.trim();
  return trimmed.length <= 180 ? trimmed : trimmed.slice(0, 177) + '...';
}

function audienceToString(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'string') return value;
  return undefined;
}

function folderForArtifactType(artifactType) {
  const type = TYPE_MAP[artifactType];
  return FOLDER_FOR_TYPE[type];
}

function normalizeGithubArtifact(meta, repoPathOverride) {
  const type = TYPE_MAP[meta.artifact_type];
  const folder = FOLDER_FOR_TYPE[type];
  const repoPath = repoPathOverride || (folder && meta.id ? `${folder}/${meta.id}` : undefined);
  const context =
    typeof meta.use_case === 'string' && meta.use_case.length > 0
      ? meta.use_case
      : (meta.artifact_type === 'model' && typeof meta.application_scope === 'string'
          ? meta.application_scope
          : undefined);

  return normalizeArtifact({
    id: meta.id,
    title: meta.title || meta.id,
    type,
    typeLabel: TYPE_LABELS[type],
    status: meta.status,
    risk: meta.data_risk || 'yellow',
    aiAct: AI_ACT_LABELS[meta.ai_act_proximity] || meta.ai_act_proximity,
    license: meta.license,
    license_status: meta.license_status,
    language: meta.language,
    version: meta.version,
    contributor: meta.maintainer,
    topic: meta.category,
    audience: audienceToString(meta.target_users),
    context,
    sources: SOURCES_LABELS[meta.sources_status] || meta.sources_status,
    short: shortFromUseCase(meta.use_case),
    repoPath,
    githubUrl: repoPath
      ? `https://github.com/${CONTENT_REPO.owner}/${CONTENT_REPO.name}/tree/${CONTENT_REPO.branch}/${repoPath}`
      : undefined,
    legal_disclaimer: meta.legal_disclaimer,
    personal_data_possible: meta.personal_data_possible,
    human_review_required: meta.human_review_required,
    contains_personal_data: meta.contains_personal_data,
    contains_sensitive_data: meta.contains_sensitive_data,
  });
}

function rawGithubUrl(path) {
  const safePath = path.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${CONTENT_REPO.owner}/${CONTENT_REPO.name}/${CONTENT_REPO.branch}/${safePath}`;
}

async function loadGithubArtifacts() {
  const treeUrl =
    `https://api.github.com/repos/${CONTENT_REPO.owner}/${CONTENT_REPO.name}` +
    `/git/trees/${CONTENT_REPO.branch}?recursive=1`;
  const treeRes = await fetch(treeUrl, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!treeRes.ok) throw new Error(`GitHub tree ${treeRes.status}`);
  const treeData = await treeRes.json();
  const paths = (treeData.tree || [])
    .map((entry) => entry.path)
    .filter((path) =>
      /^(prompts|datasets|models)\/[^/]+\/metadata\.ya?ml$/.test(path) &&
      !path.includes('/_template/')
    );

  const artifacts = [];
  for (const path of paths) {
    const [, folder, id] = path.match(/^(prompts|datasets|models)\/([^/]+)\//) || [];
    if (!folder || !id) continue;

    const metaRes = await fetch(rawGithubUrl(path), { headers: { Accept: 'text/plain' } });
    if (!metaRes.ok) continue;
    const meta = parseSimpleYaml(await metaRes.text());
    if (!meta.id || !meta.artifact_type || !meta.title) continue;
    if (folderForArtifactType(meta.artifact_type) !== folder) continue;
    artifacts.push(normalizeGithubArtifact(meta, `${folder}/${id}`));
  }

  return artifacts.sort((a, b) => a.title.localeCompare(b.title, 'de'));
}

// GitHub-Link bevorzugt aus den API-Daten (githubUrl), sonst aus der Mock-Konvention.
export function artifactGithubUrl(a) {
  if (a && a.githubUrl) return a.githubUrl;
  return contentArtifactUrl(a ? a.id : '');
}

// Normalisiert ein API-Artefakt auf die Form, die die Views erwarten. Pflichtfelder
// aus dem AP9-Vertrag werden durchgereicht; UI-optionale Felder bekommen Defaults,
// damit Karten/Tabellen nicht an undefined zerbrechen. Quelllose Detailfelder
// (pos/nb/neg/sampleIn/sampleOut/failure) bleiben absichtlich leer und werden in
// der Detailansicht ausgeblendet statt leer gerendert.
function normalizeArtifact(raw) {
  return {
    ...raw,
    _source: 'api',
    title: raw.title || raw.id,
    short: raw.short || 'Keine Kurzbeschreibung vorhanden.',
    version: raw.version || '—',
    released: raw.released || '—',
    license: raw.license || '—',
    sources: raw.sources || '—',
    risk: raw.risk || 'yellow',
  };
}

function readCache() {
  try {
    const rec = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!rec || !Array.isArray(rec.artifacts) || typeof rec.savedAt !== 'number') return null;
    return { ...rec, expired: Date.now() - rec.savedAt > CACHE_TTL_MS };
  } catch (e) {
    return null;
  }
}

function writeCache(artifacts) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ artifacts, savedAt: Date.now() }),
    );
  } catch (e) {
    /* localStorage nicht verfuegbar/voll — kein Fehler, Cache ist optional */
  }
}

function mockResult() {
  return { artifacts: LIBRARY, status: 'fallback', loadedAt: null, cacheUpdatedAt: null };
}

// Bestmoegliche Daten ohne (frische) API-Antwort: gueltiger Cache, sonst Mock.
function offlineResult() {
  if (memorySnapshot && Date.now() - memorySnapshot.savedAt <= CACHE_TTL_MS) {
    return {
      artifacts: memorySnapshot.artifacts,
      status: 'cache',
      loadedAt: memorySnapshot.loadedAt,
      cacheUpdatedAt: memorySnapshot.cacheUpdatedAt,
    };
  }
  const cached = readCache();
  if (cached && !cached.expired && cached.artifacts.length) {
    return {
      artifacts: cached.artifacts,
      status: 'cache',
      loadedAt: null,
      cacheUpdatedAt: cached.savedAt,
    };
  }
  return mockResult();
}

// React-Hook: liefert die anzuzeigende Artefaktliste samt Datenquellenstatus.
// Library, Detail und Dashboard konsumieren ausschliesslich diesen Hook.
export function useLibraryData() {
  const base = getContentApiBase();
  const [state, setState] = useState(() => ({ ...offlineResult(), loading: true }));

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (base) {
          try {
            const res = await fetch(contentEndpoint(base), {
              headers: { Accept: 'application/json' },
            });
            if (res.ok) {
              const data = await res.json();
              if (cancelled) return;

              const apiStatus = data && data.status;
              const rawArtifacts = data && Array.isArray(data.artifacts) ? data.artifacts : [];

              if (LIVE_STATUSES.includes(apiStatus) && rawArtifacts.length > 0) {
                const artifacts = rawArtifacts.map(normalizeArtifact);
                writeCache(artifacts);
                memorySnapshot = {
                  artifacts,
                  loadedAt: (data && data.loadedAt) || null,
                  cacheUpdatedAt: (data && data.cacheUpdatedAt) || null,
                  savedAt: Date.now(),
                };
                setState({
                  artifacts,
                  status: apiStatus,
                  loadedAt: memorySnapshot.loadedAt,
                  cacheUpdatedAt: memorySnapshot.cacheUpdatedAt,
                  loading: false,
                });
                return;
              }
            }
          } catch (e) {
            // Defekte oder geschuetzte Sites API blockiert den GitHub-Fallback nicht.
          }
        }

        const artifacts = await loadGithubArtifacts();
        if (cancelled) return;
        if (artifacts.length === 0) {
          setState({ ...offlineResult(), loading: false });
          return;
        }

        writeCache(artifacts);
        memorySnapshot = {
          artifacts,
          loadedAt: new Date().toISOString(),
          cacheUpdatedAt: new Date().toISOString(),
          savedAt: Date.now(),
        };
        setState({
          artifacts,
          status: 'github',
          loadedAt: memorySnapshot.loadedAt,
          cacheUpdatedAt: memorySnapshot.cacheUpdatedAt,
          loading: false,
        });
      } catch (e) {
        if (cancelled) return;
        // API nicht erreichbar: Cache (falls vorhanden) als 'cache' bzw. Mock als 'fallback'.
        setState({ ...offlineResult(), loading: false });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [base]);

  return state;
}

// Anzeigetext fuer die Datenquelle (kleine Anzeige in der Library).
export const DATA_SOURCE_LABEL = {
  live: 'Live-Daten aus der Content-API',
  github: 'Live-Daten aus GitHub',
  cache: 'Aus Browser-Cache',
  stale: 'Cache (API nicht erreichbar)',
  fallback: 'Beispieldaten (keine API verbunden)',
};
