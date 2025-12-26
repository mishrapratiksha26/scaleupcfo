import ProductsNav from "./ProductsNav"; // Adjust path
import { LiveDashboardGraphic } from "./DashboardGraphic";
import {ARAPGraphic} from "./ARAPGraphic";
import {TreasuryGraphic} from "./TreasuryGraphic";
import { SalesToCashGraphic } from "./SalesToCashGraphic";
import { TDSGraphic } from "./TDSGraphic";

const GMEET_BOOKING_URL = "https://calendar.app.google/68pzDLFzNKqkoAgUA";

export default function Product() {
  const features = [
    {
      id: "product-dashboard",
      icon: LiveDashboardGraphic,   
      title: "AI Dashboard: CFO Control Center",
      description:
        "Your single source of truth. Real-time cash position, AR aging, AP maturity, treasury positions, compliance status—all at a glance. AI reasoning explains the \"why\" behind every number.",
      points: [
        "Multi-agent orchestration: Dashboard agent pulls data from 5+ systems",
        "Reasoning engine: AI explains cash changes, trend anomalies",
        "Predictive alerts: Warns of liquidity gaps 30 days ahead",
        "Export to boardroom: One-click executive summary (PDF, PPT)",
        "Custom KPIs: Build any metric, any frequency"
      ],
      cta: "Explore Dashboard →",
    },
    {

      id: "product-ar-ap",
      icon: ARAPGraphic,
      title: "AR/AP: Zero-Touch Operations",
      description:
        "Invoice ingestion → GL coding → accounting entry. Zero humans needed. Learn from your GL history, coding patterns, and exception rules to improve over time.",
      points: [
        "Smart ingestion: OCR + AI for vendor data extraction",
        "GL learning: 92% accuracy after first 1000 invoices",
        "Exception management: Escalate only four exceptions (2–3x/vendor)",
        "Early-discount capture: Auto-flag payment opportunities",
        "Multi-entity support: Consolidate across 100+ entities"
      ],
      cta: "Explore AR/AP →",
    },
    {
      id: "product-treasury",
      icon: TreasuryGraphic,
      title: "Treasury: Liquidity at Your Fingertips",
      description:
        "Multi-bank, multi-currency cash orchestration. Predict tomorrow's positions. Alert if scenarios hit repos, acquisitions, or market shocks. Never miss a liquidity opportunity.",
      points: [
        "100+ bank integrations: Real-time balance feeds",
        "FX automation: Spot/forward rate optimization",
        "Forecasting engine: 30-90 day projections with ±85% accuracy",
        "Scenario builder: Test acquisition, IPO, or market impacts",
        "Compliance tracking: Covenant monitoring, hedge accounting"
      ],
      cta: "Explore Treasury →",
    },
    {
      id: "product-sales-to-cash",
      icon: SalesToCashGraphic,
      title: "Sales-to-Cash: 80% Faster Collections",
      description:
        "From order creation to cash receipt, fully automated. AI resolves customer payments in seconds, flags disputed cash? Flexed and unarmed collections.",
      points: [
        "Order-to-invoice: 10-second automation cycle",
        "Smart matching: Customer name variations, partial payments, credits",
        "Unapplied cash discovery: 60% faster than manual methods",
        "DSO optimization: 20-40% reduction in Days Sales Outstanding",
        "AR follow-up: Auto-trigger dunning sequences, escalations",
      ],
      cta: "Explore S2C →",
    },
    {
      id: "product-tds",
      icon: TDSGraphic,
      title: "TDS Reconciliation: India Compliance Made Easy",
      description:
        "TDS reconciliation shouldn't consume 3 weeks of your time. Auto-match 26AS certificates. Flag mismatches. Auto-correct within allowed tolerances. Zero manual spreadsheets.",
      points: [
        "26AS matching: AI sync all TDS transactions vs government records",
        "Auto-correction: Minimizes tolerance with claimant follow-up",
        "GST integration: 10x on GSTR/2A/2B/3B reconciliation",
        "Compliance calendar: All TDS due dates, quarterly schedules",
        "Deductor communication: Auto-email templates for mismatches"
      ],
      cta: "Explore TDS →",
    }
  ];

  return (
    <section className="features-detail product-section" id="platform">
      <div className="container">
        <div className="section-header">
          <h2>AI-Powered CFO Modules</h2>
          <p>
            Enterprise-grade automation with human expertise. Each module works
            standalone or together for complete finance transformation.
          </p>
        </div>

        <ProductsNav />

        {features.map((f, i) => {
          const IconComponent =
            typeof f.icon === "function" ? f.icon : null; // detect component

          return (
            <div
              className="feature-row product-block"
              key={f.id ?? i}
              id={f.id}
            >

              <div className="feature-visual">

                  {IconComponent ? <IconComponent /> : <span className="product-icon">{f.icon}</span>}
                </div>


              <div className="feature-content">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <ul className="feature-list">
                  {f.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                <a
                  href={GMEET_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more"
                >
                  {f.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
