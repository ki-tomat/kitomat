const RELEASE_BADGES = {
  bronze: { className: 'badge-bronze', label: 'bronze · freigegeben' },
  silver: { className: 'badge-neutral', label: 'silver · freigegeben' },
  gold: { className: 'badge-bronze-c', label: 'gold · freigegeben' },
};

export function GoldBadge({ status = 'gold' }) {
  const badge = RELEASE_BADGES[status] || RELEASE_BADGES.gold;
  return (
    <span className={`badge ${badge.className}`}>
      <span className="dot"></span>
      {badge.label}
    </span>
  );
}
