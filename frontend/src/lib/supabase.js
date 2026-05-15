import { createClient } from "@supabase/supabase-js";

// Anon/publishable key is safe to expose in client code — Row Level Security on the
// posts table restricts writes to the two admin emails below. Hardcoded so prod
// builds work without per-environment env var configuration.
const SUPABASE_URL = "https://uurfbgddliqsalusctqs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cmZiZ2RkbGlxc2FsdXNjdHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MTkxMjQsImV4cCI6MjA5NDM5NTEyNH0.CUfOqKbyFUcoqJ-z9NDi50ur3nM55THDPyTfCDUd1KE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
});

export const ADMIN_EMAILS = ["ashish@scaleupcfo.in", "pratiksha@scaleupcfo.in"];

export const isAdminEmail = (email) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());

export async function fetchPublishedPosts(limit = 12) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}
