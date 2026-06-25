import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { TrophyIcon, InboxIcon } from "@heroicons/react/24/outline";
import { getMetricsEmployees } from "../../services/reportService";
import type { getMetricsEmployeesType } from "../../types";
import { formatCurrency } from "@/shared/utils";
import ErrorMessageLoadingData from "@/components/ui/ErrorMessageProps";
import { roleTranslation } from "@/locales/es";

interface EmployeeCardsProps {
  startDate: string;
  endDate: string;
}

export default function EmployeeCards({
  startDate,
  endDate,
}: EmployeeCardsProps) {
  const { mutate, data, isPending, isError } = useMutation<
    getMetricsEmployeesType,
    Error,
    { from: string; to: string }
  >({
    mutationFn: (dates) =>
      getMetricsEmployees({
        from: dates.from,
        to: dates.to,
      }) as Promise<getMetricsEmployeesType>,
  });

  useEffect(() => {
    mutate({ from: startDate, to: endDate });
  }, [startDate, endDate, mutate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-32 bg-white rounded-2xl border border-gray-100">
        <p className="text-gray-500 font-medium animate-pulse">
          Calculando métricas...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessageLoadingData
        title="Error"
        message="Error al cargar datos..."
      />
    );
  }

  if (data) {
    return (
      <div className="space-y-6">
        {/* ESTADO VACÍO */}
        {data.length === 0 && (
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <InboxIcon className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-900">Sin registros</h3>
            <p className="text-sm text-gray-500 mt-1">
              No se encontraron ventas para este rango de fechas.
            </p>
          </div>
        )}

        {/* LISTA DETALLADA DE EMPLEADOS */}
        {data.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-gray-900">
                  Rendimiento por Empleado
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-lg">
                Periodo seleccionado
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {data.map((emp, index) => {
                return (
                  <div
                    key={emp.email}
                    className="border border-gray-100 rounded-xl bg-white hover:border-indigo-200 transition-colors p-4"
                  >
                    {/* El contenedor principal usa flex-wrap para evitar desbordamientos */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Info principal: Rango, Nombre, Rol y Email */}
                      <div className="flex items-center gap-4 min-w-fit">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm shrink-0 ${
                            index === 0
                              ? "bg-amber-100 text-amber-700"
                              : index === 1
                                ? "bg-gray-200 text-gray-700"
                                : index === 2
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900 text-sm leading-tight">
                              {emp.name}
                            </p>
                            <span className="text-[9px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                              {roleTranslation[emp.role] || emp.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {emp.email}
                          </p>
                        </div>
                      </div>

                      {/* Métricas secundarias: Uso flex-wrap para que bajen de línea si no caben */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 ml-12 lg:ml-0 mt-2 lg:mt-0">
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Órdenes
                          </p>
                          <p className="text-xs font-semibold text-gray-700">
                            {emp.orderCount}
                          </p>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Ticket Prom.
                          </p>
                          <p className="text-xs font-semibold text-gray-700">
                            {formatCurrency(emp.avgTicket)}
                          </p>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Costo Total
                          </p>
                          <p className="text-xs font-semibold text-rose-600">
                            {formatCurrency(emp.totalCost)}
                          </p>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Ganancia
                          </p>
                          <p className="text-xs font-bold text-emerald-600">
                            {formatCurrency(emp.profit)}
                          </p>
                        </div>
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-bold text-indigo-600/80 uppercase tracking-wider mb-0.5">
                            Venta Total
                          </p>
                          <p className="text-sm font-black text-indigo-600">
                            {formatCurrency(emp.totalSales)}
                          </p>
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