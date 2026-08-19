import { useEffect } from 'react';
import { Icon } from '../Icon.jsx';
import kitomatMark from '@/assets/kitomat-mark.png';

export function AdminLoginModal({ open, onClose, onLogin }) {
  // ESC schließt Modal
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-label="Admin-Login"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 70,
        background: 'rgba(26,25,22,.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 440,
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 18, padding: 32, position: 'relative',
          boxShadow: '0 30px 80px -20px rgba(26,25,22,.4)',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 14, right: 14, padding: 6, color: 'var(--ink-3)' }}
        >
          <Icon.close size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <img src={kitomatMark} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.015em' }}>Admin-Login</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.04em' }}>DEMO · POST-MVP</div>
          </div>
        </div>

        <p className="muted" style={{ margin: '0 0 18px', fontSize: 13.5 }}>
          Im MVP ist der Admin-Bereich als Mockup verfügbar. In Phase 3 erfolgt der Login per GitHub-OAuth.
        </p>

        <form onSubmit={e => { e.preventDefault(); onLogin(); }}>
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div className="h-eyebrow" style={{ marginBottom: 6, fontSize: 11 }}>E-Mail</div>
            <input className="input" defaultValue="admin@kitomat.community" readOnly />
          </label>
          <label style={{ display: 'block', marginBottom: 18 }}>
            <div className="h-eyebrow" style={{ marginBottom: 6, fontSize: 11 }}>Passwort</div>
            <input className="input" type="password" defaultValue="•••••••••••" readOnly />
          </label>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
            Demo-Login als Admin
          </button>
          <button type="button" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <Icon.github size={14} /> Mit GitHub anmelden · geplant
          </button>
        </form>
      </div>
    </div>
  );
}
