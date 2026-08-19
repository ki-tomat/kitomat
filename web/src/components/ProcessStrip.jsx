export function ProcessStrip({ steps }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 0,
        position: 'relative',
      }}
    >
      {steps.map((s, i) => (
        <div
          key={i}
          style={{
            padding: '18px 14px',
            background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg-2)',
            borderRight: i < steps.length - 1 ? '1px solid var(--line)' : 'none',
            position: 'relative',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: s.tone === 'human' ? 'var(--leaf)' : 'var(--tomato)',
              marginBottom: 8,
              letterSpacing: '.06em',
            }}
          >
            {s.n} · {s.tone === 'human' ? 'MENSCH' : 'AGENT'}
          </div>
          <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4, lineHeight: 1.3 }}>
            {s.t}
          </div>
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.45 }}>{s.d}</div>
        </div>
      ))}
    </div>
  );
}
