import ProductsNav from "./ProductsNav";
import { LiveDashboardGraphic } from "./DashboardGraphic";
import { ARAPGraphic } from "./ARAPGraphic";
import { TreasuryGraphic } from "./TreasuryGraphic";
import { SalesToCashGraphic } from "./SalesToCashGraphic";
import { TDSGraphic } from "./TDSGraphic";
import CalBookingButton from "./DemoBookingButton";

export default function Product() {
  const features = [
    {
      id: "product-dashboard",
      icon: LiveDashboardGraphic,
      title: "AI Dashboard: CFO Control Center",
      description: "Your single source of truth...",
      points: [
        "Multi-agent orchestration: Dashboard agent pulls data from 5+ systems",
        "Reasoning engine: AI explains cash changes, trend anomalies",
        "Predictive alerts: Warns of liquidity gaps 30 days ahead",
        "Export to boardroom: One-click executive summary (PDF, PPT)",
        "Custom KPIs: Build any metric, any frequency",
      ],
      cta: "Explore Dashboard →",
    },
    {
      id: "product-ar-ap",
      icon: ARAPGraphic,
      title: "AI AR/AP: Autonomous Cash Operations",
      description: "No manual follow-ups needed...",
      points: [
        "Autonomous AR tracking...",
        "Behavior-based reminders...",
        "Zero-touch collections...",
        "PO-matched AP processing...",
        "One-click vendor payments...",
        "Multi-entity support...",
      ],
      cta: "Explore AI AR/AP →",
    },
    {
      id: "product-treasury",
      icon: TreasuryGraphic,
      title: "Treasury: Liquidity at Your Fingertips",
      description: "Multi-bank, multi-currency cash orchestration...",
      points: [
        "100+ bank integrations...",
        "FX automation...",
        "Forecasting engine...",
        "Scenario builder...",
        "Compliance tracking...",
      ],
      cta: "Explore Treasury →",
    },
    {
      id: "product-sales-to-cash",
      icon: SalesToCashGraphic,
      title: "AI Sales-to-Cash Reconciliation",
      description: "Resolves partial receipts, timing gaps...",
      points: [
        "Real-time reconciliation...",
        "Intelligent matching engine...",
        "Exception-first workflow...",
        "Audit-ready trail...",
      ],
      cta: "Explore Sales-to-Cash Reconciliation →",
    },
    {
      id: "product-tds",
      icon: TDSGraphic,
      title: "AI TDS Reconciliation",
      description: "Tax and withholding reconciliation shouldn’t slow down your close.",
      points: [
        "Automated authority alignment...",
        "Intelligent variance handling...",
        "Indirect tax coverage...",
        "Compliance calendar...",
        "Stakeholder follow-ups...",
      ],
      cta: "Explore Tax Reconciliation →",
    },
  ];

  return (
    <section className="relative py-20 text-white bg-black" id="products">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#34D399] via-white to-gray-300 bg-clip-text text-transparent mb-4">
            AI-Powered CFO Modules
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade automation with human expertise. Each module works standalone or together for complete finance transformation.
          </p>
        </div>

        <ProductsNav />

        <div className="space-y-20 mt-16">
          {features.map((f, i) => {
            const IconComponent = typeof f.icon === "function" ? f.icon : null;
            const isEven = i % 2 === 0;

            return (
              <div
                key={f.id}
                id={f.id}   
                className={`flex flex-col bg-gradient-to-br from-black via-gray-900 to-black 
             backdrop-blur-xl lg:flex-row items-center gap-10 bg-white/15 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-[#34D399]/20 transition-all ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div className="w-full lg:w-1/2">
                  {IconComponent ? <IconComponent /> : <span className="product-icon">{f.icon}</span>}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-300 mb-4">{f.description}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
                    {f.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  <CalBookingButton
                    title={f.cta}
                    module_name={f.title}
                    className="px-5 py-3 bg-[#34D399] text-black font-semibold rounded-md hover:brightness-125 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}