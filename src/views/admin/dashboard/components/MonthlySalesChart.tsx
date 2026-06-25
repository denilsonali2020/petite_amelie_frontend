import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCurrentYearMonthlySales } from "../services/dashBoardService";
import { Navigate } from "react-router-dom";
import { formatCurrency } from "@/shared/utils";


export default function MonthlySalesChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["monthlySalesCurrentYear"],
    queryFn: getCurrentYearMonthlySales,
  });

  if (isLoading)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-emerald-100 border-t-emerald-500 animate-spin rounded-full" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            Cargando...
          </span>
        </div>
      </div>
    );

  if (isError) return <Navigate to={"/404"} />;

  const chartData = data
    ? [
        { name: "Ene", total: data.enero || 0 },
        { name: "Feb", total: data.febrero || 0 },
        { name: "Mar", total: data.marzo || 0 },
        { name: "Abr", total: data.abril || 0 },
        { name: "May", total: data.mayo || 0 },
        { name: "Jun", total: data.junio || 0 },
        { name: "Jul", total: data.julio || 0 },
        { name: "Ago", total: data.agosto || 0 },
        { name: "Sep", total: data.septiembre || 0 },
        { name: "Oct", total: data.octubre || 0 },
        { name: "Nov", total: data.noviembre || 0 },
        { name: "Dic", total: data.diciembre || 0 },
      ]
    : [];

  return (
    <div className="w-full mt-4 min-h-64">
      <ResponsiveContainer width="100%" height={256}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 0, left: -25, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 9 }}
            tickFormatter={(value: number) => `$${value / 1000}k`}
          />
          <Tooltip
            cursor={{
              stroke: "#10b981",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              fontSize: "12px",
            }}
            formatter={(value) => [formatCurrency(value as number), "Ingresos"]}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
            activeDot={{
              r: 5,
              fill: "#10b981",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
