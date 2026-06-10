function StatCard({ label, value, icon: Icon, tone = "blue" }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div>
        <span className="stat-label">{label}</span>
        <strong>{value}</strong>
      </div>
      <span className="stat-icon"><Icon size={21} /></span>
    </article>
  );
}

export default StatCard;
