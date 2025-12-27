import peterImg from "../assets/peterimg.png";
import amitImg from "../assets/amitimg.png";
import karanImg from "../assets/karanimg.png";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Ashish brings strong financial leadership and analytical precision, consistently breaking down problems into actionable parts to resolve bottlenecks and deliver lasting value to 3eco.",
      author: "Peter Volkner",
      title: "Managing Director, 3eco Systems",
      image: peterImg,
    },
    {
      quote:
        "Ashish and team is the financial backbone for us, owning finance operations, maintaining accurate orderbooks, timely closing books, and delivering investor updates without fail.",
      author: "Amit Naik",
      title: "CEO & Co‑founder, MetaMorphoSys",
      image: amitImg,
    },
    {
      quote:
        "ScaleUpAI CFO led investor day efforts engaging PE, VC, and family offices, driving content strategy and storytelling to showcase 3ev's strengths with clarity and impact.",
      author: "Karan Kadaba",
      title: "President, 3ev Industries",
      image: karanImg,
    },
  ];

  return (
    <section className="testimonials founder-testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Founder Confidence, In Their Words...</h2>
        </div>

        <div className="testimonials-row">
          {testimonials.map((t, i) => (
            <div className="testimonial-card v2" key={i}>
              <div className="testimonial-body">
                <p className="testimonial-quote">“{t.quote}”</p>
              </div>

              <div className="testimonial-author v2">
                <div
                  className="avatar-photo"
                  style={{
                    backgroundImage: `url(${t.image})`,
                  }}
                />
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
