import { useEffect, useState } from 'react';
import { Footer, Header, ToastProvider, useToast } from '../components/index.js';
import { isRouteAllowed } from '../lib/nav.js';

// ── AP4 — View-Imports ────────────────────────────────────────
import Dashboard from '../views/Dashboard.jsx';
import Library from '../views/Library.jsx';
import Detail from '../views/Detail.jsx';

const ROLE_STORAGE_KEY = 'kitomat_role_v1';
const THEME_STORAGE_KEY = 'kitomat_theme_v1';

const ROUTE_LABELS = {
  dashboard:    'Dashboard',
  library:      'Bibliothek',
  detail:       'Detail',
  contribution: 'Beitrag vorbereiten',
  review:       'Review Center',
  admin:        'Admin-Bereich',
  community:    'Community',
  'my-requests': 'Meine Requests',
  faq:          'FAQ',
  about:        'Über KItomat',
};

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { route: 'dashboard', id: null };
  const [route, id] = hash.split('/');
  return { route: route || 'dashboard', id: id || null };
}

// ── Routen-Map mit Sektions-Markern pro AP ─────────────────────
// Andere APs ergänzen ihre View-Imports + Map-Einträge unter ihrer Sektion.
function renderRoute({ route, detailId, go, role, openChat, openVideo }) {
  switch (route) {
    // ── AP4 — Library, Detail, Dashboard ──────────────────────
    case 'dashboard': return <Dashboard go={go} role={role} openChat={openChat} openVideo={openVideo} />;
    case 'library':   return <Library go={go} />;
    case 'detail':    return <Detail id={detailId} go={go} />;

    // ── AP5 — Contribution, Community, MyRequests, FAQ, About ──
    case 'contribution':
    case 'community':
    case 'my-requests':
    case 'faq':
    case 'about':
      return <DummyView routeId={route} detailId={detailId} />;

    // ── AP6 — Review, Admin ────────────────────────────────────
    case 'review':
    case 'admin':
      return <DummyView routeId={route} detailId={detailId} />;

    default:
      return <Dashboard go={go} role={role} openChat={openChat} openVideo={openVideo} />;
  }
}

function DummyView({ routeId, detailId }) {
  const label = ROUTE_LABELS[routeId] || routeId;
  const { show } = useToast();
  return (
    <main className="page">
      <div className="container" style={{ padding: '32px 0' }}>
        <div className="h-eyebrow">AP3a Platzhalter</div>
        <h1 className="h1">{label}</h1>
        <p className="muted">
          Diese Ansicht ist ein App-Shell-Platzhalter. Die echte Implementierung folgt in AP4–AP6.
          {detailId && <> Detail-ID: <code>{detailId}</code></>}
        </p>
        <div className="card" style={{ marginTop: 22, padding: 22 }}>
          <div className="h3">Route aktiv: <code>#/{routeId}{detailId ? `/${detailId}` : ''}</code></div>
          <p className="muted" style={{ marginTop: 8 }}>
            Header + Footer + Theme + Rollenwechsel + Toast laufen live aus den
            Komponenten in <code>src/components/</code>.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ marginTop: 12 }}
            onClick={() => show({ title: 'Toast-Demo', body: 'Toast-Context funktioniert.', tone: 'success' })}
          >
            Toast auslösen
          </button>
        </div>
      </div>
    </main>
  );
}

function AppShell() {
  const [{ route, detailId }, setLocation] = useState(() => {
    const parsed = parseHash();
    return { route: parsed.route, detailId: parsed.id };
  });

  const [role, setRoleState] = useState(() => {
    try {
      const stored = localStorage.getItem(ROLE_STORAGE_KEY);
      if (stored) return stored;
    } catch (e) { /* localStorage nicht verfügbar */ }
    return 'user';
  });

  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) { /* localStorage nicht verfügbar */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const setRole = (next) => {
    setRoleState(next);
    try { localStorage.setItem(ROLE_STORAGE_KEY, next); } catch (e) { /* ignore */ }
  };

  const setTheme = (next) => {
    setThemeState(next);
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (e) { /* ignore */ }
  };

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
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

  // Rollen-Guard: bei nicht erlaubter Kombination Route → Dashboard umleiten
  useEffect(() => {
    if (!isRouteAllowed(route, role)) {
      const fallback = '#/dashboard';
      if (window.location.hash !== fallback) {
        window.location.hash = fallback;
      }
    }
  }, [route, role]);

  const go = (target, id) => {
    const newHash = id ? `#/${target}/${id}` : `#/${target}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    } else {
      setLocation({ route: target, detailId: id || null });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Modal-Stubs für AP3b — bis dahin als No-Op-Toasts, damit Header- und View-Aktionen funktionieren.
  const { show } = useToast();
  const openChat = () => show({ title: 'Chatbot folgt in AP3b', tone: 'info' });
  const openLogin = () => show({ title: 'Admin-Login folgt in AP3b', tone: 'info' });
  const openVideo = () => show({ title: 'Erklärvideo folgt in AP3b', tone: 'info' });

  return (
    <>
      <Header
        route={route}
        go={go}
        openChat={openChat}
        openLogin={openLogin}
        role={role}
        setRole={setRole}
        theme={theme}
        setTheme={setTheme}
      />
      {renderRoute({ route, detailId, go, role, openChat, openVideo })}
      <Footer go={go} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
