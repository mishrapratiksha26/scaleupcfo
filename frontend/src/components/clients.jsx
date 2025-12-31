import jiwyaLogo from "../assets/jiwya-logo.svg";
import elchemyLogo from "../assets/elchemy_logo.png";
import palladiumLogo from "../assets/palladium_logo.png";
import threeEvLogo from "../assets/3evi-logo.png";
import threeEcoLogo from "../assets/3eco-Logo.svg";
import metamorphLogo from "../assets/metamorphosys_logo.png";
import oyelaLogo from "../assets/Oyela-logo.jfif";

const logos = [
  { src: jiwyaLogo, alt: "Jiwya" },
  { src: elchemyLogo, alt: "Elchemy" },
  { src: palladiumLogo, alt: "Palladium" },
  { src: threeEvLogo, alt: "3ev" },
  { src: threeEcoLogo, alt: "3eco" },
  { src: metamorphLogo, alt: "MetaMorphosys Technologies" },
  { src: oyelaLogo, alt: "Oyela" },
];

const scrollingLogos = [...logos, ...logos];

export default function ClientsLogos() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
{/* Changed: max-w-6xl + w-full + more padding */}
      <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-200">
        <span className="h-px w-6 bg-white/30" />
        <span className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-[0.1em] text-white/95 drop-shadow-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Trusted by modern teams
        </span>
        <span className="h-px w-6 bg-white/30" />
      </div>

        <div className="overflow-hidden relative">
  <div className="flex w-max animate-marquee">
    {[...scrollingLogos, ...scrollingLogos].map((logo, index) => (
      <img
        key={`${logo.alt}-${index}`}
        src={logo.src}
        alt={logo.alt}
        className="h-12 md:h-16 mx-12 lg:mx-16 opacity-90 hover:opacity-100 transition-all duration-300 drop-shadow-2xl brightness-110 contrast-125 hover:brightness-120 hover:scale-110"
      />
    ))}
  </div>


      </div>
    </div>
  );
}
