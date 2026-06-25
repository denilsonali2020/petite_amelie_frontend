import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getOrders } from "../services/orderService";
import {
  PlusIcon,
  ShoppingBagIcon,
  ClockIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { formatDateTime, getStatusConfig } from "../utils";
import { formatCurrency } from "@/shared/utils";

// ACTUALIZADO: Función de paginación expandida a 3 a la izquierda y 3 a la derecha
const generatePagination = (currentPage: number, totalPages: number) => {
  const siblings = 3; // EXACTAMENTE 3 PÁGINAS A CADA LADO

  // Calculamos el tamaño total del paginador (1 + 1 + siblings*2 + 2 elipses)
  // Si tenemos menos de 11 páginas en total, mostramos todas sin "..."
  if (totalPages <= siblings * 2 + 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculamos los bordes teóricos del bloque central
  let start = Math.max(1, currentPage - siblings);
  let end = Math.min(totalPages, currentPage + siblings);

  // --- LÓGICA DE COMPENSACIÓN ---
  // Si estamos muy cerca del INICIO, forzamos el inicio a 1 y rellenamos a la derecha
  // para que el bloque siga teniendo siempre (siblings * 2 + 1) elementos.
  if (start <= 3) {
    start = 1;
    end = 1 + siblings * 2 + 2; 
  }

  // Si estamos muy cerca del FINAL, forzamos el final y rellenamos a la izquierda
  if (end >= totalPages - 2) {
    end = totalPages;
    start = totalPages - (siblings * 2 + 2);
  }

  const items: (number | string)[] = [];

  // 1. Puntos suspensivos a la IZQUIERDA (solo si el bloque empieza después de la pag 2)
  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("...");
  }

  // 2. Rellenamos los números del bloque CENTRAL
  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  // 3. Puntos suspensivos a la DERECHA (solo si el bloque termina antes de la penúltima pag)
  if (end < totalPages) {
    if (end < totalPages - 1) items.push("...");
    items.push(totalPages);
  }

  return items;
};

export default function OrderListView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // --- LECTURA DE URL ---
  let page = parseInt(searchParams.get("page") || "1", 10);
  if (page < 1 || isNaN(page)) page = 1;

  let limit = parseInt(searchParams.get("limit") || "10", 10);
  // Validamos que sea un límite válido, si no, lo forzamos a 10
  if (![10, 25, 50, 100].includes(limit)) limit = 10;

  // --- MANEJADORES ---
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  // Cuando cambia el límite, SIEMPRE volvemos a la página 1 para evitar quedar en un limbo
  const handleLimitChange = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set("limit", newLimit.toString());
      prev.set("page", "1");
      return prev;
    });
  };

  // --- QUERY ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page, limit], // Agregamos limit al queryKey
    queryFn: () => getOrders(page, limit),
    retry: false,
  });

  // Efecto para corregir la URL si la página solicitada no existe
  useEffect(() => {
    if (data && data.meta.totalPages > 0) {
      if (page > data.meta.totalPages) {
        handlePageChange(data.meta.totalPages);
      }
    }
  }, [data, page]);

  const isRedirecting =
    data && data.meta.totalPages > 0 && page > data.meta.totalPages;

  if (isLoading || isRedirecting)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {isRedirecting ? "Redirigiendo..." : "Cargando..."}
          </span>
        </div>
      </div>
    );

  if (isError) return <Navigate to={"/404"} />;

  // Calculamos las páginas a mostrar basándonos en los datos y la nueva función
  const paginationItems = data
    ? generatePagination(page, data.meta.totalPages)
    : [];

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

                {/* --- COMPONENTE DE PAGINACIÓN Y LIMITES --- */}
                {data.meta.totalOrders > 0 && (
                  <nav className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 gap-4">
                    {/* Selector de Límite y Conteo Total */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-2">
                        <label htmlFor="limit-select" className="font-medium">
                          Mostrar:
                        </label>
                        <select
                          id="limit-select"
                          value={limit}
                          onChange={(e) =>
                            handleLimitChange(Number(e.target.value))
                          }
                          className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                      <span className="hidden sm:inline">
                        Total:{" "}
                        <span className="font-bold text-gray-700">
                          {data.meta.totalOrders}
                        </span>{" "}
                        Ventas
                      </span>
                    </div>

                    {/* Paginador */}
                    {data.meta.totalPages > 1 && (
                      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2">
                        <div className="-mt-px flex">
                          <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-gray-500"
                          >
                            <ArrowLongLeftIcon
                              aria-hidden="true"
                              className="mr-3 h-5 w-5 text-gray-400 hover:text-indigo-500 transition-colors"
                            />
                          </button>
                        </div>

                        {/* Renderizado Inteligente de Páginas */}
                        <div className="hidden md:-mt-px md:flex">
                          {paginationItems.map((item, index) => {
                            if (item === "...") {
                              return (
                                <span
                                  key={`ellipsis-${index}`}
                                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                                >
                                  ...
                                </span>
                              );
                            }

                            const pageNum = item as number;
                            return (
                              <button
                                key={`page-${pageNum}`}
                                onClick={() => handlePageChange(pageNum)}
                                aria-current={
                                  page === pageNum ? "page" : undefined
                                }
                                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                                  page === pageNum
                                    ? "border-pink-500 text-pink-600"
                                    : "border-transparent text-gray-500 hover:border-pink-300 hover:text-pink-700"
                                } cursor-pointer`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <div className="-mt-px flex justify-end">
                          <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === data.meta.totalPages}
                            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-gray-500"
                          >
                            <ArrowLongRightIcon
                              aria-hidden="true"
                              className="ml-3 h-5 w-5 text-gray-400 hover:text-indigo-500 transition-colors"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}