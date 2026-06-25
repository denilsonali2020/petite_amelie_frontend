import { useRef } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ProductCard from "@/components/reusable/ProductCard";
import type { ProductCardCarouselType } from "@/views/public/home/types";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  products: ProductCardCarouselType;
  isLoading?: boolean;
  isError?: boolean;
}

export default function ProductCarousel({
  title,
  subtitle,
  viewAllLink,
  products = [],
  isLoading = false,
  isError = false,
}: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.75;

    carouselRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="border-b border-black pb-0.5 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:text-neutral-600"
            >
              Ver todo
            </Link>
          )}

          <div className="hidden items-center gap-1.5 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-neutral-200 bg-white p-1.5 text-neutral-800 shadow-xs transition-all hover:border-neutral-400 hover:bg-neutral-100"
              aria-label="Anterior"
            >
              <ChevronLeftIcon className="size-4" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-neutral-200 bg-white p-1.5 text-neutral-800 shadow-xs transition-all hover:border-neutral-400 hover:bg-neutral-100"
              aria-label="Siguiente"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center text-sm font-medium text-neutral-400">
          Cargando productos...
        </div>
      )}

      {isError && (
        <div className="flex h-64 items-center justify-center text-sm font-medium text-red-500">
          Error al cargar los productos.
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <div
          ref={carouselRef}
          className="scrollbar-none flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <ProductCard key={product.uuid} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
