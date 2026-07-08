import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Nav from "../components/navbar";
import { resources } from "../data/resources";

export default function Resources() {
  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Helmet>
        <title>Resources — ScaleupCFO | Guides for CA Firms</title>
        <meta
          name="description"
          content="Guides and resources to help CA firms adopt AI in their finance and compliance workflows."
        />
        <link rel="canonical" href="https://scaleupcfo.in/resources" />
      </Helmet>

      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-8 text-center" style={{ paddingTop: "130px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Resources</h1>
          <p className="mt-6 text-lg text-zinc-400">
            Practical guides for CA firm partners looking to bring AI into their compliance and
            finance workflows.
          </p>
        </div>
      </section>

      {/* RESOURCE GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.slug}
              to={r.href}
              className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-300" />

              <div className="flex flex-col flex-1 p-6 gap-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                  {r.tag}
                </span>

                <h2 className="text-lg font-bold leading-snug group-hover:text-emerald-300 transition-colors">
                  {r.title}
                </h2>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                  {r.description}
                </p>

                <div className="flex items-center justify-end text-xs text-zinc-500 pt-3 border-t border-zinc-800">
                  <span className="text-emerald-400 font-medium group-hover:underline">
                    Get the guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
