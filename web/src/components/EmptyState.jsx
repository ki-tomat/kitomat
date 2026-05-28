export function EmptyState({ title, desc, icon }) {
  return (
    <div
      className="card"
      style={{
        padding: '56px 24px',
        textAlign: 'center',
        borderStyle: 'dashed',
        background: 'transparent',
      }}
    >
      <div style={{ fontSize: 30, marginBottom: 8, color: 'var(--ink-3)' }}>{icon || '◌'}</div>
      <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
      <div className="muted" style={{ fontSize: 13 }}>{desc}</div>
    </div>
  );
}
