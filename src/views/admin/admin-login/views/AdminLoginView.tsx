import { useMutation } from "@tanstack/react-query";
import { login } from "../services/adminAuthService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import type { adminLoginForm } from "../types";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/authStore";

export default function AdminLoginView() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<adminLoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message, { id: "loginError" });
    },
    onSuccess: (data) => {
      reset();
      if (data) setAuth(data.accessToken, data.user);
      if (data) navigate("/admin/dashboard", { replace: true });
    },
  });

  const handleLogin = (formData: adminLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Icono sutil de seguridad (Candado) */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <svg
            className="h-6 w-6 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
          Petite Amelie
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acceso Administrativo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-120">
        <div className="bg-white px-6 py-10 shadow-sm sm:rounded-lg sm:px-12">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-6"
            noValidate
          >
            {/* Input Email */}
            <div className="group">
              <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
                Correo
              </label>
              <input
                type="email"
                autoComplete="off"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
                }`}
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Debe ser un correo electrónico válido",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            {/* Input Password (Contraseña Temporal) */}
            <div className="group">
              <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
                Contraseña
              </label>
              <input
                type="password" // Usualmente texto para que el Admin la vea al crearla y se la dicte
                autoComplete="off"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
                }`}
                placeholder=""
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isPending ? "Verificando..." : "Ingresar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
