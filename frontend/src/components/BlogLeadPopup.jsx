import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BLOG_LEAD_SUBMITTED_KEY = "scfo_blog_lead_submitted";

// Google Apps Script Web App URL for the "Blog Leads" sheet.
const BLOG_LEAD_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwuuAUJuSpnzxAXX2OnKgO90zFEArSQMgObO3w9bcXv2Kf1Xdf0Z2b6bFNy6cLZPJz6Vw/exec";

async function submitBlogLead({ name, email, blogSlug, blogTitle }) {
  const payload = {
    name,
    email,
    blogSlug,
    blogTitle,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    await fetch(BLOG_LEAD_SHEET_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function BlogLeadPopup({ blogSlug, blogTitle, onClose, onSubmitted }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const errs = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    try {
      await submitBlogLead({ name: name.trim(), email: email.trim(), blogSlug, blogTitle });
      localStorage.setItem(BLOG_LEAD_SUBMITTED_KEY, "1");
      if (typeof gtag === "function") {
        gtag("event", "blog_lead_submitted", {
          blog_slug: blogSlug,
          page_url: window.location.href,
        });
      }
      onSubmitted();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg leading-none"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-foreground mb-2 pr-6">
          Please provide your name and email to access the blog
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          We'll keep you updated with more interesting and knowledgeable blogs in the future.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="blog-lead-name" className="block text-xs font-semibold text-foreground mb-1.5">
              Name
            </label>
            <input
              id="blog-lead-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              disabled={submitting}
              placeholder="Your name"
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-background text-foreground"
              style={{ borderColor: errors.name ? "#DC2626" : undefined }}
            />
            {errors.name && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="blog-lead-email" className="block text-xs font-semibold text-foreground mb-1.5">
              Email
            </label>
            <input
              id="blog-lead-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              disabled={submitting}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2.5 text-sm bg-background text-foreground"
              style={{ borderColor: errors.email ? "#DC2626" : undefined }}
            />
            {errors.email && <p className="text-xs mt-1" style={{ color: "#DC2626" }}>{errors.email}</p>}
          </div>

          {submitError && (
            <p className="text-xs mb-4" style={{ color: "#DC2626" }}>{submitError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:brightness-110 transition disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Continue Reading"}
          </button>
        </form>
      </div>
    </div>
  );
}
