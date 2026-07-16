// Admin Area (Mockup)
function ViewAdmin({ go }) {
  const { ADMIN_USERS, ROLE_MATRIX, AUDIT_LOG, INTEGRATIONS } = window.KitomatData;
  const [tab, setTab] = React.useState("users");

  const TABS = [
    { id:"users", label:"Nutzer & Rollen" },
    { id:"matrix", label:"Berechtigungs-Matrix" },
    { id:"integrations", label:"Integrationen" },
    { id:"audit", label:"Audit-Log" },
    { id:"settings", label:"Einstellungen" },
  ];

  return (
    <div className="page">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:18, flexWrap:"wrap", gap:18}}>
          <div>
            <div className="h-eyebrow" style={{display:"flex", alignItems:"center", gap:8}}>
              <Icon.lock size={11}/> Admin-Bereich
            </div>
            <h1 className="h2" style={{marginTop:6}}>System, Rollen & Integrationen</h1>
            <p className="muted" style={{margin:"10px 0 0", maxWidth:680, fontSize:14.5}}>
              Verwaltungs-Cockpit für Maintainer. Im MVP als interaktives Mockup mit Demo-Daten —
              Phase 3 bringt echte Anmeldung via GitHub-OAuth.
            </p>
          </div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <PhaseBadge kind="demo">Demo-Login aktiv</PhaseBadge>
            <PhaseBadge kind="postmvp">Echter Login Post-MVP</PhaseBadge>
          </div>
        </div>

        {/* Tab nav */}
        <div className="card" style={{padding:8, marginBottom:18, display:"flex", gap:4, overflowX:"auto"}}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`nav-link ${tab === t.id ? "active" : ""}`} style={{flexShrink:0}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "users"        && <UsersPanel users={ADMIN_USERS}/>}
        {tab === "matrix"       && <MatrixPanel matrix={ROLE_MATRIX}/>}
        {tab === "integrations" && <IntegrationsPanel items={INTEGRATIONS}/>}
        {tab === "audit"        && <AuditPanel rows={AUDIT_LOG}/>}
        {tab === "settings"     && <SettingsPanel/>}
      </div>
    </div>
  );
}

function UsersPanel({ users }) {
  const roleCount = users.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc; }, {});
  const ROLES = ["Nutzer","Contributor","Reviewer","Trust-Verantw.","Maintainer","Admin"];
  return (
    <div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:10, marginBottom:18}}>
        {ROLES.map(r => (
          <div key={r} className="card" style={{padding:"14px 16px"}}>
            <div className="muted" style={{fontSize:11.5, letterSpacing:".02em"}}>{r}</div>
            <div className="mono" style={{fontSize:22, fontWeight:600, marginTop:4}}>{roleCount[r] || 0}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{padding:0, overflow:"hidden"}}>
        <div style={{padding:"16px 22px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
          <div>
            <div className="h-eyebrow">Mitglieder</div>
            <strong style={{fontSize:14}}>Reviewer & Maintainer verwalten</strong>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button className="btn btn-secondary btn-sm">Reviewer-Gruppe öffnen</button>
            <button className="btn btn-primary btn-sm"><Icon.plus/> Mitglied einladen</button>
          </div>
        </div>
        <table style={{width:"100%", borderCollapse:"collapse", fontSize:13.5}}>
          <thead>
            <tr style={{textAlign:"left", background:"var(--bg-2)"}}>
              {["Name","Handle","Rolle","E-Mail","aktiv seit","Artefakte","Reviews",""].map(h => (
                <th key={h} className="h-eyebrow" style={{padding:"12px 16px", fontSize:11, borderBottom:"1px solid var(--line)"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{borderBottom: i < users.length-1 ? "1px solid var(--line)" : "none"}}>
                <td style={{padding:"12px 16px", fontWeight:600}}>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <Avatar name={u.name.split(" ").map(w => w[0]).slice(0,2).join("")} color="var(--slate)" size={26}/>
                    {u.name}
                  </div>
                </td>
                <td style={{padding:"12px 16px"}} className="mono muted">{u.handle}</td>
                <td style={{padding:"12px 16px"}}><RoleBadge role={u.role}/></td>
                <td style={{padding:"12px 16px"}} className="mono muted">{u.email}</td>
                <td style={{padding:"12px 16px"}} className="mono">{u.since}</td>
                <td style={{padding:"12px 16px"}} className="mono">{u.artifacts}</td>
                <td style={{padding:"12px 16px"}} className="mono">{u.reviews}</td>
                <td style={{padding:"12px 16px", textAlign:"right"}}>
                  <button className="btn btn-ghost btn-sm">Bearbeiten</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const map = {
    "Admin":          { bg:"var(--ink)",            color:"white" },
    "Maintainer":     { bg:"var(--post-ink)",               color:"white" },
    "Trust-Verantw.": { bg:"var(--amber-soft)",     color:"var(--amber-ink)" },
    "Reviewer":       { bg:"var(--tomato-soft)",    color:"var(--tomato-deep)" },
    "Contributor":    { bg:"var(--leaf-soft)",      color:"var(--leaf-ink)" },
    "Nutzer":         { bg:"var(--bg-2)",           color:"var(--ink-2)" },
  };
  const m = map[role] || map.Nutzer;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center",
      padding:"2px 9px", borderRadius:999, fontFamily:"'JetBrains Mono', monospace",
      fontSize:11, fontWeight:600, background:m.bg, color:m.color
    }}>{role}</span>
  );
}

function MatrixPanel({ matrix }) {
  const ROLES = ["Nutzer","Contributor","Reviewer","Trust","Maintainer","Admin"];
  return (
    <div className="card" style={{padding:0, overflow:"hidden"}}>
      <div style={{padding:"16px 22px", borderBottom:"1px solid var(--line)"}}>
        <div className="h-eyebrow">Berechtigungs-Matrix</div>
        <strong style={{fontSize:14}}>Welche Rolle darf was?</strong>
      </div>
      <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
        <thead>
          <tr style={{background:"var(--bg-2)"}}>
            <th style={{textAlign:"left", padding:"12px 16px", fontSize:11, borderBottom:"1px solid var(--line)"}} className="h-eyebrow">Capability</th>
            {ROLES.map(r => (
              <th key={r} style={{padding:"12px 8px", fontSize:11, borderBottom:"1px solid var(--line)", textAlign:"center"}} className="h-eyebrow">{r}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i} style={{borderBottom: i < matrix.length-1 ? "1px solid var(--line)" : "none"}}>
              <td style={{padding:"12px 16px", fontWeight:600}}>{row.capability}</td>
              {ROLES.map(r => (
                <td key={r} style={{padding:"12px 8px", textAlign:"center"}}>
                  {row.roles.includes(r) ? (
                    <span style={{display:"inline-flex", width:22, height:22, borderRadius:6, background:"var(--leaf-soft)", color:"var(--leaf)", alignItems:"center", justifyContent:"center"}}>
                      <Icon.check size={11}/>
                    </span>
                  ) : (
                    <span style={{display:"inline-flex", width:22, height:22, borderRadius:6, background:"var(--bg-2)", color:"var(--ink-3)", alignItems:"center", justifyContent:"center"}}>
                      <Icon.dash size={11}/>
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IntegrationsPanel({ items }) {
  const badgeMap = { green:"badge-green", amber:"badge-yellow", slate:"badge-neutral" };
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:14}}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{padding:20, display:"flex", alignItems:"flex-start", gap:14}}>
          <span style={{width:40, height:40, borderRadius:10, background:"var(--bg-2)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
            {it.name.includes("GitHub") ? <Icon.github size={20}/> : it.name.includes("Mail") ? <Icon.mail size={20}/> : it.name.includes("Discord") ? <span style={{fontFamily:"'JetBrains Mono', monospace", fontWeight:800, fontSize:13, color:"#5865F2"}}>DC</span> : it.name.includes("LinkedIn") ? <span style={{fontFamily:"'JetBrains Mono', monospace", fontWeight:800, fontSize:13, color:"#0A66C2"}}>in</span> : <Icon.spark size={18}/>}
          </span>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
              <strong style={{fontSize:14}}>{it.name}</strong>
              <span className={`badge ${badgeMap[it.badge] || "badge-neutral"}`} style={{fontSize:10.5}}>
                <span className="dot"></span>{it.status}
              </span>
            </div>
            <div className="muted" style={{fontSize:13}}>{it.note}</div>
          </div>
          <button className="btn btn-secondary btn-sm">Einstellungen</button>
        </div>
      ))}
    </div>
  );
}

function AuditPanel({ rows }) {
  return (
    <div className="card" style={{padding:0, overflow:"hidden"}}>
      <div style={{padding:"16px 22px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div className="h-eyebrow">Audit-Log</div>
          <strong style={{fontSize:14}}>Aktivitäten der letzten 24 Stunden</strong>
        </div>
        <span className="muted mono" style={{fontSize:12}}>{rows.length} Einträge · Demo-Daten</span>
      </div>
      <ul style={{margin:0, padding:0, listStyle:"none"}}>
        {rows.map((r, i) => (
          <li key={i} style={{padding:"14px 22px", borderBottom: i < rows.length-1 ? "1px solid var(--line)" : "none", display:"grid", gridTemplateColumns:"170px 110px 1fr 1fr", gap:14, alignItems:"center", fontSize:13.5}}>
            <span className="mono" style={{color:"var(--ink-3)"}}>{r.t}</span>
            <span className="mono">{r.who}</span>
            <span>{r.what}</span>
            <span className="mono muted" style={{fontSize:12.5}}>{r.target}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14}}>
      {[
        { title:"GitHub-Verknüpfung", desc:"Repository, Branch-Regeln und PR-Labels.", phase:"live" },
        { title:"Reviewer-Gruppen",   desc:"Wer wird bei welchem Artefakttyp benachrichtigt.", phase:"demo" },
        { title:"E-Mail-Templates",   desc:"Texte für Review Request, Erinnerung, Freigabe.", phase:"demo" },
        { title:"Trust-Schwellen",    desc:"Ab wann ein Trust Review zwingend erforderlich ist.", phase:"live" },
        { title:"Belohnungsregeln",   desc:"Welche Aktion welches Badge auslöst.", phase:"geplant" },
        { title:"System-Status",      desc:"Health-Checks, GitHub-API-Limits, Agenten-Auslastung.", phase:"geplant" },
      ].map((s, i) => (
        <div key={i} className="card" style={{padding:20}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, gap:10}}>
            <strong style={{fontSize:14.5}}>{s.title}</strong>
            <PhaseBadge kind={s.phase}>{s.phase}</PhaseBadge>
          </div>
          <p className="muted" style={{margin:"0 0 12px", fontSize:13}}>{s.desc}</p>
          <button className="btn btn-secondary btn-sm">Öffnen</button>
        </div>
      ))}
    </div>
  );
}

window.ViewAdmin = ViewAdmin;
