import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth/authStore";
import axios from "axios";

export default function ProtectedRoute() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setAuth = useAuthStore((state) => state.setAuth);

  const restoreSession = async () => {
    const { data: refreshData } = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/admin-auth/refresh`,
      { withCredentials: true },
    );

    const { data: userData } = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/admin-auth/me`,
      {
        headers: { Authorization: `Bearer ${refreshData.accessToken}` },
      },
    );
    return { token: refreshData.accessToken, user: userData };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authMe"],
    queryFn: restoreSession,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !isAuth,
  });

  // Efecto para sincronizar TanStack Query con Zustand
  useEffect(() => {
    if (data && !isAuth) {
      setAuth(data.token, data.user);
    }
  }, [data, isAuth, setAuth]);

  if (isAuth) {
    return <Outlet />;
  }

  if (isLoading || (data && !isAuth)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/auth-admin/login" replace />;
  }

  return <Navigate to="/auth-admin/login" replace />;
}
