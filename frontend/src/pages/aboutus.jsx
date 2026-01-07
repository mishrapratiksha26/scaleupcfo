import Nav from "../components/navbar";
import founderimg from "../assets/ceo.png"
import { HashLink } from "react-router-hash-link";
import CalBookingButton from "../components/DemoBookingButton";
export default function About() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
        <Nav />
      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            We're Reimagining Financial Operations
          </h1>
          <p className="mt-6 text-lg text-zinc-400">
            Financial teams spend 70% of their time on reconciliation and admin. We're building AI
            that handles the grunt work, so CFOs can focus on strategy that drives business value.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <CalBookingButton
                    title="Explore Our Solution"
                    module_name="about page"
                    className="rounded-lg bg-emerald-500 px-8 py-3 font-medium text-black hover:bg-emerald-400 transition"
                    namespace="discovery-call-cfo-services"
                    link="ashish-jadhao-5s0pjh/discovery-call-cfo-services"
                  />
            <HashLink
  smooth
  to="#story"
  className="rounded-lg border border-zinc-700 px-8 py-3 hover:border-emerald-400 transition"
>
  Read Our Story
</HashLink>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="px-6 py-24 max-w-6xl mx-auto" id="story">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-20">
          Our Story
        </h2>

        {/* STORY 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <h3 className="text-2xl font-semibold mb-4">The Problem We Saw</h3>
            <p className="text-zinc-400 mb-4">
              We spent years working in corporate finance and boutique financial advisory firms.
              We watched smart CFOs and accounting teams waste endless hours on manual reconciliation,
              GL coding, and month-end scrambles.
            </p>

            <div className="border-l-4 border-amber-400 bg-zinc-900 p-4 rounded mb-4">
              <strong className="text-amber-400">60-70% of their time</strong> was spent on administrative tasks, not strategic thinking.
              Yet everyone knew: AI could handle this.
            </div>

            <p className="text-zinc-400">
              The challenge wasn't capability—it was trust. CFOs need AI that works with them,
              not for them. AI that explains its thinking. AI they control.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 p-12 text-center">
            <div className="text-5xl font-mono text-emerald-400">70%</div>
            <p className="text-sm uppercase tracking-wide text-zinc-400">
              Time on Admin Tasks
            </p>
            <hr className="my-6 border-zinc-700" />
            <div className="text-5xl font-mono text-emerald-400">2-3x</div>
            <p className="text-sm uppercase tracking-wide text-zinc-400">
              Faster Close Possible
            </p>
          </div>
        </div>

        {/* STORY 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl bg-zinc-900 p-12 text-center">
            <div className="text-5xl font-mono text-emerald-400">99%</div>
            <p className="text-sm uppercase tracking-wide text-zinc-400">
              Reconciliation Accuracy
            </p>
            <hr className="my-6 border-zinc-700" />
            <div className="text-5xl font-mono text-emerald-400">40%</div>
            <p className="text-sm uppercase tracking-wide text-zinc-400">
              Cost Reduction
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">What We Built</h3>
            <p className="text-zinc-400 mb-4">
              ScaleUp CFO AI is a <strong>human-in-loop copilot</strong> for finance operations.
              8 specialized AI agents handle reconciliation, GL coding, cash forecasting, and audit prep.
            </p>
            <p className="text-zinc-400 mb-4">
              But here's the key: <strong>Humans retain control.</strong> Every major decision requires approval.
              AI suggests, handles exceptions, and explains its reasoning. The CFO remains the trusted authority.
            </p>
            <div className="border-l-4 border-emerald-400 bg-zinc-900 p-4 rounded">
              Result: <strong>2-3 day close</strong> (vs 10-15 days), <strong>40% cost savings</strong>,
              and most importantly—your team focuses on strategy, not admin.
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="bg-zinc-900 px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-20">
          The Problems We Solve
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ["📅", "Slow Month-End Close", "Financial close stretched across 10-15 days. Waiting for exceptions, approvals, manual reconciliation.", "Before: 10-15 days", "After: 2-3 days"],
            ["💰", "High Finance Ops Cost", "Large teams needed just to handle routine reconciliation, GL coding, and data entry.", "Before: Full team + overtime", "After: 40% cost reduction"],
            ["⚠️", "Manual Errors & Rework", "Typos, misclassified transactions, unmatched invoices requiring rework and reconciliation.", "Before: 95% accuracy", "After: 99%+ accuracy"],
            ["🎯", "No Business Insights", "CFO stuck in reconciliation instead of analyzing margins, cash flow, and strategic opportunities.", "Before: 20-30% strategy", "After: 70% strategy"],
            ["📊", "Slow Business Visibility", "Monthly financials only. Real time cash position, daily reconciliation not feasible.", "Before: Monthly only", "After: Real time visibility"],
            ["✓", "Audit Readiness Stress", "Last-minute document gathering, manual audit trail compilation, SOX/IFRS compliance rush.", "Before: Manual preparation", "After: Always audit-ready"],
          ].map(([icon, title, desc, before, after], i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{desc}</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="rounded bg-red-900/40 text-red-300 px-2 py-1">{before}</div>
                <div className="rounded bg-emerald-900/40 text-emerald-300 px-2 py-1">{after}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-zinc-400 mb-4">
              To empower financial teams to focus on what matters: strategic thinking, business growth,
              and creating value for their organization.
            </p>
            <p className="text-zinc-400 mb-10">
              We do this by building AI that's trustworthy, transparent, and collaborative—not a black box
              that replaces human judgment, but a true copilot that augments it.
            </p>

            <h3 className="text-xl font-semibold mb-4">Our Values</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Human-First AI", "AI serves humans. Control stays with the CFO."],
                ["Transparency", "Every decision explained. Full audit trail."],
                ["Accuracy First", "99%+ precision. No shortcuts on quality."],
                ["Strategy Over Admin", "Free your team for high-value thinking."],
              ].map(([title, desc]) => (
                <div key={title} className="bg-zinc-900 p-4 rounded border-l-4 border-emerald-400">
                  <h4 className="font-semibold">{title}</h4>
                  <p className="text-sm text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 p-10 rounded-xl space-y-6">
            {[
              ["18-22", "FTE freed from admin work"],
              ["69%", "Faster close cycle"],
              ["99%", "Reconciliation accuracy"],
              ["24/7", "AI agents running"],
            ].map(([num, label]) => (
              <div key={num} className="flex gap-6 border-b border-zinc-800 pb-4 last:border-none">
                <div className="text-3xl font-mono text-emerald-400 w-20">{num}</div>
                <div className="text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
<section className="bg-zinc-900 px-6 py-24">
  <h2 className="text-3xl md:text-4xl font-semibold text-center mb-20">
    Our Team
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* FOUNDER & CEO */}
    <div className="rounded-xl bg-black border border-zinc-800 overflow-hidden transition-transform hover:-translate-y-1">
      {/* Image */}
<div className="h-56 flex items-center justify-center bg-black">
  <div className="h-40 w-40 rounded-full overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.25)] bg-white">
    <img
      src={founderimg}
      alt="Founder & CEO"
      className="h-full w-full object-cover object-[50%_25%]"
    />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <div className="font-semibold text-lg">Ashish Jadhao</div>
        <div className="text-emerald-400 text-sm mb-3">Founder & CEO</div>
      </div>
    </div>

    {/* VP ENGINEERING */}
    <div className="rounded-xl bg-black border border-zinc-800 overflow-hidden transition-transform hover:-translate-y-1">
      <div className="h-56 flex items-center justify-center bg-black text-6xl">
        👩‍💻
      </div>

      <div className="p-6 text-center">
        <div className="font-semibold text-lg">VP Engineering</div>
    </div>

    {/* HEAD OF PRODUCT */}
    <div className="rounded-xl bg-black border border-zinc-800 overflow-hidden transition-transform hover:-translate-y-1">
      <div className="h-56 flex items-center justify-center bg-black text-6xl">
        👨‍💼
      </div>

      <div className="p-6 text-center">
        <div className="font-semibold text-lg">Head of Product</div>
      </div>
    </div>
  </div>
</section>



      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to Transform Your Finance Operations?
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
          Let's talk about how AI can free your team to focus on strategy.
          Schedule a personalized demo with our team.
        </p>
        <CalBookingButton
                    title="Schedule Demo"
                    module_name="about page"
                    className="rounded-lg bg-emerald-500 px-10 py-4 font-medium text-black hover:bg-emerald-400 transition"
                    namespace="discovery-call-cfo-services"
                    link="ashish-jadhao-5s0pjh/discovery-call-cfo-services"
                  />

      </section>

    </main>
  );
}
