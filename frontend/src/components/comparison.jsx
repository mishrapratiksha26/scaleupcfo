export default function Comparison() {
  const rows = [
    { feature: "AI-Powered Dashboard", ours: "✓ Predictive + Reasoning", legacy: "— Reporting only", competitor: "— Reporting only" },
    { feature: "Invoice Touchless Rate", ours: "✓ 90%+", legacy: "— ~50%", competitor: "— ~60%" },
    { feature: "Smart GL Coding", ours: "✓ Learns from history", legacy: "— Rule-based only", competitor: "— Rule-based only" },
    { feature: "Certified Accountant Support", ours: "✓ Included", legacy: "— Extra cost", competitor: "Self-service only" },
    { feature: "TDS/26AS Reconciliation", ours: "✓ Native (India-specific)", legacy: "— Manual workaround", competitor: "— Not available" },
    { feature: "Multi-Agent AI Orchestration", ours: "✓ Yes", legacy: "— No", competitor: "Single agent" },
    { feature: "Module-Based Pricing", ours: "✓ Pick & scale", legacy: "— Monolithic", competitor: "All-or-nothing" },
    { feature: "Human-in-Loop (Certified Experts)", ours: "✓ AI + accountants", legacy: "All manual", competitor: "All automation" },
    { feature: "SOC 2 Type II Certified", ours: "✓ Yes", legacy: "Partial", competitor: "✓ Yes" },
    { feature: "Implementation Time", ours: "✓ 4-6 weeks", legacy: "12-20 weeks", competitor: "8-12 weeks" },
  ];

  return (
    <section className="comparison" id="comparison">
      <div className="container">
        <div className="section-header">
          <h2>Why ScaleupCFO Wins</h2>
          <p>Built for modern CFOs who demand AI + human expertise + enterprise compliance.</p>
        </div>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Capability</th>
                <th>ScaleupCFO</th>
                <th>Legacy ERP + Plugin</th>
                <th>Competitor A</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td><strong>{row.feature}</strong></td>
                  <td>{row.ours}</td>
                  <td>{row.legacy}</td>
                  <td>{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
