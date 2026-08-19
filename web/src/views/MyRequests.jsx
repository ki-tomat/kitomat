import { Avatar, GoldBadge, Icon, PhaseBadge, RiskBadge, TypeBadge } from '../components/index.js';
import { LIBRARY } from '../data/library.js';
import { PIPELINE_COLS, REVIEWERS } from '../data/review.js';

// "Meine Requests" — Contributor view of their own contributions across the pipeline
export default function MyRequests({ go }) {

  // Mock: "ich" bin @lena.h — pretend a couple of pipeline items + library items are mine
  const mine = [
    {
      id: "my-001", title: "KI-Onboarding-Prompt für Tischlereibetriebe", type: "prompt", typeLabel: "Prompt-Paket",
      stage: "peer_review", risk: "yellow", sources: "geprüft",
      updated: "vor 18 Minuten",
      open: ["Markenstimme prüfen", "Quellen verifizieren"],
      reviewerId: "mira",
    },
    {
      id: "my-002", title: "Quellenpaket: Förderprogramme Tischler-Innung", type: "dataset", typeLabel: "Quellenpaket",
      stage: "agent_check", risk: "green", sources: "teilweise",
      updated: "vor 1 Stunde",
      open: ["Agenten-Vorprüfung läuft"],
      reviewerId: null,
    },
    {
      id: "my-003", title: "Prompt-Paket: Angebots-Entwurf aus Aufmaß-Foto", type: "prompt", typeLabel: "Prompt-Paket",
      stage: "submitted", risk: "green", sources: "geprüft",
      updated: "vor 4 Stunden",
      open: ["Wartet auf Aufnahme"],
      reviewerId: null,
    },
    {
      id: LIBRARY[0].id, title: LIBRARY[0].title, type: LIBRARY[0].type, typeLabel: "Prompt-Paket",
      stage: "published", risk: "green", sources: "geprüft",
      updated: "freigegeben " + LIBRARY[0].released,
      open: [],
      reviewerId: "core",
      published: true,
      version: LIBRARY[0].version,
    },
  ];

  const stats = [
    { l:"Eingereicht", v: mine.filter(m => m.stage === "submitted").length, c:"var(--slate)" },
    { l:"In Prüfung", v: mine.filter(m => ["agent_check","peer_review","trust_review","maintainer"].includes(m.stage)).length, c:"var(--tomato)" },
    { l:"Freigegeben", v: mine.filter(m => m.stage === "published").length, c:"var(--leaf)" },
  ];

  return (
    <div className="page">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:18, flexWrap:"wrap", gap:18}}>
          <div>
            <div className="h-eyebrow">Meine Requests</div>
            <h1 className="h2" style={{marginTop:6}}>Deine Beiträge im Überblick</h1>
            <p className="muted" style={{margin:"10px 0 0", maxWidth:680, fontSize:14.5, lineHeight:1.55}}>
              Status aller von dir eingereichten Artefakte – von Entwurf bis Freigabe.
              Die Detail-Prüfung übernehmen Reviewer, Trust-Verantwortliche und Maintainer.
            </p>
          </div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <PhaseBadge kind="demo">Contributor-Ansicht (Demo)</PhaseBadge>
            <button className="btn btn-primary btn-sm" onClick={() => go("contribution")}>
              <Icon.plus/> Neuer Beitrag
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginBottom:22}}>
          {stats.map(s => (
            <div key={s.l} className="card" style={{padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <div>
                <div className="muted" style={{fontSize:12.5}}>{s.l}</div>
                <div className="mono" style={{fontSize:28, fontWeight:600, marginTop:2}}>{s.v}</div>
              </div>
              <span style={{width:6, height:38, borderRadius:99, background:s.c}}></span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="review-grid">
          {mine.map(item => {
            const stage = PIPELINE_COLS.find(c => c.id === item.stage);
            const rev = REVIEWERS.find(r => r.id === item.reviewerId);
            return (
              <div key={item.id} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column"}}>
                <div style={{padding:"14px 18px 12px", borderBottom:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap"}}>
                  <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
                    <TypeBadge type={item.type}/>
                    <span className="mono" style={{fontSize:11, color:"var(--ink-3)"}}>{item.id}</span>
                  </div>
                  {item.published
                    ? <GoldBadge/>
                    : <span className="stage-pill" style={{padding:"3px 10px"}}>{stage?.title}</span>}
                </div>
                <div style={{padding:"18px 18px 14px", display:"flex", flexDirection:"column", gap:14, flex:1}}>
                  <h3 style={{margin:0, fontSize:16, fontWeight:700, lineHeight:1.3, letterSpacing:"-.01em"}}>{item.title}</h3>
                  <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                    <RiskBadge risk={item.risk}/>
                    {item.version && <span className="badge badge-neutral mono">{item.version}</span>}
                  </div>
                  {item.open.length > 0 && !item.published && (
                    <div>
                      <div className="h-eyebrow" style={{fontSize:10, marginBottom:6}}>Offene Punkte</div>
                      <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:5}}>
                        {item.open.map((o, i) => (
                          <li key={i} style={{display:"flex", gap:8, fontSize:13, color:"var(--ink-2)"}}>
                            <span style={{color:"var(--ink-3)"}}>·</span>{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div style={{marginTop:"auto", paddingTop:12, borderTop:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap"}}>
                    {rev ? (
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <Avatar name={rev.avatar} color={rev.color} size={26}/>
                        <div>
                          <div style={{fontSize:12.5, fontWeight:600}}>{rev.name}</div>
                          <div className="mono" style={{fontSize:10.5, color:"var(--ink-3)", marginTop:2}}>{item.published ? "freigegeben durch" : rev.role}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="muted mono" style={{fontSize:12}}>· noch nicht zugewiesen</span>
                    )}
                    <span className="mono" style={{fontSize:10.5, color:"var(--ink-3)"}}>{item.updated}</span>
                  </div>
                </div>
                <div style={{padding:"12px 18px", background:"var(--bg-2)", borderTop:"1px solid var(--line)", display:"flex", gap:8, flexWrap:"wrap"}}>
                  {item.published ? (
                    <button className="btn btn-primary btn-sm" style={{flex:"1 1 auto", justifyContent:"center"}} onClick={() => go("detail", item.id)}>
                      In Bibliothek ansehen
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-secondary btn-sm" style={{flex:"1 1 auto", justifyContent:"center"}}>Details</button>
                      <button className="btn btn-ghost btn-sm">Report</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="card" style={{padding:20, marginTop:22, background:"var(--bg-2)", border:"1px solid var(--line-2)"}}>
          <div style={{display:"flex", alignItems:"flex-start", gap:14}}>
            <span style={{width:30, height:30, borderRadius:8, background:"var(--leaf)", color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              <Icon.shield size={14}/>
            </span>
            <div>
              <strong style={{fontSize:14}}>Hinweis · Was du hier siehst</strong>
              <p className="muted" style={{margin:"4px 0 0", fontSize:13, lineHeight:1.5, maxWidth:640}}>
                Als Contributor siehst du nur die eigenen Beiträge. Das vollständige Review Center mit allen Artefakten ist
                Reviewer:innen, Trust-Verantwortlichen, Maintainer:innen und Admins vorbehalten.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

