import axios from "axios";
import { useAuthStore } from "@/store/auth/authStore";
import { refresh } from "@/views/admin/admin-login/services/adminAuthService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BACKEND,
  // Permite que axios envie y reciba cookies automaticamente
  withCredentials: true,
});

// 1. INTERCEPTOR DE PETICIÓN (Request)
// Encargado de inyectar el accessToken en cada petición si el usuario está autenticado
api.interceptors.request.use((config) => {
  //Obtenemos el token de Zustand antes de cada petición
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. INTERCEPTOR DE RESPUESTA (Response)
// Encargado de atrapar errores 401 y renovar el token silenciosamente
api.interceptors.response.use(
  (response) => response, // Si la petición fue exitosa, la dejamos pasar
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (Token expirado) y no hemos intentado renovarlo ya
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcamos para no entrar en un bucle infinito

      try {
        // Intentamos renovar el token usando el endpoint de refresh
        const data = await refresh();

        // Si el refresh fue exitoso, obtenemos el nuevo token
        const newToken = data!.accessToken;

        // Actualizamos Zustand con el nuevo token sin perder al usuario
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.getState().setAuth(newToken, currentUser);
        }

        // Le inyectamos el nuevo token a la petición original que había fallado y la volvemos a enviar
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh también falla (ej. la cookie expiró después de 7 días o fue revocada)
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
