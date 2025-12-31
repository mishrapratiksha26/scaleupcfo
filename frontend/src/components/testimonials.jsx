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
    <section className="relative py-20 overflow-hidden text-white">
      {/* Solid black top + gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/60 z-[-1]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header - Changed to green gradient */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#34D399] via-white to-gray-300 bg-clip-text text-transparent">
  Why Founders Trust ScaleupCFO AI
</h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Strategic finance, real results — in their own words.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image + Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20 shadow-md">
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#34D399] font-semibold text-lg group-hover:text-[#4ADE80] transition-colors"> {/* Brighter green */}
                    {t.author}
                  </h4>
                  <p className="text-gray-400 text-sm font-medium">
                    {t.title}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-base leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 