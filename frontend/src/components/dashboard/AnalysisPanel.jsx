import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const insights = [
  {
    type: "positive",
    title: "Revenue Growth Accelerating",
    description:
      "Q4 revenue is up 18% YoY, outpacing industry average of 12%. Strong performance in enterprise segment driving growth.",
  },
  {
    type: "warning",
    title: "CAC Trending Up",
    description:
      "Customer acquisition costs increased 8% this quarter. Consider optimizing paid channels and increasing organic reach.",
  },
  {
    type: "insight",
    title: "LTV:CAC Ratio Strong",
    description:
      "Current ratio of 6.2:1 indicates healthy unit economics. Opportunity to invest more aggressively in growth.",
  },
  {
    type: "positive",
    title: "Cash Position Improving",
    description:
      "Cash runway extended to 18 months with improved collections. DSO reduced from 45 to 32 days.",
  },
  // {
  //   type: "insight",
  //   title: "Product Mix Shift",
  //   description:
  //     "Premium tier now represents 42% of revenue, up from 28% last year. Focus on upselling is working.",
  // },
];

const getIcon = (type) => {
  switch (type) {
    case "positive":
      return <TrendingUp className="w-4 h-4 text-success" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case "insight":
      return <Lightbulb className="w-4 h-4 text-primary" />;
    default:
      return null;
  }
};

const getBorderColor = (type) => {
  switch (type) {
    case "positive":
      return "border-l-success";
    case "warning":
      return "border-l-warning";
    case "insight":
      return "border-l-primary";
    default:
      return "";
  }
};

export const AnalysisPanel = () => {
  return (
    <div className="glass-card border-none rounded-lg p-5 h-full flex flex-col animate-slide-in-right">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">AI Analysis</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-3 rounded-md bg-secondary/50 ${getBorderColor(
              insight.type
            )} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-1">
              {getIcon(insight.type)}
              <span className="text-sm font-medium text-foreground">
                {insight.title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};