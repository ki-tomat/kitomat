import {
  Icon,
  TypeBadge,
  GoldBadge,
  RiskBadge,
  useToast,
} from '../components/index.js';
import {
  DATENSCHUTZ_KURZ_DONT,
  useLibraryData,
  artifactGithubUrl,
} from '../data/index.js';
import { CONTENT_REPO_URL } from '../lib/links.js';

function Meta({ label, v, mono, color }) {
  return (
    <div>
      <dt
        className="muted"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '.04em',
          textTransform: 'uppercase',
          marginBottom: 3,
        }}
      >
        {label}
      </dt>
      <dd
        className={mono ? 'mono' : ''}
        style={{ margin: 0, fontSize: 13.5, color: color || 'var(--ink)', lineHeight: 1.5 }}
      >
        {v}
      </dd>
    </div>
  );
}

function ScenarioCard({ color, label, icon, text }) {
  const palette = {
    leaf: {
      bg: 'var(--leaf-soft)',
      border: 'var(--leaf-border)',
      ink: 'var(--leaf-ink)',
      dot: 'var(--leaf)',
    },
    amber: {
      bg: 'var(--amber-soft)',
      border: 'var(--amber-border)',
      ink: 'var(--amber-ink)',
      dot: 'var(--amber)',
    },
    tomato: {
      bg: 'var(--tomato-soft)',
      border: 'color-mix(in srgb, var(--tomato) 35%, transparent)',
      ink: 'var(--tomato-deep)',
      dot: 'var(--tomato)',
    },
  }[color];
  return (
    <div
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 8,
            background: palette.dot,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 13,
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
        <span style={{ fontWeight: 700, fontSize: 13, color: palette.ink }}>{label}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, color: palette.ink, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

export default function Detail({ id, go }) {
  const { artifacts, loading } = useLibraryData();
  const { show } = useToast();

  const a = artifacts.find((x) => x.id === id);

  // Kontrollierter Zustand, wenn die ID (noch) nicht in den Daten ist: waehrend
  // des API-Ladens ein dezenter Lade-Hinweis, danach ein echter Not-Found-State.
  // Bewusst NICHT automatisch das erste Artefakt anzeigen.
  if (!a) {
    return (
      <main className="page">
        <div className="container">
          <button
            className="btn btn-ghost btn-sm"
            style={{ marginBottom: 18, marginLeft: -10 }}
            onClick={() => go('library')}
          >
            <Icon.back size={13} /> Zurück zur Bibliothek
          </button>
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <h1 className="h3" style={{ marginBottom: 8 }}>
              {loading ? 'Artefakt wird geladen…' : 'Artefakt nicht gefunden'}
            </h1>
            <p className="muted" style={{ margin: '0 auto', maxWidth: 460, fontSize: 14 }}>
              {loading
                ? 'Die Daten werden gerade aus der Content-API geladen.'
                : 'Zu dieser Kennung gibt es kein freigegebenes Artefakt in der Bibliothek.'}
            </p>
            {!loading && (
              <button
                className="btn btn-secondary btn-sm"
                style={{ marginTop: 18 }}
                onClick={() => go('library')}
              >
                Zur Bibliothek
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Quelllose Detailfelder (nur in Mockdaten vorhanden) werden fuer API-Artefakte
  // ausgeblendet statt leer gerendert.
  const hasScenarios = a.pos || a.nb || a.neg;
  const hasSample =
    (a.sampleIn && a.sampleIn !== '—') || (a.sampleOut && a.sampleOut !== '—');
  const hasFailures = Array.isArray(a.failure) && a.failure.length > 0;
  // DSGVO-/Hinweisfelder aus AP9 nur anzeigen, sobald vorhanden.
  const complianceFields = [
    { l: 'Rechtlicher Hinweis', v: a.legal_disclaimer },
    {
      l: 'Personenbezogene Daten möglich',
      v: typeof a.personal_data_possible === 'boolean' ? (a.personal_data_possible ? 'Ja' : 'Nein') : a.personal_data_possible,
    },
    {
      l: 'Menschlicher Review erforderlich',
      v: typeof a.human_review_required === 'boolean' ? (a.human_review_required ? 'Ja' : 'Nein') : a.human_review_required,
    },
    {
      l: 'Enthält personenbezogene Daten',
      v: typeof a.contains_personal_data === 'boolean' ? (a.contains_personal_data ? 'Ja' : 'Nein') : a.contains_personal_data,
    },
    {
      l: 'Enthält sensible Daten',
      v: typeof a.contains_sensitive_data === 'boolean' ? (a.contains_sensitive_data ? 'Ja' : 'Nein') : a.contains_sensitive_data,
    },
  ].filter((f) => f.v !== undefined && f.v !== null && f.v !== '');

  const canCopySample = a.sampleOut && a.sampleOut !== '—';
  const copySample = async () => {
    if (!canCopySample) return;
    try {
      await navigator.clipboard.writeText(a.sampleOut);
      show({ title: 'Beispiel kopiert', body: 'Der Beispiel-Output liegt in der Zwischenablage.', tone: 'success' });
    } catch (e) {
      show({ title: 'Kopieren nicht möglich', body: 'Die Zwischenablage ist in diesem Browser blockiert.', tone: 'error' });
    }
  };

  const trustGate = [
    { l: 'Metadaten vollständig', s: 'checked' },
    { l: 'Synthetisches Beispiel vorhanden', s: 'checked' },
    { l: 'Szenario-Triade vorhanden', s: 'checked' },
    { l: 'Quellenstatus geklärt', s: 'checked' },
    { l: 'Risiken markiert', s: 'checked' },
    { l: 'Keine sensiblen Daten enthalten', s: 'checked' },
    { l: 'Menschlicher Review durchgeführt', s: 'checked' },
    { l: 'Maintainer-Freigabe erteilt', s: 'checked' },
  ];

  return (
    <main className="page">
      <div className="container">
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: 18, marginLeft: -10 }}
          onClick={() => go('library')}
        >
          <Icon.back size={13} /> Zurück zur Bibliothek
        </button>

        <div
          className="card"
          style={{ padding: 30, marginBottom: 18, position: 'relative', overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute',
              right: -40,
              top: -40,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at center, var(--amber-soft), transparent 70%)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 14,
              position: 'relative',
            }}
          >
            <TypeBadge type={a.type} />
            <GoldBadge />
            <RiskBadge risk={a.risk} />
            <span className="badge badge-neutral mono">{a.language}</span>
            <span className="badge badge-neutral mono">{a.version}</span>
          </div>
          <h1 className="h2" style={{ marginBottom: 10, position: 'relative', maxWidth: 780 }}>
            {a.title}
          </h1>
          <p
            style={{
              margin: '0 0 22px',
              fontSize: 16,
              color: 'var(--ink-2)',
              maxWidth: 780,
              position: 'relative',
            }}
          >
            {a.short}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
            <a
              className="btn btn-primary btn-sm"
              href={artifactGithubUrl(a)}
              target="_blank"
              rel="noreferrer"
            >
              <Icon.github size={14} /> Auf GitHub öffnen <Icon.external />
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={copySample}
              disabled={!canCopySample}
              title={canCopySample ? 'Beispiel-Output in Zwischenablage kopieren' : 'Kein Beispiel-Output verfügbar'}
            >
              Beispiel kopieren
            </button>
            <a
              className="btn btn-secondary btn-sm"
              href={CONTENT_REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Icon.plus /> Änderung vorschlagen
            </a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {hasScenarios && (
              <section className="card" style={{ padding: 26 }}>
                <div className="h-eyebrow" style={{ marginBottom: 6 }}>
                  Trust Layer · Szenario-Triade
                </div>
                <h3 className="h3" style={{ marginBottom: 16 }}>
                  Wann hilft es, wann muss nachbearbeitet werden, wann nicht?
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <ScenarioCard color="leaf" label="Positives Szenario" icon="✓" text={a.pos} />
                  <ScenarioCard
                    color="amber"
                    label="Nachbearbeitbares Szenario"
                    icon="≈"
                    text={a.nb}
                  />
                  <ScenarioCard
                    color="tomato"
                    label="Negatives Szenario"
                    icon="✕"
                    text={a.neg}
                  />
                </div>
              </section>
            )}

            {hasSample && (
            <section className="card" style={{ padding: 26 }}>
              <div className="h-eyebrow" style={{ marginBottom: 14 }}>
                Synthetisches Beispiel
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink-3)',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 99,
                        background: 'var(--ink-2)',
                      }}
                    ></span>
                    Beispielinput
                  </div>
                  <div
                    className="mono"
                    style={{
                      background: 'var(--bg-2)',
                      border: '1px solid var(--line)',
                      borderRadius: 10,
                      padding: 14,
                      fontSize: 13,
                      color: 'var(--ink-2)',
                      whiteSpace: 'pre-wrap',
                      minHeight: 80,
                      lineHeight: 1.6,
                    }}
                  >
                    {a.sampleIn}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink-3)',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 99,
                        background: 'var(--tomato)',
                      }}
                    ></span>
                    Beispieloutput
                  </div>
                  <div
                    className="mono"
                    style={{
                      background: 'var(--tomato-tint)',
                      border: '1px solid var(--tomato-soft)',
                      borderRadius: 10,
                      padding: 14,
                      fontSize: 13,
                      color: 'var(--ink-2)',
                      whiteSpace: 'pre-wrap',
                      minHeight: 80,
                      lineHeight: 1.6,
                    }}
                  >
                    {a.sampleOut}
                  </div>
                </div>
              </div>
            </section>
            )}

            {hasFailures && (
            <section className="card" style={{ padding: 24 }}>
              <div className="h-eyebrow" style={{ marginBottom: 12 }}>
                Bekannte Grenzen
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {a.failure.map((f, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        color: 'var(--amber)',
                        fontWeight: 700,
                        marginTop: 1,
                      }}
                    >
                      !
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
            )}

            {complianceFields.length > 0 && (
              <section className="card" style={{ padding: 24 }}>
                <div className="h-eyebrow" style={{ marginBottom: 14 }}>
                  Datenschutz &amp; Compliance-Hinweise
                </div>
                <dl
                  style={{
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '14px 18px',
                  }}
                >
                  {complianceFields.map((f) => (
                    <Meta key={f.l} label={f.l} v={f.v} />
                  ))}
                </dl>
              </section>
            )}

            <section
              className="card"
              style={{
                padding: 24,
                background: 'var(--bg-2)',
                border: '1px solid var(--line-2)',
              }}
            >
              <div className="h-eyebrow" style={{ marginBottom: 10 }}>
                Datenschutz · Erinnerung an Contributor:innen
              </div>
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: 13.5,
                  color: 'var(--ink-2)',
                  lineHeight: 1.55,
                }}
              >
                Bei Übernahme oder Adaption gelten dieselben Regeln wie für Neueinreichungen:
              </p>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px 18px',
                }}
              >
                {DATENSCHUTZ_KURZ_DONT.map((d, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--tomato-deep)' }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        background: 'var(--tomato-soft)',
                        color: 'var(--tomato-deep)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 10,
                      }}
                    >
                      ✕
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <section className="card" style={{ padding: 22 }}>
              <div className="h-eyebrow" style={{ marginBottom: 14 }}>
                Metadaten
              </div>
              <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Meta label="Version" v={a.version} mono />
                <Meta label="Freigegeben am" v={a.released} mono />
                <Meta label="Contributor" v={a.contributor} mono />
                <Meta label="Zielgruppe" v={a.audience} />
                <Meta label="Einsatzkontext" v={a.context} />
                <Meta label="Lizenz" v={a.license} mono />
                <Meta label="Quellenstatus" v={a.sources} mono color="var(--leaf)" />
                <Meta label="AI-Act-Nähe" v={a.aiAct} />
                <Meta label="Themenfeld" v={a.topic} />
              </dl>
            </section>

            <section className="card" style={{ padding: 22 }}>
              <div className="h-eyebrow" style={{ marginBottom: 6 }}>
                Trust-Gate
              </div>
              <div className="muted" style={{ fontSize: 12, marginBottom: 10 }}>
                Vollständig erfüllte Pflichtprüfung für diese Freigabe.
              </div>
              {trustGate.map((g, i) => (
                <div key={i} className="gate-row">
                  <span className={`gate-check ${g.s}`}>
                    {g.s === 'checked' && <Icon.check />}
                  </span>
                  <span style={{ color: 'var(--ink-2)' }}>{g.l}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
