import peterImg from "../assets/peterimg.png";
import amitImg from "../assets/amitimg.png";
import karanImg from "../assets/karanimg.png";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Ashish brings strong financial leadership and analytical precision, consistently breaking down problems into actionable parts to resolve bottlenecks and deliver lasting value.",
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
    <section className="relative py-20 overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Why Founders Trust <span className="text-primary">ScaleupCFO AI</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Strategic finance, real results — in their own words.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
  {testimonials.map((t, i) => (
 <div
  key={i}
  className="group relative flex flex-col
             bg-card
             border-t border-b border-border
             border-l-4 border-r-4 border-primary
             rounded-2xl p-6 shadow-md
             hover:shadow-primary/20 hover:border-[#0D5F58]
             transition-all duration-500 hover:-translate-y-2"
>
  {/* Image + Name */}
  <div className="flex items-center gap-4 mb-6">
    <div className="w-16 h-16 rounded-xl overflow-hidden">
      <img
        src={t.image}
        alt={t.author}
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h4 className="text-primary font-semibold text-lg group-hover:brightness-110 transition-colors">
        {t.author}
      </h4>
      <p className="text-muted-foreground text-sm font-medium">{t.title}</p>
    </div>
  </div>

  {/* Quote */}
  <p className="text-foreground/80 text-base leading-relaxed italic text-center">
    "{t.quote}"
  </p>
</div>
  ))}
</div>
      </div>
    </section>
  );
}
 