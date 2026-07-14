import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Nav from "../components/navbar";
import BmiQuiz from "../components/BmiQuiz";
import CalBookingButton from "../components/DemoBookingButton";

const PDF_HREF = "/assets/guides/lekha-ai-readiness-guide-2026.pdf";
const NAV_H_VAR = "--guide-nav-h";
const NAV_H_FALLBACK = "112px";

function scrollToQuiz(e) {
  e.preventDefault();
  document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Keeps a CSS var in sync with the real (fixed) navbar height — including the
// announcement banner — so the hero can fill exactly one screen below it and
// the quiz section can land clear of the navbar when scrolled to.
function useSyncNavHeight() {
  useEffect(() => {
    function sync() {
      const nav = document.querySelector("nav");
      if (nav) {
        document.documentElement.style.setProperty(NAV_H_VAR, `${nav.getBoundingClientRect().height}px`);
      }
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
}

export default function AiReadinessGuide() {
  useSyncNavHeight();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Helmet>
        <title>AI Readiness Guide for CA Firms | ScaleupCFO</title>
        <meta
          name="description"
          content="A practical AI readiness guide for CA firm partners. See where your hours really go and where an AI agent earns its keep."
        />
        <link rel="canonical" href="https://scaleupcfo.in/resources/ai-readiness-guide" />
      </Helmet>

      <Nav />

      {/* HERO — fills exactly one screen below the fixed navbar */}
      <section
        className="relative overflow-hidden px-6 flex flex-col"
        style={{ minHeight: "100dvh", paddingTop: `var(${NAV_H_VAR}, ${NAV_H_FALLBACK})` }}
      >
        {/* Decorative depth layers — behind content, non-interactive */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(10,15,28,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 28%, black 35%, transparent 80%)",
            maskImage: "radial-gradient(ellipse 85% 65% at 50% 28%, black 35%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 42% at 50% 28%, rgba(15,118,110,0.18), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center py-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
            Guide · AI Readiness
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 max-w-4xl">
            Revamp your workflow without disrupting your business.
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 mx-auto" style={{ maxWidth: "60ch" }}>
            A practical AI readiness guide for CA firm partners. See where your hours really go
            and where an AI agent earns its keep.
          </p>
          <a
            href="#quiz-section"
            onClick={scrollToQuiz}
            className="guide-cta inline-block bg-primary hover:brightness-110 text-primary-foreground font-bold px-10 py-5 rounded-xl transition text-lg sm:text-xl shadow-lg shadow-primary/30"
          >
            Get the free guide <span className="guide-cta-arrow inline-block" aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* INLINE QUIZ */}
      <section
        id="quiz-section"
        className="px-6 pt-16 pb-16"
        style={{ scrollMarginTop: `var(${NAV_H_VAR}, ${NAV_H_FALLBACK})` }}
      >
        <div className="mx-auto max-w-5xl">
          <BmiQuiz mode="inline" source="guide-page" pdfHref={PDF_HREF} />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center border-t border-border pt-10">
          <p className="text-muted-foreground text-sm mb-4">
            Prefer to talk it through first? Book a short product walkthrough with our team.
          </p>
          <CalBookingButton
            title="Book a demo →"
            module_name="ai readiness guide footer cta"
            link="ashish-jadhao-5s0pjh/lekha-ai-product-onboarding"
            className="inline-block bg-transparent border border-border hover:border-primary text-foreground hover:text-primary font-medium px-6 py-3 rounded-lg transition text-sm"
          />
        </div>
      </section>
    </main>
  );
}
