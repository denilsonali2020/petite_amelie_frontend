import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  WalletIcon,
  CreditCardIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { getMetricsFinance } from "../../services/reportService";
import type { getMetricsFinanceType, KpiCardProps } from "../../types";
import { paymentMethodsTranslation } from "@/locales/es";
import { formatCurrency } from "@/shared/utils";
import ErrorMessageLoadingData from "@/components/ui/ErrorMessageProps";

interface FinanceCardsProps {
  startDate: string;
  endDate: string;
}

export default function FinanceCards({
  startDate,
  endDate,
}: FinanceCardsProps) {
  const { mutate, data, isPending, isError } = useMutation<
    getMetricsFinanceType,
    Error,
    { from: string; to: string }
  >({
    mutationFn: (dates) =>
      getMetricsFinance({
        from: dates.from,
        to: dates.to,
      }) as Promise<getMetricsFinanceType>,
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
    const totalPayments = data.paymentMethodsRaw.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );

    return (
      <div className="space-y-6">
        {/* GRID DE LAS 3 TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard
            title="Total Ventas"
            amount={formatCurrency(data.metrics.totalEarn)}
            icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <KpiCard
            title="Costo de Ventas"
            amount={formatCurrency(data.metrics.totalCost)}
            icon={<ArrowTrendingDownIcon className="w-6 h-6" />}
            color="text-rose-600"
            bg="bg-rose-50"
          />
          <KpiCard
            title="Ganancia"
            amount={formatCurrency(data.metrics.profit)}
            icon={<WalletIcon className="w-6 h-6" />}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
        </div>

        {/* TARJETA DE MÉTODOS DE PAGO */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CreditCardIcon className="w-5 h-5 text-gray-400" />
            <h3 className="text-base font-bold text-gray-900">
              Métodos de Pago
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.paymentMethodsRaw.map((pm, i) => {
              const percentage =
                totalPayments > 0
                  ? Math.round((pm.value / totalPayments) * 100)
                  : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {paymentMethodsTranslation[pm.name] || pm.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatCurrency(pm.value)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex-1">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-8">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LISTA DE PRODUCTOS TOP SELLING (Diseño Compacto y Minimalista) */}
        {data.productsTopSelling.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-gray-900">
                  Top Productos con más ingresos
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-lg">
                Periodo seleccionado
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {data.productsTopSelling.map((product, index) => (
                <div
                  key={product.sku}
                  className="border border-gray-100 rounded-xl bg-white hover:border-emerald-200 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between py-2.5 px-4 gap-4">
                    {/* Info principal: Rango, Nombre y SKU */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm ${
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
                        <p className="font-bold text-gray-900 text-sm leading-tight">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </div>

                    {/* Métricas secundarias */}
                    <div className="flex items-center gap-5 md:gap-8 ml-10 md:ml-0">
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          Vendidos
                        </p>
                        <p className="text-xs font-semibold text-gray-700">
                          {product.soldCount} unds
                        </p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          Stock
                        </p>
                        <p className="text-xs font-semibold text-gray-700">
                          {product.stock} unds
                        </p>
                      </div>
                      <div className="text-right min-w-22.5">
                        <p className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider mb-0.5">
                          Ingreso Total
                        </p>
                        <p className="text-sm font-black text-emerald-600">
                          {formatCurrency(product.totalRevenue)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function KpiCard({ title, amount, icon, color, bg }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:border-gray-200 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>{icon}</div>
      </div>
      <div>
        <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {amount}
        </h4>
      </div>
    </div>
  );
}