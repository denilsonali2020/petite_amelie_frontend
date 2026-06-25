import { useAuthStore } from "@/store/auth/authStore";
import type { ReactNode } from "react";

interface RoleWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleWrapper({
  allowedRoles,
  children,
}: RoleWrapperProps) {
  const user = useAuthStore((state) => state.user);

  // Si no hay usuario en el estado, o el rol del usuario NO está en el arreglo de permitidos, no renderiza nada.
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // Si pasa la validación, muestra el contenido envuelto
  return <>{children}</>;
}
