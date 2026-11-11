import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CubeIcon } from "@heroicons/react/24/outline";
import { getTopSellingProducts } from "../services/dashBoardService";
import { formatCurrency } from "@/shared/utils";
import LoadingAdminSite from "@/components/reusable/LoadingAdminSite";
import { MONTHS } from "@/locales/es";
import { useQueryErrorHandler } from "@/hooks/useQueryErrorHandler";

export default function TopProductsTable() {
  // Mes actual por defecto
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));

  const { data, isLoading, error } = useQuery({
    queryKey: ["topProducts", month],
    queryFn: () => getTopSellingProducts(month),
  });

  const monthLabel = MONTHS.find((m) => m.value === month)?.label;

  useQueryErrorHandler(error);

  if (isLoading) return <LoadingAdminSite />;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center gap-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Productos Estrella (Top 10)
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

      <p className="px-4 pt-2 text-[11px] text-slate-400">
        Productos más vendidos en {monthLabel} {new Date().getFullYear()}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-4 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                SKU
              </th>
              <th className="px-4 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                Stock
              </th>
              <th className="px-4 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                Vendidos
              </th>
              <th className="px-4 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">
                Ingresos
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data?.map((product, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-2.5 flex items-center gap-3">
                  <div className="w-7 h-7 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <CubeIcon className="w-3.5 h-3.5" />
                  </div>

                  <span
                    className="text-xs font-medium text-slate-700 truncate max-w-50"
                    title={product.name}
                  >
                    {product.name}
                  </span>
                </td>

                <td className="px-4 py-2.5 text-xs text-slate-500 text-center font-mono">
                  {product.sku}
                </td>

                <td className="px-4 py-2.5 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                      product.stock < 5
                        ? "bg-red-50 text-red-700 border-red-100 ring-1 ring-inset ring-red-600/10"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {product.stock} {product.stock === 1 ? "ud." : "uds."}
                  </span>
                </td>

                <td className="px-4 py-2.5 text-xs font-bold text-slate-700 text-center">
                  {product.soldCount}
                </td>

                <td className="px-4 py-2.5 text-xs font-semibold text-slate-800 text-right">
                  {formatCurrency(product.totalRevenue)}
                </td>
              </tr>
            ))}

            {(!data || data.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-xs text-slate-400 py-8"
                >
                  No hay productos vendidos en {monthLabel}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
