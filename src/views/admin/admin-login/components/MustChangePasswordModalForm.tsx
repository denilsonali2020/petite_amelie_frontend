import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { mustChangePasswordForm } from "../types";
import { mustChangePassword } from "../services/adminAuthService";
import { useAuthStore } from "@/store/auth/authStore";

export default function MustChangePasswordModalForm() {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user!.uuid);
  const mustChangePasswordState = useAuthStore((state) => state.mustChangePassword)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<mustChangePasswordForm>({
    defaultValues: {
      password: "",
    },
  });

  // useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: mustChangePassword,
    onError: (error) => {
      toast.error(error.message, {
        id: "passwordError",
      });
    },
    onSuccess: (data) => {
      reset();
      mustChangePasswordState()
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      toast.success(data || "Contraseña actualizada", {
        id: "passwordSuccess",
      });
    },
  });

  const handleForm = (formData: mustChangePasswordForm) => {
    mutate({ userId, password: formData });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleForm)} noValidate>
      {/* Input Password (Nueva Contraseña) */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Nueva Contraseña
        </label>
        <input
          type="password" // Cambiado a password por privacidad
          autoComplete="new-password"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.password
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="Mínimo 10 caracteres"
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 10,
              message: "La contraseña debe tener al menos 10 caracteres",
            },
          })}
        />

        {/* Feedback de Seguridad Solicitado */}
        <div className="mt-2 rounded-md bg-slate-50 p-2.5 border border-slate-100">
          <p className="text-[11.5px] leading-relaxed text-slate-500">
            <strong className="text-slate-700 font-semibold flex items-center gap-1 mb-0.5">
              Por tu seguridad:
            </strong>
            Esta será tu contraseña personal para ingresar al sistema.
            <span className="text-pink-600 font-medium">
              {" "}
              Nunca la compartas con nadie.
            </span>
          </p>
        </div>

        {errors.password && (
          <div className="mt-1">
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="mt-8 flex items-center justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className={`w-full rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-700 active:scale-[0.98] ${
            isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {isPending ? "Actualizando..." : "Actualizar y entrar"}
        </button>
      </div>
    </form>
  );
}
