import { useState } from "react";
import {
  ArrowLeftIcon,
  UsersIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import EmployeeCards from "../components/employee/EmployeeCards";
import { getCurrentDay, getFirstDayOfMonth } from "../utils";

export default function EmployeeReportView() {
  const navigate = useNavigate();

  const [inputStart, setInputStart] = useState(getFirstDayOfMonth());
  const [inputEnd, setInputEnd] = useState(getCurrentDay());

  const [appliedStart, setAppliedStart] = useState(getFirstDayOfMonth());
  const [appliedEnd, setAppliedEnd] = useState(getCurrentDay());

  const handleApplyFilter = () => {
    setAppliedStart(inputStart);
    setAppliedEnd(inputEnd);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER & FILTROS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/reports")}
            className="p-2.5 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl transition-all cursor-pointer group"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-500 group-hover:text-gray-800" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UsersIcon className="w-6 h-6 text-indigo-600" />
              Rendimiento de Empleados
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Reporte general de ventas y márgenes por usuario.
            </p>
          </div>
        </div>

        {/* Controles de Filtro */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-gray-200 transition-all flex-1 lg:flex-none">
            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              className="bg-transparent text-sm font-medium text-gray-700 outline-none w-full lg:w-auto cursor-pointer"
              value={inputStart}
              onChange={(e) => setInputStart(e.target.value)}
            />
            <span className="text-gray-400 text-sm font-medium">a</span>
            <input
              type="date"
              className="bg-transparent text-sm font-medium text-gray-700 outline-none w-full lg:w-auto cursor-pointer"
              value={inputEnd}
              onChange={(e) => setInputEnd(e.target.value)}
            />
          </div>

          <button
            onClick={handleApplyFilter}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl px-5 py-2.5 shadow-sm transition-all flex-1 lg:flex-none cursor-pointer"
          >
            <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
            Aplicar
          </button>
        </div>
      </div>

      {/* COMPONENTE INTELIGENTE UNIFICADO */}
      <EmployeeCards startDate={appliedStart} endDate={appliedEnd} />
    </div>
  );
}
