import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { createUserType } from "../types";
import { createUser } from "../services/userService";
// Asumo que tienes una función similar en tu servicio de usuarios

type CreateUserModalProps = {
  closeModal: () => void;
};

export default function CreateUserModalForm({
  closeModal,
}: CreateUserModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CASHIER",
    },
  });

  // useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(error.message, {
        id: "userError",
      });
    },
    onSuccess: (data) => {
      closeModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data || "Usuario creado!", {
        id: "userSuccess",
      });
    },
  });

  const handleForm = (formData: createUserType) => {
    mutate(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleForm)} noValidate>
      {/* Input Nombre */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Nombre completo
        </label>
        <input
          type="text"
          autoComplete="off"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="Ej. Juan Pérez"
          {...register("name", { required: "El nombre es requerido" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Input Email */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Correo electrónico
        </label>
        <input
          type="email"
          autoComplete="off"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="empleado@ejemplo.com"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Debe ser un correo electrónico válido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      {/* Input Password (Contraseña Temporal) */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Contraseña temporal
        </label>
        <input
          type="text" // Usualmente texto para que el Admin la vea al crearla y se la dicte
          autoComplete="off"
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
        <p className="mt-1.5 text-[11px] text-slate-400 italic">
          El empleado deberá cambiar esta contraseña en su primer inicio de
          sesión.
        </p>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      {/* Select Rol */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Rol del empleado
        </label>
        <select
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all cursor-pointer bg-white ${
            errors.role
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          {...register("role", { required: "El rol es requerido" })}
        >
          <option disabled>Selecciona un Rol</option>
          <option value="ADMIN">
            Administrador (Gestión de tienda y ventas)
          </option>
          <option value="CASHIER">Cajero (Ventas)</option>
        </select>
        {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      </div>

      {/* Botones */}
      <div className="mt-8 flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-700 active:scale-[0.98] ${
            isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {isPending ? "Procesando..." : "Crear usuario"}
        </button>
      </div>
    </form>
  );
}
