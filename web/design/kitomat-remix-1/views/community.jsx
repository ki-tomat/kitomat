// Community view (v3) — forum first, contact channels at bottom
function ViewCommunity({ go }) {
  const { COMMUNITY_THREADS, COMMUNITY_MEMBERS } = window.KitomatData;
  return (
    <div className="page">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24, flexWrap:"wrap", gap:18}}>
          <div>
            <div className="h-eyebrow">Community</div>
            <h1 className="h2" style={{marginTop:6}}>Frag die Community.<br/>Finde Mitwirkende für KI-Projekte.</h1>
            <p className="muted" style={{margin:"10px 0 0", maxWidth:680, fontSize:14.5, lineHeight:1.55}}>
              Hilfe zu Kundenprojekten, KI-Fragen und Artefakten — plus Diskussionen, Best Practices und Co-Autorenschaft.
              Im MVP zeigen wir hier ein Mockup; Forum, Profile und Kooperationssuche kommen mit dem Post-MVP-Ausbau.
            </p>
          </div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <PhaseBadge kind="demo">Forum als Demo</PhaseBadge>
            <PhaseBadge kind="postmvp">Community-Ausbau · Post-MVP</PhaseBadge>
          </div>
        </div>

        {/* ───── 1. Forum / Hilfebereich — prominent ───── */}
        <section className="card" style={{padding:0, overflow:"hidden", marginBottom:22, borderColor:"var(--line-2)"}}>
          <div style={{padding:"24px 26px", borderBottom:"1px solid var(--line)", background:"linear-gradient(135deg, var(--tomato-tint), var(--surface))", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:14}}>
            <div>
              <div className="h-eyebrow" style={{marginBottom:6}}>Forum · Hilfe · Community-Fragen</div>
              <h2 className="h2" style={{margin:0, fontSize:22}}>Frag die Community</h2>
              <p className="muted" style={{margin:"8px 0 0", fontSize:14, maxWidth:540}}>
                Hilfe zu Kundenprojekten, allgemeinen KI-Fragen, Artefakten und Best Practices.
              </p>
            </div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <button className="btn btn-secondary btn-sm">Themen durchsuchen</button>
              <button className="btn btn-primary btn-sm">
                <Icon.plus/> Neuen Thread starten
              </button>
            </div>
          </div>

          {/* Topic tags */}
          <div style={{padding:"14px 26px", borderBottom:"1px solid var(--line)", display:"flex", gap:8, flexWrap:"wrap"}}>
            <span className="h-eyebrow" style={{fontSize:11, alignSelf:"center", marginRight:6}}>Themen:</span>
            {["Alle","Quellenpaket","Prompt-Paket","Branchenmodell","Trust Review","Kundenprojekte","Best Practices","Co-Work"].map((t, i) => (
              <button key={t} className={`chip ${i === 0 ? "chip-active" : ""}`} style={{padding:"5px 11px", fontSize:12}}>{t}</button>
            ))}
          </div>

          {/* Threads */}
          <ul style={{margin:0, padding:0, listStyle:"none"}}>
            {COMMUNITY_THREADS.map((t, i) => (
              <li key={i} style={{padding:"16px 26px", borderBottom: i < COMMUNITY_THREADS.length-1 ? "1px solid var(--line)" : "none", display:"flex", alignItems:"center", gap:16, cursor:"pointer", transition:"background .12s"}}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
                onMouseLeave={e => e.currentTarget.style.background = ""}>
                <Avatar name={t.author.replace("@","").split(".").map(w => w[0]).slice(0,2).join("").toUpperCase()} color="var(--slate)" size={32}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:14.5, fontWeight:600, marginBottom:4, lineHeight:1.3}}>{t.title}</div>
                  <div className="mono" style={{fontSize:11.5, color:"var(--ink-3)", display:"flex", alignItems:"center", gap:8}}>
                    <span>{t.author}</span>
                    <span>·</span>
                    <span>{t.last}</span>
                    <span>·</span>
                    <span className="badge badge-neutral" style={{fontSize:10}}>{t.tag}</span>
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:18}}>
                  <div className="mono" style={{textAlign:"right"}}>
                    <div style={{fontWeight:700, fontSize:14}}>{t.replies}</div>
                    <div style={{fontSize:10, color:"var(--ink-3)", letterSpacing:".04em"}}>ANTW.</div>
                  </div>
                  <Icon.arrow size={14}/>
                </div>
              </li>
            ))}
          </ul>

          <div style={{padding:"14px 26px", background:"var(--bg-2)", borderTop:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
            <span className="muted" style={{fontSize:13}}>{COMMUNITY_THREADS.length} aktive Threads · weitere im Archiv</span>
            <button className="btn btn-ghost btn-sm">Alle Threads ansehen <Icon.arrow size={12}/></button>
          </div>
        </section>

        {/* ───── 2. Teilnehmerprofile / Kooperation ───── */}
        <section className="card" style={{padding:0, overflow:"hidden", marginBottom:22}}>
          <div style={{padding:"18px 22px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
            <div>
              <div className="h-eyebrow">Teilnehmer:innen & Kooperation</div>
              <strong style={{fontSize:14}}>Finde Mitwirkende für KI-Projekte</strong>
            </div>
            <PhaseBadge kind="postmvp">Profile · Post-MVP</PhaseBadge>
          </div>
          <div style={{padding:22, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14}}>
            {COMMUNITY_MEMBERS.map((m, i) => (
              <div key={i} className="card" style={{padding:18, display:"flex", flexDirection:"column", gap:10}}>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <Avatar name={m.avatar} color={m.color} size={36}/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:14, fontWeight:700}}>{m.name}</div>
                    <div className="mono" style={{fontSize:11, color:"var(--ink-3)", marginTop:2}}>offen für · {m.open}</div>
                  </div>
                </div>
                <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
                  {m.skills.map(s => (
                    <span key={s} className="badge badge-neutral" style={{fontSize:10.5}}>{s}</span>
                  ))}
                </div>
                <button className="btn btn-secondary btn-sm" style={{marginTop:"auto"}}>Profil ansehen</button>
              </div>
            ))}
          </div>
        </section>

        {/* ───── 3. Weitere Kontaktmöglichkeiten ───── */}
        <section style={{marginBottom:22}}>
          <div style={{marginBottom:14}}>
            <div className="h-eyebrow">Sekundär</div>
            <h3 className="h3" style={{marginTop:4}}>Weitere Kontaktmöglichkeiten</h3>
            <p className="muted" style={{margin:"6px 0 0", fontSize:13.5, maxWidth:540}}>
              Erreiche das Team und die Community auch außerhalb des Forums.
            </p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12}}>
            <ContactRow color="#1A1916" icon={<Icon.github size={16}/>} name="GitHub" desc="Detaillierte Fragen, PR-Diskussionen, Issues." status="live"
              href="https://github.com/ki-tomat/kitomat"/>
            <ContactRow color="#0A66C2" icon={<span style={{fontFamily:"'JetBrains Mono', monospace", fontWeight:800, fontSize:13}}>in</span>} name="LinkedIn" desc="Beiträge teilen, Mitstreiter:innen finden." status="geplant"/>
            <ContactRow color="#5865F2" icon={<span style={{fontFamily:"'JetBrains Mono', monospace", fontWeight:800, fontSize:13}}>DC</span>} name="Discord" desc="Live-Austausch zu Artefakten und Reviews." status="geplant"/>
          </div>
        </section>

        {/* Rewards teaser */}
        <div className="card" style={{padding:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14, background:"linear-gradient(135deg, var(--amber-soft), var(--surface))", border:"1px solid #EAD49C"}}>
          <div style={{display:"flex", alignItems:"center", gap:14}}>
            <span style={{width:42, height:42, borderRadius:12, background:"var(--amber)", color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
              <Icon.trophy size={18}/>
            </span>
            <div>
              <strong style={{fontSize:15, color:"var(--amber-ink)"}}>Anerkennungs-Badges</strong>
              <div style={{fontSize:13, color:"var(--amber-ink)", opacity:.85}}>Für eingereichte Artefakte, unterstützte Reviews und Trust-Beiträge.</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => go("about")}>Mehr auf „Über KItomat"</button>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ color, icon, name, desc, status, href }) {
  const inner = (
    <>
      <span style={{width:38, height:38, borderRadius:10, background:color, color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
        {icon}
      </span>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:3}}>
          <strong style={{fontSize:14}}>{name}</strong>
          {status === "live"
            ? <PhaseBadge kind="live">live</PhaseBadge>
            : <PhaseBadge kind="geplant">geplant</PhaseBadge>}
        </div>
        <div className="muted" style={{fontSize:12.5, lineHeight:1.4}}>{desc}</div>
      </div>
      <Icon.external/>
    </>
  );
  const baseStyle = {
    padding:"14px 18px", display:"flex", alignItems:"center", gap:14,
    border:"1px solid var(--line)", borderRadius:12,
    background:"var(--surface)", textDecoration:"none", color:"inherit",
    transition:"border-color .12s, transform .12s",
  };
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" style={baseStyle}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ink-3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = ""; }}>
      {inner}
    </a>
  ) : (
    <div style={baseStyle}>{inner}</div>
  );
}

window.ViewCommunity = ViewCommunity;
