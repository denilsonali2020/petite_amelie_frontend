import { useQuery } from "@tanstack/react-query";
import ProductCarousel from "@/components/reusable/ProductCarousel";
import { latestProducts } from "../services/homeService";
import { useQueryErrorHandler } from "@/hooks/useQueryErrorHandler";

export default function LatestProducts() {
  const {
    data: newProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: latestProducts,
  });

  useQueryErrorHandler(error);

  return (
    <div className="bg-neutral-50 font-sans">
      {/* CARRUSEL REUTILIZABLE */}
      <div>
        <ProductCarousel
          title="Los más recientes"
          viewAllLink="/catalogo?orden=nuevos"
          products={newProducts || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
