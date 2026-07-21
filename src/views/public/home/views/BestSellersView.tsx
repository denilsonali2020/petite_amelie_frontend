import { FireIcon, TrophyIcon, HeartIcon } from "@heroicons/react/24/outline";
import ProductCarousel from "@/components/reusable/ProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { getBestSellersPerTopCategories } from "../services/homeService";
import { Navigate } from "react-router-dom";
import type { getBestSellersPerTopCategoriesType } from "../types";

export default function BestSellersView() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestSellersProdutsPerCategories"],
    queryFn: getBestSellersPerTopCategories,
  });

  if (isLoading) return "";

  if (isError) return <Navigate to={"/404"} />;

  const firstCategories: getBestSellersPerTopCategoriesType = data!.slice(0, 3);
  const remainingCategories: getBestSellersPerTopCategoriesType =
    data!.slice(3);

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      {/* HERO - SECCIÓN PREMIUM EN TONO ROSA SUTIL */}
      <section className="border-b border-neutral-100 bg-[#fbf6f9] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Contenedor de Texto */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-purple-600">
                <FireIcon className="size-4 animate-pulse" />
                Los Favoritos de la Comunidad
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                Los más vendidos, avalados por tu piel.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                Las fórmulas coreanas más deseadas en Honduras y Centroamérica.
                Productos que se agotan en tiempo récord por una sola razón: sus
                resultados reales.
              </p>
            </div>

            {/* Contenedor de Imagen */}
            <div className="mt-12 lg:mt-0 relative">
              <div className="aspect-4/3 sm:aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
                  alt="Productos K-Beauty más vendidos"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMERAS 3 CATEGORÍAS */}
      <div className="pt-12 space-y-4">
        {firstCategories.map((category) => (
          <ProductCarousel
            key={category.name}
            title={category.name}
            products={category.products}
          />
        ))}
      </div>

      {/* SECCIÓN DE REPUTACIÓN */}
      <section className="my-14 bg-neutral-900 text-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto md:flex md:items-center md:h-100">
          {/* Contenido */}
          <div className="p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
              Resultados Comprobados
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              ¿Por qué todos están hablando de estos productos?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              No se trata de modas pasajeras. Cada producto en nuestra lista de
              Best Sellers ha ganado su lugar gracias a valoraciones de 5
              estrellas de consumidoras reales en toda la región. Son joyas de
              la cosmética coreana formuladas para calmar, transformar y
              mantener el brillo saludable sin importar el clima
              centroamericano.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <TrophyIcon className="size-5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Top Regional
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="size-5 text-rose-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Recomendado
                </span>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80"
              alt="Piel radiante cuidado coreano"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* ÚLTIMAS 2 CATEGORÍAS */}
      <div className="pb-12 space-y-4">
        {remainingCategories.map((category) => (
          <ProductCarousel
            key={category.name}
            title={category.name}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
}
