import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAuthStore } from "@/store/auth/authStore";
import type { passwordForm } from "../../types";
import { verifyPassword } from "../../services/userService";
// Importa tu servicio real aquí
// import { verifyPassword } from "@/services/authService";

type VerifyFormProps = {
  onSuccess: () => void;
  closeModal: () => void;
};

export default function VerifyOwnerPasswordForm({
  onSuccess,
  closeModal,
}: VerifyFormProps) {
  const userId = useAuthStore.getState().user!.uuid;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyPassword,
    onError: (error) => {
      toast.error(error.message, { id: "passwordError" });
    },
    onSuccess: (data) => {
      onSuccess();
      toast.success(data || "Contraseña correcta!", { id: "passwordSuccess" });
    },
  });

  const handleVerify = (formData: passwordForm) => {
    mutate({ userId, password: formData });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(handleVerify)}
      noValidate
    >
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
          Tu Contraseña (Administrador)
        </label>
        <input
          type="password"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-pink-500 focus:ring-pink-500/10"
          placeholder="Ingresa tu contraseña actual"
          {...register("password", {
            required: "Tu contraseña es obligatoria para esta acción",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message as string}</ErrorMessage>
        )}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={closeModal}
          disabled={isPending}
          className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          //   disabled={isPending}
          className="rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 hover:bg-pink-700 disabled:opacity-70 transition-all cursor-pointer"
        >
          {isPending ? "Verificando..." : "Continuar"}
        </button>
      </div>
    </form>
  );
}
