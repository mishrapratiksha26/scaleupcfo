export default function Features() {
  const features = [
    {
      icon: "📊",
      title: "AI Dashboard: CFO Control Center",
      description: "Your single source of truth. Real-time cash position, AR aging, AP maturity, treasury positions, compliance status—all at a glance. AI reasoning explains the \"why\" behind every number.",
      points: [
        "Multi-agent orchestration: Dashboard agent pulls data from 5+ systems",
        "Reasoning engine: AI explains cash changes, trend anomalies",
        "Predictive alerts: Warns of liquidity gaps 30 days ahead",
        "Export to boardroom: One-click executive summary (PDF, PPT)",
        "Custom KPIs: Build any metric, any frequency"
      ]
    },
    {
      icon: "💰",
      title: "AR/AP: Zero-Touch Operations",
      description: "Invoice ingestion → GL coding → accounting entry. Zero humans needed. Learn from your GL history, coding patterns, and exception rules to improve over time.",
      points: [
        "Smart ingestion: OCR + AI for vendor data extraction",
        "GL learning: 90% accuracy after first 1000 invoices",
        "Exception management: Escalate only true exceptions (2-3% invoices)",
        "Early discount capture: Auto-flag payment opportunities",
        "Multi-entity support: Consolidate across 100+ entities"
      ]
    },
    {
      icon: "🏦",
      title: "Treasury: Liquidity at Your Fingertips",
      description: "Multi-bank, multi-currency cash orchestration. Predict tomorrow's positions. What-if scenarios for capex, acquisitions, or market shocks. Never miss a liquidity opportunity.",
      points: [
        "100+ bank integrations: Real-time balance feeds",
        "FX automation: Spot/forward rate optimization",
        "Forecasting engine: 30-90 day predictions with +85% accuracy",
        "Scenario builder: Test acquisition, IPO, or capex impacts",
        "Compliance tracking: Covenant monitoring, hedge accounting"
      ]
    },
    {
      icon: "↔️",
      title: "Sales-to-Cash: 80% Faster Collections",
      description: "From order creation to cash receipt, fully automated. AI matches customer payments to invoices in seconds. Unapplied cash? Found and corrected automatically.",
      points: [
        "Order-to-invoice: 30-second automation cycle",
        "Smart matching: Customer name variations, partial payments, credits",
        "Unapplied cash discovery: 80% faster than manual methods",
        "DSO optimization: 40-60% reduction in Days Sales Outstanding",
        "AR follow-up: Auto-trigger dunning sequences, escalations"
      ]
    },
    {
      icon: "📋",
      title: "TDS Reconciliation: India Compliance Made Easy",
      description: "TDS reconciliation should not consume 3 weeks of your time. Auto-match 26AS certificates. Flag mismatches. Auto-correct within allowed tolerance. Zero penalties.",
      points: [
        "26AS matching: All your TDS transactions vs government records",
        "Auto-correction: Mismatch tolerance with deductor follow-up",
        "GST integration: TDS vs GSTR2A/GSTR3B reconciliation",
        "Compliance calendar: All TDS due dates, quarterly schedules",
        "Deductor communication: Auto-email templates for mismatches"
      ]
    }
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
                  <li key={j}><strong>{p}</strong></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
