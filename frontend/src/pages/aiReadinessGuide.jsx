import { Helmet } from "react-helmet-async";
import Nav from "../components/navbar";
import BmiQuiz from "../components/BmiQuiz";
import CalBookingButton from "../components/DemoBookingButton";

const PDF_HREF = "/assets/guides/lekha-ai-readiness-guide-2026.pdf";

function scrollToQuiz(e) {
  e.preventDefault();
  document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AiReadinessGuide() {
  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Helmet>
        <title>AI Readiness Guide for CA Firms | ScaleupCFO</title>
        <meta
          name="description"
          content="A practical AI readiness guide for CA firm partners — see where your hours really go and where an AI agent earns its keep."
        />
        <link rel="canonical" href="https://scaleupcfo.in/resources/ai-readiness-guide" />
      </Helmet>

      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-4" style={{ paddingTop: "110px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12 md:items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full mb-4">
              Guide · AI Readiness
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              Revamp your workflow without disrupting your business.
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-2">
              A practical AI readiness guide for CA firm partners — see where your hours really go
              and where an AI agent earns its keep.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
              Most of a compliance month disappears into moving and reconciling data, not judgement
              calls — this guide shows exactly where, and how to close the gap.
            </p>
          </div>
          <div>
            <a
              href="#quiz-section"
              onClick={scrollToQuiz}
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-5 rounded-xl transition text-lg sm:text-xl shadow-lg shadow-emerald-500/30"
            >
              Get the free guide ↓
            </a>
          </div>
        </div>
      </section>

      {/* INLINE QUIZ */}
      <section id="quiz-section" className="px-6 pt-6 pb-16 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <BmiQuiz mode="inline" source="guide-page" pdfHref={PDF_HREF} />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center border-t border-zinc-800 pt-10">
          <p className="text-zinc-400 text-sm mb-4">
            Prefer to talk it through first? Book a short product walkthrough with our team.
          </p>
          <CalBookingButton
            title="Book a demo →"
            module_name="ai readiness guide footer cta"
            link="ashish-jadhao-5s0pjh/lekha-ai-product-onboarding"
            className="inline-block bg-transparent border border-zinc-700 hover:border-emerald-500 text-zinc-200 hover:text-emerald-400 font-medium px-6 py-3 rounded-lg transition text-sm"
          />
        </div>
      </section>
    </main>
  );
}
