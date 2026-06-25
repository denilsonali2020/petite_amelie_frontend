import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  HashtagIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesByUuid } from "../services/subCategoriesService";
import DeleteSubCategoryModal from "../components/subCategory/DeleteSubCategoryModal";
import CreateSubCategoryModal from "../components/subCategory/CreateSubCategoryModal";
import RoleWrapper from "@/components/guards/RoleWrapper";

// Constantes de Roles
const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};

export default function SubCategoryListview() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const rootCategoryId = params.rootCategoryId!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["subCategories", rootCategoryId],
    queryFn: () => getSubCategoriesByUuid(rootCategoryId),
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
        {/* Botón Regresar sutil (Todos pueden verlo) */}
        <button
          onClick={() => navigate("/admin/category")}
          className="group mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver
        </button>

        {/* Header Sección */}
        <div className="sm:flex sm:items-center border-b border-gray-100 pb-8">
          <div className="sm:flex-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <TagIcon className="h-6 w-6 text-rose-500" />
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Subcategorías de
                </h1>
                <span className="text-2xl font-serif italic text-pink-600">
                  {data?.name}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500 font-light">
              Crea y gestiona las divisiones específicas de esta colección.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* OCULTAR BOTÓN DE NUEVA SUBCATEGORÍA AL CAJERO */}
            <RoleWrapper allowedRoles={[ROLES.OWNER]}>
              <button
                type="button"
                onClick={() =>
                  navigate(location.pathname + "?newSubCategory=true")
                }
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
              >
                <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                Nueva Subcategoría
              </button>
            </RoleWrapper>
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
                      <th className="py-4 pl-6 pr-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 w-16">
                        Pos.
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                        Subcategoría
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                        Inventario
                      </th>
                      {/* Ocultamos la columna de acciones completamente si es cajero - Opcional pero recomendado para UI limpia */}
                      <RoleWrapper allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
                        <th className="relative py-4 pl-3 pr-6">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </RoleWrapper>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {data?.children && data.children.length > 0 ? (
                      data.children.map((subCategory) => (
                        <tr
                          key={subCategory.uuid}
                          className="hover:bg-rose-50/20 transition-all group"
                        >
                          {/* Campo de Posición Minimalista */}
                          <td className="whitespace-nowrap py-5 pl-6 pr-3">
                            <div className="flex items-center gap-1">
                              <HashtagIcon className="h-3 w-3 text-gray-300 group-hover:text-rose-400" />
                              <span className="text-sm font-mono font-medium text-gray-400 group-hover:text-rose-600">
                                {subCategory.position ?? 0}
                              </span>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-5">
                            <div className="flex items-center">
                              <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 group-hover:scale-105 transition-all border border-gray-100 overflow-hidden shadow-inner">
                                {subCategory.imageURL ? (
                                  <img
                                    src={subCategory.imageURL}
                                    alt={subCategory.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <TagIcon className="h-6 w-6 opacity-40" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                                  {subCategory.name}
                                </div>
                                <div className="text-[10px] font-mono text-gray-400 uppercase">
                                  ID: {subCategory.uuid.split("-")[0]}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            <Link
                              to={`/admin/category/${rootCategoryId}/category/${subCategory.uuid}/products`}
                              className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-gray-500 ring-1 ring-inset ring-gray-200 hover:ring-pink-300 hover:text-pink-600 hover:bg-pink-50 transition-all uppercase tracking-tighter"
                            >
                              Gestionar Productos
                              <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                          </td>

                          {/* OCULTAR ACCIONES DE EDITAR/ELIMINAR AL CAJERO */}
                          <RoleWrapper
                            allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}
                          >
                            <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                              <div className="flex justify-end items-center gap-3">
                                <div className="flex items-center gap-2 border-l border-gray-100 ml-2 pl-4">
                                  <button
                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/admin/category/${rootCategoryId}/sub-categories/${subCategory.uuid}/edit`,
                                      )
                                    }
                                    title="Editar"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  {/* Nota: Asumo que el ADMIN no puede borrar subcategorías basado en tu backend (solo OWNER), así que lo restrinjo aquí también */}
                                  <RoleWrapper allowedRoles={[ROLES.OWNER]}>
                                    <button
                                      className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                      onClick={() =>
                                        navigate(
                                          location.pathname +
                                            `?deleteSubCategory=true&subCategoryId=${subCategory.uuid}`,
                                        )
                                      }
                                      title="Eliminar"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </RoleWrapper>
                                </div>
                              </div>
                            </td>
                          </RoleWrapper>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-20 text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 mb-4">
                            <TagIcon className="h-8 w-8 text-gray-200" />
                          </div>
                          <h3 className="text-sm font-bold text-gray-800">
                            No hay subcategorías todavía
                          </h3>
                          <p className="mt-1 text-xs text-gray-400 font-light italic">
                            Empieza agregando una subcategoría a esta colección.
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
      <RoleWrapper allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
        <CreateSubCategoryModal />
        {/* Solo el OWNER borra, el wrapper de arriba ya limita, pero el modal interior solo se abrirá si tiene el botón visible */}
        <DeleteSubCategoryModal />
      </RoleWrapper>
    </>
  );
}
