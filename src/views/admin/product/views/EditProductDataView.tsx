import { useOutletContext } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import EditProductForm from "../components/productComponents/EditProductForm.tsx";
import type { getProductType, globalProductType } from "../types/index.ts";
import type { generalCategoryType } from "../../category/types/index.ts";

// Definimos la forma de los datos que vienen del Layout
type ContextType = {
  data: getProductType;
  rootCategoryId: generalCategoryType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
  productId: globalProductType["uuid"];
};

export default function EditProductDataView() {
  const { data, rootCategoryId, subCategoryId, productId } =
    useOutletContext<ContextType>();

  if (data)
    return (
      <div className="max-w-4xl mx-auto">
        {/* Contenedor con redondez moderada */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header con colores más suaves */}
          <div className="px-6 pt-6 pb-0 border-b border-gray-50 bg-gray-50/20">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 shadow-sm">
                <PencilSquareIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-md font-bold text-gray-700 tracking-tight">
                  Modificar Producto
                </h2>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  {/* Referencia: {rootCategoryId.split("-")[0]} */}
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="p-6">
            <EditProductForm
              data={data}
              rootCategoryId={rootCategoryId}
              subCategoryId={subCategoryId}
              productId={productId}
            />
          </div>
        </div>
      </div>
    );
}
