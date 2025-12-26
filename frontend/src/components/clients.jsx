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
    <section className="clients-strip">
      <div className="container">
        <p className="clients-heading">
          Trusted us as their Financial Partner…
        </p>
        <div className="clients-marquee">
          <div className="icon-track">
            {scrollingLogos.map((logo, index) => (
              <img
                key={`${logo.alt}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="client-logo-img"
              />
            ))}
        </div>
      </div>
      </div>
    </section>
  );
}
