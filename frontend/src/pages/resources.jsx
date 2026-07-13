import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Nav from "../components/navbar";
import { resources } from "../data/resources";

export default function Resources() {
  return (
    <main className="bg-background text-foreground min-h-screen">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Resources</h1>
          <p className="mt-6 text-lg text-muted-foreground">
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
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary to-[#2DD4BF]" />

              <div className="flex flex-col flex-1 p-6 gap-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  {r.tag}
                </span>

                <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                  {r.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {r.description}
                </p>

                <div className="flex items-center justify-end text-xs text-muted-foreground pt-3 border-t border-border">
                  <span className="text-primary font-medium group-hover:underline">
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
