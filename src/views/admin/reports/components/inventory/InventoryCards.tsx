import { useQuery } from "@tanstack/react-query";
import {
  CurrencyDollarIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// ¡Ajusta los imports según tu proyecto!
import { formatCurrency } from "@/shared/utils";
import ErrorMessageLoadingData from "@/components/ui/ErrorMessageProps";
import { getMetricsInventory } from "../../services/reportService";
import { ArchiveBoxIcon } from "@heroicons/react/20/solid";

export default function InventoryCards() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["inventory-metrics"],
    queryFn: getMetricsInventory,
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-32 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-500 font-medium animate-pulse flex items-center gap-2">
          Calculando métricas...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessageLoadingData
        title="Error"
        message="No se pudo cargar la información del inventario..."
      />
    );
  }

  if (data) {
    // Calculamos el stock saludable (Total - Los que están en bajo stock)
    const healthyStockCount = data.countProducts - data.countLowStock;

    return (
      <div className="space-y-6">
        {/* GRID DE LAS 4 TARJETAS DE KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard
            title="Valor del Inventario"
            amount={formatCurrency(data.costInventory)}
            icon={<CurrencyDollarIcon className="w-6 h-6" />}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <KpiCard
            title="Productos Totales"
            amount={data.countProducts.toString()}
            icon={<CubeIcon className="w-6 h-6" />}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <KpiCard
            title="Stock Crítico"
            amount={data.countLowStock.toString()}
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            color="text-red-600"
            bg="bg-red-50"
          />
          <KpiCard
            title="Stock Saludable"
            amount={healthyStockCount.toString()}
            icon={<CheckCircleIcon className="w-6 h-6" />}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
        </div>

        {/* LISTADO DE PRODUCTOS EN STOCK CRÍTICO */}
        {data.productsLowStock.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Productos en Stock Mínimo
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Acción requerida para reposición inmediata.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg uppercase tracking-wider border border-red-100">
                {data.productsLowStock.length} Alertas
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {data.productsLowStock.map((item) => {
                // Prevenir división por 0 si minStock llegara a ser 0
                const percent =
                  item.minStock > 0
                    ? Math.min((item.stock / item.minStock) * 100, 100)
                    : 0;

                return (
                  <div
                    key={item.sku}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                  >
                    {/* Info del producto */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                        <ArchiveBoxIcon className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {item.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-0.5">
                          SKU: {item.sku}
                        </p>
                      </div>
                    </div>

                    {/* Barra y números de Stock */}
                    <div className="flex items-center gap-6 w-full md:w-auto ml-14 md:ml-0">
                      <div className="w-full md:w-48">
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Nivel actual
                          </span>
                          <span className="text-xs font-black text-red-600">
                            {item.stock} / {item.minStock}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Interfaz para la KpiCard (Si ya la tienes global, puedes quitar esta)
interface KpiCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

// Reutilizamos el estilo de la KpiCard para mantener consistencia con Finanzas
function KpiCard({ title, amount, icon, color, bg }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
          {title}
        </p>
        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>{icon}</div>
      </div>
      <div>
        <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {amount}
        </h4>
      </div>
    </div>
  );
}
