const PHASE_MAP = {
  live:    { bg: 'var(--leaf-soft)',   color: 'var(--leaf-ink)' },
  demo:    { bg: 'var(--slate-soft)',  color: 'var(--slate)' },
  geplant: { bg: 'var(--amber-soft)',  color: 'var(--amber-ink)' },
  postmvp: { bg: 'var(--post-soft)',   color: 'var(--post-ink)' },
  mvp:     { bg: 'var(--tomato-soft)', color: 'var(--tomato-deep)' },
};

export function PhaseBadge({ kind, children }) {
  const m = PHASE_MAP[kind] || PHASE_MAP.demo;
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
        background: m.bg,
        color: m.color,
      }}
    >
      {children}
    </span>
  );
}
