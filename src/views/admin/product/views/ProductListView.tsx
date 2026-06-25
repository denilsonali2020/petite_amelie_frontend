import { useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  PlusIcon,
  PencilIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
  GiftIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { getProductsByCategory } from "../services/productService.ts";
import CreateProductModal from "../components/productComponents/CreateProductModal.tsx";
import { formatCurrency } from "@/shared/utils";

// Componente para mostrar u ocultar elementos según el rol del usuario
import RoleWrapper from "@/components/guards/RoleWrapper.tsx";
import { generatePagination } from "../utils/index.ts";
import { ROLES } from "../../user/types/index.ts";

export default function ProductListView() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const subCategoryId = params.subCategoryId!;
  const rootCategoryId = params.rootCategoryId!;

  // --- LECTURA DE URL ---
  const [searchParams, setSearchParams] = useSearchParams();

  let page = parseInt(searchParams.get("page") || "1", 10);
  if (page < 1 || isNaN(page)) page = 1;

  let limit = parseInt(searchParams.get("limit") || "10", 10);
  if (![10, 25, 50, 100].includes(limit)) limit = 10;

  // --- MANEJADORES DE PAGINACIÓN ---
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set("limit", newLimit.toString());
      prev.set("page", "1");
      return prev;
    });
  };

  // --- QUERY ---
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", subCategoryId, page, limit],
    queryFn: () => getProductsByCategory(subCategoryId, page, limit),
    retry: false,
  });

  // Efecto redirección antibugs
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
            {isRedirecting ? "Redirigiendo..." : "Cargando Productos..."}
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
      <>
        <div className="py-8 px-4 max-w-7xl mx-auto">
          {/* Botón Regresar */}
          <button
            onClick={() =>
              navigate(`/admin/category/${rootCategoryId}/sub-categories`)
            }
            className="group mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a Subcategorías
          </button>

          {/* Header Sección */}
          <div className="sm:flex sm:items-center border-b border-gray-100 pb-8">
            <div className="sm:flex-auto">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <ShoppingBagIcon className="h-6 w-6 text-rose-500" />
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Productos en
                  </h1>
                  <span className="text-2xl font-serif italic text-pink-600">
                    {data.name}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 font-light">
                Gestiona el inventario, precios y detalles de los productos de
                esta subcategoría.
              </p>
            </div>

            {/* OCULTAR BOTÓN DE NUEVO PRODUCTO AL CAJERO */}
            <RoleWrapper allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  onClick={() =>
                    navigate(location.pathname + "?newProduct=true")
                  }
                  className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Nuevo Producto
                </button>
              </div>
            </RoleWrapper>
          </div>

          {/* Tabla de Productos Compacta */}
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/80">
                      <tr>
                        <th className="py-3 pl-4 pr-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Producto
                        </th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Precio de Costo
                        </th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Precio / Valor
                        </th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Stock
                        </th>
                        <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Visibilidad
                        </th>
                        {/* OCULTAR COLUMNA DE ACCIONES AL CAJERO */}
                        <RoleWrapper allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
                          <th scope="col" className="relative py-3 pl-3 pr-4">
                            <span className="sr-only">Acciones</span>
                          </th>
                        </RoleWrapper>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 bg-white">
                      {data.data && data.data.length > 0 ? (
                        data.data.map((product) => (
                          <tr
                            key={product.uuid}
                            className="hover:bg-rose-50/20 transition-all group"
                          >
                            <td className="whitespace-nowrap py-2.5 pl-4 pr-3">
                              <div className="flex items-center">
                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 group-hover:scale-105 transition-transform">
                                  {product.images?.url ? (
                                    <img
                                      src={product.images.url}
                                      alt={product.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-gray-300">
                                      <PhotoIcon className="h-5 w-5 opacity-40" />
                                    </div>
                                  )}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-bold text-gray-800 group-hover:text-rose-600 transition-colors leading-none">
                                    {product.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-mono text-gray-400 uppercase bg-gray-50 px-1 rounded border border-gray-100">
                                      {product.sku || "N/A"}
                                    </span>

                                    {product.isReward && (
                                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-600 bg-amber-50 px-1 rounded border border-amber-100">
                                        <StarIcon className="h-2.5 w-2.5" />{" "}
                                        {product.pointsValue} pts
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-2.5">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-700">
                                  {formatCurrency(product.cost)}
                                </span>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-2.5">
                              <div className="flex flex-col">
                                {product.isReward ? (
                                  <div className="flex items-center gap-1">
                                    <GiftIcon className="h-3.5 w-3.5 text-amber-500" />
                                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter">
                                      Regalía
                                    </span>
                                  </div>
                                ) : product.isOnDiscount ? (
                                  <>
                                    <span className="text-sm font-bold text-rose-600">
                                      {" "}
                                      {formatCurrency(product.discountPrice!)}
                                    </span>
                                    <span className="text-[10px] text-gray-400 line-through">
                                      {formatCurrency(product.price)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-sm font-bold text-gray-700">
                                    {formatCurrency(product.price)}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <div
                                  className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? "bg-green-400" : "bg-rose-400 animate-pulse"}`}
                                />
                                <span
                                  className={`text-sm font-semibold ${product.stock === 0 ? "text-rose-500" : "text-gray-600"}`}
                                >
                                  {product.stock}{" "}
                                  <span className="text-[10px] font-normal text-gray-400 uppercase">
                                    uds
                                  </span>
                                </span>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-2.5">
                              {product.isActive ? (
                                <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-1.5 py-0.5 text-[9px] font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase">
                                  <EyeIcon className="h-3 w-3" /> Visible
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-1.5 py-0.5 text-[9px] font-bold text-gray-500 ring-1 ring-inset ring-gray-600/20 uppercase">
                                  <EyeSlashIcon className="h-3 w-3" /> Oculto
                                </span>
                              )}
                            </td>

                            {/* OCULTAR BOTÓN EDITAR AL CAJERO */}
                            <RoleWrapper
                              allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}
                            >
                              <td className="relative whitespace-nowrap py-2.5 pl-3 pr-4 text-right">
                                <div className="flex justify-end items-center">
                                  <div className="flex items-center border-l border-slate-100 ml-2 pl-3">
                                    <button
                                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all cursor-pointer"
                                      onClick={() =>
                                        navigate(
                                          `/admin/category/${rootCategoryId}/category/${subCategoryId}/sub-category/${product.uuid}/edit${location.search}`,
                                        )
                                      }
                                      title="Editar"
                                    >
                                      <PencilIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </RoleWrapper>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-12 text-center text-gray-400 text-xs italic font-light"
                          >
                            No hay productos en esta subcategoría
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* --- COMPONENTE DE PAGINACIÓN Y LIMITES --- */}
                  {data.meta.totalProducts > 0 && (
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
                            {data.meta.totalProducts}
                          </span>{" "}
                          productos
                        </span>
                      </div>

                      {/* Paginador */}
                      {data.meta.totalPages > 1 && (
                        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2">
                          <div className="-mt-px flex">
                            <button
                              onClick={() => handlePageChange(page - 1)}
                              disabled={page === 1}
                              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-gray-500 cursor-pointer"
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
                                  className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium cursor-pointer ${
                                    page === pageNum
                                      ? "border-pink-500 text-pink-600"
                                      : "border-transparent text-gray-500 hover:border-pink-300 hover:text-pink-700"
                                  }`}
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
                              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-gray-500 cursor-pointer"
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

        {/* OCULTAR MODAL DE CREACIÓN AL CAJERO */}
        <RoleWrapper allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
          <CreateProductModal />
        </RoleWrapper>
      </>
    );
}
