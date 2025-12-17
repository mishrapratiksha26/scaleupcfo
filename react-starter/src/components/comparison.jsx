export default function Comparison() {
  const rows = [
    { feature: "Real-time Cash Position", ours: true, others: false },
    { feature: "Predictive Analytics", ours: true, others: false },
    { feature: "Multi-Entity Consolidation", ours: true, others: true },
  ];

  return (
    <section className="comparison" id="comparison">
      <div className="container">
        <h2 className="section-header">Why Choose Us</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>ScaleupCFO</th>
                <th>Others</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.feature}</td>
                  <td>{r.ours ? <span className="checkmark">✓</span> : <span className="cross">✗</span>}</td>
                  <td>{r.others ? <span className="checkmark">✓</span> : <span className="cross">✗</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}