import MonthlySalesChart from "../components/MonthlySalesChart"; // <-- Ajusta la ruta
import RecentOrdersTable from "../components/RecentOrdersTable"; // <-- Ajusta la ruta
import TopSubcategoriesChart from "../components/TopSubcategoriesChart"; // <-- Ajusta la ruta
import TopProductsTable from "../components/TopProductsTable"; // <-- Ajusta la ruta

export default function DashboardEnterpriseView() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Panel de Control
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Resumen financiero y operativo.
          </p>
        </div>
      </div>

      {/* FILA 1: Gráfico Principal */}
      <div className="bg-white p-4 mb-5 rounded-lg border border-slate-200 shadow-sm w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Ingresos Mensuales {new Date().getFullYear()}
          </h2>
        </div>
        <MonthlySalesChart />
      </div>

      {/* FILA 2: Pedidos Recientes + Gráfico Circular */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-5">
        {/* Componente Tabla de Órdenes */}
        <RecentOrdersTable />

        {/* Componente Gráfico Circular */}
        <TopSubcategoriesChart />
      </div>

      {/* FILA 3: Productos Top */}
      <TopProductsTable />
    </div>
  );
}
