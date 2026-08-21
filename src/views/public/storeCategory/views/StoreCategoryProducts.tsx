import { Navigate, useParams } from "react-router-dom";
import { usePagination } from "../../../../hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { productsByCategory } from "../services/storeCategoryService";
import { useEffect } from "react";
import LoadingWebSite from "@/components/reusable/LoadingWebSite";
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import Pagination from "@/components/reusable/Pagination";

export default function StoreCategoryProducts() {
  const params = useParams();
  const categoryId = params.categoryId!;

  // PAGINACION
  const { page, limit, setPage, setLimit } = usePagination();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryProducts", categoryId, page, limit],
    queryFn: () => productsByCategory(categoryId, page, limit),
    retry: false,
  });

  // CORRECCIÓN DE PÁGINA FUERA DE RANGO
  useEffect(() => {
    if (data && data.meta.totalPages > 0 && page > data.meta.totalPages) {
      setPage(data.meta.totalPages);
    }
  }, [data, page, setPage]);

  if (isLoading) return <LoadingWebSite />;

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="min-h-screen bg-neutral-50">
        <section className="border-b border-neutral-200 bg-[#fbf6f9]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-rose-500">
                  Categoría
                </span>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                  {data.name}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-rose-100 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm">
                    {data.meta.totalProducts} productos
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-600 shadow-sm">
                    Página {data.meta.currentPage} de {data.meta.totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* CABECERA DE RESULTADOS */}
          <div className="mb-6 flex flex-col gap-2 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">
                Explora
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
                Productos de {data.name}
              </h2>
            </div>

            <p className="text-sm text-neutral-500">
              Mostrando {data.products.length} de {data.meta.totalProducts}{" "}
              productos
            </p>
          </div>

          {data.products.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                <ShoppingBagIcon className="h-7 w-7 text-rose-500" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-neutral-900">
                No hay productos disponibles
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                Actualmente no tenemos productos disponibles dentro de esta
                categoría.
              </p>
            </div>
          ) : (
            <>
              {/* Lista verticar de productoss */}
              <div className="space-y-4">
                {data.products.map((product) => (
                  <article
                    key={product.uuid}
                    className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-300 hover:border-neutral-300 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative h-64 w-full shrink-0 overflow-hidden bg-neutral-50 sm:h-auto sm:w-52 lg:w-60">
                        {product.images ? (
                          <div className="aspect-square w-full overflow-hidden bg-white">
                            <img
                              src={product.images}
                              alt={product.name}
                              className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="flex h-full min-h-52 items-center justify-center px-4 text-center text-sm text-neutral-400">
                            Sin imagen disponible
                          </div>
                        )}

                        {/* OFERTA */}
                        {product.isOnDiscount && (
                          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                            Oferta
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex flex-1 flex-col lg:flex-row lg:justify-between lg:gap-10">
                          {/* INFORMACIÓN PRINCIPAL */}
                          <div className="max-w-2xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
                              {data.name}
                            </span>

                            <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 transition group-hover:text-rose-600 sm:text-2xl">
                              {product.name}
                            </h3>

                            {product.description && (
                              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                                {product.description}
                              </p>
                            )}

                            {/* STOCK */}
                            <div className="mt-4">
                              {product.stock <= 0 ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                  <span className="h-2 w-2 rounded-full bg-red-500" />
                                  Agotado
                                </span>
                              ) : product.stock < 10 ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                                  Pocas unidades disponibles
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                  Disponible
                                </span>
                              )}
                            </div>
                          </div>

                          {/* PRECIO */}
                          <div className="mt-6 min-w-fit border-t border-neutral-100 pt-5 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                            {product.isOnDiscount ? (
                              <div>
                                <p className="text-2xl font-black text-rose-600">
                                  L. {Number(product.discountPrice).toFixed(2)}
                                </p>

                                <div className="mt-1 flex items-center gap-2">
                                  <span className="text-sm text-neutral-400 line-through">
                                    L. {Number(product.price).toFixed(2)}
                                  </span>

                                  <span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600">
                                    -
                                    {Math.round(
                                      ((product.price - product.discountPrice) /
                                        product.price) *
                                        100,
                                    )}
                                    %
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-2xl font-black text-neutral-900">
                                L. {Number(product.price).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                          <button
                            type="button"
                            className="flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-rose-600"
                          >
                            Ver producto
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <Pagination
                  page={page}
                  limit={limit}
                  totalItems={data.meta.totalProducts}
                  totalPages={data.meta.totalPages}
                  hasNextPage={data.meta.hasNextPage}
                  hasPreviousPage={data.meta.hasPreviousPage}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            </>
          )}
        </main>

        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-neutral-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50">
                  <SparklesIcon className="h-5 w-5 text-rose-500" />
                </div>

                <h3 className="mt-4 font-bold text-neutral-900">
                  K-Beauty auténtico
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Productos cuidadosamente seleccionados para complementar tu
                  rutina.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-50">
                  <TruckIcon className="h-5 w-5 text-purple-500" />
                </div>

                <h3 className="mt-4 font-bold text-neutral-900">
                  Envíos disponibles
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Recibe tus productos de forma segura y cómoda.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                </div>

                <h3 className="mt-4 font-bold text-neutral-900">
                  Compra con confianza
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Encuentra productos para construir tu rutina de cuidado
                  personal.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
