import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { createRootCategory } from "../../types";
import { createCategory } from "../../services/rootCategoryService";

type CreateRootCategoryModalProps = {
  closeModal: () => void;
};

export default function CreateCategoryModalForm({
  closeModal,
}: CreateRootCategoryModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createRootCategory>({
    defaultValues: {
      name: "",
      position: undefined,
    },
  });

  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  //useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message, { id: "rootCategoryError" });
    },
    onSuccess: (data) => {
      closeModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ["rootCategories"] });
      toast.success(data || "Categoria creada!");
    },
  });

  const handleForm = (formData: createRootCategory) => {
    // Convertimos a número por seguridad antes de enviar
    const data = {
      ...formData,
      position: Number(formData.position),
    };
    mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleForm)} noValidate>
      {/* Input Nombre */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Nombre de la categoría
        </label>
        <input
          type="text"
          autoComplete="off"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="Ej. Cremas, perfumes ..."
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Input Posición */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Posición de orden
        </label>
        <input
          type="number"
          min="0"
          onKeyDown={blockInvalidChar}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.position
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="0"
          {...register("position", {
            required: "La posición es obligatoria",
            min: { value: 0, message: "Mínimo debe ser 0" },
          })}
        />
        <p className="mt-1.5 text-[11px] text-slate-400 italic">
          Define el orden de aparición en el catálogo (1 es el primero).
        </p>
        {errors.position && (
          <ErrorMessage>{errors.position.message}</ErrorMessage>
        )}
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
          className={`rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-700 active:scale-[0.98] ${isPending ? "cursor-not-allowed" : "cursor-pointer"} `}
        >
          {isPending ? "Procesando..." : "Crear categoria"}
        </button>
      </div>
    </form>
  );
}
