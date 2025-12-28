import ProductsNav from "./ProductsNav";
import { LiveDashboardGraphic } from "./DashboardGraphic";
import {ARAPGraphic} from "./ARAPGraphic";
import {TreasuryGraphic} from "./TreasuryGraphic";
import { SalesToCashGraphic } from "./SalesToCashGraphic";
import { TDSGraphic } from "./TDSGraphic";
import { trackExploreClick } from "../utils/analytics";

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
      title: "AI AR/AP: Autonomous Cash Operations",
      description:
        "No manual follow-ups needed. AI learns from customer and vendor behavior, payment cycles, and historical actions to automate collections, payables, and closures end to end.",
      points: [
        "Autonomous AR tracking: Monitor open invoices, pending cash, and aging in real time",
        "Behavior-based reminders: Auto-trigger follow-ups based on learned payment patterns",
        "Zero-touch collections: Resolve routine AR without human intervention",
        "PO-matched AP processing: Match invoices against PO, GRN, and contract terms",
        "One-click vendor payments: Bulk approve and pay all compliant invoices",
        "Multi-entity support: Operate AR/AP seamlessly across 100+ entities"
      ],
      cta: "Explore AI AR/AP →",
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
      title: "AI Sales-to-Cash Reconciliation",
      description:
        "Our Sales-to-Cash Reconciliation module resolves Partial receipts, timing gaps, references mismatches before month-end, enabling same-day closure.",
      points: [
        "Real-time reconciliation : Continuous matching of invoices, credit notes, and bank credits throughout the month",
        "Intelligent matching engine : Handles customer name variations, partial payments, split receipts, advances, and adjustments",
        "Exception-first workflow : Only unresolved items surface for review; clean transactions auto-close",
        "Audit-ready trail : Every match, override, and exception logged with full traceability",
      ],
      cta: "Explore Sales-to-Cash Reconciliation →",
    },
    {
      id: "product-tds",
      icon: TDSGraphic,
      title: "AI TDS Reconciliation",
      description:
        "Tax and withholding reconciliation shouldn’t slow down your close.",
      points: [
        "Automated authority alignment: Reconcile tax and withholding data against filed returns",
        "Intelligent variance handling: Detect, explain, and resolve timing and rounding differences",
        "Indirect tax coverage: Unified view across sales tax and related filings",
        "Compliance calendar: All filing deadlines, payments, and review checkpoints in one place",
        "Stakeholder follow-ups: Auto-generated requests for missing or inconsistent tax details"
      ],
      cta: "Explore Tax Reconciliation →",
    }
  ];

  return (
    <section className="features-detail product-section" id="products">
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

              <div>

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
                <button
                  className="learn-more"
                  onClick={() => trackExploreClick(f.cta, GMEET_BOOKING_URL)}
                >
                  {f.cta}
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
