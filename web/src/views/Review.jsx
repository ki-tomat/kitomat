import { useMemo, useState } from 'react';
import { Avatar, Icon, PhaseBadge, RiskBadge, TypeBadge } from '../components/index.js';
import { PIPELINE_COLS, REVIEW_PIPELINE, REVIEWERS } from '../data/index.js';

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

const LOCK_OPTS = [
  { id: 'all', label: 'Alle Zuständigkeiten' },
  { id: 'free', label: 'frei' },
  { id: 'mine', label: 'mir zugewiesen' },
  { id: 'in_progress', label: 'in Bearbeitung' },
  { id: 'waiting_trust', label: 'wartet auf Trust' },
  { id: 'waiting_maintainer', label: 'wartet auf Maintainer' },
];

const SORT_OPTS = [
  { id: 'recent', label: 'Neueste zuerst' },
  { id: 'risk', label: 'Risiko zuerst' },
  { id: 'wait', label: 'längste Wartezeit' },
  { id: 'stage', label: 'Stage' },
];

const SHORT_COPY = {
  'rp-001': 'Prompt-Paket für Energie-Effizienz-Beratung in KMU. Strukturierter Discovery-Prompt mit Branchen-Hooks.',
  'rp-002': 'Sammlung relevanter Quellen zur DSGVO- und AI-Act-konformen KI-Nutzung in Arztpraxen.',
  'rp-003': 'Mehrteiliger Prompt zur Erstellung eines 4-Wochen-Redaktionsplans inklusive Plattform-Anpassung.',
  'rp-004': 'Modell zur Einordnung von KI-Anwendungen in Verbänden und Innungen mit heterogenen Mitgliedern.',
  'rp-005': 'Strukturierte Triage von eingehenden Beschwerden für KMU-Hotlines im sensiblen Datenbereich.',
  'rp-006': 'Kuratierte Quellen zu aktuellen Digitalisierungs-Förderprogrammen für KMU.',
  'rp-007': 'Briefing-Prompt zur Vorbereitung von Standortanalysen für Beratungsmandate.',
};

const TRUST_GATE = [
  'Metadaten vollständig',
  'Synthetisches Beispiel vorhanden',
  'Szenario-Triade vorhanden',
  'Quellenstatus geklärt und Lizenz angegeben',
  'Risiken markiert und begründet',
  'Keine sensiblen Daten',
  'Menschlicher Peer Review durchgeführt',
  'Bei Risiko ab yellow: Trust Review abgeschlossen',
  'Maintainer-Entscheidung dokumentiert',
];

export default function Review({ go }) {
  const [activeStage, setActiveStage] = useState('peer_review');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [risk, setRisk] = useState('all');
  const [lockFilter, setLockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const byStage = useMemo(
    () => Object.fromEntries(
      PIPELINE_COLS.map((col) => [col.id, REVIEW_PIPELINE.filter((item) => item.stage === col.id)]),
    ),
    [],
  );

  let items = byStage[activeStage] || [];
  if (type !== 'all') items = items.filter((item) => item.type === type);
  if (risk !== 'all') items = items.filter((item) => item.risk === risk);
  if (lockFilter !== 'all') {
    items = lockFilter === 'mine'
      ? items.filter((item) => item.assignee === 'mira')
      : items.filter((item) => item.lock === lockFilter);
  }
  if (search.trim()) {
    const needle = search.trim().toLowerCase();
    items = items.filter((item) => `${item.title} ${item.id}`.toLowerCase().includes(needle));
  }

  const riskWeight = { red: 3, yellow: 2, green: 1 };
  items = [...items];
  if (sortBy === 'risk') {
    items.sort((a, b) => (riskWeight[b.risk] || 0) - (riskWeight[a.risk] || 0));
  }

  const activeCol = PIPELINE_COLS.find((col) => col.id === activeStage) || PIPELINE_COLS[0];
  const filtersActive = type !== 'all' || risk !== 'all' || lockFilter !== 'all' || Boolean(search.trim());

  const resetFilters = () => {
    setType('all');
    setRisk('all');
    setLockFilter('all');
    setSearch('');
  };

  return (
    <main className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 18 }}>
          <div>
            <div className="h-eyebrow">Review Center</div>
            <h1 className="h2" style={{ marginTop: 6 }}>Pipeline & Verantwortlichkeiten</h1>
            <p className="muted" style={{ margin: '10px 0 0', maxWidth: 680, fontSize: 14.5, lineHeight: 1.55 }}>
              Das Review Center zeigt den aktuellen Bearbeitungs- und Freigabestatus der Artefakte.
              Die eigentliche Prüfung erfolgt durch Reviewer, Trust-Verantwortliche und Maintainer.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <PhaseBadge kind="live">live</PhaseBadge>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => go('contribution')}>
              <Icon.plus /> Beitrag vorbereiten
            </button>
          </div>
        </div>

        <section className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ padding: '14px 22px 10px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon.shield />
              <strong style={{ fontSize: 14 }}>Ablauf einer Einreichung</strong>
              <span className="muted" style={{ fontSize: 12.5 }}>Klick auf eine Phase filtert die Liste</span>
            </div>
            <span className="muted mono" style={{ fontSize: 11 }}>{REVIEW_PIPELINE.length} Artefakte im Prozess</span>
          </div>
          <div className="pipeline">
            {PIPELINE_COLS.map((col, index) => {
              const count = byStage[col.id]?.length || 0;
              const isActive = activeStage === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveStage(col.id)}
                  className={`pipeline-step ${isActive ? 'active' : ''}`}
                >
                  <div className="pipeline-num">{String(index + 1).padStart(2, '0')}</div>
                  <div className="pipeline-title">{col.title}</div>
                  <div className="pipeline-sub">{col.sub}</div>
                  <div className="pipeline-count">{count}</div>
                </button>
              );
            })}
          </div>
        </section>

        <ReviewerActivity />

        <section className="card" style={{ padding: 18, marginBottom: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(4, minmax(150px, 1fr))', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>
                <Icon.search size={14} />
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Artefakt suchen..."
                className="input"
                style={{ paddingLeft: 36, fontSize: 13.5 }}
              />
            </div>
            <CompactSelect label="Typ" value={type} set={setType} options={TYPE_OPTS} />
            <CompactSelect label="Risiko" value={risk} set={setRisk} options={RISK_OPTS} />
            <CompactSelect label="Zuständigkeit" value={lockFilter} set={setLockFilter} options={LOCK_OPTS} />
            <CompactSelect label="Sortierung" value={sortBy} set={setSortBy} options={SORT_OPTS} />
          </div>
          {filtersActive && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: 10 }}>
              <span className="muted mono" style={{ fontSize: 11.5 }}>{items.length} Treffer in der ausgewählten Phase</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={resetFilters}>Filter zurücksetzen</button>
            </div>
          )}
        </section>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, paddingLeft: 2, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h2 className="h3" style={{ margin: 0 }}>{activeCol.title}</h2>
            <span className="muted mono" style={{ fontSize: 12 }}>
              {items.length} {items.length === 1 ? 'Artefakt' : 'Artefakte'}
            </span>
          </div>
          <span className="muted" style={{ fontSize: 12.5 }}>{activeCol.sub}</span>
        </div>

        {items.length === 0 ? (
          <StageEmptyState stage={activeStage} go={go} />
        ) : (
          <div className="review-grid">
            {items.map((item) => (
              <ReviewCardLarge key={item.id} item={item} reviewers={REVIEWERS} stageTitle={activeCol.title} />
            ))}
          </div>
        )}

        <section className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 32 }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--line)' }}>
            <div className="h-eyebrow">Trust-Gate-Checkliste</div>
            <strong style={{ fontSize: 14 }}>Was vor einer Freigabe sicher sein muss</strong>
          </div>
          <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4px 32px' }}>
            {TRUST_GATE.map((gate) => (
              <div key={gate} className="gate-row">
                <span className="gate-check checked"><Icon.check /></span>
                <span>{gate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ReviewerActivity() {
  const activeReviewers = REVIEWERS.filter((reviewer) => REVIEW_PIPELINE.some((item) => item.assignee === reviewer.id));
  return (
    <section className="card" style={{ padding: '14px 22px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon.users size={16} />
        <strong style={{ fontSize: 13.5 }}>Wer arbeitet woran</strong>
        <span className="muted" style={{ fontSize: 12 }}>reservierte Artefakte sind für parallele Reviews gesperrt</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {activeReviewers.map((reviewer) => {
          const assigned = REVIEW_PIPELINE.filter((item) => item.assignee === reviewer.id);
          return (
            <div key={reviewer.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 4px 4px', background: 'var(--bg-2)', borderRadius: 999 }}>
              <Avatar name={reviewer.avatar} color={reviewer.color} size={22} />
              <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>{reviewer.name}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{assigned.length}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CompactSelect({ label, value, set, options }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="h-eyebrow" style={{ fontSize: 10, marginBottom: 6, paddingLeft: 2 }}>{label}</span>
      <select
        value={value}
        onChange={(event) => set(event.target.value)}
        className="select"
        style={{ fontSize: 13, padding: '9px 12px', cursor: 'pointer' }}
      >
        {options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
      </select>
    </label>
  );
}

function LockBadge({ lock, since }) {
  if (!lock || lock === 'free') {
    return (
      <span className="lock-strip free" style={{ margin: 0, padding: '4px 10px', display: 'inline-flex' }}>
        <Icon.check size={11} /> frei
      </span>
    );
  }
  const map = {
    in_progress: { cls: '', label: 'in Bearbeitung' },
    reserved: { cls: 'waiting', label: 'reserviert' },
    waiting_trust: { cls: 'waiting', label: 'wartet auf Trust Review' },
    waiting_maintainer: { cls: 'maintainer', label: 'wartet auf Maintainer' },
  };
  const meta = map[lock] || map.in_progress;
  return (
    <span className={`lock-strip ${meta.cls}`} style={{ margin: 0, padding: '4px 10px', display: 'inline-flex' }}>
      <Icon.lock size={11} /> {meta.label}{since ? ` · ${since}` : ''}
    </span>
  );
}

function StageEmptyState({ stage, go }) {
  const col = PIPELINE_COLS.find((item) => item.id === stage) || PIPELINE_COLS[0];
  if (stage === 'published') {
    return (
      <div className="card" style={{ padding: '48px 28px', textAlign: 'center', borderStyle: 'dashed', background: 'transparent' }}>
        <div style={{ width: 54, height: 54, borderRadius: 14, background: 'var(--leaf-soft)', color: 'var(--leaf)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <Icon.check size={22} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Keine freigegebenen Artefakte im Review Center</div>
        <p className="muted" style={{ margin: '0 auto 16px', maxWidth: 480, fontSize: 13.5, lineHeight: 1.55 }}>
          Final freigegebene Artefakte werden automatisch in der Bibliothek angezeigt.
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => go('library')}>
          Zur Bibliothek <Icon.arrow size={12} />
        </button>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding: '40px 24px', textAlign: 'center', borderStyle: 'dashed', background: 'transparent' }}>
      <div style={{ fontSize: 28, marginBottom: 8, color: 'var(--ink-3)' }}>○</div>
      <div style={{ fontWeight: 600, fontSize: 15 }}>Keine Treffer in „{col.title}“</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Mit den aktuellen Filtern liegt aktuell nichts in dieser Phase.</div>
    </div>
  );
}

function ReviewCardLarge({ item, reviewers, stageTitle }) {
  const reviewer = reviewers.find((entry) => entry.id === item.assignee);
  const sourceMap = {
    geprüft: { color: 'var(--leaf)', label: 'Quellen geprüft' },
    teilweise: { color: 'var(--amber)', label: 'Quellen teilweise' },
    offen: { color: 'var(--tomato)', label: 'Quellen offen' },
  };
  const source = sourceMap[item.sources] || sourceMap.offen;
  const warningCount = item.agentReport?.warnings ?? item.agentReport?.warn ?? 0;

  return (
    <article className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <TypeBadge type={item.type} />
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{item.id}</span>
        </div>
        <span className="stage-pill" style={{ padding: '3px 10px' }}>{stageTitle}</span>
      </div>

      <div style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div>
          <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{item.title}</h3>
          <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>{SHORT_COPY[item.id] || 'Kurzbeschreibung folgt.'}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <RiskBadge risk={item.risk} />
          <span
            className="badge"
            style={{
              background: item.sources === 'geprüft' ? 'var(--leaf-soft)' : item.sources === 'teilweise' ? 'var(--amber-soft)' : 'var(--tomato-soft)',
              color: item.sources === 'geprüft' ? 'var(--leaf-ink)' : item.sources === 'teilweise' ? 'var(--amber-ink)' : 'var(--tomato-deep)',
            }}
          >
            <span className="dot" style={{ background: source.color }} />{source.label}
          </span>
          <span className="badge badge-neutral mono" style={{ fontSize: 10.5 }}>Datenschutz: ok</span>
          <span className="badge badge-neutral mono" style={{ fontSize: 10.5 }}>
            Trust-Check: {item.agentReport ? (item.agentReport.progress != null ? 'läuft' : 'vorgeprüft') : 'ausstehend'}
          </span>
        </div>

        {item.agentReport && (
          <div style={{ padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--ink)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.spark size={12} />
            </span>
            {item.agentReport.progress != null ? (
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Agentenprüfung läuft · {item.agentReport.progress}%</div>
                <div style={{ height: 4, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.agentReport.progress}%`, background: 'var(--tomato)', borderRadius: 99 }} />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 12, fontWeight: 600 }} className="mono">
                {(item.agentReport.ok + warningCount + item.agentReport.issues)} Checks ·{' '}
                <span style={{ color: 'var(--amber)' }}>{warningCount} Hinweis{warningCount === 1 ? '' : 'e'}</span> ·{' '}
                <span style={{ color: item.agentReport.issues ? 'var(--tomato)' : 'var(--leaf)' }}>{item.agentReport.issues} Fehler</span>
              </div>
            )}
          </div>
        )}

        {item.open.length > 0 && (
          <div>
            <div className="h-eyebrow" style={{ fontSize: 10, marginBottom: 6 }}>Offene Punkte</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {item.open.map((point) => (
                <li key={point} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--ink-3)', flexShrink: 0 }}>·</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          {reviewer ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <Avatar name={reviewer.avatar} color={reviewer.color} size={26} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>{reviewer.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 2 }}>{reviewer.role}</div>
              </div>
            </div>
          ) : (
            <span className="muted mono" style={{ fontSize: 12 }}>noch nicht zugewiesen</span>
          )}
          <LockBadge lock={item.lock} since={item.lockedSince} />
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>
          letzte Aktivität · {item.updated}
        </div>
      </div>

      <div style={{ padding: '12px 18px', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {item.lock === 'free' ? (
          <button type="button" className="btn btn-primary btn-sm" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
            Review übernehmen
          </button>
        ) : (
          <button type="button" className="btn btn-secondary btn-sm" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
            Details öffnen
          </button>
        )}
        <button type="button" className="btn btn-secondary btn-sm">Report</button>
        {item.lock === 'waiting_maintainer' && (
          <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--ink-2)' }}>Entscheidung</button>
        )}
      </div>
    </article>
  );
}
