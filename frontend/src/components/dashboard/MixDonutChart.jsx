import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const MixDonutChart = ({ title, data, delay = 0 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="glass-card rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 14%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value) => [
                `${((value / total) * 100).toFixed(1)}%`,
                "",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-foreground font-medium">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};