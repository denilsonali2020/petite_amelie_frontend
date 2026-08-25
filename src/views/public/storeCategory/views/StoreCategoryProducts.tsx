import { Link, Navigate, useParams } from "react-router-dom";
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
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import Pagination from "@/components/reusable/Pagination";
import { formatCurrency } from "@/shared/utils";

const categories = [
  {
    name: "Novedades",
  },
  {
    name: "Skincare",
    children: [
      "Limpieza facial",
      "Tónicos",
      "Esencias",
      "Sérums",
      "Ampollas",
      "Mascarillas",
      "Cremas hidratantes",
      "Protector solar",
    ],
  },
  {
    name: "Maquillaje",
    children: ["Labios", "Base y cushion", "Rubor", "Sombras", "Cejas"],
  },
  {
    name: "Tipo de piel",
    children: [
      "Piel normal",
      "Piel seca",
      "Piel mixta",
      "Piel grasa",
      "Piel sensible",
    ],
  },
  {
    name: "Cuidado especial",
    children: ["Acné", "Manchas", "Poros", "Hidratación", "Anti-edad"],
  },
];

export default function StoreCategoryProducts() {
  const params = useParams();
  const categoryId = params.categoryId!;

  const { page, limit, setPage, setLimit } = usePagination();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryProducts", categoryId, page, limit],
    queryFn: () => productsByCategory(categoryId, page, limit),
    retry: false,
  });

  useEffect(() => {
    if (data && data.meta.totalPages > 0 && page > data.meta.totalPages) {
      setPage(data.meta.totalPages);
    }
  }, [data, page, setPage]);

  if (isLoading) {
    return <LoadingWebSite />;
  }

  if (isError) {
    return <Navigate to="/404" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <section className="border-b border-neutral-200 bg-[#fbf6f9]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-rose-400" />

                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-rose-500">
                  Korean Beauty · 서울
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                {data.name}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                Explora nuestra selección de productos cuidadosamente elegidos
                para complementar tu rutina.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-rose-100 bg-white px-4 py-2 text-xs font-medium text-neutral-600">
                {data.meta.totalProducts} productos
              </span>

              <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-500">
                Página {data.meta.currentPage} de {data.meta.totalPages}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="space-y-7 lg:sticky lg:top-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Buscar productos
              </label>

              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

                <input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-900">
                  Categorías
                </h2>

                <ChevronDownIcon className="size-4 text-neutral-400" />
              </div>

              <nav className="space-y-5">
                <button
                  type="button"
                  className="block text-sm font-medium text-rose-500"
                >
                  Todos
                </button>

                {categories.map((category) => (
                  <div key={category.name}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between text-left text-sm font-semibold text-neutral-800 transition hover:text-rose-500"
                    >
                      {category.name}

                      {category.children && (
                        <span className="text-xs text-neutral-300">+</span>
                      )}
                    </button>

                    {category.children && (
                      <div className="mt-3 space-y-2.5 border-l border-neutral-200 pl-4">
                        {category.children.map((child) => (
                          <button
                            type="button"
                            key={child}
                            className="block text-left text-[13px] text-neutral-500 transition hover:text-rose-500"
                          >
                            {child}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="mb-5 flex items-center gap-2">
                <FunnelIcon className="size-4 text-neutral-500" />

                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-900">
                  Precio
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
                    Mínimo
                  </span>

                  <div className="flex items-center rounded-md border border-neutral-200 bg-white px-3">
                    <span className="mr-1 text-xs text-neutral-400">L</span>

                    <input
                      type="number"
                      defaultValue={0}
                      className="w-full bg-transparent py-2 text-xs text-neutral-700 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
                    Máximo
                  </span>

                  <div className="flex items-center rounded-md border border-neutral-200 bg-white px-3">
                    <span className="mr-1 text-xs text-neutral-400">L</span>

                    <input
                      type="number"
                      defaultValue={5000}
                      className="w-full bg-transparent py-2 text-xs text-neutral-700 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="relative mt-6 h-1 rounded-full bg-neutral-200">
                <div className="absolute left-[8%] right-[12%] h-full rounded-full bg-rose-400" />

                <div className="absolute left-[8%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-rose-500 shadow" />

                <div className="absolute right-[12%] top-1/2 size-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-rose-500 shadow" />
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] text-neutral-400">
                <span>L 0</span>
                <span>L 5,000</span>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-md bg-neutral-900 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-rose-600"
              >
                Aplicar filtros
              </button>
            </div>
          </aside>

          <section>
            <div className="mb-6 flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">
                  Petite Amelie Selection
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900">
                  Productos de {data.name}
                </h2>
              </div>
            </div>

            {data.products.length === 0 ? (
              <div className="rounded-xl border border-neutral-200 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50">
                  <ShoppingBagIcon className="size-6 text-rose-500" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-neutral-900">
                  No hay productos disponibles
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                  Actualmente no tenemos productos disponibles dentro de esta
                  categoría.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
                  {data.products.map((product) => {
                    const discountPercentage =
                      product.isOnDiscount && product.price > 0
                        ? Math.round(
                            ((product.price - product.discountPrice) /
                              product.price) *
                              100,
                          )
                        : 0;

                    return (
                      <Link
                        to={`/store/products/${product.uuid}`}
                        key={product.uuid}
                      >
                        <article key={product.uuid} className="group relative">
                          <div className="relative overflow-hidden rounded-lg border border-neutral-100 bg-white">
                            <div className="relative aspect-square overflow-hidden bg-[#f8f8f8]">
                              {product.images ? (
                                <img
                                  src={product.images}
                                  alt={product.name}
                                  className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center px-4 text-center text-xs text-neutral-400">
                                  Sin imagen disponible
                                </div>
                              )}

                              <div className="absolute left-3 top-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-neutral-500 backdrop-blur">
                                  <SparklesIcon className="size-3 text-rose-400" />
                                  K-Beauty
                                </span>
                              </div>

                              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-rose-300 transition-all duration-500 group-hover:w-full" />
                            </div>
                          </div>

                          <div className="px-1 pt-3">
                            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-rose-400">
                              {data.name}
                            </span>

                            <h3 className="mt-1 line-clamp-2 min-h-10 text-[13px] font-semibold leading-5 text-neutral-900 transition-colors group-hover:text-rose-600 sm:text-sm">
                              {product.name}
                            </h3>

                            {product.description && (
                              <p className="mt-1 line-clamp-1 text-[10px] text-neutral-400">
                                {product.description}
                              </p>
                            )}

                            <div className="mt-2">
                              {product.stock <= 0 ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-500">
                                  <span className="size-1.5 rounded-full bg-red-500" />
                                  Agotado
                                </span>
                              ) : product.stock < 10 ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-500">
                                  <span className="size-1.5 rounded-full bg-amber-500" />
                                  Pocas unidades
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                                  <span className="size-1.5 rounded-full bg-emerald-500" />
                                  Disponible
                                </span>
                              )}
                            </div>

                            <div className="mt-3">
                              {product.isOnDiscount ? (
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                      -{discountPercentage}%
                                    </span>

                                    <span className="text-[9px] font-semibold text-rose-600">
                                      Oferta
                                    </span>
                                  </div>

                                  <div className="mt-1 flex items-start gap-0.5">
                                    <span className="mt-1 text-[10px] font-medium text-neutral-700">
                                      L
                                    </span>

                                    <span className="text-xl font-semibold tracking-tight text-neutral-900">
                                      {product.discountPrice.toFixed(2)}
                                    </span>
                                  </div>

                                  <span className="text-[9px] text-neutral-400">
                                    Precio anterior:{" "}
                                    <span className="line-through">
                                      {formatCurrency(product.price)}
                                    </span>
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-start gap-0.5">
                                  <span className="mt-1 text-[10px] font-medium text-neutral-700">
                                    L
                                  </span>

                                  <span className="text-xl font-semibold tracking-tight text-neutral-900">
                                    {product.price.toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-12 overflow-hidden rounded-xl border border-neutral-200 bg-white">
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
          </section>
        </div>
      </main>

      <section className="mt-10 border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-50">
                <SparklesIcon className="size-5 text-rose-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  K-Beauty auténtico
                </h3>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Productos cuidadosamente seleccionados para complementar tu
                  rutina.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-50">
                <TruckIcon className="size-5 text-purple-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Envíos disponibles
                </h3>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Recibe tus productos de forma segura y cómoda.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircleIcon className="size-5 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-neutral-900">
                  Compra con confianza
                </h3>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Construye tu rutina de cuidado con una selección pensada para
                  ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
