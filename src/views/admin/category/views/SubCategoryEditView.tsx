import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getCategory } from "../services/rootCategoryService";
import EditSubCategoryForm from "../components/subCategory/EditSubCategoryForm";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SubCategoryEditView() {
  const navigate = useNavigate();
  const params = useParams();
  const rootCategoryId = params.rootCategoryId!;
  const subCategoryId = params.subCategoryId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCategory", subCategoryId],
    queryFn: () => getCategory(subCategoryId),
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
      <div className="max-w-3xl mx-auto py-4">
        {/* Botón Regresar sutil para no perder el contexto */}
        <button
          onClick={() =>
            navigate(`/admin/category/${rootCategoryId}/sub-categories`)
          }
          className="group mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Volver a Subcategorías
        </button>

        {/* Contenedor Principal Estilo Tarjeta Minimalista */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header con colores suaves y jerarquía clara */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-50 bg-gray-50/20">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 shadow-sm">
                <PencilSquareIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">
                    Editor de Nodo
                  </span>
                </div>
                <h2 className="text-md font-bold text-gray-700 tracking-tight">
                  Modificar Subcategoría
                </h2>
                <p className="mt-0.5 text-[10px] text-gray-400 font-medium">
                  ID: {subCategoryId.split("-")[0].toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo del Formulario con padding consistente */}
          <div className="p-8">
            <EditSubCategoryForm
              data={data}
              rootCategoryId={rootCategoryId}
              subCategoryId={subCategoryId}
            />
          </div>
        </div>
      </div>
    );
}
