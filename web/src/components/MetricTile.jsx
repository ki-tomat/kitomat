export function MetricTile({ label, value, sub, accent, onClick }) {
  return (
    <div
      className={`card ${onClick ? 'card-hover' : ''}`}
      onClick={onClick}
      style={{
        padding: '18px 18px 16px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {accent && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 14,
            bottom: 14,
            width: 3,
            background: accent,
            borderRadius: '0 3px 3px 0',
          }}
        ></span>
      )}
      <div className="muted" style={{ fontSize: 12.5, fontWeight: 500 }}>{label}</div>
      <div
        className="mono"
        style={{ fontSize: 32, fontWeight: 600, marginTop: 4, letterSpacing: '-.02em' }}
      >
        {value}
      </div>
      {sub && <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
