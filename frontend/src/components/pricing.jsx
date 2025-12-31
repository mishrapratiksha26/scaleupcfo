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
  {sortedPlans.map((plan, i) => {
    const isLast = i === sortedPlans.length - 1;
    return (
      <div
  key={plan.name}
  className="relative flex flex-col justify-between 
             bg-gradient-to-br from-black via-gray-900 to-black 
             backdrop-blur-xl border-t border-b border-white/10 
             border-l-4 border-r-4 border-[#34D399] 
             rounded-xl p-4 sm:p-5 shadow-md 
             hover:shadow-[#34D399]/30 hover:border-[#34D399]/60 
             transition-all h-full"
>
        {/* Optional top tag */}


        {/* Heading */}
        <div className="text-center min-h-[48px] flex items-center justify-center">
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
        </div>

        {/* Description */}
        <div className="mt-2 text-center">
          <p className="text-gray-300 text-sm">{plan.description}</p>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <CalBookingButton
            title="Book Demo"
            module_name={plan.name}
            className="inline-block px-3 py-1.5 bg-[#34D399] text-black text-sm font-medium rounded-md hover:brightness-110 hover:shadow-md transition-all duration-300 max-w-[120px]"
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
