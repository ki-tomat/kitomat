// AP1b — Zentrale Re-Exports der Mockdaten.
// View-APs (AP4–AP6) importieren von hier oder direkt aus dem Submodul:
//   import { LIBRARY } from '@/data/library';   // gezielt
//   import { LIBRARY } from '@/data';           // alternativ via Re-Export

// ── Content (Privacy, FAQ, Roadmap) ────────────────────────────
export {
  DATENSCHUTZ_HINWEIS,
  DATENSCHUTZ_KURZ_DONT,
  DATENSCHUTZ_KURZ_DO,
  FAQ_ITEMS,
  ROADMAP,
} from './content.js';

// ── Library ────────────────────────────────────────────────────
export { LIBRARY } from './library.js';

// ── Review-Pipeline ────────────────────────────────────────────
export {
  REVIEWERS,
  PIPELINE_COLS,
  REVIEW_PIPELINE,
} from './review.js';

// ── Admin ──────────────────────────────────────────────────────
export {
  ADMIN_USERS,
  ROLE_MATRIX,
  AUDIT_LOG,
  INTEGRATIONS,
} from './admin.js';

// ── Community ──────────────────────────────────────────────────
export {
  COMMUNITY_THREADS,
  COMMUNITY_MEMBERS,
  REWARD_BADGES,
} from './community.js';
