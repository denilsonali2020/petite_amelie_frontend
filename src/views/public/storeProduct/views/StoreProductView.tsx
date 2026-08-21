import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { findProduct } from "../services/storeProductService";
import LoadingWebSite from "@/components/reusable/LoadingWebSite";

export default function StoreProductView() {
  const params = useParams();
  const productId = params.productId!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["findStoreProduct", productId],
    queryFn: () => findProduct(productId),
    retry: false,
  });

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) return <LoadingWebSite />;

  if (isError || !data) {
    return <Navigate to="/404" />;
  }

  // Buscar primero la imagen principal
  const primaryImageIndex = data.images.findIndex(
    (image: { url: string; isPrimary: boolean }) => image.isPrimary,
  );

  // Si existe imagen principal, comenzamos con ella
  const images = data.images || [];

  const initialImage = primaryImageIndex >= 0 ? primaryImageIndex : 0;

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col-reverse gap-5 sm:flex-row">
            {/* MINIATURAS */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto sm:w-24 sm:flex-col">
                {images.slice(0, 5).map(
                  (
                    image: {
                      url: string;
                      isPrimary: boolean;
                    },
                    index: number,
                  ) => (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`
                        relative h-20 w-20 shrink-0 overflow-hidden rounded-lg
                        border-2 bg-gray-50 transition
                        sm:h-24 sm:w-24
                        ${
                          selectedImage === index
                            ? "border-rose-500"
                            : "border-transparent hover:border-gray-300"
                        }
                      `}
                    >
                      <img
                        src={image.url}
                        alt={`${data.name} - imagen ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {image.isPrimary && (
                        <span className="absolute left-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-700 shadow-sm">
                          Principal
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* IMAGEN PRINCIPAL */}
            <div className="relative flex-1">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                {images.length > 0 ? (
                  <img
                    src={
                      images[selectedImage]?.url || images[initialImage]?.url
                    }
                    alt={data.name}
                    className="h-full w-full object-contain p-6 transition duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Sin imagen disponible
                  </div>
                )}

                {/* ETIQUETA DE OFERTA */}
                {data.isOnDiscount && (
                  <div className="absolute left-4 top-4 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    Oferta
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:pt-4">
            {/* Etiqueta */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Producto
            </p>

            {/* Nombre */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.name}
            </h1>

            {/* PRECIO */}
            <div className="mt-6">
              {data.isOnDiscount ? (
                <div className="space-y-1">
                  {/* Precio de oferta */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-rose-600 sm:text-4xl">
                      L. {data.discountPrice.toFixed(2)}
                    </span>

                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                      -
                      {Math.round(
                        ((data.price - data.discountPrice) / data.price) * 100,
                      )}
                      %
                    </span>
                  </div>

                  {/* Precio original */}
                  <div>
                    <span className="text-lg text-gray-400 line-through">
                      L. {data.price.toFixed(2)}
                    </span>

                    <span className="ml-3 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                      Oferta
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-900">
                  L. {data.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* STOCK */}
            <div className="mt-5">
              {data.stock === 0 ? (
                <span className="text-sm font-medium text-red-600">
                  Agotado
                </span>
              ) : data.stock < 10 ? (
                <span className="text-sm font-medium text-red-600">
                  Pocas unidades disponibles
                </span>
              ) : (
                <span className="text-sm font-medium text-green-600">
                  Disponible
                </span>
              )}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                Descripción
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                {data.description}
              </p>
            </div>

            <div className="mt-8">
              <button
                type="button"
                disabled={data.stock <= 0}
                className={`
                  w-full rounded-lg px-8 py-4 text-sm font-semibold
                  uppercase tracking-wide transition
                  ${
                    data.stock > 0
                      ? "bg-gray-900 text-white hover:bg-rose-600"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }
                `}
              >
                {data.stock > 0 ? "Agregar al carrito" : "Producto agotado"}
              </button>
            </div>

            <div className="mt-8 border-t border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 py-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Envío seguro
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Recibe tu producto de manera segura.
                  </p>
                </div>

                <span className="text-xl">📦</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Compra protegida
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Compra de forma rápida y sencilla.
                  </p>
                </div>

                <span className="text-xl">✓</span>
              </div>

              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Atención al cliente
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Estamos disponibles para ayudarte.
                  </p>
                </div>

                <span className="text-xl">♡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-[#faf8f7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Descubre más
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              Todo lo que necesitas para tu rutina
            </h2>

            <p className="mt-4 text-gray-600">
              Explora diferentes categorías y encuentra productos que
              complementen tu rutina diaria.
            </p>
          </div>

          {/* CATEGORÍAS */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                title: "Cuidado facial",
                description: "Productos para tu rutina facial.",
              },
              {
                title: "Maquillaje",
                description: "Encuentra nuevos productos.",
              },
              {
                title: "Cuidado corporal",
                description: "Cuida tu piel todos los días.",
              },
              {
                title: "Novedades",
                description: "Descubre los productos más recientes.",
              },
            ].map((category) => (
              <div
                key={category.title}
                className="group cursor-pointer rounded-xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl text-rose-500">
                  ✦
                </div>

                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
                Curiosidades
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                Pequeños detalles que hacen la diferencia
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Conocer mejor los productos que utilizamos puede ayudarnos a
                elegir opciones que se adapten mejor a nuestras necesidades.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-6">
                <span className="text-2xl">✨</span>

                <h3 className="mt-4 font-semibold text-gray-900">
                  Nuevas tendencias
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Descubre productos y tendencias que están ganando popularidad.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-6">
                <span className="text-2xl">💡</span>

                <h3 className="mt-4 font-semibold text-gray-900">Consejos</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Aprende pequeños consejos para aprovechar mejor tus productos.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-6">
                <span className="text-2xl">🛍️</span>

                <h3 className="mt-4 font-semibold text-gray-900">
                  Productos destacados
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Conoce algunos de los productos favoritos de nuestros
                  clientes.
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-6">
                <span className="text-2xl">♡</span>

                <h3 className="mt-4 font-semibold text-gray-900">Tu rutina</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Encuentra productos que puedas incorporar fácilmente a tu
                  rutina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
            P_Amelie
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Descubre algo nuevo para ti
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
            Explora nuestra tienda y encuentra productos que puedan formar parte
            de tu próxima rutina.
          </p>

          <button
            type="button"
            className="mt-8 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-rose-500 hover:text-white"
          >
            Explorar productos
          </button>
        </div>
      </section>
    </div>
  );
}
