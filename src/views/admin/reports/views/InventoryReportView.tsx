import { ArrowLeftIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import InventoryCards from "../components/inventory/InventoryCards";

export default function InventoryReportView() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/reports")}
            className="p-2.5 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl transition-all cursor-pointer group"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-800" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ArchiveBoxIcon className="w-6 h-6 text-blue-600" />
              Dashboard de Inventario
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Resumen en tiempo real del estado de tus productos.
            </p>
          </div>
        </div>
      </div>

      {/* COMPONENTE INTELIGENTE QUE MANEJA LOS DATOS */}
      <InventoryCards />
    </div>
  );
}
