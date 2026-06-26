import React from 'react';
import { LIBRARY as MOCK_LIBRARY } from './library.bridge.js';

const CACHE_KEY = 'kitomat_public_content_cache_v1';
const API_URL = import.meta.env.VITE_KITOMAT_CONTENT_API_URL || '';

export function useLibraryData() {
  const [state, setState] = React.useState(() => {
    const cached = readCache();
    if (cached?.artifacts?.length) {
      return { library: cached.artifacts.map(toLibraryItem), status: 'browser-cache', error: null };
    }
    return { library: MOCK_LIBRARY, status: 'fallback', error: null };
  });

  React.useEffect(() => {
    let alive = true;
    if (!API_URL) return undefined;

    fetch(`${API_URL.replace(/\/$/, '')}/api/content`)
      .then((response) => {
        if (!response.ok) throw new Error(`Content API ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const artifacts = Array.isArray(payload.artifacts) ? payload.artifacts : [];
        if (!artifacts.length) throw new Error('Content API lieferte keine Artefakte');
        writeCache(payload);
        if (alive) {
          setState({
            library: artifacts.map(toLibraryItem),
            status: payload.status || 'live',
            error: null,
          });
        }
      })
      .catch((error) => {
        const cached = readCache();
        if (alive && cached?.artifacts?.length) {
          setState({
            library: cached.artifacts.map(toLibraryItem),
            status: 'browser-cache',
            error,
          });
        } else if (alive) {
          setState({ library: MOCK_LIBRARY, status: 'fallback', error });
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  return state;
}

function toLibraryItem(item) {
  return {
    ...item,
    type: item.type || mapType(item.artifactType),
    typeLabel: item.typeLabel || typeLabel(item.type || mapType(item.artifactType)),
    short: item.short || item.summary || 'Keine Kurzbeschreibung vorhanden.',
    version: item.version || 'v0.1.0',
    released: item.released || 'Entwurf',
    contributor: item.contributor || 'unbekannt',
    language: item.language || 'DE',
    topic: item.topic || item.typeLabel || 'Artefakt',
    license: item.license || 'Lizenz noch zu klaeren',
    sources: item.sources || 'ungeklaert',
    risk: item.risk || 'yellow',
    failure: Array.isArray(item.failure) ? item.failure : [],
    sampleIn: item.sampleIn || '-',
    sampleOut: item.sampleOut || '-',
  };
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Browser cache is helpful, but never required for the app to work.
  }
}

function mapType(artifactType) {
  if (artifactType === 'dataset_package') return 'dataset';
  if (artifactType === 'model') return 'industry';
  return 'prompt';
}

function typeLabel(type) {
  return {
    prompt: 'Prompt-Paket',
    dataset: 'Quellenpaket',
    industry: 'KMU-/Branchenmodell',
  }[type] || 'Prompt-Paket';
}
