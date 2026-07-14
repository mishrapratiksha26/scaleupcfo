// Public-facing posts grid. Reused on the SUC homepage and on the Lekha
// "Posts" tab (via an iframe path that re-renders this component).

import { useEffect, useState } from "react";
import { Linkedin, ArrowRight, FileText, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchPublishedPosts, supabase, isAdminEmail } from "../lib/supabase";

function PostCard({ post }) {
  const isLinkedIn = post.kind === "linkedin";
  const className =
    "group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:-translate-y-1";

  const body = (
    <>
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt=""
          className="mb-4 h-40 w-full rounded-xl object-cover"
          loading="lazy"
        />
      )}
      <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        {isLinkedIn ? (
          <>
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn post
          </>
        ) : (
          <>
            <FileText className="h-3.5 w-3.5" /> Article
          </>
        )}
      </div>
      {post.title && (
        <h3 className="text-lg font-semibold text-foreground leading-snug">{post.title}</h3>
      )}
      {post.caption && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {post.caption}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
        <span>
          {new Date(post.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1 text-primary group-hover:translate-x-0.5 transition-transform">
          Read <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </>
  );

  // Every card routes to our own /posts/:id detail page. For LinkedIn posts the
  // detail page renders the original LinkedIn embed inline; for written posts
  // it renders the article. Visitor never gets bounced off-site from the card.
  return (
    <Link to={`/posts/${post.id}`} className={className}>
      {body}
    </Link>
  );
}

export default function PostsGrid({ limit = 6, heading = "Insights" }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [adminSession, setAdminSession] = useState(false);

  useEffect(() => {
    fetchPublishedPosts(limit)
      .then(setPosts)
      .catch((e) => setError(e.message));

    supabase.auth.getSession().then(({ data }) => {
      setAdminSession(isAdminEmail(data.session?.user?.email));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setAdminSession(isAdminEmail(s?.user?.email))
    );
    return () => sub.subscription.unsubscribe();
  }, [limit]);

  if (error) {
    return null; // fail silently on the public site
  }
  if (posts && posts.length === 0 && !adminSession) {
    return null; // hide the section entirely when empty, unless admin is browsing
  }

  return (
    <section className="px-6 py-20 bg-background" id="insights">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center">
          <span className="inline-block rounded-full border border-border px-4 py-1 text-xs font-semibold tracking-wide text-primary">
            FROM THE FOUNDER
          </span>
        </div>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-center text-foreground">
          {heading}
        </h2>
        {adminSession && (
          <div className="mt-4 flex justify-center">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:brightness-110"
            >
              <Pencil className="h-3.5 w-3.5" /> Manage posts
            </Link>
          </div>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(posts || Array.from({ length: 3 })).map((p, i) =>
            p ? (
              <PostCard key={p.id} post={p} />
            ) : (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl border border-border bg-secondary/60"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
