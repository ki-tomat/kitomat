const TYPE_META = {
  prompt:   { glyph: '▷', color: 'var(--tomato)', label: 'Prompt-Paket' },
  dataset:  { glyph: '▢', color: 'var(--slate)',  label: 'Quellenpaket' },
  industry: { glyph: '◇', color: 'var(--leaf)',   label: 'KMU-/Branchenmodell' },
};

export function TypeBadge({ type }) {
  const m = TYPE_META[type] || TYPE_META.prompt;
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
      <span style={{ color: m.color, fontSize: 11 }}>{m.glyph}</span>
      {m.label}
    </span>
  );
}

export { TYPE_META };
