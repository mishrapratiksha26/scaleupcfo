export default function Testimonials() {
  const testimonials = [
    {
      quote: "ScaleupCFO transformed our finance operations.",
      metric: "40% faster reconciliation",
      author: "A. Sharma",
      title: "CFO, TechCorp",
    },
    {
      quote: "The AI dashboard is a game changer.",
      metric: "90% touchless invoices",
      author: "M. Khan",
      title: "Finance Head, RetailCo",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-header">What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-metric">{t.metric}</div>
              <div className="testimonial-author">
                <div className="avatar">{t.author[0]}</div>
                <div>
                  <div className="author-name">{t.author}</div>
                  <div className="author-title">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}