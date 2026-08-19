import { useState } from 'react';
import {
  Icon,
  TypeBadge,
  GoldBadge,
  EmptyState,
} from '../components/index.js';
import {
  useLibraryData,
  artifactGithubUrl,
  DATA_SOURCE_LABEL,
} from '../data/index.js';

export function LibraryCard({ a, onOpen, compact }) {
  return (
    <div
      className="card card-hover"
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #F6D782, #D4A12E)',
        }}
      ></span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
        <TypeBadge type={a.type} />
        <GoldBadge />
      </div>
      <div>
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: 16.5,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-.01em',
          }}
        >
          {a.title}
        </h3>
        <p
          className="muted"
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: compact ? 2 : 3,
            overflow: 'hidden',
          }}
        >
          {a.short}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 14px',
          fontSize: 11.5,
        }}
        className="mono"
      >
        <div>
          <span style={{ color: 'var(--ink-3)' }}>Version</span>{' '}
          <strong style={{ color: 'var(--ink-2)' }}>{a.version}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--ink-3)' }}>Freigabe</span>{' '}
          <strong style={{ color: 'var(--ink-2)' }}>{a.released}</strong>
        </div>
        <div>
          <span style={{ color: 'var(--ink-3)' }}>Lizenz</span>{' '}
          <strong style={{ color: 'var(--ink-2)' }}>
            {a.license.length > 18 ? a.license.slice(0, 18) + '…' : a.license}
          </strong>
        </div>
        <div>
          <span style={{ color: 'var(--ink-3)' }}>Quellen</span>{' '}
          <strong style={{ color: 'var(--leaf)' }}>{a.sources}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
        <span className="badge badge-green" style={{ fontSize: 10.5 }}>
          <span className="dot"></span>öffentliche Quellen
        </span>
        <span className="badge badge-neutral mono" style={{ fontSize: 10.5 }}>
          lizenzgeklärt
        </span>
        <span className="badge badge-neutral mono" style={{ fontSize: 10.5 }}>
          synth. Beispiel
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid var(--line)',
        }}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpen}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          Artefakt ansehen
        </button>
        <a
          className="btn btn-secondary btn-sm tt"
          data-tt="Auf GitHub öffnen"
          href={artifactGithubUrl(a)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon.github size={14} />
        </a>
      </div>
    </div>
  );
}

function FilterRow({ label, value, set, options }) {
  return (
    <div>
      <div className="h-eyebrow" style={{ marginBottom: 8, fontSize: 11 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((o) => (
          <button
            key={o.id}
            className={`chip ${value === o.id ? 'chip-active' : ''}`}
            onClick={() => set(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LibraryTable({ items, go }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr
            style={{
              textAlign: 'left',
              borderBottom: '1px solid var(--line)',
              background: 'var(--bg-2)',
            }}
          >
            {['Titel', 'Typ', 'Version', 'Freigabe', 'Lizenz', 'Quellen', ''].map((h) => (
              <th key={h} className="h-eyebrow" style={{ padding: '12px 16px', fontSize: 11 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr
              key={a.id}
              style={{ borderBottom: '1px solid var(--line)', cursor: 'pointer' }}
              onClick={() => go('detail', a.id)}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '')}
            >
              <td style={{ padding: '14px 16px', fontWeight: 600 }}>{a.title}</td>
              <td style={{ padding: '14px 16px' }}>
                <TypeBadge type={a.type} />
              </td>
              <td style={{ padding: '14px 16px' }} className="mono">{a.version}</td>
              <td style={{ padding: '14px 16px' }} className="mono muted">{a.released}</td>
              <td style={{ padding: '14px 16px' }} className="mono muted">
                {a.license.length > 22 ? a.license.slice(0, 22) + '…' : a.license}
              </td>
              <td className="mono" style={{ padding: '14px 16px', color: 'var(--leaf)' }}>
                {a.sources}
              </td>
              <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                <Icon.arrow />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TYPE_OPTS = [
  { id: 'all', label: 'Alle Typen' },
  { id: 'prompt', label: 'Prompt-Paket' },
  { id: 'dataset', label: 'Quellenpaket' },
  { id: 'industry', label: 'KMU-/Branchenmodell' },
];

const RISK_OPTS = [
  { id: 'all', label: 'Alle Risiken' },
  { id: 'green', label: 'risk_green' },
  { id: 'yellow', label: 'risk_yellow' },
  { id: 'red', label: 'risk_red' },
];

const VIEW_STORAGE_KEY = 'kitomat_library_view_v1';

export default function Library({ go }) {
  const { artifacts, status } = useLibraryData();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [risk, setRisk] = useState('all');
  const [view, setViewState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(VIEW_STORAGE_KEY);
      return stored === 'table' || stored === 'grid' ? stored : 'grid';
    } catch (e) { return 'grid'; }
  });
  const setView = (next) => {
    setViewState(next);
    try { sessionStorage.setItem(VIEW_STORAGE_KEY, next); } catch (e) { /* ignore */ }
  };

  const filtered = artifacts.filter((a) => {
    if (type !== 'all' && a.type !== type) return false;
    if (risk !== 'all' && a.risk !== risk) return false;
    if (
      search &&
      !(a.title + ' ' + a.short + ' ' + a.topic).toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <main className="page">
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 18,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div className="h-eyebrow">Bibliothek</div>
            <h1 className="h2" style={{ marginTop: 6 }}>
              Geprüfte &amp; freigegebene KI-Artefakte
            </h1>
            <p
              className="muted"
              style={{ margin: '10px 0 0', maxWidth: 680, fontSize: 14.5, lineHeight: 1.55 }}
            >
              Die Bibliothek zeigt nur geprüfte und freigegebene KItomat-Artefakte. Beiträge im
              Entwurfs- oder Review-Status befinden sich im geschützten Review Center.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`btn btn-sm ${view === 'grid' ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setView('grid')}
              >
                Cards
              </button>
              <button
                className={`btn btn-sm ${view === 'table' ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setView('table')}
              >
                Tabelle
              </button>
            </div>
            <span
              className="mono tt"
              data-tt="Reihenfolge: Content-API, Browser-Cache, Beispieldaten"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: 'var(--ink-3)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 99,
                  background: status === 'live' || status === 'github' ? 'var(--leaf)' : status === 'stale' ? 'var(--amber)' : 'var(--ink-3)',
                }}
              ></span>
              {DATA_SOURCE_LABEL[status] || DATA_SOURCE_LABEL.fallback}
            </span>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '14px 18px',
            marginBottom: 18,
            background: 'var(--leaf-soft)',
            border: '1px solid var(--leaf-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'var(--leaf)',
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon.shield />
          </span>
          <div style={{ fontSize: 13.5, color: 'var(--leaf-ink)' }}>
            <strong>Trust-geprüft:</strong> Jedes Artefakt hier hat Peer Review, ggf. Trust Review
            und Maintainer-Entscheidung erfolgreich durchlaufen. Quellen sind öffentlich nutzbar
            und lizenzgeklärt.
          </div>
        </div>

        <div className="card" style={{ padding: 22, marginBottom: 22 }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--ink-3)',
              }}
            >
              <Icon.search />
            </span>
            <input
              type="text"
              placeholder="Artefakte durchsuchen – Titel, Beschreibung, Thema…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ paddingLeft: 42, fontSize: 15 }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <FilterRow label="Artefakttyp" value={type} set={setType} options={TYPE_OPTS} />
            <FilterRow label="Risiko-Level" value={risk} set={setRisk} options={RISK_OPTS} />
          </div>
          {(type !== 'all' || risk !== 'all' || search) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 18,
                paddingTop: 14,
                borderTop: '1px solid var(--line)',
              }}
            >
              <span className="muted mono" style={{ fontSize: 12 }}>
                {filtered.length} von {artifacts.length} Artefakten
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setType('all');
                  setRisk('all');
                  setSearch('');
                }}
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="Keine Artefakte gefunden"
            desc="Mit aktuellen Filtern sind keine Treffer in der Bibliothek."
            icon="◌"
          />
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filtered.map((a) => (
              <LibraryCard key={a.id} a={a} onOpen={() => go('detail', a.id)} />
            ))}
          </div>
        ) : (
          <LibraryTable items={filtered} go={go} />
        )}
      </div>
    </main>
  );
}
