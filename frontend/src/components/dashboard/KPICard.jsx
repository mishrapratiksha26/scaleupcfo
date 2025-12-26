import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "./utils";

export const KPICard = ({ title, value, change, changeLabel, icon, delay = 0 }) => {
  const isPositive = change >= 0;

  return (
    <div
      className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full",
            isPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-2 block">{changeLabel}</span>
    </div>
  );
};