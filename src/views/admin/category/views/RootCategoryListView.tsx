import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { getRootCategories } from "../services/rootCategoryService";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FolderIcon,
  FolderOpenIcon,
  ChevronRightIcon,
  HashtagIcon,
} from "@heroicons/react/20/solid";
import CreateRootCategoryModal from "../components/rootCategory/CreateRootCategoryModal";
import DeleteRootCategoryModal from "../components/rootCategory/DeleteRootCategoryModal";
import RoleWrapper from "@/components/guards/RoleWrapper";

// Importamos el Wrapper de Roles

const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};

export default function RootCategoryListView() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rootCategories"],
    queryFn: () => getRootCategories(),
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

  return (
    <>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        {/* Header Sección */}
        <div className="sm:flex sm:items-center border-b border-gray-100 pb-8">
          <div className="sm:flex-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <FolderOpenIcon className="h-6 w-6 text-rose-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Categorías Principales
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-500 font-light">
              Gestiona y organiza las colecciones principales de tu catálogo.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* OCULTAR BOTÓN DE NUEVA CATEGORÍA AL CAJERO */}
            <RoleWrapper allowedRoles={[ROLES.OWNER]}>
              <button
                type="button"
                onClick={() =>
                  navigate(location.pathname + "?newRootCategory=true")
                }
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
              >
                <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                Nueva Categoría
              </button>
            </RoleWrapper>
          </div>
        </div>

        {/* Contenido de Tabla */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th
                        scope="col"
                        className="py-4 pl-6 pr-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 w-16"
                      >
                        Pos.
                      </th>
                      <th
                        scope="col"
                        className="py-4 px-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400"
                      >
                        Nombre de Categoría
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400"
                      >
                        Tipo
                      </th>
                      <th scope="col" className="relative py-4 pl-3 pr-6">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {data && data.length > 0 ? (
                      data.map((category) => (
                        <tr
                          key={category.uuid}
                          className="hover:bg-rose-50/20 transition-all group"
                        >
                          {/* Campo de Posición Minimalista */}
                          <td className="whitespace-nowrap py-5 pl-6 pr-3">
                            <div className="flex items-center gap-1">
                              <HashtagIcon className="h-3 w-3 text-gray-300 group-hover:text-rose-400" />
                              <span className="text-sm font-mono font-medium text-gray-400 group-hover:text-rose-600">
                                {category.position ?? 0}
                              </span>
                            </div>
                          </td>

                          <td className="whitespace-nowrap py-5 px-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-rose-50 text-rose-400 group-hover:scale-105 transition-transform border border-rose-100/50">
                                <FolderIcon className="h-5 w-5" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                                  {category.name}
                                </div>
                                <div className="text-[10px] font-mono text-gray-400 uppercase">
                                  ID: {category.uuid.split("-")[0]}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            <span className="inline-flex items-center rounded-lg bg-rose-50/50 px-2.5 py-1 text-xs font-bold text-rose-600 ring-1 ring-inset ring-rose-100">
                              Principal
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                            <div className="flex justify-end gap-4">
                              {/* Botón Ver Sub (ESTE SÍ LO VEN TODOS, INCLUIDO CAJERO) */}
                              <Link
                                to={`/admin/category/${category.uuid}/sub-categories`}
                                className="flex items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors group/link"
                              >
                                <span className="text-xs font-bold hidden sm:inline">
                                  Ver Sub
                                </span>
                                <ChevronRightIcon className="h-5 w-5 group-hover/link:translate-x-1 transition-transform" />
                              </Link>

                              {/* OCULTAR ACCIONES DE EDITAR/ELIMINAR AL CAJERO */}
                              <RoleWrapper allowedRoles={[ROLES.OWNER]}>
                                <div className="flex items-center gap-2 border-l border-gray-100 ml-2 pl-4">
                                  <button
                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/admin/category/${category.uuid}/edit`,
                                      )
                                    }
                                    title="Editar"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        location.pathname +
                                          `?deleteRootCategory=true&rootCategory=${category.uuid}`,
                                      )
                                    }
                                    title="Eliminar"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </RoleWrapper>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-20 text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 mb-4">
                            <FolderIcon className="h-8 w-8 text-gray-200" />
                          </div>
                          <h3 className="text-sm font-bold text-gray-800">
                            No hay categorías todavía
                          </h3>
                          <p className="mt-1 text-xs text-gray-400 font-light italic">
                            ¿Empezamos creando la primera colección?
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

      {/* MODALES - OCULTOS AL CAJERO */}
      <RoleWrapper allowedRoles={[ROLES.OWNER]}>
        {/* Crear una nueva root category */}
        <CreateRootCategoryModal />
        {/* Eliminar una root categori */}
        <DeleteRootCategoryModal />
      </RoleWrapper>
    </>
  );
}
