const RISK = {
  green: { cls: 'badge-green', label: 'risk_green' },
  yellow: { cls: 'badge-yellow', label: 'risk_yellow' },
  red: { cls: 'badge-red', label: 'risk_red' },
};

const TYPE_META = {
  prompt: { glyph: '▷', color: 'var(--tomato)', label: 'Prompt-Paket' },
  dataset: { glyph: '▢', color: 'var(--slate)', label: 'Quellenpaket' },
  industry: { glyph: '◇', color: 'var(--leaf)', label: 'KMU-/Branchenmodell' },
};

export function RiskBadge({ risk }) {
  const badge = RISK[risk] || RISK.green;
  return (
    <span className={`badge ${badge.cls}`}>
      <span className="dot"></span>
      {badge.label}
    </span>
  );
}

export function TypeBadge({ type }) {
  const meta = TYPE_META[type] || TYPE_META.prompt;
  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11.5,
        fontWeight: 600,
        color: 'var(--ink-2)',
        padding: '3px 9px',
        border: '1px solid var(--line)',
        borderRadius: 999,
        background: 'var(--surface)',
      }}
    >
      <span style={{ color: meta.color, fontSize: 11 }}>{meta.glyph}</span>
      {meta.label}
    </span>
  );
}

export function GoldBadge() {
  return (
    <span className="badge badge-bronze-c" style={{ fontWeight: 700 }}>
      <span className="dot"></span>
      gold · freigegeben
    </span>
  );
}

export function PhaseBadge({ kind, children }) {
  const map = {
    live: { bg: 'var(--leaf-soft)', color: 'var(--leaf-ink)' },
    demo: { bg: 'var(--slate-soft)', color: 'var(--slate)' },
    geplant: { bg: 'var(--amber-soft)', color: 'var(--amber-ink)' },
    postmvp: { bg: 'var(--post-soft)', color: 'var(--post-ink)' },
    mvp: { bg: 'var(--tomato-soft)', color: 'var(--tomato-deep)' },
  };
  const meta = map[kind] || map.demo;
  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        background: meta.bg,
        color: meta.color,
      }}
    >
      {children}
    </span>
  );
}

export function Avatar({ name, color, size = 26 }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        background: color || 'var(--slate)',
        color: 'white',
        fontSize: size <= 26 ? 11 : 13,
        fontWeight: 700,
        fontFamily: "'JetBrains Mono', monospace",
        flexShrink: 0,
        letterSpacing: '.02em',
        border: '2px solid var(--surface)',
      }}
    >
      {name}
    </span>
  );
}
