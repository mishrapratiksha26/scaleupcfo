// Services tab embeds the full Lekha AI mini-site (Home / How it works / Pricing)
// as a static asset under public/lekha/. The iframe fills the viewport; the
// floating back arrow returns to the main ScaleupCFO homepage (with its navbar).

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Visually-hidden but screen-reader-and-crawler-readable.
const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Lekha AI — AI Bookkeeping & Close-as-a-Service for Indian SMBs | ScaleupCFO</title>
        <meta
          name="description"
          content="Lekha AI is our AI-native bookkeeping product. Bank, GST, TDS reconciliation by AI agents, signed off by Chartered Accountants. Books closed by day 5. From ₹2,499/mo."
        />
        <link rel="canonical" href="https://scaleupcfo.in/ai-native-services" />
        <meta property="og:title" content="Lekha AI — AI Bookkeeping for Indian SMBs | ScaleupCFO" />
        <meta
          property="og:description"
          content="Bank, GST, TDS reconciliation by AI agents. CA sign-off on every monthly close. From ₹2,499/mo."
        />
        <meta property="og:url" content="https://scaleupcfo.in/ai-native-services" />
      </Helmet>

      {/* H1 for crawlers; visually hidden so it doesn't disrupt the iframe layout. */}
      <h1 style={srOnly}>
        Lekha AI — AI-native bookkeeping &amp; monthly book close for Indian SMBs
      </h1>

      <iframe
        src="/lekha/homepage.html"
        title="Lekha AI"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
          background: "#FAFAF8",
          zIndex: 1,
        }}
      />
      <Link
        to="/"
        aria-label="Back to ScaleupCFO home"
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
          boxShadow: "0 6px 20px -8px rgba(10,15,28,0.18), 0 2px 4px rgba(10,15,28,0.04)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(-2px)";
          e.currentTarget.style.boxShadow =
            "0 10px 24px -8px rgba(10,15,28,0.22), 0 3px 6px rgba(10,15,28,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow =
            "0 6px 20px -8px rgba(10,15,28,0.18), 0 2px 4px rgba(10,15,28,0.04)";
        }}
      >
        <ArrowLeft size={16} strokeWidth={2.25} />
        Back
      </Link>
    </>
  );
}
