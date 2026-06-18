import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Nav from "../components/navbar";
import { blogs } from "../data/blogs";

export default function Blogs() {
  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Helmet>
        <title>Blogs — ScaleupCFO | Finance Insights for Founders</title>
        <meta
          name="description"
          content="Finance insights, CFO tips, and AI-native operations advice for Indian D2C and mid-market founders from the ScaleupCFO team."
        />
        <link rel="canonical" href="https://scaleupcfo.in/blogs" />
        <meta property="og:title" content="Blogs — ScaleupCFO" />
        <meta
          property="og:description"
          content="Finance insights, CFO tips, and AI-native operations advice for Indian founders."
        />
        <meta property="og:url" content="https://scaleupcfo.in/blogs" />
      </Helmet>

      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-8 text-center" style={{ paddingTop: "130px" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Finance Insights for Founders
          </h1>
          <p className="mt-6 text-lg text-zinc-400">
            Practical CFO advice, AI-native finance tips, and operational playbooks to help you
            scale smarter.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              to={`/blogs/${blog.slug}`}
              className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-1"
            >
              {/* Card top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-300" />

              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Tag */}
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                  {blog.tag}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold leading-snug group-hover:text-emerald-300 transition-colors">
                  {blog.title}
                  {blog.titleHighlight && (
                    <span className="block text-emerald-400">{blog.titleHighlight}</span>
                  )}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-800">
                  <span>{blog.readTime}</span>
                  <span className="text-emerald-400 font-medium group-hover:underline">
                    Read more →
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
