import { useState } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { changePasswordForm, PasswordFormData } from "../types";
import { changePassword } from "../services/profileService";

const inputClasses =
  "block w-full rounded-lg outline-none border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 transition-all";

export default function PasswordChangeForm() {
  const user = useAuthStore((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  // 1. Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>();

  // Observamos el valor de la nueva contraseña para validarla contra la confirmación
  const newPasswordValue = watch("newPassword");

  // 2. Configuración de la Mutación (React Query)
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data || "Contraseña actualizada con éxito");
      reset();
    },
    onError: (error) => {
      toast.error(error.message, { id: "passwordError" });
    },
  });

  // 3. Función al enviar el formulario
  const onSubmit = (data: PasswordFormData) => {
    if (!user?.uuid) return;

    // Solo enviamos lo que tu API y tu type original esperan (sin confirmPassword)
    const formDataToSend: changePasswordForm = {
      password: data.password,
      newPassword: data.newPassword,
    };

    mutate({
      uuid: user.uuid,
      formData: formDataToSend,
    });
  };

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6 sm:p-8">
      <div className="border-b border-gray-100 pb-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
        <p className="mt-1 text-sm text-gray-400">
          Actualiza tu contraseña periódicamente.
        </p>
      </div>

      <form className="space-y-5 max-w-md" onSubmit={handleSubmit(onSubmit)}>
        {/* CONTRASEÑA ACTUAL (Siempre oculta) */}
        <div>
          <label
            htmlFor="current-password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Contraseña actual
          </label>
          <input
            id="current-password"
            type="password"
            placeholder="••••••••"
            className={`${inputClasses} ${errors.password ? "ring-red-500 focus:ring-red-500" : ""}`}
            {...register("password", {
              required: "Debes ingresar tu contraseña actual",
            })}
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* NUEVA CONTRASEÑA */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              // Agregamos pr-10 para que el texto no se superponga con el icono
              className={`${inputClasses} pr-10 ${errors.newPassword ? "ring-red-500 focus:ring-red-500" : ""}`}
              {...register("newPassword", {
                required: "Ingresa una contraseña",
                minLength: {
                  value: 10,
                  message: "Contraseña muy corta",
                },
              })}
            />
            {/* Botón del Ojo */}
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* CONFIRMAR NUEVA CONTRASEÑA */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Confirmar nueva contraseña
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Repite la contraseña"
              className={`${inputClasses} pr-10 ${errors.confirmPassword ? "ring-red-500 focus:ring-red-500" : ""}`}
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === newPasswordValue || "Las contraseñas no coinciden",
              })}
            />
            {/* Reutilizamos el mismo estado para mostrar/ocultar este también */}
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-500 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-pink-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? "Guardando..." : "Cambiar contraseña"}
          </button>
        </div>
      </form>
    </div>
  );
}
