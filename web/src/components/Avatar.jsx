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
