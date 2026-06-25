import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts"; // <-- Quitamos 'Cell' de aquí
import { Navigate } from "react-router-dom";
import { getTopSellingSubcategories } from "../services/dashBoardService";

const PIE_COLORS = [
  "#0247DB", // Azul fuerte
  "#DE2000", // Rojo vibrante
  "#10b981", // Verde esmeralda
  "#f59e0b", // Ámbar/Naranja
  "#8b5cf6", // Morado
  "#ec4899", // Rosa
];

export default function TopSubcategoriesChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topSubcategories"],
    queryFn: getTopSellingSubcategories,
  });

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            Cargando...
          </span>
        </div>
      </div>
    );

  if (isError) return <Navigate to={"/404"} />;

  const totalUnits = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  const chartData =
    data?.map((entry, index) => ({
      ...entry,
      fill: PIE_COLORS[index % PIE_COLORS.length],
    })) || [];

  return (
    <div className="xl:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col">
      <h2 className="text-sm font-semibold text-slate-800 mb-2">
        Categorias con mayor ganancia
      </h2>

      <div className="w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            {/* Ahora el Pie es autocompleto y lee el 'fill' desde chartData */}
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

        {/* Texto en el centro del Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold text-slate-800">
            {totalUnits >= 1000
              ? `${(totalUnits / 1000).toFixed(1)}k`
              : totalUnits}
          </span>
          <span className="text-[10px] text-slate-400">Total Uds.</span>
        </div>
      </div>

      {/* Leyenda personalizada dinámica */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {chartData.slice(0, 6).map((cat, i) => (
          <div
            key={i}
            className="flex items-start justify-between text-xs gap-2"
          >
            <div className="flex items-start gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-0.75"
                style={{ backgroundColor: cat.fill }} // <- Leemos el color desde los datos
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
    </div>
  );
}
