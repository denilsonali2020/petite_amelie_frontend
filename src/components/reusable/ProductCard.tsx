import { formatCurrency } from "@/shared/utils";
import type { ProductCardType } from "@/views/public/home/types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: ProductCardType }) {
  return (
    <Link
      to={`/producto/${product.uuid}`}
      className={`group relative rounded-xs border border-neutral-100 bg-white p-2 transition-colors hover:border-neutral-300 w-[44%] flex-none snap-start sm:w-[30%] lg:w-[23%]`}
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
                {formatCurrency(product.discountPrice)}
              </span>

              <span className="text-[11px] text-neutral-400 line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-neutral-900">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
