// KItomat — Shared components (v2)

// ---------------- Icons ----------------
const Icon = {
  github: (p={}) => (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>),
  arrow:  (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>),
  back:   (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>),
  search: (p={}) => (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>),
  plus:   (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>),
  check:  (p={}) => (<svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 10 18.5 20 6.5"/></svg>),
  dash:   (p={}) => (<svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12h14"/></svg>),
  external:(p={})=> (<svg width={p.size||13} height={p.size||13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6M10 14 20 4M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>),
  shield: (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/></svg>),
  spark:  (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 13.5 8.5 20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>),
  play:   (p={}) => (<svg width={p.size||22} height={p.size||22} viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>),
  chat:   (p={}) => (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/></svg>),
  close:  (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>),
  lock:   (p={}) => (<svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>),
  upload: (p={}) => (<svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg>),
  file:   (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>),
  filter: (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>),
  bell:   (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>),
  mail:   (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>),
  users:  (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 2.5-5 6-5s6 2 6 5"/><path d="M15 19c0-2 1.5-4 4-4s2 1 2 4"/></svg>),
  send:   (p={}) => (<svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>),
  trophy: (p={}) => (<svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H5a2 2 0 0 0 2 4M16 6h3a2 2 0 0 1-2 4M10 18h4M12 14v4M8 21h8"/></svg>),
};

// ---------------- Status helpers ----------------
const RISK = {
  green:  { cls:"badge-green",  label:"risk_green" },
  yellow: { cls:"badge-yellow", label:"risk_yellow" },
  red:    { cls:"badge-red",    label:"risk_red" },
};
function RiskBadge({ risk }) {
  const b = RISK[risk] || RISK.green;
  return <span className={`badge ${b.cls}`}><span className="dot"></span>{b.label}</span>;
}

const TYPE_META = {
  prompt:   { glyph:"▷", color:"var(--tomato)", label:"Prompt-Paket" },
  dataset:  { glyph:"▢", color:"var(--slate)",  label:"Quellenpaket" },
  industry: { glyph:"◇", color:"var(--leaf)",   label:"KMU-/Branchenmodell" },
};
function TypeBadge({ type }) {
  const m = TYPE_META[type] || TYPE_META.prompt;
  return (
    <span className="mono" style={{
      display:"inline-flex", alignItems:"center", gap:6,
      fontSize:11.5, fontWeight:600, color:"var(--ink-2)",
      padding:"3px 9px", border:"1px solid var(--line)",
      borderRadius:999, background:"var(--surface)"
    }}>
      <span style={{color:m.color, fontSize:11}}>{m.glyph}</span>{m.label}
    </span>
  );
}

function GoldBadge() {
  return (
    <span className="badge" style={{
      background:"linear-gradient(135deg, #F6D782 0%, #D4A12E 100%)",
      color:"#5C3E08", fontWeight:700,
      boxShadow:"inset 0 -1px 0 rgba(0,0,0,.08)"
    }}>
      <span className="dot" style={{background:"var(--amber-ink)"}}></span>gold · freigegeben
    </span>
  );
}

function PhaseBadge({ kind, children }) {
  // Demo / geplant / Post-MVP / live
  const map = {
    live:    { bg:"var(--leaf-soft)",    color:"var(--leaf-ink)" },
    demo:    { bg:"var(--slate-soft)",   color:"var(--slate)" },
    geplant: { bg:"var(--amber-soft)",   color:"var(--amber-ink)" },
    postmvp: { bg:"var(--post-soft)",             color:"var(--post-ink)" },
    mvp:     { bg:"var(--tomato-soft)",  color:"var(--tomato-deep)" },
  };
  const m = map[kind] || map.demo;
  return (
    <span className="mono" style={{
      display:"inline-flex", alignItems:"center", gap:5,
      padding:"2px 8px", borderRadius:999,
      fontSize:10.5, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase",
      background:m.bg, color:m.color,
    }}>{children}</span>
  );
}

function Avatar({ name, color, size=26 }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:size, height:size, borderRadius:999,
      background:color || "var(--slate)", color:"white",
      fontSize: size <= 26 ? 11 : 13, fontWeight:700,
      fontFamily:"'JetBrains Mono', monospace",
      flexShrink:0, letterSpacing:".02em",
      border:"2px solid var(--surface)",
    }}>{name}</span>
  );
}

// ---------------- Role-based navigation config ----------------
const ROLE_LABELS = {
  user:       "Nutzer:in",
  contributor:"Contributor",
  reviewer:   "Reviewer",
  maintainer: "Maintainer",
  admin:      "Admin",
};
const ROLE_COLORS = {
  user:       "var(--slate)",
  contributor:"var(--leaf)",
  reviewer:   "var(--tomato)",
  maintainer: "var(--post-ink)",
  admin:      "var(--ink)",
};
function navForRole(role) {
  const base = [
    { id:"dashboard",    label:"Dashboard" },
    { id:"library",      label:"Bibliothek" },
    { id:"contribution", label:"Beitrag vorbereiten" },
    { id:"about",        label:"Über KItomat" },
  ];
  const primary = [...base];
  if (role === "contributor")               primary.push({ id:"my-requests", label:"Meine Requests" });
  if (["reviewer","maintainer","admin"].includes(role)) primary.push({ id:"review", label:"Review Center" });

  const secondary = [
    { id:"community", label:"Community", desc:"Forum, Profile, Channels" },
    { id:"faq",       label:"FAQ",       desc:"Häufige Fragen kompakt" },
  ];
  // For roles that don't see Review Center as primary, surface "Meine Requests" / "Review Center" in More if applicable
  if (role === "user") {
    secondary.unshift({ id:"about", label:"Über KItomat", desc:"Idee, Trust-Prinzipien, Roadmap", _hideFromSecondary: true });
  }
  if (role === "admin") {
    secondary.push({ id:"admin", label:"Admin-Bereich", desc:"Rollen, Integrationen, Audit" });
  }
  return { primary, secondary: secondary.filter(s => !s._hideFromSecondary) };
}

// ---------------- Theme toggle ----------------
function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Farbschema">
      <button onClick={() => setTheme("light")} title="Light Mode" aria-label="Light Mode"
        className={`tt tt-bottom ${theme === "light" ? "active" : ""}`} data-tt="Light">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      </button>
      <button onClick={() => setTheme("dark")} title="Dark Mode" aria-label="Dark Mode"
        className={`tt tt-bottom ${theme === "dark" ? "active" : ""}`} data-tt="Dark">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
      </button>
    </div>
  );
}

// ---------------- Header ----------------
function Header({ route, go, openChat, openLogin, role, setRole, theme, setTheme }) {
  const { primary: PRIMARY, secondary: SECONDARY } = navForRole(role);

  const isActive = (id) =>
    route === id ||
    (route === "detail" && id === "library") ||
    (route === "roadmap" && id === "about");

  const inSecondary = SECONDARY.some(s => s.id === route);

  const [moreOpen, setMoreOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const moreRef = React.useRef(null);

  React.useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  // Close mobile drawer when route changes
  React.useEffect(() => { setMobileOpen(false); }, [route]);

  return (
    <header className="app-header">
      <div className="container" style={{display:"flex", alignItems:"center", gap:14, height:60}}>
        {/* Logo */}
        <button onClick={() => go("dashboard")} style={{display:"flex", alignItems:"center", gap:9, flexShrink:0}}>
          <img src={window.__resources?.logo || "assets/kitomat-mark.png"} alt="" style={{height:34, width:34, objectFit:"contain"}} />
          <span style={{fontWeight:800, fontSize:17, letterSpacing:"-.02em"}}>
            <span style={{color:"var(--ink)"}}>KI</span><span style={{color:"var(--tomato)"}}>tomat</span>
          </span>
        </button>

        {/* Primary nav — always single line */}
        <nav className="nav-primary">
          {PRIMARY.map(n => (
            <button key={n.id} onClick={() => go(n.id)} className={`nav-link ${isActive(n.id) ? "active" : ""}`}>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{flex:1, minWidth:0}}></div>

        {/* Right cluster — desktop */}
        <div className="nav-right">
          <RoleSwitcher role={role} setRole={setRole}/>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
          <button className="btn btn-ghost btn-sm tt tt-bottom" data-tt="KItomat Assistent" onClick={openChat}>
            <Icon.chat size={15}/>
          </button>
          <a className="btn btn-ghost btn-sm tt tt-bottom" data-tt="GitHub Repository"
             href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
            <Icon.github size={15}/>
          </a>
          <button className="btn btn-ghost btn-sm tt tt-bottom" data-tt="Admin-Login (Demo)" onClick={openLogin}>
            <Icon.lock size={14}/>
          </button>

          {/* "Mehr" dropdown */}
          <div ref={moreRef} style={{position:"relative"}}>
            <button className={`nav-link ${inSecondary || moreOpen ? "active" : ""}`} onClick={() => setMoreOpen(o => !o)}>
              Mehr
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{transform: moreOpen ? "rotate(180deg)" : "", transition:"transform .15s"}}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {moreOpen && (
              <div style={{
                position:"absolute", right:0, top:"calc(100% + 8px)",
                width:280, background:"var(--surface)", border:"1px solid var(--line)",
                borderRadius:12, padding:6,
                boxShadow:"0 18px 40px -14px rgba(26,25,22,.18)",
              }}>
                {SECONDARY.map(s => (
                  <button key={s.id} onClick={() => { setMoreOpen(false); go(s.id); }}
                    style={{
                      display:"block", width:"100%", textAlign:"left",
                      padding:"10px 12px", borderRadius:8,
                      background: route === s.id ? "var(--bg-2)" : "transparent",
                      transition:"background .12s",
                    }}
                    onMouseEnter={e => { if (route !== s.id) e.currentTarget.style.background = "var(--bg-2)"; }}
                    onMouseLeave={e => { if (route !== s.id) e.currentTarget.style.background = ""; }}>
                    <div style={{fontWeight:600, fontSize:14}}>{s.label}</div>
                    <div className="muted" style={{fontSize:12, marginTop:2}}>{s.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => go("contribution")} style={{marginLeft:4}}>
            <Icon.plus/> Beitrag
          </button>
        </div>

        {/* Mobile burger */}
        <button className="nav-burger" onClick={() => setMobileOpen(o => !o)} aria-label="Menü"
          style={{padding:8, borderRadius:8}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18"/> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
          </svg>
        </button>
      </div>

      {/* Mobile slideout */}
      {mobileOpen && (
        <MobileNav primary={PRIMARY} secondary={SECONDARY} route={route} go={go} onClose={() => setMobileOpen(false)} openChat={openChat} openLogin={openLogin} role={role} setRole={setRole} theme={theme} setTheme={setTheme}/>
      )}
    </header>
  );
}

// ---------------- Role switcher (demo) ----------------
function RoleSwitcher({ role, setRole }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const ROLES = Object.keys(ROLE_LABELS);
  return (
    <div ref={ref} style={{position:"relative", marginRight:4}}>
      <button onClick={() => setOpen(o => !o)}
        className="tt tt-bottom" data-tt="Demo: Rolle umschalten"
        style={{
          display:"inline-flex", alignItems:"center", gap:7,
          padding:"5px 10px 5px 8px", borderRadius:999,
          border:"1px solid var(--line)", background:"var(--surface)",
          fontSize:12, fontWeight:600, color:"var(--ink-2)",
        }}>
        <span style={{width:7, height:7, borderRadius:99, background: ROLE_COLORS[role]}}></span>
        {ROLE_LABELS[role]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{transform: open ? "rotate(180deg)" : "", transition:"transform .15s", opacity:.6}}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position:"absolute", right:0, top:"calc(100% + 8px)",
          width:240, background:"var(--surface)", border:"1px solid var(--line)",
          borderRadius:12, padding:6, zIndex:50,
          boxShadow:"0 18px 40px -14px rgba(26,25,22,.18)",
        }}>
          <div className="h-eyebrow" style={{padding:"6px 10px 8px", fontSize:10}}>Demo · Rollenwechsel</div>
          {ROLES.map(r => (
            <button key={r} onClick={() => { setRole(r); setOpen(false); }}
              style={{
                display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left",
                padding:"8px 10px", borderRadius:8,
                background: role === r ? "var(--bg-2)" : "transparent",
                transition:"background .12s",
              }}
              onMouseEnter={e => { if (role !== r) e.currentTarget.style.background = "var(--bg-2)"; }}
              onMouseLeave={e => { if (role !== r) e.currentTarget.style.background = ""; }}>
              <span style={{width:8, height:8, borderRadius:99, background: ROLE_COLORS[r]}}></span>
              <span style={{fontSize:13.5, fontWeight: role === r ? 700 : 500}}>{ROLE_LABELS[r]}</span>
              {role === r && <span style={{marginLeft:"auto", color:"var(--leaf)"}}><Icon.check size={12}/></span>}
            </button>
          ))}
          <div style={{borderTop:"1px solid var(--line)", marginTop:6, padding:"8px 10px"}}>
            <div className="mono" style={{fontSize:10.5, color:"var(--ink-3)", lineHeight:1.4}}>
              Prototyp-Schalter. In Phase 3 erfolgt der Login per GitHub-OAuth.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNav({ primary, secondary, route, go, onClose, openChat, openLogin, role, setRole, theme, setTheme }) {
  return (
    <>
      <div onClick={onClose} style={{position:"fixed", inset:"60px 0 0 0", background:"rgba(26,25,22,.4)", zIndex:38}}></div>
      <div style={{
        position:"absolute", top:60, left:0, right:0, zIndex:39,
        background:"var(--surface)", borderBottom:"1px solid var(--line)",
        boxShadow:"0 18px 30px -14px rgba(26,25,22,.2)",
        padding:"16px 20px 22px",
      }}>
        <div className="h-eyebrow" style={{marginBottom:8}}>Hauptbereiche</div>
        <div style={{display:"flex", flexDirection:"column", gap:2, marginBottom:18}}>
          {primary.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`nav-link ${route === n.id || (route === "detail" && n.id === "library") ? "active" : ""}`}
              style={{justifyContent:"flex-start", padding:"12px 14px", fontSize:15}}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="h-eyebrow" style={{marginBottom:8}}>Mehr</div>
        <div style={{display:"flex", flexDirection:"column", gap:2, marginBottom:18}}>
          {secondary.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`nav-link ${route === n.id ? "active" : ""}`}
              style={{justifyContent:"flex-start", padding:"12px 14px", fontSize:15}}>
              {n.label}
            </button>
          ))}
        </div>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:14, flexWrap:"wrap"}}>
          <span className="muted" style={{fontSize:12}}>Rolle (Demo):</span>
          <RoleSwitcher role={role} setRole={setRole}/>
          <ThemeToggle theme={theme} setTheme={setTheme}/>
        </div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          <button className="btn btn-secondary btn-sm" onClick={openChat}><Icon.chat size={14}/> Assistent</button>
          <a className="btn btn-secondary btn-sm" href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
            <Icon.github size={14}/> GitHub
          </a>
          <button className="btn btn-secondary btn-sm" onClick={openLogin}><Icon.lock size={13}/> Admin</button>
          <button className="btn btn-primary btn-sm" onClick={() => go("contribution")} style={{flex:1, justifyContent:"center"}}>
            <Icon.plus/> Beitrag vorbereiten
          </button>
        </div>
      </div>
    </>
  );
}

// ---------------- Footer ----------------
function Footer({ go }) {
  return (
    <footer style={{borderTop:"1px solid var(--line)", marginTop:60, background:"var(--surface)"}}>
      <div className="container" style={{padding:"32px 32px 28px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:32, marginBottom:24}}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
              <img src={window.__resources?.logo || "assets/kitomat-mark.png"} alt="" style={{height:32, width:32, objectFit:"contain"}}/>
              <strong style={{fontSize:16}}>
                <span>KI</span><span style={{color:"var(--tomato)"}}>tomat</span>
              </strong>
            </div>
            <div className="muted" style={{fontSize:13, maxWidth:320}}>
              Kuratierte, reviewte Bibliothek für KI-Arbeitsbausteine.
              Aufgebaut im KI-Consultant-Kurs, getragen von der Community.
            </div>
          </div>
          <FooterCol title="Erkunden" items={[
            ["Dashboard","dashboard"],["Bibliothek","library"],["Über KItomat","about"],["FAQ","faq"],
          ]} go={go}/>
          <FooterCol title="Mitmachen" items={[
            ["Beitrag vorbereiten","contribution"],["Review Center","review"],["Community","community"],
          ]} go={go}/>
          <div>
            <div className="h-eyebrow" style={{marginBottom:10}}>Repository</div>
            <a className="mono" style={{fontSize:13, display:"inline-flex", alignItems:"center", gap:6, color:"var(--ink-2)"}}
               href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
              <Icon.github size={13}/> github.com/ki-tomat/kitomat
            </a>
            <div className="mono muted" style={{fontSize:11, marginTop:8}}>v0.2 · MVP</div>
          </div>
        </div>
        <div style={{borderTop:"1px solid var(--line)", paddingTop:14, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10}}>
          <div className="mono muted" style={{fontSize:11}}>Community-Projekt · KI-Consultant-Kurs · Made for KMU.</div>
          <div className="mono muted" style={{fontSize:11}}>Frische KI-Ressourcen. Reife Ideen.</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items, go }) {
  return (
    <div>
      <div className="h-eyebrow" style={{marginBottom:10}}>{title}</div>
      <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:6}}>
        {items.map(([l, id]) => (
          <li key={id}>
            <button onClick={() => go(id)} style={{fontSize:13.5, color:"var(--ink-2)"}}>{l}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Generic helpers ----------------
function MetricTile({ label, value, sub, accent, onClick }) {
  return (
    <div className={`card ${onClick ? "card-hover" : ""}`} onClick={onClick}
      style={{padding:"18px 18px 16px", cursor: onClick ? "pointer":"default", position:"relative", overflow:"hidden"}}>
      {accent && <span style={{position:"absolute", left:0, top:14, bottom:14, width:3, background:accent, borderRadius:"0 3px 3px 0"}}></span>}
      <div className="muted" style={{fontSize:12.5, fontWeight:500}}>{label}</div>
      <div className="mono" style={{fontSize:32, fontWeight:600, marginTop:4, letterSpacing:"-.02em"}}>{value}</div>
      {sub && <div className="muted" style={{fontSize:12, marginTop:2}}>{sub}</div>}
    </div>
  );
}

function EmptyState({ title, desc, icon }) {
  return (
    <div className="card" style={{padding:"56px 24px", textAlign:"center", borderStyle:"dashed", background:"transparent"}}>
      <div style={{fontSize:30, marginBottom:8, color:"var(--ink-3)"}}>{icon || "◌"}</div>
      <div style={{fontWeight:600, fontSize:15}}>{title}</div>
      <div className="muted" style={{fontSize:13}}>{desc}</div>
    </div>
  );
}

// ---------------- Chatbot widget ----------------
const CHAT_STORAGE_KEY = "kitomat_chat_msgs_v1";
const CHAT_INITIAL = [
  { who:"bot",  t:"Hi, ich bin der KItomat Assistent. Ich helfe dir beim Einordnen von Artefakttypen, beim Verstehen des Review-Prozesses und bei der Vorbereitung eines Beitrags." },
  { who:"user", t:"Welchen Artefakttyp soll ich wählen?" },
  { who:"bot",  t:"Wenn du eine wiederverwendbare KI-Anweisung mit Beispielinput und Qualitätsgrenzen einreichen möchtest, passt wahrscheinlich ein Prompt-Paket. Ich kann dich Schritt für Schritt durch die Checkliste führen." },
  { who:"user", t:"Darf ich anonymisierte Kundendaten verwenden?" },
  { who:"bot",  t:"Nein. Für KItomat im MVP bitte keine anonymisierten Echtdaten verwenden. Nutze synthetische Beispiele, selbst erstellte Musterfälle oder öffentlich nutzbare Quellen mit klarer Herkunft und Lizenz." },
];

function ChatbotWidget({ open, setOpen }) {
  const [msgs, setMsgs] = React.useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return CHAT_INITIAL;
  });
  const [draft, setDraft] = React.useState("");
  const [inputFocused, setInputFocused] = React.useState(false);
  const scroller = React.useRef(null);
  const panelRef = React.useRef(null);
  const fabRef   = React.useRef(null);

  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [msgs, open]);

  React.useEffect(() => {
    try { localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(msgs)); } catch (e) {}
  }, [msgs]);

  // Auto-minimize on outside click — unless user is typing
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (inputFocused) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      if (fabRef.current && fabRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, inputFocused, setOpen]);

  const QUICK = [
    "Was ist ein Quellenpaket?",
    "Wie läuft der Review?",
    "Welche Daten sind verboten?",
    "Brauche ich GitHub?",
  ];

  const reply = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes("quellen"))  return "Ein Quellenpaket bündelt geprüfte, öffentlich nutzbare Quellen zu einem Thema – inklusive Lizenzangabe und kurzer Einordnung. Es enthält keine personenbezogenen oder vertraulichen Daten.";
    if (lower.includes("review"))   return "Einreichung → Agenten-Vorprüfung → Peer Review → Trust Review (bei Risiko-/Quellenfragen) → Maintainer-Entscheidung. Erst danach landet ein Artefakt in der Bibliothek.";
    if (lower.includes("daten") || lower.includes("verbot")) return "Verwende ausschließlich synthetische Beispiele, selbst erstellte Musterfälle oder öffentlich nutzbare Quellen mit klarer Herkunft und Lizenz. Keine echten personenbezogenen Daten, keine Kundendaten, keine internen Unternehmensdokumente und keine anonymisierten Echtdaten.";
    if (lower.includes("github"))   return "Im MVP übergeben wir Beiträge über GitHub. Das Contribution Center bereitet den Review Request vor und verlinkt direkt ins Repository. Echter In-GUI-Upload ist Post-MVP.";
    if (lower.includes("trust"))    return "Der Trust Layer ist die Summe aller Prüfungen, die ein Artefakt durchläuft: Pflichtfelder, Szenario-Triade, Quellen, Risiko-Einstufung und menschlicher Review.";
    if (lower.includes("artefakt") || lower.includes("typ")) return "Drei Typen: Prompt-Paket (wiederverwendbarer Prompt mit Beispiel-I/O), Quellenpaket (kuratierte öffentliche Quellen) und KMU-/Branchenmodell (Use-Case-Raster). Sag mir, was du im Kopf hast – ich helfe einzuordnen.";
    return "Gute Frage. Im MVP verweise ich dich auf den entsprechenden Bereich: FAQ, Contribution Center oder das Community-Bereich.";
  };

  const send = (text) => {
    const t = (text || draft).trim();
    if (!t) return;
    setMsgs(m => [...m, { who:"user", t }]);
    setDraft("");
    setTimeout(() => setMsgs(m => [...m, { who:"bot", t: reply(t) }]), 450);
  };

  const clearHistory = () => { setMsgs(CHAT_INITIAL); };

  return (
    <>
      {/* FAB — always rendered (so chat state lives even when closed) */}
      <button
        ref={fabRef}
        onClick={() => setOpen(true)}
        className="tt tt-left"
        data-tt="KItomat Assistent · Verlauf bleibt erhalten"
        style={{
          position:"fixed", right:24, bottom:24, zIndex:60,
          width:56, height:56, borderRadius:999,
          background:"var(--tomato)", color:"white",
          boxShadow:"0 14px 28px -10px rgba(230,51,41,.6), 0 4px 10px rgba(0,0,0,.08)",
          display: open ? "none" : "flex", alignItems:"center", justifyContent:"center",
          transition:"transform .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={e => e.currentTarget.style.transform = ""}>
        <Icon.chat size={22}/>
        <span style={{position:"absolute", top:-2, right:-2, width:14, height:14, borderRadius:999, background:"var(--leaf)", border:"2px solid white"}}></span>
      </button>

      {/* Chat panel */}
      <div ref={panelRef} style={{
        position:"fixed", right:24, bottom:24, zIndex:60,
        width:380, height:560,
        background:"var(--surface)", border:"1px solid var(--line)",
        borderRadius:18,
        boxShadow:"0 24px 60px -20px rgba(26,25,22,.25), 0 8px 16px -8px rgba(26,25,22,.08)",
        display: open ? "flex" : "none",
        flexDirection:"column", overflow:"hidden",
      }}>
        {/* Header */}
        <div style={{
          padding:"14px 16px",
          background:"linear-gradient(135deg, var(--tomato) 0%, var(--tomato-deep) 100%)",
          color:"white", display:"flex", alignItems:"center", gap:10
        }}>
          <div style={{
            width:34, height:34, borderRadius:8, background:"rgba(255,255,255,.18)",
            display:"flex", alignItems:"center", justifyContent:"center"
          }}>
            <img src={window.__resources?.logo || "assets/kitomat-mark.png"} alt="" style={{width:24, height:24, objectFit:"contain", filter:"brightness(0) invert(1)"}} />
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontWeight:700, fontSize:14.5, lineHeight:1.1}}>KItomat Assistent</div>
            <div className="mono" style={{fontSize:10.5, opacity:.85, marginTop:2, letterSpacing:".04em"}}>DEMO · VERLAUF BLEIBT ERHALTEN</div>
          </div>
          <button onClick={clearHistory} title="Verlauf zurücksetzen"
            style={{color:"white", opacity:.8, padding:6, borderRadius:6, fontSize:10, fontFamily:"'JetBrains Mono', monospace", letterSpacing:".04em"}}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.15)"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            RESET
          </button>
          <button onClick={() => setOpen(false)} title="Minimieren"
            style={{color:"white", opacity:.85, padding:6, borderRadius:6}}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.15)"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            <Icon.close/>
          </button>
        </div>

        {/* Messages */}
        <div ref={scroller} style={{flex:1, overflow:"auto", padding:"14px 14px 6px", background:"var(--bg)"}}>
          {msgs.map((m, i) => (
            <div key={i} style={{display:"flex", marginBottom:10, justifyContent: m.who === "user" ? "flex-end" : "flex-start"}}>
              <div style={{
                maxWidth:"82%",
                padding:"9px 13px", borderRadius: m.who === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.who === "user" ? "var(--ink)" : "var(--surface)",
                color: m.who === "user" ? "white" : "var(--ink-2)",
                border: m.who === "user" ? "none" : "1px solid var(--line)",
                fontSize:13.5, lineHeight:1.5,
              }}>
                {m.t}
              </div>
            </div>
          ))}
        </div>

        {/* Quick chips */}
        <div style={{padding:"6px 12px 8px", display:"flex", gap:6, flexWrap:"wrap", background:"var(--bg)", borderTop:"1px solid var(--line)"}}>
          {QUICK.map(q => (
            <button key={q} onClick={() => send(q)}
              style={{
                padding:"5px 10px", borderRadius:999,
                background:"var(--surface)", border:"1px solid var(--line)",
                fontSize:11.5, color:"var(--ink-2)", fontWeight:500
              }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); send(); }}
          style={{padding:12, borderTop:"1px solid var(--line)", display:"flex", gap:8, alignItems:"center", background:"var(--surface)"}}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Frage stellen…"
            className="input"
            style={{padding:"10px 12px", fontSize:13.5}}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{padding:"9px 12px"}}>
            <Icon.send size={14}/>
          </button>
        </form>
      </div>
    </>
  );
}

// ---------------- Video modal ----------------
function VideoModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:70,
      background:"rgba(26,25,22,.65)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24
    }}>
      <div onClick={e => e.stopPropagation()}
        style={{
          width:"min(840px, 100%)", background:"var(--surface)", border:"1px solid var(--line)",
          borderRadius:18, overflow:"hidden", position:"relative",
          boxShadow:"0 30px 80px -20px rgba(26,25,22,.5)",
        }}>
        <button onClick={onClose} title="Schließen"
          style={{position:"absolute", top:14, right:14, zIndex:2,
            padding:8, color:"white", background:"rgba(0,0,0,.4)", borderRadius:8}}>
          <Icon.close size={16}/>
        </button>
        <div className="video-card" style={{borderRadius:0, cursor:"default", aspectRatio:"16 / 9"}}>
          <div className="video-corner">
            <img src={window.__resources?.logo || "assets/kitomat-mark.png"} alt="" style={{width:16, height:16, objectFit:"contain", filter:"brightness(0) invert(1)"}}/>
            KItomat · Tutorial
          </div>
          <div className="video-corner video-corner-r">
            <Icon.spark size={10}/> Erklärvideo folgt
          </div>
          <div style={{
            position:"absolute", inset:0,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            color:"white", textAlign:"center", padding:24
          }}>
            <div style={{
              width:84, height:84, borderRadius:999,
              background:"rgba(255,255,255,.94)", color:"var(--tomato)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 8px 30px -4px rgba(0,0,0,.4)", marginBottom:18
            }}>
              <Icon.play/>
            </div>
            <div className="mono" style={{fontSize:11, opacity:.85, letterSpacing:".08em", marginBottom:8}}>02:00 · DEMO-VIDEO GEPLANT</div>
            <div style={{fontSize:26, fontWeight:700, letterSpacing:"-.015em", marginBottom:6}}>So funktioniert KItomat</div>
            <div style={{fontSize:14.5, opacity:.9, maxWidth:520}}>
              Das Erklärvideo wird hier später eingebunden. Es zeigt in 2 Minuten, wie Artefakte gefunden, vorbereitet und reviewt werden.
            </div>
          </div>
        </div>
        <div style={{padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, flexWrap:"wrap"}}>
          <div className="muted" style={{fontSize:12.5}}>Platzhalter – wird mit fertigem Video ersetzt.</div>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Toast ----------------
function Toast({ toast, onDismiss }) {
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onDismiss(), toast.duration || 4500);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;
  const tone = toast.tone || "success";
  const palette = {
    success: { ring:"var(--leaf)",   icon:<Icon.check size={14}/> },
    info:    { ring:"var(--slate)",  icon:<Icon.spark size={14}/> },
    error:   { ring:"var(--tomato)", icon:"!" },
  }[tone];
  return (
    <div style={{
      position:"fixed", left:"50%", bottom:96, zIndex:80,
      transform:"translateX(-50%)",
      background:"var(--ink)", color:"white",
      padding:"12px 16px 12px 14px", borderRadius:14,
      minWidth:280, maxWidth:480,
      display:"flex", alignItems:"center", gap:12,
      boxShadow:"0 20px 40px -16px rgba(26,25,22,.5)",
      animation:"toast-in .25s cubic-bezier(.2,.8,.2,1)",
    }}>
      <span style={{
        width:28, height:28, borderRadius:99,
        background: palette.ring, color:"white",
        display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0
      }}>{palette.icon}</span>
      <div style={{flex:1, minWidth:0}}>
        {toast.title && <div style={{fontWeight:700, fontSize:14, marginBottom: toast.body ? 2 : 0}}>{toast.title}</div>}
        {toast.body && <div style={{fontSize:13, opacity:.88}}>{toast.body}</div>}
      </div>
      <button onClick={onDismiss} style={{color:"white", opacity:.7, padding:4, borderRadius:6}}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = ".7"}>
        <Icon.close size={12}/>
      </button>
    </div>
  );
}
function AdminLoginModal({ open, onClose, onLogin }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:70,
      background:"rgba(26,25,22,.55)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24
    }}>
      <div onClick={e => e.stopPropagation()}
        style={{
          width:440, background:"var(--surface)", border:"1px solid var(--line)",
          borderRadius:18, padding:32, position:"relative",
          boxShadow:"0 30px 80px -20px rgba(26,25,22,.4)"
        }}>
        <button onClick={onClose} style={{position:"absolute", top:14, right:14, padding:6, color:"var(--ink-3)"}}>
          <Icon.close size={16}/>
        </button>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:18}}>
          <img src={window.__resources?.logo || "assets/kitomat-mark.png"} alt="" style={{width:36, height:36, objectFit:"contain"}}/>
          <div>
            <div style={{fontWeight:700, fontSize:18, letterSpacing:"-.015em"}}>Admin-Login</div>
            <div className="mono" style={{fontSize:11, color:"var(--ink-3)", letterSpacing:".04em"}}>DEMO · POST-MVP</div>
          </div>
        </div>
        <p className="muted" style={{margin:"0 0 18px", fontSize:13.5}}>
          Im MVP ist der Admin-Bereich als Mockup verfügbar. In Phase 3 erfolgt der Login per GitHub-OAuth.
        </p>
        <form onSubmit={e => { e.preventDefault(); onLogin(); }}>
          <label style={{display:"block", marginBottom:12}}>
            <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>E-Mail</div>
            <input className="input" defaultValue="admin@kitomat.community" readOnly/>
          </label>
          <label style={{display:"block", marginBottom:18}}>
            <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>Passwort</div>
            <input className="input" type="password" defaultValue="•••••••••••" readOnly/>
          </label>
          <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%", justifyContent:"center"}}>
            Demo-Login als Admin
          </button>
          <button type="button" className="btn btn-ghost btn-sm" style={{width:"100%", justifyContent:"center", marginTop:8}}>
            <Icon.github size={14}/> Mit GitHub anmelden · geplant
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------- Process step row (reusable) ----------------
function ProcessStrip({ steps }) {
  return (
    <div style={{display:"grid", gridTemplateColumns:`repeat(${steps.length}, 1fr)`, gap:0, position:"relative"}}>
      {steps.map((s, i) => (
        <div key={i} style={{
          padding:"18px 14px",
          background: i % 2 === 0 ? "var(--surface)" : "var(--bg-2)",
          borderRight: i < steps.length-1 ? "1px solid var(--line)" : "none",
          position:"relative",
        }}>
          <div className="mono" style={{fontSize:11, fontWeight:700, color: s.tone === "human" ? "var(--leaf)" : "var(--tomato)", marginBottom:8, letterSpacing:".06em"}}>
            {s.n} · {s.tone === "human" ? "MENSCH" : "AGENT"}
          </div>
          <div style={{fontWeight:700, fontSize:13.5, marginBottom:4, lineHeight:1.3}}>{s.t}</div>
          <div className="muted" style={{fontSize:12, lineHeight:1.45}}>{s.d}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Icon, RISK, RiskBadge, TYPE_META, TypeBadge, GoldBadge, PhaseBadge, Avatar,
  Header, Footer, MetricTile, EmptyState,
  ChatbotWidget, AdminLoginModal, ProcessStrip,
  VideoModal, Toast, RoleSwitcher, ThemeToggle, ROLE_LABELS, ROLE_COLORS, navForRole,
});
