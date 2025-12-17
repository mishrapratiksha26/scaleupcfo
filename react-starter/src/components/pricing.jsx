export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "For small teams",
      features: ["Basic dashboard", "Email support", "1 entity"],
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      features: ["Full automation", "Dedicated support", "Unlimited entities"],
      featured: true,
    },
  ];

  return (
    <section className="pricing">
      <div className="container">
        <h2 className="section-header">Pricing Plans</h2>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className={`pricing-card ${p.featured ? "featured" : ""}`} key={i}>
              {p.featured && <div className="pricing-badge">Popular</div>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-description">{p.description}</div>
              <ul className="pricing-features">
                {p.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <button className="btn-primary">Choose {p.name}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}