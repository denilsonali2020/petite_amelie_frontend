import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { getUserType, globalUserType, updateUserType } from "../types";
// Asumiendo que tienes esta función en tu servicio
import { updateUser } from "../services/userService";

type EditUserFormProps = {
  userId: globalUserType["uuid"];
  data: getUserType;
};

export default function EditUserForm({ userId, data }: EditUserFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<updateUserType>({
    defaultValues: {
      name: data.name,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
    },
  });

  // Observamos el valor de isActive para cambiar la UI en tiempo real
  const isActive = watch("isActive");

  // useMutation para actualizar
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message, { id: "userError" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success(data || "Usuario Actualizado");
      navigate("/admin/users");
    },
  });

  const handleForm = (formData: updateUserType) => {
    mutate({ userId, formData });
  };

  return (
    <form
      className="max-w-3xl mx-auto space-y-6"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            Acceso al Sistema
          </h2>
          <p className="text-sm font-medium mt-1">
            Status:{" "}
            <span
              className={
                isActive
                  ? "text-emerald-600 font-bold"
                  : "text-rose-500 font-bold"
              }
            >
              {isActive
                ? "Empleado Activo (Puede ingresar)"
                : "Acceso Bloqueado"}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 px-4 border-l border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Activar / Suspender
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("isActive")}
              className="sr-only peer"
            />
            {/* El diseño del Toggle */}
            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Input Nombre */}
        <div className="group">
          <label className="block text-[13px] font-bold text-slate-600 mb-1.5 ml-1 transition-colors group-focus-within:text-pink-600">
            Nombre completo
          </label>
          <input
            type="text"
            autoComplete="off"
            className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm outline-none transition-all ${
              errors.name
                ? "border-red-300 ring-4 ring-red-50"
                : "border-slate-200 focus:border-pink-500 bg-white"
            }`}
            {...register("name", { required: "El nombre es requerido" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Input Email */}
        <div className="group">
          <label className="block text-[13px] font-bold text-slate-600 mb-1.5 ml-1 transition-colors group-focus-within:text-pink-600">
            Correo electrónico
          </label>
          <input
            type="email"
            autoComplete="off"
            className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm outline-none transition-all ${
              errors.email
                ? "border-red-300 ring-4 ring-red-50"
                : "border-slate-200 focus:border-pink-500 bg-white"
            }`}
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Select Rol */}
        <div className="group">
          <label className="block text-[13px] font-bold text-slate-600 mb-1.5 ml-1">
            Nivel de Permisos (Rol)
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none focus:border-pink-500 transition-all cursor-pointer hover:bg-white"
            {...register("role", { required: "El rol es requerido" })}
          >
            <option value="ADMIN">
              Administrador (Gestión de tienda y ventas)
            </option>
            <option value="CASHIER">Cajero (Venta)</option>
            {data.role === "OWNER" && (
              <option value="OWNER">Dueño (Propietario del Sistema)</option>
            )}
          </select>
          {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-pink-600 px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-pink-700 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
