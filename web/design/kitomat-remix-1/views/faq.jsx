// FAQ view (v2)
function ViewFaq() {
  const { FAQ_ITEMS } = window.KitomatData;
  const [open, setOpen] = React.useState(0);
  return (
    <div className="page">
      <div className="container">
        <div style={{marginBottom:32, maxWidth:760}}>
          <div className="h-eyebrow">FAQ</div>
          <h1 className="h2" style={{marginTop:6}}>Häufige Fragen zu KItomat</h1>
          <p className="muted" style={{margin:"8px 0 0"}}>
            Was ist KItomat, wie funktioniert der Review-Prozess, welche Daten sind erlaubt – die wichtigsten Fragen kompakt beantwortet.
          </p>
        </div>

        <div className="card" style={{padding:"4px 26px 8px"}}>
          {FAQ_ITEMS.map((f, i) => (
            <div key={i} className={`acc-item ${open === i ? "open" : ""}`} style={i === FAQ_ITEMS.length-1 ? {borderBottom:"none"} : {}}>
              <button className="acc-trigger" onClick={() => setOpen(open === i ? -1 : i)}>
                <span style={{display:"flex", alignItems:"center", gap:14}}>
                  <span className="mono" style={{fontSize:12, color:"var(--ink-3)", width:28}}>{String(i+1).padStart(2,"0")}</span>
                  {f.q}
                </span>
                <span className="acc-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="acc-body">
                  <p>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14, marginTop:22}}>
          <div className="card" style={{padding:20}}>
            <div className="h-eyebrow" style={{marginBottom:6}}>Begriff · Trust Layer</div>
            <p style={{margin:0, fontSize:13.5, color:"var(--ink-2)"}}>
              Der Trust Layer ist die Summe aller Prüfungen, die ein Artefakt durchlaufen muss: Pflichtfelder, Szenario-Triade, Quellen, Risiken, menschlicher Review.
            </p>
          </div>
          <div className="card" style={{padding:20}}>
            <div className="h-eyebrow" style={{marginBottom:6}}>Begriff · Artefakt</div>
            <p style={{margin:0, fontSize:13.5, color:"var(--ink-2)"}}>
              Ein KI-Arbeitsbaustein. Bei KItomat: Prompt-Paket, Quellenpaket oder KMU-/Branchenmodell – immer mit Dokumentation und Beispiel.
            </p>
          </div>
          <div className="card" style={{padding:20}}>
            <div className="h-eyebrow" style={{marginBottom:6}}>Begriff · Maintainer</div>
            <p style={{margin:0, fontSize:13.5, color:"var(--ink-2)"}}>
              Personen mit Merge-Rechten im Repository. Sie geben Status wie „gold / freigegeben“ frei. KItomat zeigt sie transparent in der MAINTAINERS-Datei.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
window.ViewFaq = ViewFaq;
