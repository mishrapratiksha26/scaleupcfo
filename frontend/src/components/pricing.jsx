import { trackExploreClick } from "../utils/analytics";
import CalBookingButton from "./DemoBookingButton";
export default function Pricing() {
  const plans = [
    {
      name: "AI Dashboard",
      description: "Real-time financial visibility",
      features: [
        "Real-time cash positioning",
        "Predictive analytics",
        "Custom KPIs",
        "Executive dashboards",
        "Mobile app included",
      ],
    },
    {
      name: "AR/AP Module",
      description: "90%+ touchless processing",
      features: [
        "Invoice ingestion & OCR",
        "Smart GL coding",
        "90%+ touchless",
        "Multi-entity support",
        "Exception workflows",
      ],
    },
    {
      name: "Treasury Module",
      description: "Multi-bank liquidity control",
      features: [
        "100+ bank integrations",
        "Cash forecasting",
        "FX optimization",
        "Scenario analysis",
        "Covenant monitoring",
      ],
    },
    {
      name: "Sales-to-Cash",
      description: "Order-to-payment automation",
      features: [
        "Order-to-invoice automation",
        "Smart cash matching",
        "DSO optimization",
        "Unapplied cash discovery",
        "AR aging & follow-up",
      ],
    },
    {
      name: "TDS Module",
      description: "India compliance automation",
      features: [
        "26AS matching",
        "GST integration",
        "Deductor management",
        "Penalty avoidance",
        "Quarterly reports",
      ],
    },
    {
      name: "Complete Suite",
      description: "All modules + certified accountants",
      featured: true,
      features: [
        "All 5 modules included",
        "Dedicated accountant support",
        "Priority implementation",
        "Custom integrations",
        "Quarterly business reviews",
      ],
    },
  ];

  // featured last, others first
  const sortedPlans = [
    ...plans.filter((p) => !p.featured),
    ...plans.filter((p) => p.featured),
  ];

  return (
    <section className="pricing">
      <div className="container">
        <div className="section-header">
          <h2>Pricing Built for Scale</h2>
          <p>
            Module-based: pick what you need. Start with one module, add others
            as you scale. All prices include certified accountant support & 24/7
            infrastructure monitoring.
          </p>
        </div>
        <div className="pricing-grid">
          {sortedPlans.map((plan, i) => (
            <div
              className={`pricing-card ${plan.featured ? "featured" : ""}`}
              key={i}
            >
              {plan.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-description">{plan.description}</div>
              
              <CalBookingButton
              title="Book Demo"
              paramName={plan.name}
              className="btn-primary"
              />

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
