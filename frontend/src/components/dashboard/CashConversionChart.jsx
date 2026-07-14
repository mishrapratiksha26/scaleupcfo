import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "W1", ccc: 45, target: 40 },
  { week: "W2", ccc: 42, target: 40 },
  { week: "W3", ccc: 38, target: 40 },
  { week: "W4", ccc: 35, target: 40 },
  { week: "W5", ccc: 33, target: 40 },
  { week: "W6", ccc: 31, target: 40 },
  { week: "W7", ccc: 29, target: 40 },
  { week: "W8", ccc: 28, target: 40 },
];

export const CashConversionChart = () => {
  return (
    <div
      className="glass-card border-none rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: "400ms" }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Cash Conversion Cycle
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis
              dataKey="week"
              stroke="hsl(220, 9%, 46%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
  width={30}
  stroke="hsl(220, 9%, 46%)"
  fontSize={12}
  tickLine={false}
  axisLine={false}
  domain={[20, 50]}
  tickFormatter={(v) => `${v}d`}
/>

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                color: "hsl(221, 39%, 11%)",
              }}
              formatter={(value) => [`${value} days`, ""]}
            />
            <Line
              type="monotone"
              dataKey="ccc"
              stroke="hsl(175, 77%, 26%)"
              strokeWidth={2}
              dot={{ fill: "hsl(175, 77%, 26%)", strokeWidth: 0, r: 4 }}
              name="CCC"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="hsl(32, 95%, 44%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-warning" />
          <span className="text-xs text-muted-foreground">Target</span>
        </div>
      </div>
    </div>
  );
};