import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getOrder } from "../services/orderService";
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  UserIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CalendarIcon,
  TicketIcon,
  TruckIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { getStatusConfig } from "../utils";
import { formatCurrency } from "@/shared/utils";
import ShippingLogisticsForm from "../components/PreviewOrder/ShippingLogisticsForm";
import StatusForm from "../components/PreviewOrder/StatusForm";

export default function DetailOrderView() {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const orderId = param.orderId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });
  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Cargando...
          </span>
        </div>
      </div>
    );

  if (isError || !data) return <Navigate to={"/404"} />;

  // Obtenemos la configuración de colores para el estado actual
  const statusConfig = getStatusConfig(data.status);

  // --- CÁLCULOS FINANCIEROS ---
  const orderSubtotal = data.orderItems.reduce((acc, item) => {
    return acc + Number(item.originalPrice) * item.quantity;
  }, 0);

  const orderDiscount = data.orderItems.reduce((acc, item) => {
    return acc + Number(item.discount) * item.quantity;
  }, 0);

  const shippingCost = Number(data.shippingCost || 0);

  const totalPagado = Number(data.total);
  const importeGravado15 = (totalPagado - shippingCost) / 1.15;
  const isv15 = totalPagado - shippingCost - importeGravado15;

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto">
      {/* Botón Regresar */}
      <button
        onClick={() => navigate(`/admin/orders${location.search}`)}
        className="group mb-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Volver a Órdenes
      </button>

      {/* Header */}
      <div className="sm:flex sm:items-center justify-between border-b border-gray-100 pb-5">
        <div className="sm:flex-auto">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 rounded-lg">
              <ShoppingBagIcon className="h-5 w-5 text-rose-500" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Detalle de Orden
              </h1>
              <span className="text-lg font-serif text-pink-600">
                #{data.invoiceNumber}
              </span>
              <div className="mt-1 sm:mt-0 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${statusConfig.classes}`}
                >
                  {statusConfig.label}
                </span>

                {/* Etiqueta de Tipo de Entrega */}
                {data.deliveryType === "SHIPPING" ? (
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                    <TruckIcon className="h-3 w-3" /> Envío a Domicilio
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                    <MapPinIcon className="h-3 w-3" /> Retiro en Tienda
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-[13px] text-gray-500 font-light flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            Emitida el{" "}
            {new Date(data.createdAt).toLocaleString("es-HN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* CONTROLADOR DE ESTADOS */}
        <StatusForm orderId={orderId} data={data} />
      </div>

      {/* Grid de Información Principal */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Tarjeta Cliente */}
        <div className="overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm p-4 hover:border-pink-200 transition-colors">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-gray-50 rounded-md">
              <UserIcon className="h-4 w-4 text-gray-500" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Cliente
            </h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                Nombre Facturación
              </p>
              <p className="text-[13px] font-medium text-gray-800">
                {data.customerName || "No registrado"}
              </p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                RTN
              </p>
              <p className="text-[13px] font-medium text-gray-800">
                {data.billingRTN || "S/N"}
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta Venta */}
        <div className="overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm p-4 hover:border-pink-200 transition-colors">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-gray-50 rounded-md">
              <DocumentTextIcon className="h-4 w-4 text-gray-500" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Detalles SAR
            </h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                Atendido por
              </p>
              <p className="text-[13px] font-medium text-gray-800">
                {data.user?.name || "Sistema"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                  Canal
                </p>
                <p className="text-[13px] font-medium text-gray-800">
                  {data.channel}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                  CAI
                </p>
                <p
                  className="text-[11px] font-mono text-gray-600 truncate"
                  title={data.cai}
                >
                  {data.cai || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Pago y Puntos */}
        <div className="overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm p-4 hover:border-pink-200 transition-colors">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 bg-gray-50 rounded-md">
              <BanknotesIcon className="h-4 w-4 text-gray-500" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Pago
            </h3>
          </div>
          <div className="space-y-2.5">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                Método
              </p>
              <p className="text-[13px] font-medium text-gray-800">
                {data.payment?.method || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5 flex items-center gap-1">
                <TicketIcon className="h-3 w-3 text-pink-500" /> Puntos Ganados
              </p>
              <p className="text-[13px] font-bold text-pink-600">
                +{data.pointsEarned} pts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RENDERIZADO CONDICIONAL DE DETALLES DE ENVÍO USANDO EL COMPONENTE */}
      {data.shippingDetails && (
        <ShippingLogisticsForm
          orderId={orderId}
          shippingDetails={data.shippingDetails}
        />
      )}

      {/* Tabla de Productos */}
      <div className="mt-6 flow-root">
        <h2 className="text-[15px] font-bold text-gray-900 mb-3 px-1">
          Artículos Comprados
        </h2>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/70">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Producto
                    </th>
                    <th className="px-3 py-2.5 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Cant.
                    </th>
                    <th className="px-3 py-2.5 text-right text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Precio Catálogo
                    </th>
                    <th className="px-3 py-2.5 text-right text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Unit. Vendido
                    </th>
                    <th className="px-4 py-2.5 text-right text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Sub total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {data.orderItems.map((item, index) => {
                    const originalUnitPrice = Number(item.originalPrice);
                    const finalUnitPrice = Number(item.price);
                    const unitSavings = Number(item.discount);
                    const lineTotal = finalUnitPrice * item.quantity;
                    const hasDiscount = unitSavings > 0;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-rose-50/20 transition-all group"
                      >
                        <td className="whitespace-nowrap py-3 pl-4 pr-3">
                          <div className="text-[13px] font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                            {item.product.name}
                          </div>
                          <div className="text-[9px] font-mono text-gray-400 uppercase mt-0.5">
                            SKU: {item.product.sku}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-center text-[13px] font-medium text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right text-[13px] text-gray-400">
                          {hasDiscount ? (
                            <span className="line-through decoration-red-300">
                              {formatCurrency(originalUnitPrice)}
                            </span>
                          ) : (
                            <span>{formatCurrency(originalUnitPrice)}</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right text-[13px]">
                          {hasDiscount ? (
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-rose-500">
                                {formatCurrency(finalUnitPrice)}
                              </span>
                              <span className="text-[9px] font-bold text-rose-400 bg-rose-50 px-1 rounded mt-0.5">
                                Ahorro unit.: {formatCurrency(unitSavings)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium text-gray-700">
                              {formatCurrency(finalUnitPrice)}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-3 pr-4 text-right text-[13px] font-bold text-gray-900">
                          {formatCurrency(lineTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Total Actualizado */}
      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-70 rounded-xl bg-gray-50 p-5 border border-gray-100 shadow-sm">
          <div className="space-y-2.5 text-[13px] text-gray-600">
            {/* Subtotal Bruto */}
            <div className="flex justify-between">
              <span>Subtotal Catálogo</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(orderSubtotal)}
              </span>
            </div>

            {/* Descuentos Totales (si hay) */}
            {orderDiscount > 0 && (
              <div className="flex justify-between text-rose-500">
                <span>Ahorro Total</span>
                <span className="font-medium">
                  -{formatCurrency(orderDiscount)}
                </span>
              </div>
            )}

            <div className="pt-1.5 border-t border-gray-200"></div>

            {/* Subtotal Gravado (Base Imponible de los Productos) */}
            <div className="flex justify-between text-gray-500">
              <span>Subtotal Gravado (15%)</span>
              <span className="font-medium text-slate-700">
                {formatCurrency(importeGravado15)}
              </span>
            </div>

            {/* ISV (15%) */}
            <div className="flex justify-between text-gray-500 pb-1">
              <span>ISV Productos (15%)</span>
              <span className="font-medium text-slate-700">
                {formatCurrency(isv15)}
              </span>
            </div>

            {/* Costo de Envío (si existe) */}
            {shippingCost > 0 && (
              <div className="flex justify-between text-slate-800 pb-1 border-t border-gray-200 pt-2">
                <span className="font-semibold flex items-center gap-1">
                  <TruckIcon className="h-4 w-4" /> Costo de Envío
                </span>
                <span className="font-bold">
                  {formatCurrency(shippingCost)}
                </span>
              </div>
            )}

            {/* Gran Total */}
            <div className="pt-2.5 border-t border-gray-300 flex justify-between items-end">
              <span className="text-[14px] font-bold text-gray-900 uppercase tracking-wide">
                Total Cobrado
              </span>
              <span className="text-xl font-black text-pink-600">
                {formatCurrency(totalPagado)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
