import { TagIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import ProductCarousel from "@/components/reusable/ProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { getOffersPerTopCategories } from "../services/homeService";
import { Navigate } from "react-router-dom";

export default function OffersView() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getOffersPerTopCategories"],
    queryFn: getOffersPerTopCategories,
    retry: false,
  });

  if (isLoading) return "";

  if (isError) return <Navigate to={"/404"} />;

  const firstOfferProducts = data!.slice(0, 3);
  const remainingOfferProducts = data!.slice(3);

  if (data)
    return (
      <div className="bg-neutral-50 min-h-screen font-sans">
        {/* HERO - SECCIÓN DE OFERTAS EN TONO CORAL/MELOCOTÓN SUTIL */}
        <section className="border-b border-neutral-100 bg-[#fdf8f6] overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
              {/* Contenedor de Texto */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-rose-600">
                  <TagIcon className="size-4 animate-pulse" />
                  Precios Especiales
                </div>

                <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                  Tu rutina ideal, <br />a un precio inteligente.
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                  Descubre descuentos exclusivos en las fórmulas coreanas más
                  efectivas. Es el momento perfecto para renovar tus esenciales
                  de skincare y proteger tu piel del clima cálido sin
                  comprometer tu presupuesto.
                </p>
              </div>

              {/* Contenedor de Imagen */}
              <div className="mt-12 lg:mt-0 relative">
                <div className="aspect-4/3 sm:aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80"
                    alt="Ofertas en K-Beauty"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIMERAS 2 CATEGORÍAS */}
        <div className="pt-12 space-y-4">
          {firstOfferProducts.map((category) => (
            <ProductCarousel
              key={category.name}
              title={category.name}
              products={category.products}
            />
          ))}
        </div>

        {/* SECCIÓN DE REPUTACIÓN Y OFERTAS */}
        <section className="my-14 bg-neutral-900 text-neutral-50 overflow-hidden">
          <div className="max-w-7xl mx-auto md:flex md:items-center md:h-100">
            {/* Contenido */}
            <div className="p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
                Inversión Inteligente
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
                Calidad premium, precios que no duran para siempre.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Creemos que el acceso a dermocosmética de alta gama no debería
                ser un lujo inalcanzable. Esta selección incluye productos con
                alta demanda regional que hemos logrado negociar a precios
                preferenciales. Mismas fórmulas revolucionarias, texturas
                ligeras ideales para nuestra región, pero con un descuento que
                tu bolsillo agradecerá.
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <ClockIcon className="size-5 text-rose-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                    Tiempo Limitado
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <SparklesIcon className="size-5 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                    Stock Reducido
                  </span>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80"
                alt="Productos de belleza en descuento"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay sutil para oscurecer la imagen y darle un tono más elegante */}
              <div className="absolute inset-0 bg-neutral-900/30 mix-blend-multiply" />

              {/* Badge de Oferta sobre la imagen */}
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                Hasta 40% OFF
              </div>
            </div>
          </div>
        </section>

        {/* RESTO DE CATEGORÍAS */}
        <div className="pb-12 space-y-4">
          {remainingOfferProducts.map((category) => (
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
