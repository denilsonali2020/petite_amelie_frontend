import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { getTopSellingSubcategories } from "../services/dashBoardService";
import LoadingAdminSite from "@/components/reusable/LoadingAdminSite";
import { MONTHS } from "@/locales/es";
import { useQueryErrorHandler } from "@/hooks/useQueryErrorHandler";

const PIE_COLORS = [
  "#0247DB",
  "#DE2000",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export default function TopSubcategoriesChart() {
  // Mes actual por defecto (getMonth() va de 0 a 11, por eso el +1)
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));

  const { data, isLoading, error } = useQuery({
    queryKey: ["topSubcategories", month], // <- el mes cambia la key
    queryFn: () => getTopSellingSubcategories(month), // <- pasamos el mes
  });

  useQueryErrorHandler(error);

  const monthLabel = MONTHS.find((m) => m.value === month)?.label;

  const totalUnits = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  const chartData =
    data?.map((entry, index) => ({
      ...entry,
      fill: PIE_COLORS[index % PIE_COLORS.length],
    })) || [];

  return (
    <div className="xl:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h2 className="text-sm font-semibold text-slate-800">
          Categorías más vendidas
        </h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 bg-white"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <p className="text-[11px] text-slate-400 mb-2">
        Unidades vendidas en {monthLabel} {new Date().getFullYear()}
      </p>

      {isLoading ? (
        <LoadingAdminSite />
      ) : chartData.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-8">
          No hay ventas registradas en {monthLabel}.
        </p>
      ) : (
        <>
          <div className="w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                />
                <Tooltip
                  wrapperStyle={{ zIndex: 100 }}
                  formatter={(value, name) => {
                    if (typeof value === "number") {
                      return [`${value} uds.`, name];
                    }
                    return [value, name];
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "11px",
                    padding: "4px 8px",
                    backgroundColor: "#ffffff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-slate-800">
                {totalUnits >= 1000
                  ? `${(totalUnits / 1000).toFixed(1)}k`
                  : totalUnits}
              </span>
              <span className="text-[10px] text-slate-400">Total Uds.</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {chartData.slice(0, 6).map((cat, i) => (
              <div
                key={i}
                className="flex items-start justify-between text-xs gap-2"
              >
                <div className="flex items-start gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0 mt-0.75"
                    style={{ backgroundColor: cat.fill }}
                  ></div>
                  <span className="text-slate-500 wrap-break-word leading-tight">
                    {cat.name}
                  </span>
                </div>
                <span className="font-medium text-slate-700 shrink-0">
                  {cat.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
