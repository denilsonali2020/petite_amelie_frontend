import { Link } from "react-router-dom";
import type { ProductCardCarouselType, ProductCardType } from "../types";
import LatestProducts from "../components/LatestProducts";
import LatestCategories from "../components/LatestCategories";

// Datos de ejemplo para simular la API
const featuredProducts = [
  {
    uuid: "prod-1",
    name: "Beauty of Joseon - Relief Sun : Rice + Probiotics SPF50+",
    description: "Protector solar orgánico ligero.",
    price: 650.0,
    discountPrice: 520.0,
    isOnDiscount: true,
    images:
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
  },
  {
    uuid: "prod-2",
    name: "COSRX - Advanced Snail 96 Mucin Power Essence",
    description: "Esencia reparadora con 96% de mucina.",
    price: 580.0,
    discountPrice: 0,
    isOnDiscount: false,
    images:
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
  },
  {
    uuid: "prod-3",
    name: "Anua - Heartleaf 77% Soothing Toner",
    description: "Tónico calmante para pieles sensibles.",
    price: 720.0,
    discountPrice: 610.0,
    isOnDiscount: true,
    images:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
  },
  {
    uuid: "prod-4",
    name: "Skin1004 - Madagascar Centella Ampoule",
    description: "Ampolla hidratante de Centella Asiática.",
    price: 690.0,
    discountPrice: 0,
    isOnDiscount: false,
    images:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  },
];

export default function NewArrivalsView() {
  // Función reutilizable para el listado de productos
  const renderProductSlider = (data: ProductCardCarouselType) => (
    <div className="flex w-full gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none">
      {data.map((product: ProductCardType) => (
        <Link
          key={product.uuid}
          to={`/producto/${product.uuid}`}
          className="group relative w-[44%] flex-none snap-start rounded-xs border border-neutral-100 bg-white p-2 transition-colors hover:border-neutral-300 sm:w-[30%] lg:w-[23%]"
        >
          {product.isOnDiscount && (
            <span className="absolute left-4 top-4 z-10 rounded-xs bg-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              Oferta
            </span>
          )}

          <div className="aspect-square w-full overflow-hidden rounded-xs bg-neutral-100">
            <img
              src={product.images}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-90"
            />
          </div>

          <div className="mt-3 flex flex-col justify-between">
            <div>
              <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-neutral-900 decoration-neutral-900 underline-offset-4 group-hover:underline sm:text-sm">
                {product.name}
              </h3>

              <p className="mt-1 line-clamp-1 text-[11px] text-neutral-500">
                {product.description || "K-Beauty auténtico"}
              </p>
            </div>

            <div className="mt-2.5 flex flex-wrap items-baseline gap-2 pt-1">
              {product.isOnDiscount ? (
                <>
                  <span className="text-sm font-black text-red-600">
                    L.{" "}
                    {product.discountPrice.toLocaleString("es-HN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>

                  <span className="text-[11px] text-neutral-400 line-through">
                    L.{" "}
                    {product.price.toLocaleString("es-HN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-neutral-900">
                  L.{" "}
                  {product.price.toLocaleString("es-HN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      {/* 1. HERO - PRIMERA IMPRESIÓN (Tu sección integrada con imagen) */}
      <section className="border-b border-neutral-100 bg-[#fdf8f7] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Contenedor de Texto */}
            <div className="relative z-10">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-rose-500">
                Recién llegado
              </span>

              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                Novedades que tu rutina estaba esperando.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                Descubre los últimos lanzamientos de K-Beauty: fórmulas
                innovadoras, ingredientes populares y productos seleccionados
                para tu piel.
              </p>
            </div>

            {/* Contenedor de Imagen Atractiva */}
            <div className="mt-12 lg:mt-0 relative">
              <div className="aspect-4/3 sm:aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
                  alt="Ritual de belleza y cosméticos"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Elementos decorativos (opcional, le da un toque premium) */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTOS RECIENTES */}
      <LatestProducts />

      {/* 3. SECCIÓN DE PECULIARIDAD / BRANDING EMPRESA */}
      <section className="my-10 bg-neutral-900 text-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto md:flex md:items-center md:h-100">
          <div className="md:w-1/2 h-64 md:h-full relative">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
              alt="Efecto Glass Skin Cosméticos Coreanos"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
          </div>

          <div className="p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
              El Secreto de la Innovación
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              ¿Por qué nuestras novedades cambian tu piel?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              A diferencia de la cosmética occidental tradicional, nuestras
              nuevas fórmulas coreanas priorizan la prevención y la hidratación
              profunda mediante ingredientes naturales fermentados. No buscamos
              tapar imperfecciones, sino potenciar el efecto natural de la
              "Glass Skin" desde adentro hacia afuera.
            </p>
            <div className="inline-flex">
              <span className="text-xs font-semibold uppercase tracking-wider border-b border-neutral-400 pb-1 cursor-default">
                100% Auténtico • Cruelty Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MÁS PRODUCTOS */}
      <section className="px-4 py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Rutinas Completas Recién Agregadas
          </h2>
        </div>
        {renderProductSlider([...featuredProducts].reverse())}
      </section>

      {/* 5. COMPRA POR CATEGORÍA*/}
      <LatestCategories />
    </div>
  );
}
