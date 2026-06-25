import { useQuery } from "@tanstack/react-query";
import ProductCarousel from "@/components/reusable/ProductCarousel";
import { latestProducts } from "../services/homeService";

export default function LatestProducts() {
  const {
    data: newProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: latestProducts,
  });

  return (
    <div className="bg-neutral-50 font-sans">
      {/* CARRUSEL REUTILIZABLE */}
      <div>
        <ProductCarousel
          title="Los más recientes"
          viewAllLink="/catalogo?orden=nuevos"
          products={newProducts || []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}
