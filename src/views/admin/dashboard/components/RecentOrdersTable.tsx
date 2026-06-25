import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getRecentOrders } from "../services/dashBoardService";
import { getStatusConfig } from "../../orders/utils";
import { formatCurrency } from "@/shared/utils";

// Tipos
type OrderStatus =
  | "PAID"
  | "DELIVERED"
  | "PREPARING"
  | "READY"
  | "SHIPPED"
  | "PENDING"
  | "CANCELLED"
  | "REFUNDED";

export default function RecentOrdersTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: getRecentOrders,
  });

  if (isLoading) {
    return (
      <div className="xl:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center min-h-75">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-emerald-100 border-t-emerald-500 animate-spin rounded-full" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            Cargando pedidos...
          </span>
        </div>
      </div>
    );
  }

  if (isError) return <Navigate to={"/404"} />;

  // Ya no necesitamos duplicar datos. Usamos los datos reales o un arreglo vacío.
  const orders = data || [];

  return (
    <div className="xl:col-span-8 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      
      {/* Estilos para un scrollbar minimalista y profesional */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-400 */
        }
      `}</style>

      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center z-10 bg-white">
        <h2 className="text-sm font-semibold text-slate-800">
          Últimos Pedidos
        </h2>
        <button className="text-xs text-blue-600 font-medium hover:underline">
          Ver todos
        </button>
      </div>

      <div className="flex-1 flex flex-col relative bg-white">
        {/* ENCABEZADOS (Fijos) */}
        <div className="grid grid-cols-[1fr_1.5fr_1.2fr_1fr] border-b border-slate-100 bg-white z-10 px-2">
          <div className="px-2 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Factura
          </div>
          <div className="px-2 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Cliente / Entrega
          </div>
          <div className="px-2 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Estado
          </div>
          <div className="px-2 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">
            Total
          </div>
        </div>

        {/* CONTENEDOR CON SCROLL MANUAL (overflow-y-auto) */}
        <div className="relative h-60 overflow-y-auto custom-scrollbar px-2 pb-2">
          <div className="flex flex-col">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status as OrderStatus);
              const shortInvoice = order.invoiceNumber.split("-").pop();

              return (
                <div
                  // Volvemos a usar solo el invoiceNumber porque ya no hay duplicados
                  key={order.invoiceNumber}
                  className="grid grid-cols-[1fr_1.5fr_1.2fr_1fr] items-center hover:bg-slate-50/80 transition-colors border-b border-slate-50/50"
                >
                  <div className="px-2 py-3">
                    <div className="text-xs font-medium text-slate-700">
                      #{shortInvoice}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("es-HN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="px-2 py-3">
                    <div className="text-xs text-slate-700 font-medium truncate pr-2">
                      {order.customerName}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {order.channel} •{" "}
                      {order.deliveryType === "SHIPPING" ? "Envío" : "Pickup"}
                    </div>
                  </div>

                  <div className="px-2 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ring-1 ring-inset ${statusConfig.classes}`}
                    >
                      <statusConfig.Icon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="px-2 py-3 text-xs font-semibold text-slate-800 text-right">
                    {formatCurrency(order.total)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}