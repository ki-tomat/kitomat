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

// ── AP3b — Modals ──────────────────────────────────────────────
export { ChatbotWidget } from './modals/ChatbotWidget.jsx';
export { VideoModal } from './modals/VideoModal.jsx';
export { AdminLoginModal } from './modals/AdminLoginModal.jsx';

// ── AP4 — Library/Detail-Spezifika ─────────────────────────────
export { RiskBadge, RISK } from './RiskBadge.jsx';
export { TypeBadge, TYPE_META } from './TypeBadge.jsx';
export { GoldBadge } from './GoldBadge.jsx';
export { PhaseBadge } from './PhaseBadge.jsx';
export { Avatar } from './Avatar.jsx';
export { MetricTile } from './MetricTile.jsx';
export { EmptyState } from './EmptyState.jsx';
export { ProcessStrip } from './ProcessStrip.jsx';

// ── AP5 — Contribution/Community-Spezifika (folgt, falls benötigt) ──

// ── AP6 — Review/Admin-Spezifika (folgt, falls benötigt) ──────
