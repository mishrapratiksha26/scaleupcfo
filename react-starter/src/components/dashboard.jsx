export default function Dashboard() {
  const stats = [
    { value: "₹50Cr+", label: "Cash Managed" },
    { value: "200+", label: "CFOs Served" },
    { value: "90%+", label: "Touchless Processing" },
    { value: "100+", label: "Bank Integrations" },
  ];

  return (
    <section className="dashboard-showcase">
      <div className="container">
        <div className="section-header">
          <h2>Dashboard Showcase</h2>
          <p>Real-time visibility and predictive insights for CFOs.</p>
        </div>

        <div className="dashboard-preview">
          <div className="dashboard-stats">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}