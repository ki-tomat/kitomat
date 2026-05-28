// AP1b — Community: Forum-Threads, Mitglieder, Reward-Badges
// 1:1 extrahiert aus design/kitomat-remix-1/data.jsx

export const COMMUNITY_THREADS = [
  { title:"Wie tief sollte ein Quellenpaket zu Förderprogrammen recherchiert sein?", author:"@miriam.b", replies: 7, last:"vor 2 Stunden", tag:"Quellenpaket" },
  { title:"Best Practice: Prompt-Paket für Discovery-Calls modularisieren",          author:"@viktoria.s", replies: 12, last:"vor 5 Stunden", tag:"Prompt-Paket" },
  { title:"Branchenmodell Pflege & Bildung – Co-Autor:innen gesucht",                author:"@elias.t",   replies: 4, last:"gestern", tag:"Co-Work" },
  { title:"AI-Act-Risikoeinstufung – wer hat Erfahrung mit Hochrisiko-Use-Cases?",   author:"@stefan.w",  replies: 9, last:"gestern", tag:"Trust Review" },
];

export const COMMUNITY_MEMBERS = [
  { name:"Mira K.",     skills:["Prompt-Engineering","B2B-Vertrieb"],     open:"Co-Autor:in", avatar:"MK", color:"#B82318" },
  { name:"Jonas R.",    skills:["Branchenmodelle","Workshop-Design"],    open:"Reviewer",     avatar:"JR", color:"#2D8F4E" },
  { name:"Stefan W.",   skills:["AI-Act","DSGVO"],                       open:"Trust Review", avatar:"SW", color:"#D4A12E" },
  { name:"Elias T.",    skills:["Bildungs-Use-Cases","Förder-Reporting"], open:"Co-Work",      avatar:"ET", color:"#3D4654" },
];

// ---------- Rewards ----------
export const REWARD_BADGES = [
  { id:"first_submit",  label:"Erstes Artefakt eingereicht", earned: true,  color:"var(--leaf)"   },
  { id:"gold_artifact", label:"Gold-Artefakt freigegeben",   earned: true,  color:"var(--amber)"  },
  { id:"helpful_rev",   label:"Hilfreicher Reviewer",        earned: true,  color:"var(--tomato)" },
  { id:"trust_contrib", label:"Trust Contributor",           earned: true,  color:"#3D4654"       },
  { id:"streak_3",      label:"Review-Streak 3",             earned: false, color:"var(--slate)"  },
  { id:"community",     label:"Community Supporter",         earned: false, color:"var(--slate)"  },
];

// ---------- FAQ ----------
