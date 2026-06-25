import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { getBillingConfig } from "../services/billingConfigService";
import EditBillingConfigForm from "../components/EditBillingConfigForm";
import { DocumentTextIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditBillingConfigView() {
  const params = useParams();
  const navigate = useNavigate();
  const configId = params.configId!; 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getBillingConfig", configId],
    queryFn: () => getBillingConfig(configId),
    retry: false,
    enabled: !!configId, // Solo corre si hay ID válido
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
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Botón Regresar */}
        <button
          onClick={() => navigate("/admin/settings/billing")}
          className="group mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a Talonarios
        </button>

        {/* Contenedor con redondez moderada */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Header con colores más suaves */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-50 bg-gray-50/20">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 shadow-sm">
                <DocumentTextIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-md font-bold text-gray-700 tracking-tight">
                  Modificar Talonario
                </h2>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  Canal: {data.channel} | ID: {configId}
                </p>
              </div>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="p-8">
            <EditBillingConfigForm data={data} />
          </div>
        </div>
      </div>
    );
}