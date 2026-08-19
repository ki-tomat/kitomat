import { Icon, PhaseBadge } from '../components/index.js';
import { REWARD_BADGES } from '../data/community.js';
import { ROADMAP } from '../data/content.js';

// Über KItomat + Roadmap-Section
export default function About({ go }) {
  const colors = {
    tomato: { bg:"var(--tomato-tint)",  ring:"var(--tomato)",  ink:"var(--tomato-deep)" },
    amber:  { bg:"var(--amber-soft)",   ring:"var(--amber)",   ink:"var(--amber-ink)" },
    slate:  { bg:"var(--slate-soft)",   ring:"var(--slate)",   ink:"var(--slate)" },
    leaf:   { bg:"var(--leaf-soft)",    ring:"var(--leaf)",    ink:"var(--leaf-ink)" },
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div style={{display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:48, marginBottom:48, alignItems:"center"}}>
          <div>
            <div className="h-eyebrow">Über KItomat</div>
            <h1 className="h1" style={{marginTop:8, marginBottom:18, fontSize:38}}>
              Warum es <span style={{color:"var(--tomato)"}}>KItomat</span> gibt.
            </h1>
            <p style={{margin:0, fontSize:17, lineHeight:1.55, color:"var(--ink-2)", maxWidth:560}}>
              KItomat ist im KI-Consultant-Kurs entstanden — aus der Beobachtung, dass es überall
              Prompt-Schnipsel und Quellenlisten gibt, aber kaum strukturierte, reviewfähige Bausteine,
              denen man im Mandat tatsächlich vertrauen kann.
            </p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:12}}>
            {[
              { k:"24", l:"Artefakte im Repository" },
              { k:"6",  l:"Reviewer & Maintainer aktiv" },
              { k:"3",  l:"Artefakttypen kuratiert" },
              { k:"1",  l:"öffentliches GitHub-Repository" },
            ].map(m => (
              <div key={m.l} className="card" style={{padding:18}}>
                <div className="mono" style={{fontSize:30, fontWeight:600, letterSpacing:"-.02em"}}>{m.k}</div>
                <div className="muted" style={{fontSize:12.5, marginTop:4}}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Q&A */}
        <section style={{marginBottom:48}}>
          <div className="h-eyebrow" style={{marginBottom:18}}>Idee & Motivation</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:18}}>
            <AboutQA q="Wie kam es zur Idee?"
              a="Wir, die Teilnehmer:innen des KI-Consultant-Kurses, haben ständig dieselben Bausteine immer wieder neu zusammengesucht – Prompts, Quellen, Branchen-Use-Cases. Statt jede:r für sich, wollten wir einen gemeinsamen, reviewfähigen Werkzeugkasten."/>
            <AboutQA q="Welches Problem löst KItomat?"
              a="KI-Bausteine kursieren in Slack, Notion und privaten Doc-Sammlungen. Niemand weiß, was geprüft ist, was halluziniert, welche Quellen verlässlich sind und unter welcher Lizenz etwas weitergegeben werden darf. KItomat bringt diese Bausteine in Form."/>
            <AboutQA q="Warum reicht eine einfache Prompt-Sammlung nicht?"
              a="Weil Sammlungen ohne Review beliebig werden. Es fehlen Zielgruppe, Einsatzkontext, Grenzen, Beispiele und Verantwortung. Ohne Trust Layer sind 50 Prompts schnell schlechter als 5 gut dokumentierte."/>
            <AboutQA q="Warum sind Review, Trust Layer und Quellenstatus wichtig?"
              a="Weil wir Artefakte später in echten Kundenmandaten einsetzen. Risiko-Einstufung, Quellenlizenzen und Datenschutz-Hinweise sind kein Bonus – sie sind die Eintrittskarte in die Bibliothek."/>
            <AboutQA q="Was ist die Rolle von KI-Agenten?"
              a="Agenten unterstützen beim Vorbereiten: Metadaten erkennen, Quellen prüfen, Szenarien vorschlagen, Datenschutz-Heuristik anwenden. Sie ersetzen keinen menschlichen Review – sie machen ihn nur schneller und konsistenter."/>
            <AboutQA q="Wie kannst du beitragen?"
              a="Bereite ein Artefakt im Contribution Center vor, reiche es über GitHub ein, übernimm Reviews im Review Center oder unterstütze in der Community. Jeder Beitrag wird als öffentliches Portfolio sichtbar."/>
          </div>
        </section>

        {/* Trust principles */}
        <section style={{marginBottom:48}}>
          <div className="card" style={{padding:30}}>
            <div className="h-eyebrow" style={{marginBottom:8}}>Trust-Prinzipien</div>
            <h2 className="h2" style={{marginBottom:20}}>Worauf wir bei jedem Artefakt achten</h2>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18}}>
              {[
                { t:"Nachvollziehbarkeit",  d:"Jedes Artefakt sagt, wofür es da ist, für wen, in welchem Kontext und wo seine Grenzen liegen." },
                { t:"Quellenklarheit",      d:"Nur öffentlich nutzbare Quellen mit klarer Herkunft und Lizenz. Keine versteckten oder selbst-recherchierten 'Geheim-Listen'." },
                { t:"Menschliche Endkontrolle", d:"Agenten unterstützen, Reviewer prüfen, Maintainer entscheiden. Verantwortung bleibt bei Menschen." },
              ].map(p => (
                <div key={p.t}>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
                    <span style={{width:8, height:8, borderRadius:99, background:"var(--tomato)"}}></span>
                    <strong style={{fontSize:15}}>{p.t}</strong>
                  </div>
                  <p className="muted" style={{margin:0, fontSize:14, lineHeight:1.55}}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap as section */}
        <section id="roadmap" style={{marginBottom:48}}>
          <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12}}>
            <div>
              <div className="h-eyebrow">Roadmap</div>
              <h2 className="h2" style={{marginTop:6}}>Was kommt als nächstes</h2>
              <p className="muted" style={{margin:"8px 0 0", maxWidth:560, fontSize:14}}>
                Vier Stufen, vom heutigen MVP bis zu Community-Ideen. Die Roadmap ist gleichzeitig Ideenspeicher für spätere Kursteilnehmer:innen.
              </p>
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14}}>
            {ROADMAP.map((p, i) => {
              const c = colors[p.color];
              return (
                <div key={p.phase} className="card" style={{padding:0, overflow:"hidden"}}>
                  <div style={{padding:"16px 18px", background:c.bg, borderBottom:"1px solid var(--line)"}}>
                    <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
                      <span style={{width:24, height:24, borderRadius:99, background:c.ring, color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono', monospace", fontWeight:700, fontSize:11}}>{i+1}</span>
                      <span className="mono" style={{fontSize:10.5, color:c.ink, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase"}}>{p.phase}</span>
                    </div>
                  </div>
                  <div style={{padding:"14px 18px 18px"}}>
                    <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
                      {p.items.map((it, k) => (
                        <li key={k} style={{fontSize:13, color:"var(--ink-2)", display:"flex", gap:8}}>
                          <span style={{color:c.ring, fontWeight:700, marginTop:1}}>·</span>{it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Anerkennungssystem */}
        <section style={{marginBottom:48}}>
          <div className="card" style={{padding:30, background:"linear-gradient(150deg, var(--bg-2), var(--surface))"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:18, flexWrap:"wrap", gap:10}}>
              <div>
                <div className="h-eyebrow" style={{marginBottom:6, display:"flex", alignItems:"center", gap:8}}>
                  <Icon.trophy/> Anerkennungssystem
                </div>
                <h3 className="h3">Beiträge sichtbar machen — ohne Spielwiese</h3>
                <p className="muted" style={{margin:"6px 0 0", maxWidth:560, fontSize:14}}>
                  Badges für eingereichte Artefakte, unterstützte Reviews und Trust-Beiträge. Bewusst dezent, kein Leaderboard im Vordergrund.
                </p>
              </div>
              <PhaseBadge kind="geplant">Geplant</PhaseBadge>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:10}}>
              {REWARD_BADGES.map(b => (
                <div key={b.id} className="card" style={{padding:14, textAlign:"center", opacity: b.earned ? 1 : .5, background: b.earned ? "var(--surface)" : "var(--bg-2)"}}>
                  <div style={{width:36, height:36, borderRadius:10, background:b.earned ? b.color : "var(--line)", color:"white", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:8}}>
                    <Icon.trophy size={16}/>
                  </div>
                  <div style={{fontSize:12, fontWeight:600, lineHeight:1.3}}>{b.label}</div>
                  {!b.earned && <div className="mono" style={{fontSize:9.5, color:"var(--ink-3)", marginTop:4, letterSpacing:".04em"}}>OFFEN</div>}
                </div>
              ))}
            </div>
            <div style={{marginTop:16, padding:14, background:"var(--surface)", borderRadius:10, border:"1px solid var(--line)", display:"flex", gap:24, flexWrap:"wrap", fontSize:13}}>
              <div><strong>3</strong> <span className="muted">eingereichte Artefakte</span></div>
              <div><strong>1</strong> <span className="muted">freigegebenes Artefakt</span></div>
              <div><strong>4</strong> <span className="muted">unterstützte Reviews</span></div>
              <div style={{marginLeft:"auto"}}><span className="badge badge-bronze-c"><span className="dot"></span>Trust Contributor</span></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card" style={{padding:28, display:"flex", justifyContent:"space-between", alignItems:"center", gap:18, flexWrap:"wrap", background:"linear-gradient(135deg, var(--tomato-tint), var(--surface))", border:"1px solid var(--tomato-soft)"}}>
          <div>
            <h3 className="h3" style={{marginBottom:6}}>Lust, beizutragen?</h3>
            <p className="muted" style={{margin:0, fontSize:14, maxWidth:560}}>
              Starte mit einem eigenen Prompt-Paket oder übernimm ein offenes Review.
              Jede:r Beitrag bleibt im Repository nachvollziehbar.
            </p>
          </div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            <button className="btn btn-secondary" onClick={() => go("review")}>Review Center öffnen</button>
            <button className="btn btn-primary" onClick={() => go("contribution")}>
              <Icon.plus/> Beitrag vorbereiten
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

function AboutQA({ q, a }) {
  return (
    <div className="card" style={{padding:22}}>
      <div className="mono" style={{fontSize:11, color:"var(--tomato)", fontWeight:700, letterSpacing:".06em", marginBottom:8}}>FRAGE</div>
      <h4 style={{margin:"0 0 10px", fontSize:16, fontWeight:700, letterSpacing:"-.01em"}}>{q}</h4>
      <p style={{margin:0, color:"var(--ink-2)", fontSize:14, lineHeight:1.55}}>{a}</p>
    </div>
  );
}

