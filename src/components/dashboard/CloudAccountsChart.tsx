import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "../ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Connected", value: 2, color: "#6366f1" },
  { name: "Not Connected", value: 2, color: "#e2e8f0" },
];

export const CloudAccountsChart = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-[300px] relative flex flex-col justify-center items-center">
      <ChartContainer
        className="!aspect-auto h-[180px] w-[180px]"
        config={{
          connected: { theme: { light: "#6366f1", dark: "#818cf8" } },
          notConnected: { theme: { light: "#e2e8f0", dark: "#475569" } },
        }}
      >
        <PieChart width={180} height={180}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
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
      <div className="mt-4 w-full flex justify-center">
        <div className="flex items-center justify-center gap-8">
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
    </div>
  );
};
