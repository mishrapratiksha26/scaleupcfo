import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Linkedin, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .maybeSingle()
      .then(({ data, error }) => {
        setLoading(false);
        if (error) setError(error.message);
        else if (!data) setError("Post not found");
        else setPost(data);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center text-[#6B7280]">
        Loading…
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-semibold text-[#0A0F1C]">Post not found</h1>
        {error && <p className="mt-2 text-[#6B7280]">{error}</p>}
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-[#0F766E] hover:underline"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    );
  }

  const date = new Date(post.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const seoTitle = (post.title || post.caption || "Insights") + " — Insights | ScaleupCFO";
  const seoDesc = post.caption || post.title || "Insights from ScaleupCFO on AI-native finance operations.";

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0F1C]">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={`https://scaleupcfo.in/posts/${post.id}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={`https://scaleupcfo.in/posts/${post.id}`} />
        {post.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <Link
        to="/"
        aria-label="Back to home"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px 10px 12px",
          background: "rgba(255,255,255,0.95)",
          color: "#0A0F1C",
          border: "1px solid #E5E7EB",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          boxShadow:
            "0 6px 20px -8px rgba(10,15,28,0.18), 0 2px 4px rgba(10,15,28,0.04)",
          backdropFilter: "blur(8px)",
        }}
      >
        <ArrowLeft size={16} strokeWidth={2.25} />
        Back
      </Link>

      <article className="mx-auto max-w-2xl px-6 pt-24 pb-20">
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt=""
            className="mb-10 w-full h-64 object-cover rounded-2xl"
          />
        )}

        <div className="text-xs font-mono uppercase tracking-[0.12em] text-[#0F766E] font-semibold">
          {post.kind === "linkedin" ? "LinkedIn post" : "Article"} · {date}
        </div>

        {post.title && (
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-[#0A0F1C]">
            {post.title}
          </h1>
        )}

        {post.caption && (
          <p className="mt-5 text-lg text-[#374151] leading-relaxed">{post.caption}</p>
        )}

        {post.kind === "linkedin" ? (
          <div className="mt-10">
            <a
              href={post.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[#0F766E] hover:bg-[#0D5F58] text-white font-semibold text-sm transition-colors"
            >
              <Linkedin size={16} /> View on LinkedIn <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <div
            className="mt-10 text-[#1F2937] text-[17px] leading-relaxed"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {post.body}
          </div>
        )}
      </article>
    </div>
  );
}
