import { ChartContainer } from "../ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Failed", value: 1689, color: "#ef4444" },
  { name: "Warning", value: 681, color: "#eab308" },
  { name: "Not available", value: 36, color: "#cbd5e1" },
  { name: "Passed", value: 7253, color: "#22c55e" },
];

export const RiskAssessmentChart = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-[300px] flex flex-col justify-center items-center">
      <div className="relative h-[200px] w-full flex justify-center">
        <ChartContainer
          config={{
            failed: { theme: { light: "#ef4444", dark: "#dc2626" } },
            warning: { theme: { light: "#eab308", dark: "#ca8a04" } },
            notAvailable: { theme: { light: "#cbd5e1", dark: "#64748b" } },
            passed: { theme: { light: "#22c55e", dark: "#16a34a" } },
          }}
        >
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 w-full justify-center">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
