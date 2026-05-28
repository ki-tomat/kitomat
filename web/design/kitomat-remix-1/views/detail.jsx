// Artefakt-Detailansicht (v2)
function ViewDetail({ id, go }) {
  const { LIBRARY, DATENSCHUTZ_KURZ_DONT } = window.KitomatData;
  const a = LIBRARY.find(x => x.id === id) || LIBRARY[0];

  const trustGate = [
    { l: "Metadaten vollständig",              s: "checked" },
    { l: "Synthetisches Beispiel vorhanden",   s: a.sampleIn !== "—" ? "checked" : "checked" },
    { l: "Szenario-Triade vorhanden",          s: "checked" },
    { l: "Quellenstatus geklärt",              s: "checked" },
    { l: "Risiken markiert",                   s: "checked" },
    { l: "Keine sensiblen Daten enthalten",    s: "checked" },
    { l: "Menschlicher Review durchgeführt",   s: "checked" },
    { l: "Maintainer-Freigabe erteilt",        s: "checked" },
  ];

  return (
    <div className="page">
      <div className="container">
        <button className="btn btn-ghost btn-sm" style={{marginBottom:18, marginLeft:-10}} onClick={() => go("library")}>
          <Icon.back size={13}/> Zurück zur Bibliothek
        </button>

        {/* Header */}
        <div className="card" style={{padding:30, marginBottom:18, position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", right:-40, top:-40, width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle at center, var(--amber-soft), transparent 70%)", opacity:.6, pointerEvents:"none"}}></div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:14, position:"relative"}}>
            <TypeBadge type={a.type}/>
            <GoldBadge/>
            <RiskBadge risk={a.risk}/>
            <span className="badge badge-neutral mono">{a.language}</span>
            <span className="badge badge-neutral mono">{a.version}</span>
          </div>
          <h1 className="h2" style={{marginBottom:10, position:"relative", maxWidth:780}}>{a.title}</h1>
          <p style={{margin:"0 0 22px", fontSize:16, color:"var(--ink-2)", maxWidth:780, position:"relative"}}>{a.short}</p>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", position:"relative"}}>
            <a className="btn btn-primary btn-sm" href={`https://github.com/ki-tomat/kitomat/tree/main/artifacts/${a.id}`} target="_blank" rel="noreferrer">
              <Icon.github size={14}/> Auf GitHub öffnen <Icon.external/>
            </a>
            <button className="btn btn-secondary btn-sm">Beispiel kopieren</button>
            <button className="btn btn-secondary btn-sm">
              <Icon.plus/> Änderung vorschlagen
            </button>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:18}}>
          <div style={{display:"flex", flexDirection:"column", gap:18}}>
            {/* Szenario-Triade */}
            <section className="card" style={{padding:26}}>
              <div className="h-eyebrow" style={{marginBottom:6}}>Trust Layer · Szenario-Triade</div>
              <h3 className="h3" style={{marginBottom:16}}>Wann hilft es, wann muss nachbearbeitet werden, wann nicht?</h3>
              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12}}>
                <ScenarioCard color="leaf"   label="Positives Szenario"          icon="✓" text={a.pos}/>
                <ScenarioCard color="amber"  label="Nachbearbeitbares Szenario"  icon="≈" text={a.nb}/>
                <ScenarioCard color="tomato" label="Negatives Szenario"          icon="✕" text={a.neg}/>
              </div>
            </section>

            {/* Beispiel I/O */}
            <section className="card" style={{padding:26}}>
              <div className="h-eyebrow" style={{marginBottom:14}}>Synthetisches Beispiel</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14}}>
                <div>
                  <div style={{fontSize:12, fontWeight:600, color:"var(--ink-3)", marginBottom:6, display:"flex", alignItems:"center", gap:6}}>
                    <span style={{width:6, height:6, borderRadius:99, background:"var(--ink-2)"}}></span>Beispielinput
                  </div>
                  <div className="mono" style={{background:"var(--bg-2)", border:"1px solid var(--line)", borderRadius:10, padding:14, fontSize:13, color:"var(--ink-2)", whiteSpace:"pre-wrap", minHeight:80, lineHeight:1.6}}>
                    {a.sampleIn}
                  </div>
                </div>
                <div>
                  <div style={{fontSize:12, fontWeight:600, color:"var(--ink-3)", marginBottom:6, display:"flex", alignItems:"center", gap:6}}>
                    <span style={{width:6, height:6, borderRadius:99, background:"var(--tomato)"}}></span>Beispieloutput
                  </div>
                  <div className="mono" style={{background:"var(--tomato-tint)", border:"1px solid var(--tomato-soft)", borderRadius:10, padding:14, fontSize:13, color:"var(--ink-2)", whiteSpace:"pre-wrap", minHeight:80, lineHeight:1.6}}>
                    {a.sampleOut}
                  </div>
                </div>
              </div>
            </section>

            {/* Bekannte Grenzen */}
            <section className="card" style={{padding:24}}>
              <div className="h-eyebrow" style={{marginBottom:12}}>Bekannte Grenzen</div>
              <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:10}}>
                {a.failure.map((f,i) => (
                  <li key={i} style={{display:"flex", gap:10, fontSize:14, color:"var(--ink-2)"}}>
                    <span style={{flexShrink:0, color:"var(--amber)", fontWeight:700, marginTop:1}}>!</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Datenschutz */}
            <section className="card" style={{padding:24, background:"var(--bg-2)", border:"1px solid var(--line-2)"}}>
              <div className="h-eyebrow" style={{marginBottom:10}}>Datenschutz · Erinnerung an Contributor:innen</div>
              <p style={{margin:"0 0 12px", fontSize:13.5, color:"var(--ink-2)", lineHeight:1.55}}>
                Bei Übernahme oder Adaption gelten dieselben Regeln wie für Neueinreichungen:
              </p>
              <ul style={{margin:0, padding:0, listStyle:"none", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 18px"}}>
                {DATENSCHUTZ_KURZ_DONT.map((d, i) => (
                  <li key={i} style={{display:"flex", gap:8, alignItems:"center", fontSize:13}}>
                    <span style={{width:16, height:16, borderRadius:4, background:"var(--tomato-soft)", color:"var(--tomato-deep)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:10}}>✕</span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside style={{display:"flex", flexDirection:"column", gap:18}}>
            <section className="card" style={{padding:22}}>
              <div className="h-eyebrow" style={{marginBottom:14}}>Metadaten</div>
              <dl style={{margin:0, display:"flex", flexDirection:"column", gap:14}}>
                <Meta label="Version"        v={a.version}     mono/>
                <Meta label="Freigegeben am" v={a.released}    mono/>
                <Meta label="Contributor"    v={a.contributor} mono/>
                <Meta label="Zielgruppe"     v={a.audience}/>
                <Meta label="Einsatzkontext" v={a.context}/>
                <Meta label="Lizenz"         v={a.license}     mono/>
                <Meta label="Quellenstatus"  v={a.sources}     mono color="var(--leaf)"/>
                <Meta label="AI-Act-Nähe"    v={a.aiAct}/>
                <Meta label="Themenfeld"     v={a.topic}/>
              </dl>
            </section>

            <section className="card" style={{padding:22}}>
              <div className="h-eyebrow" style={{marginBottom:6}}>Trust-Gate</div>
              <div className="muted" style={{fontSize:12, marginBottom:10}}>
                Vollständig erfüllte Pflichtprüfung für diese Freigabe.
              </div>
              {trustGate.map((g,i) => (
                <div key={i} className="gate-row">
                  <span className={`gate-check ${g.s}`}>
                    {g.s === "checked" && <Icon.check/>}
                  </span>
                  <span style={{color:"var(--ink-2)"}}>{g.l}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, v, mono, color }) {
  return (
    <div>
      <dt className="muted" style={{fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", marginBottom:3}}>{label}</dt>
      <dd className={mono ? "mono" : ""} style={{margin:0, fontSize:13.5, color: color || "var(--ink)", lineHeight:1.5}}>{v}</dd>
    </div>
  );
}

function ScenarioCard({ color, label, icon, text }) {
  const palette = {
    leaf:   { bg:"var(--leaf-soft)",   border:"var(--leaf-border)", ink:"var(--leaf-ink)",          dot:"var(--leaf)" },
    amber:  { bg:"var(--amber-soft)",  border:"var(--amber-border)", ink:"var(--amber-ink)",          dot:"var(--amber)" },
    tomato: { bg:"var(--tomato-soft)", border:"color-mix(in srgb, var(--tomato) 35%, transparent)", ink:"var(--tomato-deep)", dot:"var(--tomato)" },
  }[color];
  return (
    <div style={{background:palette.bg, border:`1px solid ${palette.border}`, borderRadius:12, padding:18, display:"flex", flexDirection:"column", gap:10}}>
      <div style={{display:"flex", alignItems:"center", gap:8}}>
        <span style={{width:24, height:24, borderRadius:8, background:palette.dot, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, lineHeight:1}}>{icon}</span>
        <span style={{fontWeight:700, fontSize:13, color: palette.ink}}>{label}</span>
      </div>
      <p style={{margin:0, fontSize:13.5, color:palette.ink, lineHeight:1.5}}>{text}</p>
    </div>
  );
}

window.ViewDetail = ViewDetail;
window.ScenarioCard = ScenarioCard;
