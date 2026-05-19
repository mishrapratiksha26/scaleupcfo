import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Linkedin, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabase";

// LinkedIn post URLs all contain a 19-digit activity ID, regardless of which
// URL shape the user pasted (personal-post URL, feed/update URL, urn URL).
// We extract it and build LinkedIn's official iframe embed URL — free, no API
// key, no rate limit. The embed renders the actual LinkedIn card with text,
// image, author, reactions — exactly as it appears on LinkedIn.
function getLinkedinEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(\d{18,20})/);
  if (!match) return null;
  return `https://www.linkedin.com/embed/feed/update/urn:li:share:${match[1]}`;
}

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
  const postUrl = `https://scaleupcfo.in/posts/${post.id}`;

  // Structured data: Article (for written posts) or SocialMediaPosting (for LinkedIn embeds).
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.kind === "linkedin" ? "SocialMediaPosting" : "Article",
    "headline": post.title || post.caption || "Insights",
    "description": seoDesc,
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "url": postUrl,
    ...(post.cover_image_url && { image: post.cover_image_url }),
    ...(post.kind === "linkedin" && post.linkedin_url && { sharedContent: post.linkedin_url }),
    "author": {
      "@type": "Organization",
      "name": "ScaleupCFO",
      "url": "https://scaleupcfo.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ScaleupCFO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://scaleupcfo.in/favicon.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0F1C]">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={postUrl} />
        {post.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
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
            {(() => {
              const embedUrl = getLinkedinEmbedUrl(post.linkedin_url);
              return embedUrl ? (
                <div
                  className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm"
                  style={{ minHeight: 600 }}
                >
                  <iframe
                    src={embedUrl}
                    title="LinkedIn post"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allowFullScreen
                    style={{ display: "block", border: "none" }}
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-[#F3F4F6] p-5 text-sm text-[#6B7280]">
                  Couldn't auto-embed this post. Open it directly on LinkedIn below.
                </div>
              );
            })()}
            <div className="mt-6">
              <a
                href={post.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-[#E5E7EB] hover:border-[#0F766E] hover:text-[#0F766E] text-[#374151] font-semibold text-sm transition-colors"
              >
                <Linkedin size={16} /> Open on LinkedIn <ExternalLink size={14} />
              </a>
            </div>
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
