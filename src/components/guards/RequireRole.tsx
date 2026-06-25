import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth/authStore";

interface RequireRoleProps {
  allowedRoles: string[];
}

export default function RequireRole({ allowedRoles }: RequireRoleProps) {
  const user = useAuthStore((state) => state.user);

  // Si no hay usuario por alguna razón, lo mandamos al login
  if (!user) {
    return <Navigate to="/auth-admin/login" replace />;
  }

  // Si el rol del usuario NO está en el arreglo de permitidos...
  if (!allowedRoles.includes(user.role)) {
    // Lo redirigimos a una ruta segura a la que todos tienen acceso
    // Nueva venta es el lugar más lógico para cajeros o administradores perdidos
    return <Navigate to="/admin/orders" replace />;
  }

  // Si tiene permiso, renderiza la ruta hija
  return <Outlet />;
}