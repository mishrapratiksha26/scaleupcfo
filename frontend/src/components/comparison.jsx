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
    <section className="relative py-20 text-white bg-black" id="comparison">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#34D399] via-white to-gray-300 bg-clip-text text-transparent mb-4">
            Why ScaleupCFO AI Wins
          </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed whitespace-nowrap">
  Built for modern CFOs who demand AI + human expertise + enterprise compliance.
</p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-md">
          <table className="min-w-full text-left text-sm text-gray-200">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="px-6 py-4 font-semibold">Capability</th>
                <th className="px-6 py-4 font-semibold text-[#34D399]">ScaleupCFO AI</th>
                <th className="px-6 py-4 font-semibold">Legacy ERP + Plugin</th>
                <th className="px-6 py-4 font-semibold">Competitor A</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/10 transition">
                  <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                  <td className="px-6 py-4 text-green-400">{row.ours}</td>
                  <td className="px-6 py-4 text-red-400">{row.legacy}</td>
                  <td className="px-6 py-4 text-red-400">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}