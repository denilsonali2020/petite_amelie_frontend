import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { getAllUsers } from "../services/userService";
import {
  PlusIcon,
  PencilIcon,
  UsersIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import ResetPasswordModal from "../components/resetPassword/ResetPasswordModal";
import CreateUserModal from "../components/CreateUserModal";
import { roleTranslation } from "@/locales/es";

// Utilidad para los colores de los roles
const roleStyles = {
  OWNER: "bg-purple-50 text-purple-700 ring-purple-600/20",
  ADMIN: "bg-blue-50 text-blue-700 ring-blue-600/20",
  CASHIER: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

export default function UserListView() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
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
                <UsersIcon className="h-6 w-6 text-rose-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Gestión de Usuarios
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-500 font-light">
              Administra el acceso, los roles y el estado de los empleados del
              sistema.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => navigate(location.pathname + "?newUser=true")}
              className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-pink-700 transition-colors active:scale-95 cursor-pointer"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
              Nuevo Usuario
            </button>
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
                        className="py-4 pl-6 pr-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400"
                      >
                        Usuario
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400"
                      >
                        Rol
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400"
                      >
                        Estado
                      </th>
                      <th scope="col" className="relative py-4 pl-3 pr-6">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 bg-white">
                    {data && data.length > 0 ? (
                      data.map((user) => (
                        <tr
                          key={user.uuid}
                          className={`hover:bg-gray-50 transition-all group ${!user.isActive ? "opacity-75 grayscale-50" : ""}`}
                        >
                          {/* Columna Usuario (Nombre y Email) */}
                          <td className="whitespace-nowrap py-5 pl-6 pr-3">
                            <div className="flex items-center">
                              <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                                <UserIcon className="h-5 w-5" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Columna Rol */}
                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                roleStyles[user.role] ||
                                "bg-gray-50 text-gray-600 ring-gray-500/10"
                              }`}
                            >
                              {roleTranslation[user.role]}
                            </span>
                          </td>

                          {/* Columna Estado (Activo/Inactivo) */}
                          <td className="whitespace-nowrap px-3 py-5 text-sm">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                                user.isActive
                                  ? "text-green-700 bg-green-50"
                                  : "text-red-700 bg-red-50"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  user.isActive ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></span>
                              {user.isActive ? "Activo" : "Inactivo"}
                            </span>
                          </td>

                          {/* Columna Acciones */}
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                            <div className="flex justify-end items-center gap-2">
                              {/* Botón Seguridad (Reset Password) */}
                              <button
                                className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    location.pathname +
                                      `?resetPassword=true&user=${user.uuid}`,
                                  )
                                }
                                title="Seguridad / Resetear Clave"
                              >
                                <KeyIcon className="h-4 w-4" />
                              </button>

                              <div className="h-4 w-px bg-gray-200 mx-1"></div>

                              {/* Botón Editar */}
                              <button
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                onClick={() =>
                                  navigate(`/admin/users/${user.uuid}/edit`)
                                }
                                title="Editar Perfil"
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
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                            <UsersIcon className="h-8 w-8 text-gray-300" />
                          </div>
                          <h3 className="text-sm font-bold text-gray-900">
                            No hay usuarios registrados
                          </h3>
                          <p className="mt-1 text-xs text-gray-500 font-light">
                            Comienza agregando al primer empleado al sistema.
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

      {/* MODALES */}
      {/* Crear a un nuevo usuario */}
      <CreateUserModal />
      {/* Cuando el OWNER quiere resetear password a un usuario */}
      <ResetPasswordModal />
    </>
  );
}
