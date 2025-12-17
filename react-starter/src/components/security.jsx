export default function Security() {
  const items = [
    { icon: "🔒", title: "SOC 2 Type II", text: "Enterprise-grade compliance and audit readiness." },
    { icon: "🌍", title: "GDPR Compliant", text: "Data privacy across EU and global standards." },
  ];

  return (
    <section className="security" id="security">
      <div className="container">
        <h2 className="section-header">Security First</h2>
        <div className="security-grid">
          {items.map((s, i) => (
            <div className="security-card" key={i}>
              <div className="security-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}