import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderService";
import {
  PlusIcon,
  ShoppingBagIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import { formatDateTime, getStatusConfig } from "../utils";
import { formatCurrency } from "@/shared/utils";
import { usePagination } from "../../../../hooks/usePagination";
import LoadingAdminSite from "@/components/reusable/LoadingAdminSite";
import Pagination from "@/components/reusable/Pagination";

export default function OrderListView() {
  //Paginacion
  const navigate = useNavigate();
  const location = useLocation();

  // PAGINACIÓN
  const { page, limit, setPage, setLimit } = usePagination();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page, limit], // Agregamos limit al queryKey
    queryFn: () => getOrders(page, limit),
    retry: false,
  });

  // CORRECCIÓN DE PÁGINA FUERA DE RANGO

  useEffect(() => {
    if (data && data.meta.totalPages > 0 && page > data.meta.totalPages) {
      setPage(data.meta.totalPages);
    }
  }, [data, page, setPage]);

  if (isLoading) return <LoadingAdminSite />;

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto">
        {/* --- HEADER SECCIÓN --- */}
        <div className="sm:flex sm:items-center border-b border-gray-100 pb-8">
          <div className="sm:flex-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <ShoppingBagIcon className="h-6 w-6 text-rose-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Historial de Ventas
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-500 font-light">
              Revisa todas las transacciones recientes, facturación SAR y
              detalles.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => navigate("/admin/orders/new")}
              className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
              Nueva Venta
            </button>
          </div>
        </div>

        {/* --- TABLA DE VENTAS --- */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-xl">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="py-3 pl-5 pr-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Monto / Estado
                      </th>
                      <th className="hidden sm:table-cell py-3 pr-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Cliente y Detalles
                      </th>
                      <th className="py-3 pr-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {data.data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-8 text-center text-gray-500"
                        >
                          No hay ventas registradas.
                        </td>
                      </tr>
                    ) : (
                      data.data.map((order) => {
                        const { classes, label, Icon, iconColor } =
                          getStatusConfig(order.status);

                        return (
                          <tr
                            key={order.uuid}
                            className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                          >
                            <td className="py-3 pl-5 pr-6 align-top">
                              <div className="flex gap-x-4">
                                <Icon
                                  aria-hidden="true"
                                  className={`hidden h-5 w-5 flex-none mt-0.5 sm:block ${iconColor}`}
                                />
                                <div className="flex-auto">
                                  <div className="flex items-center gap-x-3">
                                    <div className="text-sm font-bold text-gray-900">
                                      {formatCurrency(+order.total)}
                                    </div>
                                    <div
                                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${classes}`}
                                    >
                                      {label}
                                    </div>
                                  </div>
                                  {Number(order.discountAmount) > 0 ? (
                                    <div className="mt-0.5 text-[11px] text-rose-500 font-medium">
                                      Descuento:{" "}
                                      {formatCurrency(+order.discountAmount)}
                                    </div>
                                  ) : (
                                    <div className="mt-0.5 text-[11px] text-gray-500 font-medium">
                                      Descuento:{" "}
                                      {formatCurrency(+order.discountAmount)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="hidden py-3 pr-6 sm:table-cell align-top">
                              <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                {order.customerName || "Consumidor Final"}
                                {order.deliveryType === "SHIPPING" && (
                                  <span className="bg-pink-100 text-pink-700 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                                    📦 Envío
                                  </span>
                                )}
                              </div>
                              <div className="mt-0.5 flex flex-col gap-0.5">
                                <span className="text-[11px] text-gray-500">
                                  Vendedor: {order.user.name} • Canal:{" "}
                                  {order.channel}
                                </span>
                                <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
                                  <ClockIcon className="h-3 w-3" />
                                  {formatDateTime(order.createdAt)}
                                </span>
                              </div>
                            </td>

                            <td className="py-3 pr-5 text-right align-top">
                              <div className="flex justify-end">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/admin/orders/${order.uuid}${location.search}`,
                                    )
                                  }
                                  className="text-sm font-semibold text-rose-600 hover:text-rose-500 transition-colors cursor-pointer"
                                >
                                  Ver detalle
                                </button>
                              </div>
                              <div className="mt-1 text-[11px] text-gray-500">
                                Factura{" "}
                                <span className="text-gray-900 font-medium">
                                  #{order.invoiceNumber}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {data.meta.totalOrders > 0 && (
                  <Pagination
                    page={page}
                    limit={limit}
                    totalItems={data.meta.totalOrders}
                    totalPages={data.meta.totalPages}
                    hasNextPage={data.meta.hasNextPage}
                    hasPreviousPage={data.meta.hasPreviousPage}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
