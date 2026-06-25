import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getBillingConfigs } from "../services/billingConfigService";
import CreateBillingConfigModal from "../components/CreateBillingConfigModal";

export default function BillingConfigListView() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["billingConfigs"],
    queryFn: getBillingConfigs,
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

  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <>
        <div className="py-8 px-4 max-w-7xl mx-auto">
          {/* Botón Regresar sutil */}

          {/* Header Sección */}
          <div className="sm:flex sm:items-center border-b border-gray-100 pb-8">
            <div className="sm:flex-auto">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <DocumentTextIcon className="h-6 w-6 text-rose-500" />
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Talonarios SAR
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 font-light">
                Administra los rangos de facturación autorizados para la tienda
                física y online.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() =>
                  navigate(location.pathname + "?newBillingConfig=true")
                }
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
              >
                <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                Nuevo Talonario
              </button>
            </div>
          </div>

          {/* Tabla Estilo Administrativo */}
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="py-4 pl-6 pr-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          Canal / Estado
                        </th>
                        <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                          CAI & Vencimiento
                        </th>
                        <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                          Progreso / Secuencia
                        </th>
                        <th className="relative py-4 pl-3 pr-6">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 bg-white">
                      {data.length > 0 ? (
                        data.map((config) => (
                          <tr
                            key={config.uuid}
                            className={`hover:bg-rose-50/20 transition-all group ${!config.isActive ? "opacity-60" : ""}`}
                          >
                            <td className="whitespace-nowrap py-5 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                {config.isActive ? (
                                  <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-gray-400" />
                                )}
                                <div>
                                  <span
                                    className={`text-sm font-bold ${config.isActive ? "text-emerald-700" : "text-gray-500"}`}
                                  >
                                    {config.channel === "POS"
                                      ? "Tienda Física"
                                      : "Página Web"}
                                  </span>
                                  <div className="text-[10px] uppercase font-mono text-gray-400 mt-0.5">
                                    {config.isActive ? "ACTIVO" : "INACTIVO"}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-5">
                              <div className="text-sm font-mono font-medium text-gray-800 group-hover:text-rose-600 transition-colors">
                                {config.cai}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                Vence:{" "}
                                <span className="font-semibold text-gray-700">
                                  {config.limitDate.split("T")[0]}
                                </span>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-5">
                              <div className="text-sm font-mono text-gray-600">
                                <span className="font-bold text-gray-900">
                                  {config.prefix}
                                </span>
                                <span className="text-pink-600 font-bold">
                                  {String(config.currentSequence).padStart(
                                    8,
                                    "0",
                                  )}
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                                Rango: {config.rangeFrom.slice(-8)} al{" "}
                                {config.rangeTo.slice(-8)}
                              </div>
                            </td>

                            <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                              <div className="flex justify-end items-center gap-3">
                                <button
                                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/admin/settings/billing/${config.uuid}/edit`,
                                    )
                                  }
                                  title="Editar"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 mb-4">
                              <DocumentTextIcon className="h-8 w-8 text-gray-200" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-800">
                              No hay talonarios registrados
                            </h3>
                            <p className="mt-1 text-xs text-gray-400 font-light italic">
                              Agrega tu primer CAI para empezar a facturar.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de creación */}
        <CreateBillingConfigModal />
      </>
    );
}
