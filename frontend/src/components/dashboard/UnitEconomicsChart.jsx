import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { metric: "CAC", value: 45, benchmark: 50 },
  { metric: "LTV", value: 280, benchmark: 250 },
  { metric: "AOV", value: 85, benchmark: 75 },
  { metric: "Payback", value: 4, benchmark: 6 },
];

export const UnitEconomicsChart = () => {
  return (
    <div
      className="glass-card rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Unit Economics
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(222, 30%, 22%)"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="metric"
              type="category"
              stroke="hsl(215, 20%, 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(174, 72%, 56%)"
              radius={[0, 4, 4, 0]}
              name="Actual"
            />
            <Bar
              dataKey="benchmark"
              fill="hsl(222, 30%, 35%)"
              radius={[0, 4, 4, 0]}
              name="Benchmark"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span className="text-xs text-muted-foreground">Benchmark</span>
        </div>
      </div>
    </div>
  );
};