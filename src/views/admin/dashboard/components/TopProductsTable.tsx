import { useQuery } from "@tanstack/react-query";
import { CubeIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import { getTopSellingProducts } from "../services/dashBoardService";
import { formatCurrency } from "@/shared/utils";


export default function TopProductsTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topProducts"],
    queryFn: getTopSellingProducts,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center min-h-62.5">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-slate-100 border-t-blue-500 animate-spin rounded-full shadow-sm" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            Cargando productos...
          </span>
        </div>
      </div>
    );
  }

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-800">
          Productos Estrella (Top 10)
        </h2>
      </div>

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

                {/* Indicador visual de Stock */}
                <td className="px-4 py-2.5 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
                      product.stock < 5
                        ? "bg-red-50 text-red-700 border-red-100 ring-1 ring-inset ring-red-600/10" // Alerta roja si queda poco
                        : "bg-slate-50 text-slate-600 border-slate-200" // Normal
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
