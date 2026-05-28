// App shell + router

// ---- Global toast API ----
let _toastSetter = null;
window.kitomatToast = (toast) => { if (_toastSetter) _toastSetter({ id: Date.now(), ...toast }); };

const ROLE_STORAGE_KEY  = "kitomat_role_v1";
const THEME_STORAGE_KEY = "kitomat_theme_v1";

function App() {
  const initial = (() => {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (!hash) return { route: "dashboard", id: null };
    const [route, id] = hash.split("/");
    return { route: route || "dashboard", id: id || null };
  })();

  const [route, setRoute] = React.useState(initial.route);
  const [detailId, setDetailId] = React.useState(initial.id);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [role, setRoleState] = React.useState(() => {
    try { return localStorage.getItem(ROLE_STORAGE_KEY) || "user"; } catch (e) { return "user"; }
  });
  const [theme, setThemeState] = React.useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") return stored;
    } catch (e) {}
    return (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  });

  _toastSetter = setToast;
  const setRole = (r) => {
    setRoleState(r);
    try { localStorage.setItem(ROLE_STORAGE_KEY, r); } catch (e) {}
  };
  const setTheme = (t) => {
    setThemeState(t);
    try { localStorage.setItem(THEME_STORAGE_KEY, t); } catch (e) {}
  };
  React.useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  React.useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      const [r, id] = hash.split("/");
      setRoute(r || "dashboard");
      setDetailId(id || null);
    };
    window.addEventListener("hashchange", onPop);
    return () => window.removeEventListener("hashchange", onPop);
  }, []);

  const go = (r, id) => {
    setRoute(r);
    setDetailId(id || null);
    setChatOpen(false); // auto-minimize on navigation
    const newHash = id ? `#/${r}/${id}` : `#/${r}`;
    if (window.location.hash !== newHash) window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openChat  = () => setChatOpen(true);
  const openLogin = () => setLoginOpen(true);
  const openVideo = () => setVideoOpen(true);
  const handleLogin = () => {
    setLoginOpen(false);
    setRole("admin");
    go("admin");
  };

  // Guard role-restricted routes
  React.useEffect(() => {
    if (route === "review" && !["reviewer","maintainer","admin"].includes(role)) {
      go("dashboard");
      window.kitomatToast({ title:"Kein Zugriff", body:"Das Review Center ist nur für Reviewer, Maintainer und Admins sichtbar.", tone:"info" });
    }
    if (route === "admin" && role !== "admin") {
      go("dashboard");
      window.kitomatToast({ title:"Kein Zugriff", body:"Der Admin-Bereich ist nur für Admin-Rollen sichtbar.", tone:"info" });
    }
    if (route === "my-requests" && role !== "contributor") {
      go("dashboard");
    }
  }, [route, role]);

  let View = null;
  switch (route) {
    case "dashboard":    View = <ViewDashboard go={go} openChat={openChat} openVideo={openVideo} role={role}/>; break;
    case "library":      View = <ViewLibrary go={go}/>; break;
    case "detail":       View = <ViewDetail id={detailId} go={go}/>; break;
    case "contribution": View = <ViewContribution go={go}/>; break;
    case "review":       View = <ViewReview go={go}/>; break;
    case "my-requests":  View = <ViewMyRequests go={go}/>; break;
    case "about":
    case "roadmap":      View = <ViewAbout go={go}/>; break;
    case "community":    View = <ViewCommunity go={go}/>; break;
    case "admin":        View = <ViewAdmin go={go}/>; break;
    case "faq":          View = <ViewFaq/>; break;
    default:             View = <ViewDashboard go={go} openChat={openChat} openVideo={openVideo} role={role}/>;
  }

  return (
    <div className="shell">
      <Header route={route} go={go} openChat={openChat} openLogin={openLogin} role={role} setRole={setRole} theme={theme} setTheme={setTheme}/>
      <main>{View}</main>
      <Footer go={go}/>
      <ChatbotWidget open={chatOpen} setOpen={setChatOpen}/>
      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin}/>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)}/>
      <Toast toast={toast} onDismiss={() => setToast(null)}/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
