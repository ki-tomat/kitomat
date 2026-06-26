// Zentrale Re-Exports aller Komponenten.
// Sektions-Marker pro AP, damit Merges aus parallelen Branches kollisionsarm bleiben.
// Andere APs ergänzen ihre Komponenten unter ihrer Sektion — nicht zwischen Sektionen einfügen.

// ── AP3a — Shell, Navigation, Toast ────────────────────────────
export { Icon } from './Icon.jsx';
export { Header } from './Header.jsx';
export { Footer } from './Footer.jsx';
export { MobileNav } from './MobileNav.jsx';
export { RoleSwitcher } from './RoleSwitcher.jsx';
export { ThemeToggle } from './ThemeToggle.jsx';
export { ToastProvider, useToast } from './Toast.jsx';

// ── AP3b — Modals (folgt) ──────────────────────────────────────
// export { ChatbotWidget } from './modals/ChatbotWidget.jsx';
// export { VideoModal } from './modals/VideoModal.jsx';
// export { AdminLoginModal } from './modals/AdminLoginModal.jsx';

// ── AP4 — Library/Detail-Spezifika (folgt, falls benötigt) ────

// ── AP5 — Contribution/Community-Spezifika (folgt, falls benötigt) ──
export { EmptyState } from './EmptyState.jsx';
export { MetricTile } from './MetricTile.jsx';
export { ProcessStrip } from './ProcessStrip.jsx';
export { Avatar, GoldBadge, PhaseBadge, RiskBadge, TypeBadge } from './Badges.jsx';

// ── AP6 — Review/Admin-Spezifika (folgt, falls benötigt) ──────
