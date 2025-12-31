import { trackExploreClick } from "../utils/analytics";
import CalBookingButton from "./DemoBookingButton";

export default function Pricing() {
  const plans = [
    {
      name: "AI Dashboard",
      description: "Real-time financial visibility",
    },
    {
      name: "AR/AP Module",
      description: "90%+ touchless processing",
    },
    {
      name: "Treasury Module",
      description: "Multi-bank liquidity control",
    },
    {
      name: "Sales-to-Cash",
      description: "Order-to-payment automation",
    },
    {
      name: "TDS Module",
      description: "India compliance automation",
    },
    {
      name: "Complete Suite",
      description: "All modules + certified accountants",
      featured: true,
    },
  ];

  const sortedPlans = [
    ...plans.filter((p) => !p.featured),
    ...plans.filter((p) => p.featured),
  ];

  return (
    <section
      className="pricing"
      style={{ backgroundColor: "black", color: "white", padding: "3rem 0" }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="section-header text-center mb-12">
          <h2 className="text-4xl font-bold text-white" style={{ color: "white" }}>Pricing Built for Scale</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-2">
            Module-based: pick what you need. Start with one module, add others
            as you scale. All prices include certified accountant support & 24/7
            infrastructure monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
          {sortedPlans.map((plan, i) => (
            <div
              key={plan.name}
              className="flex flex-col justify-between bg-white/15 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-amber-500/20 transition-all h-full"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300">{plan.description}</p>
              </div>
              <div className="mt-6 text-center">
                <CalBookingButton
                  title="Book Demo"
                  module_name={plan.name}
                  className="px-5 py-3 bg-[#34D399] text-black font-semibold rounded-md hover:brightness-125 hover:shadow-lg hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
