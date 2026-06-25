import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { createSubCategory } from "../../services/subCategoriesService";
import type { createSubCategoryType } from "../../types";

type CreateRootCategoryModalProps = {
  closeModal: () => void;
};

export default function CreateSubCategoryModalForm({
  closeModal,
}: CreateRootCategoryModalProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const rootCategoryId = params.rootCategoryId!;

  // 1. Estado para la miniatura
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<createSubCategoryType>({
    defaultValues: {
      name: "",
      position: undefined,
      parentId: rootCategoryId,
      imageURL: undefined,
    },
  });

  // Bloquear caracteres no numéricos
  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  // 2. Observar el input de archivo
  const file = watch("imageURL");

  useEffect(() => {
    if (file && file.length > 0) {
      const url = URL.createObjectURL(file[0]);
      setPreview(url);

      // Limpiar memoria
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const { mutate, isPending } = useMutation({
    mutationFn: createSubCategory,
    onError: (error) => {
      toast.error(error.message, { id: "subCategoryError" });
    },
    onSuccess: (data) => {
      closeModal();
      reset();
      setPreview(null);
      queryClient.invalidateQueries({
        queryKey: ["subCategories", rootCategoryId],
      });
      toast.success(data || "Categoría creada!", { id: "subCategorySuccess" });
    },
  });

  const handleForm = (data: createSubCategoryType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    // Aseguramos que la posición sea un número al enviarlo
    formData.append("position", String(data.position || 0));

    if (data.parentId) {
      formData.append("parentId", data.parentId);
    }

    if (data.imageURL && data.imageURL[0]) {
      formData.append("image", data.imageURL[0]);
    }
    mutate(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleForm)} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campo Nombre */}
        <div className="group sm:col-span-1">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Nombre de la sub-categoría
          </label>
          <input
            type="text"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all  ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
            }`}
            placeholder="Ej. Cremas, Lociones..."
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Campo Posición */}
        <div className="group sm:col-span-1">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Posición de orden
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChar}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all  ${
              errors.position
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
            }`}
            placeholder="0"
            {...register("position", {
              required: "Requerido",
              min: { value: 0, message: "Mínimo 0" },
            })}
          />
          {errors.position && (
            <ErrorMessage>{errors.position.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Campo Imagen con Dropzone y Miniatura */}
      <div className="group">
        <label className="block text-[13px] font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-pink-600">
          Imagen de Sub-categoría
        </label>

        <div className="relative">
          <label
            className={`
              relative flex flex-col items-center justify-center w-full h-32 
              rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
              ${
                errors.imageURL
                  ? "border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-300"
                  : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-pink-400 hover:shadow-sm"
              }
            `}
          >
            <div className="flex items-center justify-center gap-5 px-4 w-full">
              {preview && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ring-2 ring-white transition-transform hover:scale-105">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div
                  className={`p-2 rounded-full mb-1 ${errors.imageURL ? "bg-red-100" : "bg-slate-100"}`}
                >
                  <svg
                    className={`w-5 h-5 ${errors.imageURL ? "text-red-500" : "text-slate-500"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-pink-600">
                    {preview ? "Cambiar imagen" : "Haz click para subir"}
                  </span>
                </p>
                {!preview && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    JPEG, JPG, PNG, WEBP o AVIF hasta 5MB
                  </p>
                )}
              </div>
            </div>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
              className="hidden"
              {...register("imageURL", {
                validate: {
                  fileSize: (files) => {
                    if (!files || files.length === 0) return true;
                    const file = files[0];
                    return (
                      file.size <= 5 * 1024 * 1024 ||
                      "La imagen no debe pesar más de 5MB"
                    );
                  },
                  fileType: (files) => {
                    if (!files || files.length === 0) return true;
                    const file = files[0];
                    const allowedTypes = [
                      "image/jpeg",
                      "image/jpg",
                      "image/png",
                      "image/webp",
                      "image/avif",
                    ];
                    return (
                      allowedTypes.includes(file.type) || "Formato no válido"
                    );
                  },
                },
              })}
            />
          </label>
        </div>
        {errors.imageURL && (
          <ErrorMessage>{errors.imageURL.message}</ErrorMessage>
        )}
      </div>

      {/* Botones de acción */}
      <div className="mt-8 flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-100 transition-all hover:bg-pink-700 active:scale-[0.98] ${isPending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isPending ? "Procesando..." : "Crear sub-categoria"}
        </button>
      </div>
    </form>
  );
}
