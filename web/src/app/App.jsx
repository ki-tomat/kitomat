import React, { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'kitomat_theme_v1';

const ROUTES = [
  { id: 'dashboard',     label: 'Dashboard' },
  { id: 'library',       label: 'Bibliothek' },
  { id: 'detail',        label: 'Detail' },
  { id: 'contribution',  label: 'Beitragen' },
  { id: 'review',        label: 'Review' },
  { id: 'admin',         label: 'Admin' },
  { id: 'community',     label: 'Community' },
  { id: 'my-requests',   label: 'Meine Anfragen' },
  { id: 'faq',           label: 'FAQ' },
  { id: 'about',         label: 'Über' },
];

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { route: 'dashboard', id: null };
  const [route, id] = hash.split('/');
  return { route: route || 'dashboard', id: id || null };
}

function DummyView({ routeId, detailId }) {
  const meta = ROUTES.find((r) => r.id === routeId);
  return (
    <main className="page">
      <div className="container" style={{ padding: '32px 0' }}>
        <div className="h-eyebrow">AP1a Platzhalter</div>
        <h1 className="h1">{meta ? meta.label : routeId}</h1>
        <p className="muted">
          Diese Ansicht ist ein Vite-Skeleton-Platzhalter. Die echte Implementierung folgt in AP4–AP6.
          {detailId && <> Detail-ID: <code>{detailId}</code></>}
        </p>
        <div className="card" style={{ marginTop: 22, padding: 22 }}>
          <div className="h3">Route aktiv: <code>#/{routeId}{detailId ? `/${detailId}` : ''}</code></div>
          <p className="muted" style={{ marginTop: 8 }}>
            Styles aus <code>global.css</code> geladen — CSS-Variablen aktiv, Light/Dark-Mode persistiert.
          </p>
        </div>
      </div>
    </main>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={onToggle}
      aria-label="Theme umschalten"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}

function StubHeader({ route, theme, onToggleTheme, onNavigate }) {
  return (
    <header style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 0' }}>
        <a href="#/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <img src="/src/assets/kitomat-mark.png" alt="KI-tomat" style={{ height: 28 }} />
          <strong style={{ color: 'var(--ink)' }}>KI-tomat</strong>
        </a>
        <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {ROUTES.map((r) => (
            <a
              key={r.id}
              href={`#/${r.id}`}
              className={`nav-link${route === r.id ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); onNavigate(r.id); }}
            >
              {r.label}
            </a>
          ))}
        </nav>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}

export default function App() {
  const [{ route, detailId }, setLocation] = useState(() => {
    const parsed = parseHash();
    return { route: parsed.route, detailId: parsed.id };
  });

  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) { /* localStorage nicht verfügbar */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      setLocation({ route: parsed.route, detailId: parsed.id });
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (target, id) => {
    const newHash = id ? `#/${target}/${id}` : `#/${target}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    } else {
      setLocation({ route: target, detailId: id || null });
    }
  };

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <StubHeader
        route={route}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={(r) => navigate(r)}
      />
      <DummyView routeId={route} detailId={detailId} />
    </>
  );
}
