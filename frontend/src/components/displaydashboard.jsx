// src/components/IndexDashboardShowcase.jsx
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Header } from "./dashboard/Header";
import { KPICard } from "./dashboard/KPICard";
import { CashConversionChart } from "./dashboard/CashConversionChart";
import { MixDonutChart } from "./dashboard/MixDonutChart";
import { AnalysisPanel } from "./dashboard/AnalysisPanel";
import { ChatInput } from "./dashboard/ChatInput";
import { SelectionOverlay } from "./dashboard/SelectionOverlay";
import { WaitlistButton } from "./waitlist";

const productMixData = [
  { name: "Premium", value: 42, color: "hsl(174, 72%, 56%)" },
  { name: "Standard", value: 35, color: "hsl(262, 83%, 58%)" },
  { name: "Basic", value: 23, color: "hsl(38, 92%, 50%)" },
];

const channelMixData = [
  { name: "Direct", value: 45, color: "hsl(174, 72%, 56%)" },
  { name: "Partner", value: 30, color: "hsl(340, 82%, 52%)" },
  { name: "Organic", value: 25, color: "hsl(200, 98%, 39%)" },
];

const customerMixData = [
  { name: "Enterprise", value: 52, color: "hsl(174, 72%, 56%)" },
  { name: "SMB", value: 33, color: "hsl(262, 83%, 58%)" },
  { name: "Startup", value: 15, color: "hsl(38, 92%, 50%)" },
];

const Index = () => {
  const handleSendMessage = (message) => {
    toast.success("Analyzing your question...", {
      description: message,
      duration: 3000,
    });
  };

  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Gradient background for the section */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black z-[-1]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#34D399] via-white to-gray-300 bg-clip-text text-transparent">
            AI CFO Dashboard
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real-time visibility and predictive insights for CFOs.
          </p>
        </div>

        {/* Dashboard container keeps its original background */}
        <div className="min-h-[540px] max-h-[720px] md:max-h-none flex flex-col bg-background overflow-hidden shadow-2xl">
          <Header />

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Main Content with Selection Overlay */}
            <SelectionOverlay>
              <div className="p-4 md:p-6 overflow-y-auto">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
                  <KPICard
                    title="Revenue"
                    value="$8.8M"
                    change={18}
                    changeLabel="vs last quarter"
                    icon={<DollarSign className="w-4 h-4" />}
                    delay={0}
                  />
                  <KPICard
                    title="Profit"
                    value="$3.5M"
                    change={22}
                    changeLabel="vs last quarter"
                    icon={<TrendingUp className="w-4 h-4" />}
                    delay={50}
                  />
                  <KPICard
                    title="AOV"
                    value="$85"
                    change={12}
                    changeLabel="vs last quarter"
                    icon={<ShoppingCart className="w-4 h-4" />}
                    delay={100}
                  />
                  <KPICard
                    title="Repeat Order %"
                    value="68%"
                    change={-3}
                    changeLabel="vs last quarter"
                    icon={<RotateCcw className="w-4 h-4" />}
                    delay={150}
                  />
                  <KPICard
                    title="Cash Runway"
                    value="18mo"
                    change={28}
                    changeLabel="vs last quarter"
                    icon={<Wallet className="w-4 h-4" />}
                    delay={200}
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                  <CashConversionChart />
                  <MixDonutChart
                    title="Product Mix"
                    data={productMixData}
                    delay={500}
                  />
                  <MixDonutChart
                    title="Channel Mix"
                    data={channelMixData}
                    delay={550}
                  />
                  <MixDonutChart
                    title="Customer Mix"
                    data={customerMixData}
                    delay={600}
                  />
                </div>
              </div>
            </SelectionOverlay>

            {/* Analysis Panel */}
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border/50 p-4 overflow-y-auto max-h-64 lg:max-h-none">
              <AnalysisPanel />
            </div>
          </div>

         {/* Chat Input */}
<div className="px-4 md:px-6 pb-4 pt-2 bg-background">
  <ChatInput onSend={handleSendMessage} />
</div>
</div>

{/* Waitlist CTA */}
<div className="mt-12 flex justify-center">
  <WaitlistButton className="px-5 py-3 bg-[#34D399] text-black font-semibold rounded-md hover:brightness-125 hover:shadow-lg hover:scale-105 transition-all duration-300" />

</div>
</div>
</section>
  );
};

export default Index;