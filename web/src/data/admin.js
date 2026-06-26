// AP1b — Admin: User-Verwaltung, Rechte-Matrix, Audit, Integrationen
// 1:1 extrahiert aus design/kitomat-remix-1/data.jsx

export const ADMIN_USERS = [
  { name: "Mira Krüger",      handle:"@mira.k",   role: "Reviewer",         email:"mira@kitomat.community", since:"03/2026", artifacts: 2, reviews: 7 },
  { name: "Jonas Reichert",   handle:"@jonas.r",  role: "Reviewer",         email:"jonas@kitomat.community", since:"03/2026", artifacts: 1, reviews: 6 },
  { name: "Stefan Weiß",      handle:"@stefan.w", role: "Trust-Verantw.",   email:"stefan@kitomat.community", since:"02/2026", artifacts: 0, reviews: 11 },
  { name: "Anna Lehmann",     handle:"@anna.l",   role: "Reviewer",         email:"anna@kitomat.community", since:"04/2026", artifacts: 2, reviews: 3 },
  { name: "Lena Holzmann",    handle:"@lena.h",   role: "Contributor",      email:"lena@kitomat.community", since:"04/2026", artifacts: 3, reviews: 1 },
  { name: "Viktoria Schenk",  handle:"@viktoria.s", role: "Contributor",    email:"v.schenk@kitomat.community", since:"04/2026", artifacts: 2, reviews: 0 },
  { name: "Tarek Karim",      handle:"@tarek.k",  role: "Maintainer",       email:"tarek@kitomat.community", since:"02/2026", artifacts: 1, reviews: 14 },
  { name: "Core Maintainer",  handle:"@core",     role: "Admin",            email:"admin@kitomat.community", since:"01/2026", artifacts: 1, reviews: 22 },
];

export const ROLE_MATRIX = [
  { capability: "Bibliothek lesen",          roles: ["Nutzer","Contributor","Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Artefakt einreichen",       roles: ["Contributor","Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Review übernehmen",         roles: ["Reviewer","Trust","Maintainer","Admin"] },
  { capability: "Trust Review durchführen",  roles: ["Trust","Maintainer","Admin"] },
  { capability: "Maintainer-Entscheidung",   roles: ["Maintainer","Admin"] },
  { capability: "Rollen verwalten",          roles: ["Admin"] },
  { capability: "GitHub-Integration setzen", roles: ["Admin"] },
  { capability: "Audit-Log einsehen",        roles: ["Maintainer","Admin"] },
];

export const AUDIT_LOG = [
  { t:"heute · 14:08", who:"@core",     what:"Status gesetzt",          target:"kitomat-vertrieb → gold" },
  { t:"heute · 12:41", who:"@stefan.w", what:"Trust Review gestartet",  target:"rp-005" },
  { t:"heute · 11:17", who:"@mira.k",   what:"Review übernommen",       target:"rp-003" },
  { t:"heute · 09:42", who:"@core",     what:"Maintainer-Entscheidung", target:"rp-006" },
  { t:"gestern · 18:02", who:"@jonas.r", what:"Review übernommen",      target:"rp-004" },
  { t:"gestern · 16:30", who:"@admin",  what:"Reviewer eingeladen",     target:"@anna.l" },
];

export const INTEGRATIONS = [
  { name:"GitHub Repository",        status:"verbunden",  badge:"green",   note:"github.com/ki-tomat/kitomat" },
  { name:"GitHub OAuth Login",       status:"geplant",    badge:"amber",   note:"Phase 3" },
  { name:"E-Mail-Benachrichtigung",  status:"Demo",       badge:"slate",   note:"Mockup für Review-Trigger" },
  { name:"Discord Webhook",          status:"Post-MVP",   badge:"slate",   note:"Channel #kitomat-reviews" },
  { name:"LinkedIn Sharing",         status:"Post-MVP",   badge:"slate",   note:"Erfolgs-Posts pro Artefakt" },
  { name:"GitHub Actions Trust-Gate",status:"in Arbeit",  badge:"amber",   note:"Validatoren werden konfiguriert" },
];

// ---------- Community ----------
