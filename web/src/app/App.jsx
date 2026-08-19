import { useEffect, useState } from 'react';
import { AdminLoginModal, ChatbotWidget, Footer, Header, ToastProvider, useToast, VideoModal } from '../components/index.js';
import { isRouteAllowed } from '../lib/nav.js';

// -- AP4 - View imports -----------------------------------------------------
import Dashboard from '../views/Dashboard.jsx';
import Library from '../views/Library.jsx';
import Detail from '../views/Detail.jsx';

// -- AP5 - View imports -----------------------------------------------------
import About from '../views/About.jsx';
import Community from '../views/Community.jsx';
import Contribution from '../views/Contribution.jsx';
import FAQ from '../views/FAQ.jsx';
import MyRequests from '../views/MyRequests.jsx';

// -- AP6 - View imports -----------------------------------------------------
import Admin from '../views/Admin.jsx';
import Review from '../views/Review.jsx';

const ROLE_STORAGE_KEY = 'kitomat_role_v1';
const THEME_STORAGE_KEY = 'kitomat_theme_v1';

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { route: 'dashboard', id: null };
  const [route, id] = hash.split('/');
  return { route: route || 'dashboard', id: id || null };
}

function renderRoute({ route, detailId, go, role, openChat, openVideo }) {
  switch (route) {
    // -- AP4 - Library, Detail, Dashboard ----------------------------------
    case 'dashboard':
      return <Dashboard go={go} role={role} openChat={openChat} openVideo={openVideo} />;
    case 'library':
      return <Library go={go} />;
    case 'detail':
      return <Detail id={detailId} go={go} />;

    // -- AP5 - Contribution, Community, MyRequests, FAQ, About -------------
    case 'contribution':
      return <Contribution go={go} />;
    case 'community':
      return <Community go={go} />;
    case 'my-requests':
      return <MyRequests go={go} />;
    case 'faq':
      return <FAQ />;
    case 'about':
      return <About go={go} />;

    // -- AP6 - Review, Admin -----------------------------------------------
    case 'review':
      return <Review go={go} />;
    case 'admin':
      return <Admin go={go} />;

    default:
      return <Dashboard go={go} role={role} openChat={openChat} openVideo={openVideo} />;
  }
}

function AppShell() {
  const [{ route, detailId }, setLocation] = useState(() => {
    const parsed = parseHash();
    return { route: parsed.route, detailId: parsed.id };
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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

  const { show } = useToast();

  // ── AP3b — Modal-Handler ───────────────────────────────────────
  const openChat = () => setChatOpen(true);
  const openVideo = () => setVideoOpen(true);
  const openLogin = () => setLoginOpen(true);

  const handleAdminLogin = () => {
    setRole('admin');
    setLoginOpen(false);
    show({ title: 'Admin-Modus aktiv', body: 'Demo-Login erfolgreich.', tone: 'success' });
  };

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

      {/* ── AP3b — Modal Mount-Points ────────────────────────── */}
      <ChatbotWidget open={chatOpen} setOpen={setChatOpen} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleAdminLogin} />
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
