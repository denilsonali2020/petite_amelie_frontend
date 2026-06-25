import {
  ArrowLeftIcon,
  GiftIcon,
  TicketIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const topCoupons = [
  {
    code: "BIENVENIDA20",
    type: "PERCENTAGE",
    discount: "20%",
    usage: 145,
    revenueImpact: 12500,
  },
  {
    code: "IPHONEPRO",
    type: "FIXED",
    discount: "L. 500",
    usage: 42,
    revenueImpact: 21000,
  },
  {
    code: "ENVIOFREE",
    type: "PERCENTAGE",
    discount: "100% Envío",
    usage: 89,
    revenueImpact: 8900,
  },
];

export default function LoyaltyReportView() {
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <button
          onClick={() => navigate("/admin/reports")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <GiftIcon className="w-5 h-5 text-rose-600" /> Fidelización y
            Cupones
          </h1>
        </div>
      </div>

      {/* KPIs DE FIDELIZACIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
            <StarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Puntos Canjeados
            </p>
            <h4 className="text-2xl font-bold text-gray-900">
              12,450{" "}
              <span className="text-sm font-normal text-gray-500">pts</span>
            </h4>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-500">
            <TicketIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Cupones Aplicados
            </p>
            <h4 className="text-2xl font-bold text-gray-900">
              276{" "}
              <span className="text-sm font-normal text-gray-500">usos</span>
            </h4>
          </div>
        </div>
      </div>

      {/* TABLA DE CUPONES */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Rendimiento de Cupones Activos
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase">
                Código
              </th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase">
                Descuento
              </th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase text-center">
                Veces Usado
              </th>
              <th className="pb-2 text-xs font-semibold text-gray-500 uppercase text-right">
                Ventas Generadas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topCoupons.map((coupon, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="py-3">
                  <span className="font-mono text-sm font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                    {coupon.code}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {coupon.discount}
                </td>
                <td className="py-3 text-center text-sm font-medium text-gray-900">
                  {coupon.usage}
                </td>
                <td className="py-3 text-right text-sm font-semibold text-gray-900">
                  L. {coupon.revenueImpact.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
