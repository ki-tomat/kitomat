import {
  Icon,
  GoldBadge,
  PhaseBadge,
  MetricTile,
  ProcessStrip,
} from '../components/index.js';
import { LibraryCard } from './Library.jsx';
import { REVIEW_PIPELINE, useLibraryData } from '../data/index.js';
import { CONTENT_REPO_URL } from '../lib/links.js';
import markUrl from '../assets/kitomat-mark.png';

const PROCESS = [
  { n: '01', t: 'Artefakt vorbereiten',     d: 'Typ wählen, Idee strukturieren.',                  tone: 'human' },
  { n: '02', t: 'Dateien hochladen',        d: 'MD, YAML, JSON, PDF, DOCX, TXT.',                  tone: 'human' },
  { n: '03', t: 'KI-Agent prüft',           d: 'Metadaten, Quellen, Datenschutz, Szenarien.',      tone: 'agent' },
  { n: '04', t: 'Mensch kontrolliert',      d: 'Vorschläge sichten, korrigieren, freigeben.',      tone: 'human' },
  { n: '05', t: 'Review Request erstellen', d: 'GitHub-Issue oder Pull Request vorbereiten.',      tone: 'human' },
  { n: '06', t: 'Reviewer prüfen',          d: 'Peer Review · Trust Review bei Risiken.',          tone: 'human' },
  { n: '07', t: 'Maintainer entscheidet',   d: 'Status, Merge & Aufnahme in die Bibliothek.',      tone: 'human' },
];

function QuickCard({ go, target, color, icon, title, desc }) {
  return (
    <button
      onClick={() => go(target)}
      className="card card-hover"
      style={{
        padding: 22,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </span>
      <strong style={{ fontSize: 15, letterSpacing: '-.01em' }}>{title}</strong>
      <span className="muted" style={{ fontSize: 13, marginTop: -2 }}>{desc}</span>
    </button>
  );
}

export default function Dashboard({ go, role, openChat, openVideo }) {
  const { artifacts } = useLibraryData();
  const canReview = ['reviewer', 'maintainer', 'admin'].includes(role);
  const counts = {
    library: artifacts.length,
    prompt: artifacts.filter((x) => x.type === 'prompt').length,
    dataset: artifacts.filter((x) => x.type === 'dataset').length,
    industry: artifacts.filter((x) => x.type === 'industry').length,
    pipeline: REVIEW_PIPELINE.length,
  };
  const latest = artifacts.slice(0, 3);

  return (
    <main className="page">
      <div className="container">
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: 48,
            alignItems: 'center',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              className="h-eyebrow"
              style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 24,
                  height: 1,
                  background: 'var(--ink-3)',
                }}
              ></span>
              Community-Projekt · KI-Consultant-Kurs
            </div>
            <h1 className="h1" style={{ marginBottom: 18 }}>
              Frische KI-Ressourcen.
              <br />
              <span style={{ color: 'var(--tomato)' }}>Reife Ideen.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: 'var(--ink-2)',
                maxWidth: 540,
                margin: '0 0 28px',
              }}
            >
              KItomat ist eine kuratierte Bibliothek für geprüfte KI-Arbeitsbausteine –
              Prompt-Pakete, Quellenpakete und KMU-/Branchenmodelle. Mit klarem Review-Prozess,
              GitHub-Anbindung und KI-Agenten, die unterstützen – nicht entscheiden.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('library')}>
                Bibliothek durchsuchen <Icon.arrow />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => go('contribution')}>
                <Icon.plus /> Beitrag vorbereiten
              </button>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {openChat && (
                <button
                  onClick={openChat}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--ink-2)' }}
                >
                  <Icon.chat size={14} /> Frag den KItomat Assistent
                </button>
              )}
              <span className="muted mono" style={{ fontSize: 11 }}>·</span>
              <a
                href={CONTENT_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--ink-2)' }}
              >
                <Icon.github size={14} /> Repository
              </a>
            </div>
          </div>

          <div className="video-card" onClick={openVideo}>
            <div className="video-corner">
              <img
                src={markUrl}
                alt=""
                style={{
                  width: 16,
                  height: 16,
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              KItomat · Tutorial
            </div>
            <div className="video-corner video-corner-r">
              <Icon.spark size={10} /> Erklärvideo folgt
            </div>
            <div className="video-play">
              <Icon.play />
            </div>
            <div className="video-overlay">
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  opacity: 0.85,
                  letterSpacing: '.06em',
                  marginBottom: 6,
                }}
              >
                02:00 · DEMO-VIDEO GEPLANT
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: '-.015em',
                  marginBottom: 4,
                }}
              >
                So funktioniert KItomat
              </div>
              <div style={{ fontSize: 14, opacity: 0.88 }}>
                In 2 Minuten: Artefakte finden, vorbereiten und reviewen.
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <div className="h-eyebrow">Prozess in 7 Schritten</div>
              <h2 className="h2" style={{ marginTop: 6 }}>
                Wie ein Artefakt in die Bibliothek kommt
              </h2>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                fontSize: 12.5,
                color: 'var(--ink-3)',
                flexShrink: 0,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: 'var(--leaf)',
                  }}
                ></span>{' '}
                Mensch entscheidet
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: 'var(--tomato)',
                  }}
                ></span>{' '}
                KI-Agent unterstützt
              </span>
            </div>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <ProcessStrip steps={PROCESS} />
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: canReview ? '1.4fr 1fr' : '1fr',
            gap: 18,
            marginBottom: 48,
          }}
        >
          <div className="card" style={{ padding: 26 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 18,
                gap: 12,
              }}
            >
              <div>
                <div className="h-eyebrow">Bibliothek</div>
                <h3 className="h3" style={{ marginTop: 4 }}>
                  Geprüfte &amp; freigegebene Artefakte
                </h3>
                <p
                  className="muted"
                  style={{ margin: '6px 0 0', fontSize: 13.5, maxWidth: 380 }}
                >
                  Nur Artefakte, die den vollständigen Review durchlaufen haben. Beiträge in
                  Bearbeitung liegen im Review Center.
                </p>
              </div>
              <GoldBadge />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                marginBottom: 18,
              }}
            >
              <MetricTile
                label="Gesamt"
                value={counts.library}
                sub="freigegeben"
                accent="var(--ink)"
              />
              <MetricTile
                label="Prompt-Pakete"
                value={counts.prompt}
                sub="kuratiert"
                accent="var(--tomato)"
                onClick={() => go('library')}
              />
              <MetricTile
                label="Quellenpakete"
                value={counts.dataset}
                sub="lizenzgeklärt"
                accent="var(--slate)"
                onClick={() => go('library')}
              />
              <MetricTile
                label="Branchenmodelle"
                value={counts.industry}
                sub="KMU-fokussiert"
                accent="var(--leaf)"
                onClick={() => go('library')}
              />
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => go('library')}>
              Zur Bibliothek <Icon.arrow size={12} />
            </button>
          </div>

          {canReview && (
            <div
              className="card"
              style={{ padding: 26, display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 14,
                }}
              >
                <div>
                  <div className="h-eyebrow">Review Center</div>
                  <h3 className="h3" style={{ marginTop: 4 }}>Im Prozess</h3>
                </div>
                <PhaseBadge kind="live">live</PhaseBadge>
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 46,
                  fontWeight: 600,
                  letterSpacing: '-.02em',
                  lineHeight: 1,
                }}
              >
                {counts.pipeline}
              </div>
              <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                Artefakte zwischen Einreichung und Maintainer-Entscheidung.
              </div>
              <div style={{ flex: 1 }}></div>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center',
                  marginTop: 18,
                  marginBottom: 14,
                  fontSize: 12,
                  color: 'var(--ink-3)',
                }}
                className="mono"
              >
                <span>Stages:</span>
                {['Einreich.', 'Agent', 'Peer', 'Trust', 'Maintainer'].map((l) => (
                  <span
                    key={l}
                    className="stage-pill"
                    style={{ padding: '2px 7px', fontSize: 10.5 }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => go('review')}
                style={{ alignSelf: 'flex-start' }}
              >
                Review Center öffnen <Icon.arrow size={12} />
              </button>
            </div>
          )}
        </section>

        <section style={{ marginBottom: 48 }}>
          <div className="h-eyebrow" style={{ marginBottom: 14 }}>
            Schnellzugriff
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            <QuickCard
              go={go}
              target="contribution"
              color="var(--tomato)"
              icon={<Icon.plus />}
              title="Beitrag vorbereiten"
              desc="7-Schritte-Stepper mit Upload und KI-Agent."
            />
            <QuickCard
              go={go}
              target="library"
              color="var(--leaf)"
              icon={<Icon.search size={14} />}
              title="Bibliothek durchsuchen"
              desc="Filter nach Typ, Thema und Risiko."
            />
            <QuickCard
              go={go}
              target="about"
              color="var(--slate)"
              icon={<Icon.shield />}
              title="Über KItomat"
              desc="Idee, Ziel und Review-Prinzip verstehen."
            />
            <QuickCard
              go={go}
              target="community"
              color="var(--post-ink)"
              icon={<Icon.users />}
              title="Community"
              desc="Threads, Profile, Kooperation – Post-MVP."
            />
          </div>
        </section>

        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div>
              <div className="h-eyebrow">Zuletzt freigegeben</div>
              <h2 className="h2" style={{ marginTop: 6 }}>
                Frisch in der Bibliothek
              </h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => go('library')}>
              Alle Artefakte <Icon.arrow size={12} />
            </button>
          </div>
          {latest.length === 0 ? (
            <div
              className="card muted"
              style={{ padding: 22, fontSize: 13.5, textAlign: 'center' }}
            >
              Noch keine freigegebenen Artefakte verfügbar.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {latest.map((a) => (
                <LibraryCard
                  key={a.id}
                  a={a}
                  onOpen={() => go('detail', a.id)}
                  compact
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
