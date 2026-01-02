export default function Services() {
  return (
    <main className="bg-zinc-950 text-zinc-100">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Start using finance operations as a{" "}
            <span className="text-emerald-400">growth lever</span>, not another
            compliance checklist.
          </h1>
          <p className="mt-6 text-lg text-zinc-400">
            Strategic financial partnership that drives growth, not just reporting.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="rounded-lg bg-emerald-500 px-8 py-3 font-medium text-black hover:bg-emerald-400 transition">
              Book Discovery Call
            </button>
            <button className="rounded-lg border border-zinc-700 px-8 py-3 font-medium text-zinc-200 hover:border-emerald-400 hover:text-emerald-400 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-zinc-800 px-4 py-1 text-xs font-semibold tracking-wide text-emerald-400">
            OUR OFFERINGS
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            ScaleUp CFO Services
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "💼",
                title: "Fractional CFO",
                desc: "Full-time CFO expertise on a fractional basis. Strategic guidance aligned with your growth goals.",
              },
              {
                icon: "📊",
                title: "Financial Consulting",
                desc: "Deep-dive financial analysis and consulting to optimize unit economics and profitability.",
              },
              {
                icon: "🤝",
                title: "Investor Relations",
                desc: "Investor communications, reporting, and strategic narrative building for fundraises.",
              },
              {
                icon: "📈",
                title: "Monthly Book Closure",
                desc: "Timely and accurate month-end close with financial statements and compliance reporting.",
              },
              {
                icon: "🎯",
                title: "Financial Modelling",
                desc: "Custom financial models for budgeting, forecasting, and scenario planning.",
              },
              {
                icon: "🚀",
                title: "Pitch Deck & Fundraise",
                desc: "Financial narratives, pitch materials, and support for successful fundraising rounds.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 hover:border-emerald-500 hover:-translate-y-1 transition"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-zinc-900 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-zinc-800 px-4 py-1 text-xs font-semibold tracking-wide text-emerald-400">
            THE CHALLENGE
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            Problem we are solving
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Growing Financial Complexities", "Scaling increases financial complexity and time burden."],
              ["2", "Investors Asking More", "Investors want insights, narratives, and strategic clarity."],
              ["3", "Cash Burn Visibility", "Lack of visibility makes decisions risky."],
              ["4", "Fundraise & Valuation", "Valuation concerns reduce fundraising confidence."],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 hover:border-emerald-500 transition"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-semibold text-black">
                  {num}
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-zinc-800 px-4 py-1 text-xs font-semibold tracking-wide text-emerald-400">
            WHAT WE DELIVER
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            Value we create for you
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["5th", "Close financials by 5th of every month"],
              ["100%", "Accurate, audit-ready records"],
              ["Real-time", "Cash & runway visibility"],
              ["Strategic", "Growth partner, not compliance"],
            ].map(([num, label]) => (
              <div
                key={num}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center"
              >
                <div className="text-3xl font-semibold text-emerald-400">
                  {num}
                </div>
                <p className="mt-2 text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to transform your finances?
          </h2>
          <p className="mt-4 text-zinc-400">
            Book a discovery call to diagnose your financial operations and identify growth opportunities.
          </p>

          <button className="mt-8 rounded-lg bg-emerald-500 px-10 py-4 font-medium text-black hover:bg-emerald-400 transition">
            Book Discovery Call
          </button>
        </div>
      </section>
    </main>
  );
}
