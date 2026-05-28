// Print app: renders all major views as stacked sections, one per page.

function PrintApp() {
  const go = () => {}; // no-op router for print

  const sections = [
    { id: "dashboard",    label: "01 · Dashboard",            view: <ViewDashboard go={go}/> },
    { id: "library",      label: "02 · Bibliothek",           view: <ViewLibrary go={go}/> },
    { id: "detail",       label: "03 · Artefakt-Detail",      view: <ViewDetail id="kitomat-onboarding-kmu" go={go}/> },
    { id: "contribution", label: "04 · Contribution Center",  view: <ViewContribution go={go}/> },
    { id: "review",       label: "05 · Review Center",        view: <ViewReview go={go}/> },
    { id: "roadmap",      label: "06 · Roadmap",              view: <ViewRoadmap go={go}/> },
    { id: "faq",          label: "07 · FAQ",                  view: <ViewFaq/> },
  ];

  // Auto-print once everything has rendered + fonts loaded
  React.useEffect(() => {
    let done = false;
    const trigger = () => {
      if (done) return;
      done = true;
      setTimeout(() => window.print(), 500);
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(trigger);
    } else {
      setTimeout(trigger, 1200);
    }
  }, []);

  return (
    <div>
      {sections.map((s, i) => (
        <section key={s.id} className="print-section">
          <div className="print-section-label">{s.label}</div>
          <Header route={s.id === "detail" ? "library" : s.id} go={go}/>
          <main>{s.view}</main>
          {i === sections.length - 1 && <Footer/>}
        </section>
      ))}
    </div>
  );
}

const printRoot = ReactDOM.createRoot(document.getElementById("root"));
printRoot.render(<PrintApp/>);
