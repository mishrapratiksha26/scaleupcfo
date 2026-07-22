import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/navbar";
import BlogLeadPopup, { BLOG_LEAD_SUBMITTED_KEY } from "../components/BlogLeadPopup";
import GstReconciliation30Minutes from "../blogs/gst-reconciliation-30-minutes";
import CalBookingButton from "../components/DemoBookingButton";

const SLUG = "gst-reconciliation-30-minutes";

const meta = {
  tag: "GST Reconciliation · ITC Matching · GSTR-2B · CA Firms",
  title: "GST Reconciliation Takes Your Team 3 Days Every Month.",
  titleHighlight: "AI Does It in 30 Minutes.",
  excerpt:
    "Every month, someone on your team opens the purchase register, downloads GSTR-2B, and starts matching line by line in Excel. Catching the mismatch is the easy 10% — closing every non-reconciled item before the deadline is the other 90%. Here's exactly how AI runs the full GST reconciliation cycle, end to end.",
  author: "ScaleupCFO Team",
  readTime: "12 min read",
  category: "GST · ITC · GSTR-2B · CA Firms",
  date: "July 2026",
};

const LEAD_POPUP_SCROLL_THRESHOLD = 0.2; // show once ~1/5 of the page has been scrolled

export default function GstReconciliationResource() {
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (hasTriggeredRef.current) return;
      if (localStorage.getItem(BLOG_LEAD_SUBMITTED_KEY) === "1") return;

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      if (window.scrollY / scrollableHeight >= LEAD_POPUP_SCROLL_THRESHOLD) {
        hasTriggeredRef.current = true;
        setShowLeadPopup(true);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Helmet>
        <title>{meta.title} {meta.titleHighlight} | ScaleupCFO</title>
        <meta name="description" content={meta.excerpt} />
        <link rel="canonical" href={`https://scaleupcfo.in/resources/${SLUG}`} />
      </Helmet>

      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-10" style={{ paddingTop: "130px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition mb-6"
          >
            ← Back to Resources
          </Link>

          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
            {meta.tag}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2 text-foreground">
            {meta.title}
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary mb-5">
            {meta.titleHighlight}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{meta.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-5">
            <span>By <strong className="text-foreground">{meta.author}</strong></span>
            <span>·</span>
            <span>{meta.readTime}</span>
            <span>·</span>
            <span>{meta.category}</span>
            <span>·</span>
            <span>{meta.date}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl blog-post-body">
          <GstReconciliation30Minutes />

          {/* CTA */}
          <div className="mt-16 rounded-xl bg-card border border-border p-10 text-center">
            <h3 className="text-2xl font-bold mb-3 text-foreground">See ScaleupCFO close a live GST reconciliation cycle</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Watch the rule engine match, the agents chase and dispose, and only the real judgement
              calls surface for review — on a real month of real data. No commitment needed.
            </p>
            <CalBookingButton
              title="Book a Demo →"
              module_name="resource cta gst reconciliation"
              className="inline-block bg-primary hover:brightness-110 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition"
            />
          </div>
        </div>
      </section>

      {showLeadPopup && (
        <BlogLeadPopup
          blogSlug={SLUG}
          blogTitle={`${meta.title} ${meta.titleHighlight}`}
          onClose={() => setShowLeadPopup(false)}
          onSubmitted={() => setShowLeadPopup(false)}
        />
      )}
    </main>
  );
}
