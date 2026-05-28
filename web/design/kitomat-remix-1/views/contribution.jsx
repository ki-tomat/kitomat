// Contribution Center (v2) — 7-step process with upload + KI-Agent
function ViewContribution({ go }) {
  const [active, setActive] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState("prompt");
  const [files, setFiles] = React.useState([]);
  const [agentRun, setAgentRun] = React.useState(false);
  const [requestSent, setRequestSent] = React.useState(false);

  const STEPS = [
    { t:"Artefakttyp wählen",                  d:"Was möchtest du beitragen?" },
    { t:"Dateien hochladen",                   d:"Markdown, YAML, JSON, TXT, PDF, DOCX." },
    { t:"KI-Agent analysiert Dateien",         d:"Metadaten, Quellen, Datenschutz, Szenarien." },
    { t:"Metadaten und Quellen prüfen",        d:"Vorschläge kontrollieren und ergänzen." },
    { t:"Szenario-Triade und Beispiele prüfen",d:"Positiv · nachbearbeitbar · negativ." },
    { t:"Risiko-, Datenschutz-, Trust-Check",  d:"Vorabwertung des Trust Layer." },
    { t:"Review Request vorbereiten",          d:"An GitHub übergeben, Reviewer benachrichtigen." },
  ];

  const TYPES = [
    { id:"prompt",   icon:"▷", color:"var(--tomato)", t:"Prompt-Paket",         d:"Strukturierter Prompt mit Beispiel-I/O, Zielgruppe und Grenzen." },
    { id:"dataset",  icon:"▢", color:"var(--slate)",  t:"Quellenpaket",         d:"Kuratierte Sammlung öffentlich nutzbarer Quellen mit Lizenz." },
    { id:"industry", icon:"◇", color:"var(--leaf)",   t:"KMU-/Branchenmodell",  d:"Use-Case-Raster für eine Branche oder Unternehmensgröße." },
  ];

  // simulate auto-advance for upload + agent
  React.useEffect(() => {
    if (active === 2 && agentRun === false) {
      const t = setTimeout(() => setAgentRun(true), 1800);
      return () => clearTimeout(t);
    }
  }, [active, agentRun]);

  return (
    <div className="page">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:18, flexWrap:"wrap", gap:16}}>
          <div>
            <div className="h-eyebrow">Contribution Center</div>
            <h1 className="h2" style={{marginTop:6}}>Beitrag in sieben Schritten vorbereiten</h1>
            <p className="muted" style={{margin:"8px 0 0", maxWidth:680, fontSize:14.5}}>
              KItomat führt dich durch die Vorbereitung. KI-Agenten machen Vorschläge – die finale Freigabe übernimmt der Mensch.
              Der Beitrag wird am Ende als Review Request an das Repository übergeben.
            </p>
          </div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <PhaseBadge kind="demo">Upload Demo</PhaseBadge>
            <PhaseBadge kind="postmvp">Direkt-Upload Post-MVP</PhaseBadge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="card" style={{padding:"18px 22px", marginBottom:18, display:"flex", alignItems:"center", gap:18, flexWrap:"wrap"}}>
          <div style={{flex:"1 1 280px"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:12.5}} className="mono">
              <span>Fortschritt</span>
              <span>{active + 1} / {STEPS.length}</span>
            </div>
            <div style={{height:6, background:"var(--bg-2)", borderRadius:999, overflow:"hidden"}}>
              <div style={{height:"100%", width:`${((active+1)/STEPS.length)*100}%`, background:"linear-gradient(90deg, var(--tomato), var(--tomato-deep))", transition:"width .3s ease"}}></div>
            </div>
          </div>
          <div className="mono" style={{fontSize:12, color:"var(--ink-3)"}}>
            Status: <strong style={{color: requestSent ? "var(--leaf)" : active >= 4 ? "var(--amber)" : "var(--tomato)"}}>
              {requestSent ? "Review Request übergeben" : active >= 4 ? "in Prüfung" : "in Vorbereitung"}
            </strong>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:18}}>
          {/* Sticky stepper */}
          <aside className="card" style={{padding:14, alignSelf:"flex-start", position:"sticky", top:80}}>
            <div className="h-eyebrow" style={{padding:"4px 8px 10px"}}>Schritte</div>
            <div style={{display:"flex", flexDirection:"column", gap:4}}>
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} className={`stepper-step ${active === i ? "active" : ""} ${i < active ? "done" : ""}`}>
                  <span className="step-num">{i < active ? <Icon.check size={13}/> : i+1}</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:13.5, fontWeight:600}}>{s.t}</div>
                    <div className="muted" style={{fontSize:12, marginTop:2}}>{s.d}</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Step content */}
          <div className="card" style={{padding:30, minHeight:540}}>
            <div className="mono" style={{fontSize:12, color:"var(--tomato)", fontWeight:600, letterSpacing:".06em", marginBottom:6}}>
              SCHRITT {active+1} / {STEPS.length}
            </div>
            <h3 className="h2" style={{marginBottom:8, fontSize:24}}>{STEPS[active].t}</h3>
            <p className="muted" style={{margin:"0 0 28px", fontSize:15}}>{STEPS[active].d}</p>

            <StepBody
              step={active} selectedType={selectedType} setSelectedType={setSelectedType}
              types={TYPES}
              files={files} setFiles={setFiles}
              agentRun={agentRun} setAgentRun={setAgentRun}
              requestSent={requestSent} setRequestSent={setRequestSent}
            />

            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:32, paddingTop:20, borderTop:"1px solid var(--line)"}}>
              <button className="btn btn-ghost btn-sm" disabled={active===0}
                onClick={() => setActive(Math.max(0, active-1))}
                style={{opacity: active===0 ? .4 : 1}}>
                <Icon.back/> Zurück
              </button>
              {active < STEPS.length-1 ? (
                <button className="btn btn-primary" onClick={() => setActive(active+1)}>
                  Weiter <Icon.arrow/>
                </button>
              ) : (
                <div style={{display:"flex", gap:8}}>
                  <a className="btn btn-secondary btn-sm" href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
                    <Icon.github size={14}/> Repository öffnen <Icon.external/>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Datenschutz block — always visible */}
        <PrivacyBlock/>

      </div>
    </div>
  );
}

function PrivacyBlock() {
  const { DATENSCHUTZ_HINWEIS, DATENSCHUTZ_KURZ_DO, DATENSCHUTZ_KURZ_DONT } = window.KitomatData;
  return (
    <section className="card" style={{padding:24, marginTop:22, background:"var(--bg-2)", border:"1px solid var(--line-2)"}}>
      <div style={{display:"grid", gridTemplateColumns:"1.1fr 1fr 1fr", gap:24}}>
        <div>
          <div className="h-eyebrow" style={{marginBottom:6}}>Wichtig · Datenschutz & Quellen</div>
          <h3 className="h3" style={{marginBottom:8}}>Was darf rein, was nicht?</h3>
          <p className="muted" style={{margin:0, fontSize:13.5, lineHeight:1.55}}>{DATENSCHUTZ_HINWEIS}</p>
        </div>
        <div>
          <div className="h-eyebrow" style={{marginBottom:10, color:"var(--leaf)"}}>Erlaubt</div>
          <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
            {DATENSCHUTZ_KURZ_DO.map((d, i) => (
              <li key={i} style={{display:"flex", gap:10, alignItems:"center", fontSize:13.5}}>
                <span style={{width:18, height:18, borderRadius:5, background:"var(--leaf-soft)", color:"var(--leaf-ink)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:11}}>✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="h-eyebrow" style={{marginBottom:10, color:"var(--tomato-deep)"}}>Nicht erlaubt</div>
          <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
            {DATENSCHUTZ_KURZ_DONT.map((d, i) => (
              <li key={i} style={{display:"flex", gap:10, alignItems:"center", fontSize:13.5}}>
                <span style={{width:18, height:18, borderRadius:5, background:"var(--tomato-soft)", color:"var(--tomato-deep)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:11}}>✕</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StepBody({ step, selectedType, setSelectedType, types, files, setFiles, agentRun, setAgentRun, requestSent, setRequestSent }) {
  if (step === 0) {
    return (
      <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14}}>
        {types.map(t => (
          <button key={t.id} onClick={() => setSelectedType(t.id)}
            style={{
              padding:22, borderRadius:14, textAlign:"left",
              background: selectedType===t.id ? "var(--tomato-tint)" : "var(--surface)",
              border: `2px solid ${selectedType===t.id ? "var(--tomato)" : "var(--line)"}`,
              transition:"all .15s",
            }}>
            <div style={{width:42, height:42, borderRadius:10, background:t.color, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, marginBottom:14}}>{t.icon}</div>
            <div style={{fontWeight:700, fontSize:15, marginBottom:6}}>{t.t}</div>
            <div className="muted" style={{fontSize:13}}>{t.d}</div>
          </button>
        ))}
      </div>
    );
  }
  if (step === 1) return <UploadStep files={files} setFiles={setFiles}/>;
  if (step === 2) return <AgentStep files={files} agentRun={agentRun} setAgentRun={setAgentRun}/>;
  if (step === 3) return <MetaStep/>;
  if (step === 4) return <ScenariosStep/>;
  if (step === 5) return <TrustCheckStep/>;
  // step 6
  return <RequestStep requestSent={requestSent} setRequestSent={setRequestSent}/>;
}

// ---------- Step 2: Upload ----------
function UploadStep({ files, setFiles }) {
  const [dragging, setDragging] = React.useState(false);

  const MOCK_FILES = [
    { n:"prompt-onboarding.md",   s:"6.2 KB",  type:"Markdown" },
    { n:"metadata.yaml",          s:"1.1 KB",  type:"YAML"     },
    { n:"sources-index.json",     s:"3.8 KB",  type:"JSON"     },
    { n:"context-notes.pdf",      s:"412 KB",  type:"PDF"      },
  ];

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    setFiles(MOCK_FILES);
  };
  const pickFiles = () => setFiles(MOCK_FILES);
  const removeFile = (i) => setFiles(files.filter((_, k) => k !== i));

  return (
    <div>
      <div className={`drop ${dragging ? "active" : ""}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}>
        <div style={{display:"inline-flex", alignItems:"center", justifyContent:"center", width:56, height:56, borderRadius:14, background:"var(--tomato-soft)", color:"var(--tomato-deep)", marginBottom:12}}>
          <Icon.upload size={26}/>
        </div>
        <div style={{fontWeight:700, fontSize:16, marginBottom:6}}>Dateien hierher ziehen oder auswählen</div>
        <p className="muted" style={{margin:"0 auto 14px", maxWidth:420, fontSize:13.5}}>
          Unterstützte Formate: Markdown · YAML · JSON · TXT · PDF · DOCX. Dateien werden im MVP lokal bzw. als Demo analysiert.
        </p>
        <button className="btn btn-primary btn-sm" onClick={pickFiles}>
          Dateien auswählen
        </button>
        <div className="mono" style={{marginTop:14, fontSize:11, color:"var(--ink-3)"}}>
          Echter Upload nach GitHub: Post-MVP · derzeit Demo-Analyse
        </div>
      </div>

      {files.length > 0 && (
        <div style={{marginTop:18}}>
          <div className="h-eyebrow" style={{marginBottom:10}}>Hochgeladene Dateien</div>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {files.map((f, i) => (
              <div key={i} className="card" style={{padding:"12px 16px", display:"flex", alignItems:"center", gap:14}}>
                <span style={{width:34, height:34, borderRadius:8, background:"var(--bg-2)", color:"var(--ink-2)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                  <Icon.file size={16}/>
                </span>
                <div style={{flex:1}}>
                  <div className="mono" style={{fontSize:13.5, fontWeight:600}}>{f.n}</div>
                  <div className="muted" style={{fontSize:12, marginTop:2}}>{f.type} · {f.s}</div>
                </div>
                <span className="badge badge-green"><span className="dot"></span>upload ok</span>
                <button className="btn btn-ghost btn-sm" onClick={() => removeFile(i)} style={{color:"var(--ink-3)"}}>
                  <Icon.close/>
                </button>
              </div>
            ))}
          </div>
          <div style={{marginTop:14, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8}}>
            <span className="muted" style={{fontSize:13}}>{files.length} Dateien bereit für die Agenten-Analyse.</span>
            <button className="btn btn-primary btn-sm">
              <Icon.spark/> KI-Agent analysieren lassen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Step 3: KI-Agent ----------
function AgentStep({ files, agentRun, setAgentRun }) {
  const checks = [
    { l:"Metadaten extrahiert",          status: agentRun ? "ok" : "running",  detail: agentRun ? "5 von 6 Pflichtfeldern gefunden" : "lese metadata.yaml…" },
    { l:"Quellenangaben geprüft",        status: agentRun ? "warn" : "running", detail: agentRun ? "2 Quellen ohne explizite Lizenz" : "scanne sources-index.json…" },
    { l:"Datenschutz-Heuristik",         status: agentRun ? "ok" : "queued",   detail: agentRun ? "keine personenbezogenen Muster erkannt" : "wartet…" },
    { l:"Szenario-Triade vorgeschlagen", status: agentRun ? "ok" : "queued",   detail: agentRun ? "3 Vorschläge bereit" : "wartet…" },
    { l:"Risiko-Einstufung",             status: agentRun ? "warn" : "queued", detail: agentRun ? "Vorschlag: risk_yellow" : "wartet…" },
    { l:"Trust-Vorprüfbericht",          status: agentRun ? "ok" : "queued",   detail: agentRun ? "Report erzeugt" : "wartet…" },
  ];

  const counts = agentRun ? { ok: 4, warn: 2, err: 0 } : { ok: 0, warn: 0, err: 0 };

  return (
    <div>
      {!agentRun ? (
        <div style={{padding:"24px 28px", background:"linear-gradient(135deg, #1A1916, #2A1F1E)", borderRadius:14, color:"white", display:"flex", alignItems:"center", gap:18, marginBottom:18}}>
          <div className="pulse" style={{width:44, height:44, borderRadius:99, background:"rgba(255,255,255,.1)", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
            <Icon.spark size={22}/>
          </div>
          <div style={{flex:1}}>
            <div className="mono" style={{fontSize:11, opacity:.8, marginBottom:4, letterSpacing:".06em"}}>KI-AGENT · ANALYSIERT</div>
            <div style={{fontWeight:700, fontSize:15}}>Dateien werden geprüft …</div>
            <div style={{fontSize:13, opacity:.85, marginTop:4}}>{files.length || 4} Dateien · Metadaten · Quellen · Datenschutz · Szenarien</div>
          </div>
        </div>
      ) : (
        <div style={{padding:"18px 22px", background:"var(--leaf-soft)", border:"1px solid #C5E2CF", borderRadius:14, color:"var(--leaf-ink)", display:"flex", alignItems:"center", gap:14, marginBottom:18}}>
          <span style={{width:34, height:34, borderRadius:8, background:"var(--leaf)", color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
            <Icon.check size={16}/>
          </span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700, fontSize:14.5}}>Analyse abgeschlossen</div>
            <div style={{fontSize:13, marginTop:2}}>Mensch prüft Vorschläge in den nächsten Schritten. KI ersetzt keinen Review.</div>
          </div>
          <span className="mono" style={{fontSize:12}}>{counts.ok} ok · {counts.warn} hinweis · {counts.err} fehler</span>
        </div>
      )}

      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {checks.map((c, i) => <AgentCheckRow key={i} {...c}/>)}
      </div>

      {agentRun && (
        <div style={{marginTop:18, padding:18, border:"1px dashed var(--line-2)", borderRadius:12, background:"var(--bg-2)"}}>
          <div className="h-eyebrow" style={{marginBottom:6}}>Hinweis · Menschliche Verantwortung</div>
          <p style={{margin:0, fontSize:13.5, color:"var(--ink-2)", lineHeight:1.55}}>
            Der KI-Agent macht Vorschläge zu Metadaten, Quellen, Szenarien und Risiko. Du prüfst, korrigierst und bestätigst sie in den folgenden Schritten. Die Verantwortung für die Einreichung bleibt bei dir.
          </p>
        </div>
      )}
    </div>
  );
}

function AgentCheckRow({ l, status, detail }) {
  const map = {
    ok:      { color:"var(--leaf)",   bg:"var(--leaf-soft)",   icon:<Icon.check size={12}/>, label:"ok"    },
    warn:    { color:"var(--amber)",  bg:"var(--amber-soft)",  icon:"!",                     label:"hinweis" },
    err:     { color:"var(--tomato)", bg:"var(--tomato-soft)", icon:"✕",                     label:"fehler"},
    running: { color:"var(--slate)",  bg:"var(--slate-soft)",  icon:"…",                     label:"läuft" },
    queued:  { color:"var(--ink-3)",  bg:"var(--bg-2)",        icon:"○",                     label:"wartet"},
  }[status] || {};
  return (
    <div className="card" style={{padding:"13px 16px", display:"flex", alignItems:"center", gap:14}}>
      <span style={{width:26, height:26, borderRadius:7, background:map.bg, color:map.color, display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12}}>
        {map.icon}
      </span>
      <div style={{flex:1}}>
        <div style={{fontWeight:600, fontSize:13.5}}>{l}</div>
        <div className="muted mono" style={{fontSize:11.5, marginTop:2}}>{detail}</div>
      </div>
      <span className="mono" style={{fontSize:11, color:map.color, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em"}}>{map.label}</span>
    </div>
  );
}

// ---------- Step 4: Meta ----------
function MetaStep() {
  return (
    <div>
      <SuggestionBanner text="KI-Agent hat 5 von 6 Pflichtfeldern vorausgefüllt. Bitte gegenprüfen und ergänzen."/>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14}}>
        {[
          ["Titel", "KI-Onboarding-Prompt für Tischlereibetriebe", false, true],
          ["Contributor (GitHub-Handle)", "@lena.h", true, true],
          ["Zielgruppe", "KMU-Geschäftsführung, Mitarbeitende ohne KI-Vorerfahrung", false, true],
          ["Einsatzkontext", "Kickoff-Workshop, interne Wissenstransfer-Session", false, true],
          ["Sprache", "DE", true, true],
          ["Lizenz", "—", true, false],
        ].map(([l, v, mono, suggested]) => (
          <label key={l}>
            <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
              <span className="h-eyebrow" style={{fontSize:11}}>{l}</span>
              {suggested && <span className="mono" style={{fontSize:10, color:"var(--tomato)", fontWeight:600, letterSpacing:".06em"}}>AGENT-VORSCHLAG</span>}
            </div>
            <input className={`input ${mono ? "mono" : ""}`} defaultValue={v} placeholder={l}/>
          </label>
        ))}
      </div>
      <div style={{marginTop:18}}>
        <div className="h-eyebrow" style={{marginBottom:10}}>Quellen — automatisch erkannt</div>
        <div style={{display:"flex", flexDirection:"column", gap:8}}>
          {[
            { url:"https://digital.bmwk.de/foerderprogramme", lic:"CC BY 4.0", ok:true },
            { url:"https://kmu-digital.eu/leitfaden",         lic:"unklar",    ok:false },
            { url:"https://handwerk.de/leitfaden-ki",         lic:"CC BY-SA 4.0", ok:true },
          ].map((s, i) => (
            <div key={i} className="card" style={{padding:"11px 14px", display:"flex", alignItems:"center", gap:14}}>
              <span style={{width:22, height:22, borderRadius:5, background: s.ok ? "var(--leaf-soft)" : "var(--amber-soft)", color: s.ok ? "var(--leaf)" : "var(--amber)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:11}}>
                {s.ok ? "✓" : "!"}
              </span>
              <a className="mono" style={{fontSize:12.5, color:"var(--ink-2)", flex:1, wordBreak:"break-all"}} href={s.url} target="_blank" rel="noreferrer">{s.url}</a>
              <span className="mono" style={{fontSize:11.5, color: s.ok ? "var(--leaf)" : "var(--amber)"}}>{s.lic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SuggestionBanner({ text }) {
  return (
    <div style={{padding:"12px 16px", marginBottom:16, background:"var(--tomato-tint)", border:"1px solid var(--tomato-soft)", borderRadius:10, display:"flex", alignItems:"center", gap:12}}>
      <Icon.spark/>
      <span style={{fontSize:13, color:"var(--tomato-deep)"}}>{text}</span>
    </div>
  );
}

// ---------- Step 5: Szenarien ----------
function ScenariosStep() {
  return (
    <div>
      <SuggestionBanner text="KI-Agent hat drei Szenarien aus deinen Dateien vorgeschlagen. Bitte prüfen, ergänzen oder verwerfen."/>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12}}>
        <ScenarioEditable color="leaf"   label="Positives Szenario"
          text="Geschäftsführer:in eines Handwerksbetriebs versteht in 20 Minuten, wozu KI im Büroalltag sinnvoll eingesetzt werden kann."/>
        <ScenarioEditable color="amber"  label="Nachbearbeitbares Szenario"
          text="Mitarbeitende:r mit halbem Vorwissen – Begriffe wie 'Prompt' werden erklärt, einzelne Beispiele müssen ggf. an die Branche angepasst werden."/>
        <ScenarioEditable color="tomato" label="Negatives Szenario"
          text="Bei Programmiererfahrung wirkt der Einstieg zu langsam – hier eher die Deep-Dive-Variante nutzen."/>
      </div>
      <div style={{marginTop:18, display:"grid", gridTemplateColumns:"1fr 1fr", gap:14}}>
        <label>
          <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>Synthetisches Beispiel · Input</div>
          <textarea className="input mono" style={{minHeight:120, resize:"vertical"}}
            defaultValue={"Stelle mir eine 20-minütige KI-Einstiegsrunde für ein 8-köpfiges Tischlerei-Team zusammen."}/>
        </label>
        <label>
          <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>Erwarteter Beispieloutput</div>
          <textarea className="input mono" style={{minHeight:120, resize:"vertical"}}
            defaultValue={"1) Begrüßung & Erwartungsmanagement (3 min)\n2) Was ist ein Sprachmodell – Analogie 'Praktikant mit Bibliothek' (5 min)\n3) Drei Live-Beispiele …"}/>
        </label>
      </div>
    </div>
  );
}

function ScenarioEditable({ color, label, text }) {
  const palette = {
    leaf:   { bg:"var(--leaf-soft)",   border:"var(--leaf-border)", ink:"var(--leaf-ink)" },
    amber:  { bg:"var(--amber-soft)",  border:"var(--amber-border)", ink:"var(--amber-ink)" },
    tomato: { bg:"var(--tomato-soft)", border:"color-mix(in srgb, var(--tomato) 35%, transparent)", ink:"var(--tomato-deep)" },
  }[color];
  return (
    <div style={{background:palette.bg, border:`1px solid ${palette.border}`, borderRadius:12, padding:16, display:"flex", flexDirection:"column", gap:8}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <span style={{fontWeight:700, fontSize:13, color:palette.ink}}>{label}</span>
        <span className="mono" style={{fontSize:10, color:palette.ink, opacity:.7, letterSpacing:".06em"}}>AGENT-VORSCHLAG</span>
      </div>
      <textarea defaultValue={text} style={{
        background:"transparent", border:"none", outline:"none", resize:"vertical",
        color:palette.ink, fontFamily:"inherit", fontSize:13.5, lineHeight:1.5, minHeight:90, padding:0
      }}/>
    </div>
  );
}

// ---------- Step 6: Trust-Check ----------
function TrustCheckStep() {
  const checks = [
    { l:"Pflichtfelder vollständig",            ok:true },
    { l:"Synthetisches Beispiel hinterlegt",    ok:true },
    { l:"Szenario-Triade vollständig",          ok:true },
    { l:"Quellen mit Lizenzangabe",             ok:false, hint:"1 Quelle hat unklare Lizenz – bitte ergänzen." },
    { l:"Keine sensiblen Daten erkannt",        ok:true },
    { l:"Risiko-Vorschlag gesetzt",             ok:true,  hint:"Agenten-Vorschlag: risk_yellow – Trust Review empfohlen." },
  ];
  const okCount = checks.filter(c => c.ok).length;
  return (
    <div>
      <div className="card" style={{padding:"18px 22px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12}}>
        <div>
          <div className="h-eyebrow" style={{marginBottom:4}}>Trust-Vorprüfbericht</div>
          <div style={{fontSize:14, color:"var(--ink-2)"}}>{okCount} / {checks.length} Trust-Gate-Kriterien erfüllt</div>
        </div>
        <RiskBadge risk="yellow"/>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 14px"}}>
        {checks.map((c, i) => (
          <div key={i} className="card" style={{padding:"12px 14px", display:"flex", alignItems:"flex-start", gap:10}}>
            <span style={{width:20, height:20, borderRadius:5, background: c.ok ? "var(--leaf-soft)" : "var(--amber-soft)", color: c.ok ? "var(--leaf)" : "var(--amber)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:11, marginTop:1, flexShrink:0}}>
              {c.ok ? "✓" : "!"}
            </span>
            <div style={{flex:1}}>
              <div style={{fontSize:13.5, fontWeight:600}}>{c.l}</div>
              {c.hint && <div className="muted" style={{fontSize:12, marginTop:3}}>{c.hint}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Step 7: Review Request ----------
function RequestStep({ requestSent, setRequestSent }) {
  const submit = () => {
    if (requestSent) return;
    setRequestSent(true);
    if (window.kitomatToast) {
      window.kitomatToast({
        title: "Review Request aufgenommen und abgesendet.",
        body:  "Dein Review Request wurde zur Prüfung übergeben. Reviewer werden im nächsten Schritt benachrichtigt.",
        tone:  "success",
      });
    }
  };

  return (
    <div>
      <div className="card" style={{padding:22, background: requestSent ? "var(--leaf-soft)" : "var(--tomato-tint)", border:`1px solid ${requestSent ? "var(--leaf-border)" : "var(--tomato-soft)"}`, marginBottom:18, display:"flex", alignItems:"center", gap:14, transition:"background .2s, border-color .2s"}}>
        <span style={{width:34, height:34, borderRadius:99, background: requestSent ? "var(--leaf)" : "var(--tomato)", color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center", transition:"background .2s"}}>
          <Icon.check size={15}/>
        </span>
        <div style={{flex:1}}>
          <strong style={{color: requestSent ? "var(--leaf-ink)" : "var(--tomato-deep)", fontSize:15}}>
            {requestSent ? "Request übergeben" : "Bereit für Review"}
          </strong>
          <div style={{color: requestSent ? "var(--leaf-ink)" : "var(--tomato-deep)", fontSize:13, marginTop:2}}>
            {requestSent
              ? "Dein Review Request liegt jetzt im Review Center. Reviewer werden benachrichtigt."
              : "Alle Schritte abgeschlossen. Du kannst den Review Request jetzt vorbereiten und an GitHub übergeben."}
          </div>
        </div>
      </div>

      {/* GitHub PR mock */}
      <div className="card" style={{padding:0, overflow:"hidden"}}>
        <div style={{padding:"14px 18px", background:"#1A1916", color:"white", display:"flex", alignItems:"center", gap:10}}>
          <Icon.github size={16}/>
          <strong style={{fontSize:13}}>ki-tomat / kitomat</strong>
          <span className="mono" style={{fontSize:11, opacity:.7}}>· new pull request</span>
          <span style={{marginLeft:"auto"}}><PhaseBadge kind="demo">Mockup</PhaseBadge></span>
        </div>
        <div style={{padding:24, display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:24}}>
          <div>
            <div className="mono" style={{fontSize:11, color:"var(--ink-3)", marginBottom:6, letterSpacing:".04em"}}>BRANCH</div>
            <div className="mono" style={{fontSize:13, marginBottom:14, color:"var(--ink-2)"}}>contributors/lena.h:onboarding-prompt-kmu → main</div>
            <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>Pull Request Title</div>
            <div style={{fontSize:15, fontWeight:700, marginBottom:14}}>feat(prompt): KI-Onboarding-Prompt für KMU</div>
            <div className="h-eyebrow" style={{marginBottom:6, fontSize:11}}>Beschreibung</div>
            <div className="mono" style={{fontSize:12.5, padding:12, background:"var(--bg-2)", borderRadius:8, lineHeight:1.6, color:"var(--ink-2)", whiteSpace:"pre-wrap"}}>
{`### Artefakt
Typ: Prompt-Paket
Sprache: DE · Lizenz: CC BY 4.0

### Trust-Vorprüfbericht (KI-Agent)
- 5 / 6 Kriterien erfüllt
- Hinweis: 1 Quelle ohne Lizenz
- Risiko-Vorschlag: risk_yellow

### Anhang
4 Dateien · MD/YAML/JSON/PDF`}
            </div>
            <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:14}}>
              <span className="badge badge-bronze-c"><span className="dot"></span>artifact</span>
              <span className="badge badge-needs"><span className="dot"></span>needs-review</span>
              <span className="badge badge-yellow"><span className="dot"></span>risk_yellow</span>
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:14}}>
            <div className="h-eyebrow" style={{fontSize:11}}>Was beim Übergeben passiert</div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
              {[
                "Pull Request wird im Repository angelegt",
                "Artefakt erscheint im Review Center",
                "Reviewer-Gruppe erhält eine Benachrichtigung",
                "Du bekommst eine Bestätigung als Toast",
              ].map((s, i) => (
                <li key={i} style={{display:"flex", gap:9, fontSize:13.5, color:"var(--ink-2)"}}>
                  <span style={{width:18, height:18, borderRadius:5, background: requestSent ? "var(--leaf-soft)" : "var(--bg-2)", color: requestSent ? "var(--leaf)" : "var(--ink-3)", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1}}>
                    {requestSent ? <Icon.check size={11}/> : <span style={{fontFamily:"'JetBrains Mono', monospace", fontSize:10, fontWeight:700}}>{i+1}</span>}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mono" style={{fontSize:11, color:"var(--ink-3)", padding:"10px 12px", background:"var(--bg-2)", borderRadius:8, lineHeight:1.5}}>
              Reviewer-Mail · Discord · LinkedIn werden im Post-MVP automatisch ausgelöst. Im MVP wird die Benachrichtigung simuliert.
            </div>
          </div>
        </div>
        <div style={{padding:"14px 20px", borderTop:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, flexWrap:"wrap"}}>
          <span className="muted" style={{fontSize:12}}>Im MVP simuliert – der Beitrag wird im Repository angelegt.</span>
          <div style={{display:"flex", gap:8}}>
            <a className="btn btn-secondary btn-sm" href="https://github.com/ki-tomat/kitomat" target="_blank" rel="noreferrer">
              <Icon.github size={13}/> Repository
            </a>
            <button className="btn btn-primary btn-sm" onClick={submit} disabled={requestSent}>
              {requestSent ? <><Icon.check size={12}/> Request gesendet</> : "Review Request übergeben"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ViewContribution = ViewContribution;
