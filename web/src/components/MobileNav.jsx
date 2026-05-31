import { Icon } from './Icon.jsx';
import { RoleSwitcher } from './RoleSwitcher.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export function MobileNav({
  primary, secondary, route, go, onClose, openChat, openLogin,
  role, setRole, theme, setTheme,
}) {
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: '60px 0 0 0', background: 'rgba(26,25,22,.4)', zIndex: 38 }}
      />
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0, zIndex: 39,
        background: 'var(--surface)', borderBottom: '1px solid var(--line)',
        boxShadow: '0 18px 30px -14px rgba(26,25,22,.2)',
        padding: '16px 20px 22px',
      }}>
        <div className="h-eyebrow" style={{ marginBottom: 8 }}>Hauptbereiche</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 18 }}>
          {primary.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className={`nav-link ${route === n.id || (route === 'detail' && n.id === 'library') ? 'active' : ''}`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: 15 }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div className="h-eyebrow" style={{ marginBottom: 8 }}>Mehr</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 18 }}>
          {secondary.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className={`nav-link ${route === n.id ? 'active' : ''}`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: 15 }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <span className="muted" style={{ fontSize: 12 }}>Rolle (Demo):</span>
          <RoleSwitcher role={role} setRole={setRole} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={openChat}>
            <Icon.chat size={14} /> Assistent
          </button>
          <a className="btn btn-secondary btn-sm" href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
            <Icon.github size={14} /> GitHub
          </a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={openLogin}>
            <Icon.lock size={13} /> Admin
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => go('contribution')}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Icon.plus /> Beitrag vorbereiten
          </button>
        </div>
      </div>
    </>
  );
}
