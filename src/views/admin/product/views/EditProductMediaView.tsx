import { useOutletContext } from "react-router-dom";
import type { getProductType, globalProductType } from "../types";
import type { generalCategoryType } from "../../category/types";
import ChangeProductImage from "../components/imagesComponents/ChangeProductImage";
import CreateProductImage from "../components/imagesComponents/CreateProductImage";
import DeleteProductImageModal from "../components/imagesComponents/DeleteProductImageModal";

type ContextType = {
  data: getProductType;
  productId: globalProductType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
};

export default function EditProductMediaView() {
  const { data, productId, subCategoryId } = useOutletContext<ContextType>();

  const maxImages = 5;
  const emptySlotsCount = Math.max(0, maxImages - data.images.length);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Galería de Imágenes
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {data.images.length} de {maxImages} imágenes utilizadas.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Imágenes que ya existen */}
          {data.images.map((image) => (
            <ChangeProductImage
              key={image.uuid}
              image={image}
              productId={productId}
              subCategoryId={subCategoryId}
            />
          ))}

          {/* Imagene que no existes */}
          {Array.from({ length: emptySlotsCount }).map((_, i) => (
            <CreateProductImage key={i} />
          ))}
        </div>
      </div>

      {/* MODAL ELIMINAR UNA IMAGEN */}
      <DeleteProductImageModal />
    </>
  );
}
