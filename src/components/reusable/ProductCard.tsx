import { formatCurrency } from "@/shared/utils";
import type { ProductCardType } from "@/views/public/home/types";
import { Link } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/20/solid";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const discountPercentage =
    product.isOnDiscount && product.price > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  return (
    <Link
      to={`/store/products/${product.uuid}`}
      className="
        group
        relative
        w-[47%]
        flex-none
        snap-start
        overflow-hidden
        rounded-xl
        border
        border-neutral-100
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-rose-200
        hover:shadow-md
        sm:w-[31%]
        md:w-[23%]
        lg:w-[19%]
      "
    >
      <div className="relative overflow-hidden bg-[#faf9f8]">
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-neutral-600 backdrop-blur-sm">
            <SparklesIcon className="h-3 w-3 text-rose-400" />
            K-Beauty
          </span>

          <span className="hidden rounded-full bg-white/90 px-2 py-1 text-[9px] font-medium text-neutral-500 backdrop-blur-sm sm:inline">
            서울
          </span>
        </div>

        <div className="aspect-[4/4.3] w-full overflow-hidden">
          <img
            src={product.images}
            alt={product.name}
            className="
              h-full
              w-full
              object-cover
              object-center
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.035]
            "
          />
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-rose-300 transition-all duration-500 group-hover:w-full" />
      </div>

      <div className="flex min-h-36 flex-col p-3">
        <div className="mb-1.5 flex items-center gap-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-rose-400">
            Korean Beauty
          </span>

          <span className="text-[8px] text-neutral-300">•</span>

          <span className="text-[8px] uppercase tracking-wider text-neutral-400">
            Selected
          </span>
        </div>

        <h3
          className="
            line-clamp-2
            text-[13px]
            font-semibold
            leading-snug
            text-neutral-900
            transition-colors
            group-hover:text-rose-600
          "
        >
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-1 text-[10px] leading-relaxed text-neutral-400">
          {product.description || "K-Beauty auténtico"}
        </p>

        <div className="mt-auto pt-3">
          {product.isOnDiscount ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-bold text-white">
                  -{discountPercentage}%
                </span>

                <span className="text-[10px] font-semibold text-rose-600">
                  Oferta
                </span>
              </div>

              <div className="flex items-start gap-1">
                <span className="mt-1 text-[11px] font-medium text-neutral-700">
                  L
                </span>

                <span className="text-xl font-semibold tracking-tight text-neutral-900">
                  {product.discountPrice.toFixed(2)}
                </span>
              </div>

              <div className="text-[10px] text-neutral-400">
                Precio anterior:{" "}
                <span className="line-through">
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-1">
              <span className="mt-1 text-[11px] font-medium text-neutral-700">
                L
              </span>

              <span className="text-xl font-semibold tracking-tight text-neutral-900">
                {product.price.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
