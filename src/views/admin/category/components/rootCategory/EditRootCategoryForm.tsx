import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { createRootCategory, generalCategoryType } from "../../types";
import { updateRootCategory } from "../../services/rootCategoryService";

type EditRootCategoryFormProps = {
  data: createRootCategory;
  rootCategoryId: generalCategoryType["uuid"];
};

export default function EditRootCategoryForm({
  data,
  rootCategoryId,
}: EditRootCategoryFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<createRootCategory>({
    defaultValues: {
      name: data.name,
      position: data.position,
    },
  });

  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  const { mutate, isPending } = useMutation({
    mutationFn: updateRootCategory,
    onError: (error) => {
      toast.error(error.message, { id: "errorEditRootCategory" });
    },
    onSuccess: (data) => {
      toast.success(data || "¡Categoría actualizada!", {
        id: "successEditRootCategory",
      });
      queryClient.invalidateQueries({ queryKey: ["rootCategories"] });
      queryClient.invalidateQueries({
        queryKey: ["getCategory", rootCategoryId],
      });
      navigate("/admin/category");
    },
  });

  const onSubmit = (formData: createRootCategory) => {
    const dataToSend = {
      ...formData,
      position: Number(formData.position),
    };
    mutate({ uuid: rootCategoryId, formData: dataToSend });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Grupo del Input de Nombre */}
      <div className="space-y-2 group">
        <label
          className={`block text-[11px] font-bold uppercase tracking-widest ml-1 transition-colors ${
            errors.name
              ? "text-red-400"
              : "text-gray-400 group-focus-within:text-pink-500"
          }`}
        >
          Nombre de la Categoría
        </label>

        <div className="relative">
          <input
            type="text"
            autoComplete="off"
            className={`block w-full rounded-xl border-0 py-3.5 px-4 text-gray-600 shadow-sm ring-1 ring-inset outline-none transition-all sm:text-sm ${
              errors.name
                ? "ring-red-100 focus:ring-red-400"
                : "ring-gray-100 focus:ring-pink-500 bg-gray-50/30 focus:bg-white"
            }`}
            placeholder="Ej. Anillos, Collares..."
            {...register("name", { required: "El nombre es obligatorio" })}
          />

          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <div
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isDirty
                  ? "bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.6)]"
                  : "bg-gray-100"
              }`}
            />
          </div>
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Grupo del Input de Posición */}
      <div className="space-y-2 group">
        <label
          className={`block text-[11px] font-bold uppercase tracking-widest ml-1 transition-colors ${
            errors.position
              ? "text-red-400"
              : "text-gray-400 group-focus-within:text-pink-500"
          }`}
        >
          Posición de Orden
        </label>

        <div className="relative">
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChar}
            className={`block w-full rounded-xl border-0 py-3.5 px-4 text-gray-600 shadow-sm ring-1 ring-inset outline-none transition-all sm:text-sm ${
              errors.position
                ? "ring-red-100 focus:ring-red-400"
                : "ring-gray-100 focus:ring-pink-500 bg-gray-50/30 focus:bg-white"
            }`}
            placeholder="0"
            {...register("position", {
              required: "La posición es obligatoria",
              min: { value: 0, message: "Mínimo debe ser 0" },
            })}
          />
        </div>
        <p className="ml-1 text-[10px] text-gray-400 italic">
          Indica el orden de prioridad (1 es el primero).
        </p>
        {errors.position && (
          <ErrorMessage>{errors.position.message}</ErrorMessage>
        )}
      </div>

      {/* Footer Administrativo */}
      <div className="flex items-center justify-end gap-5 pt-6 border-t border-gray-50">
        <button
          type="button"
          onClick={() => navigate("/admin/category")}
          className="text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors cursor-pointer"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={`px-8 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm ${
            isDirty && !isPending
              ? "bg-pink-700 text-white hover:bg-pink-600 shadow-pink-100 cursor-pointer"
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-white/30 border-t-white animate-spin rounded-full" />
              <span>Guardando</span>
            </div>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </div>
    </form>
  );
}
