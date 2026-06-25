import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { generalCategoryType, updateSubCategoryType } from "../../types";
import { updateSubCategory } from "../../services/subCategoriesService";

type EditRootCategoryFormProps = {
  data: updateSubCategoryType;
  rootCategoryId: generalCategoryType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
};

export default function EditSubCategoryForm({
  data,
  rootCategoryId,
  subCategoryId,
}: EditRootCategoryFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Estado para la previsualización
  const [preview, setPreview] = useState<string | null>(
    typeof data.imageURL === "string" ? data.imageURL : null,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<updateSubCategoryType>({
    defaultValues: {
      name: data.name,
      position: data.position,
      imageURL: data.imageURL,
    },
  });

  // Bloquear caracteres no numéricos
  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  // 2. Observar el campo de imagen para cambios
  const file = watch("imageURL");

  useEffect(() => {
    const fileList = file;
    if (fileList instanceof FileList && fileList.length > 0) {
      const url = URL.createObjectURL(fileList[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateSubCategory,
    onError: (error) => {
      toast.error(error.message, { id: "errorEditRootCategory" });
    },
    onSuccess: (data) => {
      toast.success(data || "Categoria actualizada!", {
        id: "successEditRootCategory",
      });
      queryClient.invalidateQueries({
        queryKey: ["subCategories", rootCategoryId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getCategory", subCategoryId],
      });
      navigate(`/admin/category/${rootCategoryId}/sub-categories`);
    },
  });

  const handleForm = (formData: updateSubCategoryType) => {
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    
    // Agregamos la posición como número
    dataToSend.append("position", String(formData.position || 0));

    const imageField = formData.imageURL;
    
    if (imageField instanceof FileList && imageField.length > 0) {
      dataToSend.append("image", imageField[0]);
    } else if (typeof imageField === "string") {
      dataToSend.append("imageURL", imageField);
    }

    const dataMutate = {
      rootCategoryId,
      subCategoryId,
      formData: dataToSend,
    };
    mutate(dataMutate);
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-8" noValidate>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* INPUT NAME */}
        <div className="group md:col-span-2">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Nombre de la sub-categoría
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

        {/* INPUT POSITION */}
        <div className="group md:col-span-1">
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
              min: { value: 0, message: "Mínimo 0" },
            })}
          />
          {errors.position && <ErrorMessage>{errors.position.message}</ErrorMessage>}
        </div>
      </div>

      {/* SECCIÓN DE IMAGEN */}
      <div className="group">
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
          Imagen de la sub-categoría
        </label>

        <div
          className={`
            flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border-2 border-dashed transition-colors
            ${
              errors.imageURL
                ? "border-red-200 bg-red-50/50 hover:border-red-300"
                : "border-slate-200 bg-slate-50/50 hover:border-pink-300"
            }
          `}
        >
          {/* Preview */}
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-white shadow-inner ring-1 ring-slate-200">
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <PhotoIcon className="h-10 w-10" />
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-800">Cambiar imagen</h3>
            <p className="mt-1 text-xs text-slate-500 mb-4">
              Sube una imagen cuadrada. JPEG, JPG, PNG, WEBP o AVIF (Máx 5MB).
            </p>

            <label
              className={`
                inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold shadow-sm ring-1 transition-all active:scale-95
                ${
                  errors.imageURL
                    ? "bg-red-100 text-red-600 ring-red-200 hover:bg-red-50"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 hover:ring-pink-300"
                }
              `}
            >
              <PhotoIcon
                className={`h-4 w-4 ${
                  errors.imageURL ? "text-red-500" : "text-pink-500"
                }`}
              />
              Seleccionar archivo
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                className="hidden"
                {...register("imageURL", {
                  validate: {
                    fileSize: (value) => {
                      if (typeof value === "string" || !value || value.length === 0) return true;
                      const file = value[0];
                      return file.size <= 5 * 1024 * 1024 || "Máximo 5MB";
                    },
                    fileType: (value) => {
                      if (typeof value === "string" || !value || value.length === 0) return true;
                      const file = value[0];
                      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
                      return allowedTypes.includes(file.type) || "Formato no válido";
                    },
                  },
                })}
              />
            </label>
          </div>
        </div>
        {errors.imageURL && <div className="mt-2"><ErrorMessage>{errors.imageURL.message}</ErrorMessage></div>}
      </div>

      {/* BOTONES */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={() => navigate(`/admin/category/${rootCategoryId}/sub-categories`)}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 px-4 py-2 cursor-pointer"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isDirty && preview === (typeof data.imageURL === "string" ? data.imageURL : null)}
          className={`inline-flex items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-bold text-white shadow-md transition-all active:scale-[0.98] ${
            isDirty || preview !== (typeof data.imageURL === "string" ? data.imageURL : null)
              ? "bg-pink-600 hover:bg-pink-700 shadow-pink-200 cursor-pointer"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {isPending && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          {isPending ? "Procesando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}