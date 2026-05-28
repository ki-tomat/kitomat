export function GoldBadge() {
  return (
    <span
      className="badge"
      style={{
        background: 'linear-gradient(135deg, #F6D782 0%, #D4A12E 100%)',
        color: '#5C3E08',
        fontWeight: 700,
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.08)',
      }}
    >
      <span className="dot" style={{ background: 'var(--amber-ink)' }}></span>
      gold · freigegeben
    </span>
  );
}
