import { useState, Fragment } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  UsersIcon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  HomeIcon,
  ChartPieIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/auth/authStore";
import { logout as logoutApi } from "@/views/admin/admin-login/services/adminAuthService";
import { useQueryClient } from "@tanstack/react-query";

// Importaciondes de Componentes
import MustChangePasswordModal from "@/views/admin/admin-login/components/MustChangePasswordModal";
import { roleTranslation } from "@/locales/es";

// CONSTANTES DE ROLES
const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};

// 1. Modificamos el arreglo para incluir los roles permitidos por módulo
const navigation = [
  { name: "Dashboard", to: "/admin/dashboard", icon: HomeIcon, allowedRoles: [ROLES.OWNER] },
  { name: "Ventas", to: "/admin/orders", icon: ShoppingCartIcon, allowedRoles: [ROLES.OWNER, ROLES.ADMIN, ROLES.CASHIER] },
  { name: "Inventario", to: "/admin/category", icon: ArchiveBoxIcon, allowedRoles: [ROLES.OWNER, ROLES.ADMIN, ROLES.CASHIER] },
  { name: "Empleados", to: "/admin/users", icon: UsersIcon, allowedRoles: [ROLES.OWNER] },
  { name: "Reportes", to: "/admin/reports", icon: ChartPieIcon, allowedRoles: [ROLES.OWNER] },
  {
    name: "Configuración",
    icon: Cog6ToothIcon,
    allowedRoles: [ROLES.OWNER, ROLES.ADMIN],
    children: [
      {
        name: "Configuración de Facturación SAR",
        to: "/admin/settings/billing",
      },
      { name: "Sección 2", to: "/admin/settings/section2" },
    ],
  },
];

function classNames(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Función auxiliar para obtener iniciales del nombre
const getInitials = (name: string) => {
  if (!name) return "AD";
  const names = name.split(" ");
  return names.length > 1
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : `${names[0][0]}${names[0][1]}`.toUpperCase();
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const isItemActive = (to?: string) => {
    if (!to) return false;
    return to === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(to);
  };

  const isGroupActive = (children: { to: string }[]) => {
    return children.some((child) => isItemActive(child.to));
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      logout();
      queryClient.clear();
      navigate("/auth-admin/login", { replace: true });
    }
  };

  // 2. Filtramos la navegación ANTES de renderizarla
  const filteredNavigation = navigation.filter(
    (item) => user && item.allowedRoles.includes(user.role)
  );

  const renderNavItems = () => {
    return (
      <ul className="space-y-1 flex-1">
        {/* Iteramos sobre el arreglo filtrado, no el original */}
        {filteredNavigation.map((item) => {
          if (!item.children) {
            const isActive = isItemActive(item.to);
            return (
              <li key={item.name}>
                <Link
                  to={item.to!}
                  onClick={() => setSidebarOpen(false)}
                  className={classNames(
                    isActive
                      ? "bg-rose-50/60 text-rose-600 shadow-sm ring-1 ring-rose-100/50"
                      : "text-gray-500 hover:bg-gray-50 hover:text-rose-500",
                    "group flex gap-x-3 rounded-xl p-2.5 text-sm font-semibold transition-all duration-200",
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive
                        ? "text-rose-500"
                        : "text-gray-400 group-hover:text-rose-400",
                      "size-5 shrink-0 transition-colors",
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          } else {
            return (
              <Disclosure
                as="div"
                key={item.name}
                defaultOpen={isGroupActive(item.children)}
              >
                {({ open }) => (
                  <>
                    <DisclosureButton
                      className={classNames(
                        isGroupActive(item.children)
                          ? "bg-rose-50/30 text-rose-600"
                          : "text-gray-500 hover:bg-gray-50 hover:text-rose-500",
                        "group flex w-full items-center gap-x-3 rounded-xl p-2.5 text-sm font-semibold transition-all duration-200 text-left",
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isGroupActive(item.children)
                            ? "text-rose-500"
                            : "text-gray-400 group-hover:text-rose-400",
                          "size-5 shrink-0 transition-colors",
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                      <ChevronRightIcon
                        className={classNames(
                          open
                            ? "rotate-90 text-rose-500"
                            : "text-gray-400 group-hover:text-rose-400",
                          "size-4 shrink-0 transition-transform duration-200",
                        )}
                      />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" className="mt-1 px-2 space-y-1">
                      {item.children.map((subItem) => {
                        const isSubActive = isItemActive(subItem.to);
                        return (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.to}
                              onClick={() => setSidebarOpen(false)}
                              className={classNames(
                                isSubActive
                                  ? "bg-rose-50/60 text-rose-500 shadow-sm ring-1 ring-rose-100/50"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-rose-400",
                                "group flex gap-x-3 rounded-xl p-2 text-sm font-normal transition-all duration-200",
                              )}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            );
          }
        })}
      </ul>
    );
  };

  // Componente reutilizable para el Menú de Perfil (usado en móvil y escritorio)
  const ProfileDropdown = () => (
    <Menu as="div" className="relative mt-auto pt-4 border-t border-gray-100">
      <MenuButton className="flex w-full items-center justify-between gap-x-3 rounded-xl p-2 hover:bg-gray-50 transition-colors ui-open:bg-gray-50">
        <div className="flex items-center gap-x-3 truncate">
          <div className="h-9 w-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
            {getInitials(user?.name || "")}
          </div>
          <span className="truncate text-sm font-semibold text-gray-700">
            {user?.name ? user.name.split(" ")[0] : "Usuario"}
          </span>
        </div>
        <ChevronUpIcon className="size-4 text-gray-400 shrink-0" aria-hidden="true" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95 translate-y-2"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 translate-y-2"
      >
        <MenuItems className="absolute bottom-full left-0 mb-2 w-full origin-bottom-left rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <div className="px-4 py-2 mb-1 border-b border-gray-50">
            <p className="text-xs font-medium text-gray-500">Menú de Usuario</p>
          </div>
          
          <MenuItem>
            {({ focus }) => (
              <Link
                to="/admin/profile" 
                className={classNames(
                  focus ? "bg-gray-50 text-rose-500" : "text-gray-700",
                  "group flex items-center gap-x-3 px-4 py-2.5 text-sm font-medium transition-colors"
                )}
              >
                <UserIcon className="size-5 text-gray-400 group-hover:text-rose-500" />
                Mi Perfil
              </Link>
            )}
          </MenuItem>
          
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleLogout}
                className={classNames(
                  focus ? "bg-rose-50 text-rose-600" : "text-gray-700",
                  "group flex w-full items-center gap-x-3 px-4 py-2.5 text-sm font-medium transition-colors"
                )}
              >
                <ArrowLeftEndOnRectangleIcon className="size-5 text-gray-400 group-hover:text-rose-600" />
                Cerrar Sesión
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row">
      {/* =========================================
          MOBILE SIDEBAR (Dialog)
      ========================================= */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm transition-opacity" />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 bg-white">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <XMarkIcon className="size-6 text-gray-500" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col overflow-y-auto px-6 pb-4 border-r border-gray-100">
              <div className="flex h-16 items-center shrink-0 mb-5 border-b border-gray-50">
                <div className="h-6 w-6 rounded-full bg-rose-400 mr-2 shadow-sm" />
                <span className="text-lg font-bold text-gray-800 tracking-tight">
                  Petite Amelie <span className="font-light">Admin</span>
                </span>
              </div>

              <nav className="flex flex-1 flex-col">
                {renderNavItems()}
                <ProfileDropdown />
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto border-r border-gray-100 bg-white px-6 pb-4">
          <div className="flex h-20 items-center shrink-0 mb-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-rose-400 flex items-center justify-center shadow-sm">
                <span className="text-white text-[10px]">✨</span>
              </div>
              <span className="text-md font-bold text-gray-800 tracking-tight">
                Petite Amelie{" "}
                <span className="text-gray-400 font-normal italic">Admin</span>
              </span>
            </div>
          </div>

          <nav className="flex flex-1 flex-col">
            {renderNavItems()}
            <ProfileDropdown />
          </nav>
        </div>
      </div>

      {/* =========================================
          MAIN CONTENT AREA
      ========================================= */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* === TOP BAR (Desktop & Mobile) === */}
        <div className="sticky top-0 z-40 flex items-center justify-between lg:justify-end bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 shadow-sm lg:shadow-none">
          {/* Mobile Hamburguer Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-500"
            >
              <Bars3Icon className="size-6" />
            </button>
            <div className="text-sm font-bold text-gray-800 tracking-tight">
              Petite Amelie
            </div>
          </div>

          {/* Desktop & Mobile User Info Box */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3 bg-white border border-gray-100 py-1.5 px-3 rounded-full shadow-sm">
                <div className="hidden lg:flex flex-col items-end mr-1">
                  <span className="text-sm font-semibold text-gray-800 leading-tight">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase">
                    {roleTranslation[user.role]}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs ring-2 ring-white">
                  {getInitials(user.name)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === OUTLET CONTENT === */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* =========================================
          MODALS & TOASTERS
      ========================================= */}
      <MustChangePasswordModal />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "0.875rem",
            padding: "0.7rem 1.2rem",
            borderRadius: "1rem",
            background: "#fff",
            color: "#374151",
            border: "1px solid #f3f4f6",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          },
          success: {
            duration: 5000,
            iconTheme: { primary: "#25bf06", secondary: "#fff" },
          },
        }}
      />
    </div>
  );
}