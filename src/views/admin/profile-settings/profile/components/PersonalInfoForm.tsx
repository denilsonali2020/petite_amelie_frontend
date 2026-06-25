import { useAuthStore } from "@/store/auth/authStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { updateNameForm } from "../types";
import { updateName } from "../services/profileService";
import toast from "react-hot-toast";
import { roleTranslation } from "@/locales/es";

const getInitials = (name: string) => {
  if (!name) return "AD";
  const names = name.split(" ");
  return names.length > 1
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : `${names[0][0]}${names[0][1]}`.toUpperCase();
};

const inputClasses =
  "block w-full rounded-lg outline-none border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 transition-all";
const disabledClasses =
  "bg-slate-50 text-gray-500 ring-gray-200 cursor-not-allowed";
export default function PersonalInfoForm() {
  const user = useAuthStore((state) => state.user);
  const setName = useAuthStore((state) => state.setName);

  // 1. Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<updateNameForm>({
    defaultValues: {
      name: user?.name || "",
    },
  });

  // 2. Configuración de la Mutación (React Query)
  const { mutate, isPending } = useMutation({
    mutationFn: updateName,
    onSuccess: (data) => {
      toast.success("Nombre actualizado!");
      if (data) setName(data.name);
    },
    onError: (error) => {
      toast.error(error.message, { id: "nombreError" });
    },
  });

  // 3. Función al enviar el formulario
  const onSubmit = (data: updateNameForm) => {
    if (!user?.uuid) return; // Validación de seguridad

    // Llamamos al mutate pasándole la estructura que espera tu función API
    mutate({
      uuid: user.uuid,
      formData: data,
    });
  };

  if (user)
    return (
      <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6 sm:p-8">
        <div className="border-b border-gray-100 pb-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Información Personal
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Datos básicos de identificación.
          </p>
        </div>

        {/* RHF: Envolvemos la función con handleSubmit */}
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-x-6">
            <div className="h-20 w-20 flex-none rounded-full bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-2xl ring-4 ring-white shadow-md">
              {getInitials(user.name)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nombre completo
              </label>
              {/* RHF: Registramos el input con sus reglas de validación */}
              <input
                id="name"
                type="text"
                autoComplete="off"
                className={`${inputClasses} ${errors.name ? "ring-red-500 focus:ring-red-500" : ""}`}
                {...register("name", {
                  required: "El nombre no puede estar vacío",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                })}
              />
              {/* RHF: Mostramos el error si existe */}
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled
                className={`${inputClasses} ${disabledClasses}`}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Rol asignado
              </label>
              <input
                id="role"
                type="text"
                defaultValue={roleTranslation[user.role]}
                disabled
                className={`${inputClasses} ${disabledClasses} font-semibold text-pink-600/70`}
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-50 pt-6">
            <button
              type="submit"
              disabled={!isDirty}
              className="rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-pink-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2"
            >
              {isPending ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    );
}
