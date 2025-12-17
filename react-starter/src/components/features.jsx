export default function Features() {
  const features = [
    {
      icon: "📊",
      title: "AI Dashboard: CFO Control Center",
      description:
        "Your single source of truth. Real-time cash position, AR aging, AP maturity, treasury positions, compliance status—all at a glance.",
      points: [
        "Multi-agent orchestration: Dashboard agent pulls data from 5+ systems",
        "Reasoning engine: AI explains cash changes, trend anomalies",
        "Predictive alerts: Warns of liquidity gaps 30 days ahead",
        "Export to boardroom: One-click executive summary (PDF, PPT)",
        "Custom KPIs: Build any metric, any frequency",
      ],
    },
    {
      icon: "💰",
      title: "AR/AP: Zero-Touch Operations",
      description:
        "Invoice ingestion → GL coding → accounting entry. Zero humans needed. Learns from your GL history and exception rules.",
      points: [
        "Smart ingestion: OCR + AI for vendor data extraction",
        "GL learning: 90% accuracy after first 1000 invoices",
        "Exception management: Escalate only true exceptions",
        "Early discount capture: Auto-flag payment opportunities",
        "Multi-entity support: Consolidate across 100+ entities",
      ],
    },
    // Add more features here...
  ];

  return (
    <section className="features-detail" id="platform">
      <div className="container">
        {features.map((f, i) => (
          <div className="feature-row" key={i}>
            <div className="feature-visual">{f.icon}</div>
            <div className="feature-content">
              <h3>{f.title}</h3>
              <p>{f.description}</p>
              <ul className="feature-list">
                {f.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}