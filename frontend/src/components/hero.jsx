import CalBookingButton from "./DemoBookingButton";
import bgVideo from "/bgvideo.mp4";
import ClientsLogos from "./clients";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-3]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Lighter gradient overlay — just enough for text contrast, tinted with the brand ink instead of flat black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/60 via-[#0A0F1C]/35 to-[#0A0F1C]/45 z-[-2]" />

      {/* Soft block at bottom to hide watermark, blended into the overlay tone */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0A0F1C]/70 to-transparent z-[-1]" />

      {/* Main content + bottom trust bar */}
      <div className="relative flex flex-col h-full">
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg mb-4">
            AI Bookkeeping for Indian Founders
          </h1>

          <p className="text-gray-100 text-lg md:text-xl leading-relaxed max-w-2xl mb-3 drop-shadow-md">
            Books closed by{" "}
            <span
              className="font-extrabold"
              style={{ color: "#5EEAD4", textShadow: "0 0 18px rgba(45,212,191,0.6)" }}
            >
              day 5
            </span>
            . AI agents do the work — Chartered Accountants sign it off.
            <br />
            From{" "}
            <span
              className="font-extrabold"
              style={{ color: "#5EEAD4", textShadow: "0 0 18px rgba(45,212,191,0.6)" }}
            >
              ₹2,499/mo
            </span>
            .
          </p>

          <p className="text-sm text-gray-300 italic mb-6 drop-shadow-sm">
            Trusted by 20+ CEOs/Founders across India, UAE, US & Europe
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <CalBookingButton
              title="Get Started Free"
              className="px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:brightness-110 hover:shadow-lg hover:scale-105 transition-all duration-300"
              module_name="Hero Section CTA"
            />

            <button className="btn-secondary-nav">
              See the AI CFO in action
            </button>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-t border-white/10 backdrop-blur-sm">
          <ClientsLogos />
        </div>
      </div>
    </section>
  );
}
