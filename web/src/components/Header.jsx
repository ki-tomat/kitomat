import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { MobileNav } from './MobileNav.jsx';
import { RoleSwitcher } from './RoleSwitcher.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { navForRole } from '../lib/nav.js';
import kitomatMark from '../assets/kitomat-mark.png';

import { CONTENT_REPO_URL } from '../lib/links.js';
export function Header({ route, go, openChat, openLogin, role, setRole, theme, setTheme }) {
  const { primary: PRIMARY, secondary: SECONDARY } = navForRole(role);

  const isActive = (id) =>
    route === id
    || (route === 'detail' && id === 'library')
    || (route === 'roadmap' && id === 'about');

  const inSecondary = SECONDARY.some((s) => s.id === route);

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [moreOpen]);

  useEffect(() => { setMobileOpen(false); }, [route]);

  return (
    <header className="app-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 14, height: 60 }}>
        <button
          type="button"
          onClick={() => go('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0, background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <img src={kitomatMark} alt="" style={{ height: 34, width: 34, objectFit: 'contain' }} />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>
            <span style={{ color: 'var(--ink)' }}>KI</span>
            <span style={{ color: 'var(--tomato)' }}>tomat</span>
          </span>
        </button>

        <nav className="nav-primary">
          {PRIMARY.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className={`nav-link ${isActive(n.id) ? 'active' : ''}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ flex: 1, minWidth: 0 }} />

        <div className="nav-right">
          <RoleSwitcher role={role} setRole={setRole} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            type="button"
            className="btn btn-ghost btn-sm tt tt-bottom"
            data-tt="KItomat Assistent"
            onClick={openChat}
          >
            <Icon.chat size={15} />
          </button>
          <a
            className="btn btn-ghost btn-sm tt tt-bottom"
            data-tt="GitHub Repository"
            href={CONTENT_REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Icon.github size={15} />
          </a>
          <button
            type="button"
            className="btn btn-ghost btn-sm tt tt-bottom"
            data-tt="Admin-Login (Demo)"
            onClick={openLogin}
          >
            <Icon.lock size={14} />
          </button>

          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className={`nav-link ${inSecondary || moreOpen ? 'active' : ''}`}
              onClick={() => setMoreOpen((o) => !o)}
            >
              Mehr
              <svg
                width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: moreOpen ? 'rotate(180deg)' : '', transition: 'transform .15s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                width: 280, background: 'var(--surface)', border: '1px solid var(--line)',
                borderRadius: 12, padding: 6,
                boxShadow: '0 18px 40px -14px rgba(26,25,22,.18)',
              }}>
                {SECONDARY.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setMoreOpen(false); go(s.id); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                      background: route === s.id ? 'var(--bg-2)' : 'transparent',
                      border: 'none', transition: 'background .12s',
                    }}
                    onMouseEnter={(e) => { if (route !== s.id) e.currentTarget.style.background = 'var(--bg-2)'; }}
                    onMouseLeave={(e) => { if (route !== s.id) e.currentTarget.style.background = ''; }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => go('contribution')}
            style={{ marginLeft: 4 }}
          >
            <Icon.plus /> Beitrag
          </button>
        </div>

        <button
          type="button"
          className="nav-burger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menü"
          style={{ padding: 8, borderRadius: 8 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen
              ? <path d="M6 6l12 12M18 6 6 18" />
              : (<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>)}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <MobileNav
          primary={PRIMARY}
          secondary={SECONDARY}
          route={route}
          go={go}
          onClose={() => setMobileOpen(false)}
          openChat={openChat}
          openLogin={openLogin}
          role={role}
          setRole={setRole}
          theme={theme}
          setTheme={setTheme}
        />
      )}
    </header>
  );
}
