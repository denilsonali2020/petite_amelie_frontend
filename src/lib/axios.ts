import axios from "axios";
import { useAuthStore } from "@/store/auth/authStore";
import { refresh } from "@/views/admin/admin-login/services/adminAuthService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BACKEND,
  // Permite que axios envie y reciba cookies automaticamente
  withCredentials: true,
});

// 1 - Interceptor de Peticion tipo request
// esto inyecta el accessToken en cada peticion si el usuario esta autenticado
api.interceptors.request.use((config) => {
  // obtenemos el accessToken de zustand antes de cada peticion
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2 - Interceptor de respuesta de tipo response
// esto atrapa errores 401 y renueva el token silenciosamente
api.interceptors.response.use(
  (response) => response, // Si la petición es exitosa sigue
  // Si la petición falla, se ejecuta este callback de manejo de errores
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 osea Token expirado y no hemos intentado renovarlo ya
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // marcamos true, para no entrar en un bucle infinito

      try {
        // Intentamos renovar el token usando el endpoint de refresh
        const data = await refresh();
        if (!data) throw new Error("Error al obtener accessToken");
        // Si el refresh fue exitoso, obtenemos el nuevo token
        const newToken = data.accessToken;

        // Obtenemos el actual usuario logeado
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          // actualizamos su token y refrescamos la sesion del actual usuario
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
