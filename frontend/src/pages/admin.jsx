import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { supabase, ADMIN_EMAILS, isAdminEmail } from "../lib/supabase";

function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAILS[0] || "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function signIn(e) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    // Successful sign-in triggers onAuthStateChange in the parent, which re-renders.
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <form
        onSubmit={signIn}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> Home
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Admin sign-in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only{" "}
          {ADMIN_EMAILS.map((e, i) => (
            <span key={e}>
              <code className="text-primary">{e}</code>
              {i < ADMIN_EMAILS.length - 1 ? " and " : ""}
            </span>
          ))}{" "}
          can manage posts.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-wider text-muted-foreground">Email</label>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
        />

        <label className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground">Password</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
        />

        {err && <div className="mt-3 text-sm text-destructive">{err}</div>}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const EMPTY_FORM = {
  kind: "linkedin",
  title: "",
  caption: "",
  body: "",
  linkedin_url: "",
  cover_image_url: "",
  published: true,
  display_order: 0,
};

function PostForm({ initial, onSaved, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const isEdit = !!initial?.id;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const payload = {
      kind: form.kind,
      title: form.title || null,
      caption: form.caption || null,
      body: form.kind === "written" ? form.body || null : null,
      linkedin_url: form.kind === "linkedin" ? form.linkedin_url || null : null,
      cover_image_url: form.cover_image_url || null,
      published: !!form.published,
      display_order: Number(form.display_order) || 0,
    };
    const { error } = isEdit
      ? await supabase.from("posts").update(payload).eq("id", initial.id)
      : await supabase.from("posts").insert(payload);
    setBusy(false);
    if (error) setErr(error.message);
    else onSaved();
  }

  return (
    <form
      onSubmit={save}
      className="rounded-2xl border border-border bg-card p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{isEdit ? "Edit post" : "New post"}</h2>
        <button type="button" onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Type</label>
        <div className="flex gap-2">
          {["linkedin", "written"].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => update("kind", k)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                form.kind === k
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {k === "linkedin" ? "LinkedIn post" : "Written article"}
            </button>
          ))}
        </div>
      </div>

      <Field label="Title (optional)">
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="Caption / short blurb (optional)">
        <textarea
          rows={2}
          value={form.caption}
          onChange={(e) => update("caption", e.target.value)}
          className={inputCls}
        />
      </Field>

      {form.kind === "linkedin" ? (
        <Field label="LinkedIn post URL">
          <input
            required
            type="url"
            placeholder="https://www.linkedin.com/posts/..."
            value={form.linkedin_url}
            onChange={(e) => update("linkedin_url", e.target.value)}
            className={inputCls}
          />
        </Field>
      ) : (
        <Field label="Body (markdown)">
          <textarea
            required
            rows={10}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            className={inputCls + " font-mono"}
          />
        </Field>
      )}

      <Field label="Cover image URL (optional)">
        <input
          type="url"
          value={form.cover_image_url}
          onChange={(e) => update("cover_image_url", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Display order (higher = shown first)">
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => update("display_order", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Published">
          <select
            value={form.published ? "1" : "0"}
            onChange={(e) => update("published", e.target.value === "1")}
            className={inputCls}
          >
            <option value="1">Yes — show publicly</option>
            <option value="0">No — draft</option>
          </select>
        </Field>
      </div>

      {err && <div className="text-sm text-destructive">{err}</div>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-50"
        >
          <Save size={16} /> {busy ? "Saving…" : isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground hover:border-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary outline-none";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function AdminPanel({ session, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | post object
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });
    setBusy(false);
    if (!error) setPosts(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) load();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> Site
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{session.user.email}</span>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-destructive"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Posts</h1>
          {!editing && (
            <button
              onClick={() => setEditing("new")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:brightness-110 transition"
            >
              <Plus size={16} /> New post
            </button>
          )}
        </div>

        {editing ? (
          <PostForm
            initial={editing === "new" ? null : editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              load();
            }}
          />
        ) : (
          <div className="space-y-3">
            {busy && posts.length === 0 && (
              <div className="text-sm text-muted-foreground">Loading…</div>
            )}
            {!busy && posts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
                No posts yet. Click <b>New post</b> to add one.
              </div>
            )}
            {posts.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-secondary/40 p-4 flex items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="uppercase tracking-wider text-primary font-semibold">
                      {p.kind === "linkedin" ? "LinkedIn" : "Article"}
                    </span>
                    <span>·</span>
                    <span>{new Date(p.created_at).toLocaleDateString("en-IN")}</span>
                    {!p.published && (
                      <>
                        <span>·</span>
                        <span className="text-warning">Draft</span>
                      </>
                    )}
                    <span>·</span>
                    <span>order {p.display_order}</span>
                  </div>
                  <div className="mt-1 font-medium text-foreground truncate">
                    {p.title || p.caption || p.linkedin_url || "(untitled)"}
                  </div>
                  {p.kind === "linkedin" && p.linkedin_url && (
                    <a
                      href={p.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-muted-foreground hover:text-primary truncate"
                    >
                      {p.linkedin_url}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:border-primary"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="rounded-lg border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    // onAuthStateChange fires INITIAL_SESSION on mount after supabase-js has
    // had a chance to process any magic-link tokens in the URL. Listening to
    // this is more reliable than getSession(), which can return null before
    // the URL exchange completes.
    let timer;
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setBootstrapped(true);
      clearTimeout(timer);
    });
    // Safety net: if the listener never fires (shouldn't happen), don't spin forever.
    timer = setTimeout(() => setBootstrapped(true), 4000);
    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  if (!bootstrapped) {
    const processing =
      typeof window !== "undefined" &&
      (window.location.hash.includes("access_token=") ||
        window.location.hash.includes("code=") ||
        window.location.search.includes("code="));
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-muted-foreground">
            {processing ? "Finishing sign-in…" : "Loading…"}
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  if (!isAdminEmail(session.user.email)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Not authorized</h1>
          <p className="mt-3 text-muted-foreground">
            Signed in as <b>{session.user.email}</b>, but only <b>{ADMIN_EMAILS.join(" / ")}</b>{" "}
            can manage posts.
          </p>
          <button
            onClick={logout}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:border-destructive hover:text-destructive"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return <AdminPanel session={session} onLogout={logout} />;
}
