import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4200, margin: 1680 },
  { month: "Feb", revenue: 4800, margin: 1920 },
  { month: "Mar", revenue: 5100, margin: 2040 },
  { month: "Apr", revenue: 4900, margin: 1960 },
  { month: "May", revenue: 5600, margin: 2240 },
  { month: "Jun", revenue: 6200, margin: 2480 },
  { month: "Jul", revenue: 6800, margin: 2720 },
  { month: "Aug", revenue: 7100, margin: 2840 },
  { month: "Sep", revenue: 6900, margin: 2760 },
  { month: "Oct", revenue: 7500, margin: 3000 },
  { month: "Nov", revenue: 8200, margin: 3280 },
  { month: "Dec", revenue: 8800, margin: 3520 },
];

export const RevenueChart = () => {
  return (
    <div
      className="glass-card rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: "200ms" }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Revenue & Margin Trends
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(174, 72%, 56%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(174, 72%, 56%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(262, 83%, 58%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(262, 83%, 58%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 22%)" />
            <XAxis
              dataKey="month"
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="margin"
              stroke="hsl(262, 83%, 58%)"
              strokeWidth={2}
              fill="url(#marginGradient)"
              name="Margin"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-xs text-muted-foreground">Margin</span>
        </div>
      </div>
    </div>
  );
};