import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { recoveryPasswordUser } from "../../services/userService";
import type { passwordForm } from "../../types";

type ResetFormProps = {
  userId: string;
  closeModal: () => void;
};

export default function ResetUserPasswordForm({
  userId,
  closeModal,
}: ResetFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: recoveryPasswordUser,
    onError: (error) => {
      toast.error(error.message, { id: "recoveryError" });
    },
    onSuccess: (data) => {
      reset();
      closeModal();
      toast.success(data || "Solicitud aceptada!", { id: "recoverySuccess" });
    },
  });

  const handleReset = (formData: passwordForm) => {
    mutate({ userId, password: formData });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleReset)} noValidate>
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
          Nueva Contraseña Temporal
        </label>
        <input
          type="text" // Texto visible para que el Owner se la pueda dictar al empleado
          autoComplete="off"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-rose-500 focus:ring-rose-500/10"
          placeholder="Ej: Temporal123!"
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message as string}</ErrorMessage>
        )}

        <p className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
          El empleado será expulsado de su sesión actual y deberá cambiar esta
          clave al ingresar.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={closeModal}
          disabled={isPending}
          className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200 hover:bg-rose-700 disabled:opacity-70 transition-all cursor-pointer"
        >
          {isPending ? "Reseteando..." : "Confirmar Reseteo"}
        </button>
      </div>
    </form>
  );
}
