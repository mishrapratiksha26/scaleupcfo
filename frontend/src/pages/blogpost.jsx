import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Nav from "../components/navbar";
import { blogs } from "../data/blogs";
import WhyBookClosureIsSlow from "../blogs/why-book-closure-is-slow";
import TdsReconciliation10Minutes from "../blogs/tds-reconciliation-10-minutes";
import GapBetweenFindingAndFixingMismatch from "../blogs/gap-between-finding-and-fixing-mismatch";
import CfoCashPositionRealTime from "../blogs/cfo-cash-position-real-time";
import SalesReconciliationLayers from "../blogs/sales-reconciliation-layers";
import InvestorMisNotReady from "../blogs/investor-mis-not-ready";
import FinanceOpsWithoutAFinanceTeam from "../blogs/finance-ops-without-a-finance-team";
import CalBookingButton from "../components/DemoBookingButton";

const contentMap = {
  "why-book-closure-is-slow": WhyBookClosureIsSlow,
  "tds-reconciliation-10-minutes": TdsReconciliation10Minutes,
  "gap-between-finding-and-fixing-mismatch": GapBetweenFindingAndFixingMismatch,
  "cfo-cash-position-real-time": CfoCashPositionRealTime,
  "sales-reconciliation-layers": SalesReconciliationLayers,
  "investor-mis-not-ready": InvestorMisNotReady,
  "finance-ops-without-a-finance-team": FinanceOpsWithoutAFinanceTeam,
};

export default function BlogPost() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const ContentComponent = contentMap[slug];

  if (!blog || !ContentComponent) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center py-40 text-muted-foreground">
          <p className="text-2xl font-semibold mb-4">Blog not found</p>
          <Link to="/blogs" className="text-[#2DD4BF] underline">
            ← Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Helmet>
        <title>{blog.title} | ScaleupCFO</title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={`https://scaleupcfo.in/blogs/${slug}`} />
      </Helmet>

      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-10" style={{ paddingTop: "130px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition mb-6"
          >
            ← Back to Blogs
          </Link>

          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
            {blog.tag}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 text-foreground">
            {blog.title}
          </h1>
          {blog.titleHighlight && (
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary mb-5">
              {blog.titleHighlight}
            </h1>
          )}

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{blog.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-5">
            <span>By <strong className="text-foreground">{blog.author}</strong></span>
            <span>·</span>
            <span>{blog.readTime}</span>
            <span>·</span>
            <span>{blog.category}</span>
            <span>·</span>
            <span>{blog.date}</span>
          </div>
        </div>
      </section>

      {/* BLOG BODY */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl blog-post-body">
          <ContentComponent />

          {/* CTA */}
          <div className="mt-16 rounded-xl bg-card border border-border p-10 text-center">
            <h3 className="text-2xl font-bold mb-3 text-foreground">See ScaleupCFO close books in under 30 minutes</h3>
            <p className="text-muted-foreground text-sm mb-6">
              We'll show you exactly how the reconciliation works — TDS, GST, sales, bank — all in
              one session. No commitment needed.
            </p>
            <CalBookingButton
              title="Book a Demo →"
              module_name="blog cta"
              className="inline-block bg-primary hover:brightness-110 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
