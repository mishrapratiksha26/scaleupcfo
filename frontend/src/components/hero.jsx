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

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black/50 z-[-2]" />

      {/* Solid block at bottom to hide watermark */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-black z-[-1]" />

      {/* Main content + bottom trust bar */}
      <div className="relative flex flex-col h-full">
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg mb-4">
            The AI-Native Finance Operations
          </h1>

          <p className="text-gray-100 text-lg md:text-xl leading-relaxed max-w-2xl mb-3 drop-shadow-md">
            From bookkeeping to boardroom – in real time.
            <br />
            <span className="font-semibold" style={{ color: '#34D399' }}>
              AI agents + certified accountants
            </span>{" "}
            = strategic finance at scale.
          </p>

          <p className="text-sm text-gray-300 italic mb-6 drop-shadow-sm">
            Trusted by 20+ CEOs/Founders across India, UAE, US & Europe
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <CalBookingButton
            title="Get Started Free"
            className="px-5 py-3 bg-[#34D399] text-black font-semibold rounded-md hover:brightness-125 hover:shadow-lg hover:scale-105 transition-all duration-300"
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