import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { ROLE_COLORS, ROLE_LABELS, ROLES } from '../lib/nav.js';

export function RoleSwitcher({ role, setRole }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', marginRight: 4 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="tt tt-bottom"
        data-tt="Demo: Rolle umschalten"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 10px 5px 8px', borderRadius: 999,
          border: '1px solid var(--line)', background: 'var(--surface)',
          fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: 99, background: ROLE_COLORS[role] }} />
        {ROLE_LABELS[role]}
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform .15s', opacity: 0.6 }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)',
          width: 240, background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 6, zIndex: 50,
          boxShadow: '0 18px 40px -14px rgba(26,25,22,.18)',
        }}>
          <div className="h-eyebrow" style={{ padding: '6px 10px 8px', fontSize: 10 }}>
            Demo · Rollenwechsel
          </div>
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                background: role === r ? 'var(--bg-2)' : 'transparent',
                border: 'none', transition: 'background .12s',
              }}
              onMouseEnter={(e) => { if (role !== r) e.currentTarget.style.background = 'var(--bg-2)'; }}
              onMouseLeave={(e) => { if (role !== r) e.currentTarget.style.background = ''; }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 99, background: ROLE_COLORS[r] }} />
              <span style={{ fontSize: 13.5, fontWeight: role === r ? 700 : 500 }}>{ROLE_LABELS[r]}</span>
              {role === r && (
                <span style={{ marginLeft: 'auto', color: 'var(--leaf)' }}>
                  <Icon.check size={12} />
                </span>
              )}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 6, padding: '8px 10px' }}>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', lineHeight: 1.4 }}>
              Prototyp-Schalter. In Phase 3 erfolgt der Login per GitHub-OAuth.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
