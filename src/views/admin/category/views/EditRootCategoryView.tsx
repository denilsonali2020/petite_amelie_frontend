import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getCategory } from "../services/rootCategoryService";
import EditRootCategoryForm from "../components/rootCategory/EditRootCategoryForm";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditRootCategoryView() {
  const params = useParams();
  const rootCategoryId = params.rootCategoryId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCategory", rootCategoryId],
    queryFn: () => getCategory(rootCategoryId),
    retry: false,
  });

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            Cargando...
          </span>
        </div>
      </div>
    );

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="max-w-3xl mx-auto">
        {/* Contenedor con redondez moderada */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header con colores más suaves */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-50 bg-gray-50/20">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 shadow-sm">
                <PencilSquareIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-md font-bold text-gray-700 tracking-tight">
                  Modificar Categoría
                </h2>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  Referencia: {rootCategoryId.split("-")[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="p-8">
            <EditRootCategoryForm data={data} rootCategoryId={rootCategoryId} />
          </div>
        </div>
      </div>
    );
}
