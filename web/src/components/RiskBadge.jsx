const RISK = {
  green:  { cls: 'badge-green',  label: 'risk_green' },
  yellow: { cls: 'badge-yellow', label: 'risk_yellow' },
  red:    { cls: 'badge-red',    label: 'risk_red' },
};

export function RiskBadge({ risk }) {
  const b = RISK[risk] || RISK.green;
  return (
    <span className={`badge ${b.cls}`}>
      <span className="dot"></span>{b.label}
    </span>
  );
}

export { RISK };
