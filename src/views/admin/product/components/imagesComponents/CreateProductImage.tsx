import {
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import type { globalProductType } from "../../types";
import type { generalCategoryType } from "@/views/admin/category/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductImage } from "../../services/imageService";

type ContextType = {
  subCategoryId: generalCategoryType["uuid"];
  productId: globalProductType["uuid"];
};

export default function CreateProductImage() {
  const queryClient = useQueryClient();
  const { subCategoryId, productId } = useOutletContext<ContextType>();

  // ESTADOS LOCALES:
  // 'previewUrl' guarda la URL temporal de la nueva imagen para mostrarla antes de subirla.
  // 'selectedFile' guarda el archivo real (File) que se enviará al servidor.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // MANEJADOR DE ARCHIVOS: Se dispara cuando el usuario elige una imagen en su PC.
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es muy pesada. Máximo 5MB");
      return;
    }
    setSelectedFile(file);
    // Crea una URL temporal local para que el navegador pueda mostrar la imagen elegida.
    setPreviewUrl(URL.createObjectURL(file));
  };

  // LIMPIEZA: Cancela la selección y borra la previsualización.
  const resetSelection = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  // ESTADO DERIVADO: Si hay una previewUrl, significa que estamos en "modo edición".
  const isProcessing = !!previewUrl;

  //Mutate
  const { mutate, isPending } = useMutation({
    mutationFn: createProductImage,
    onError: (error) => {
      toast.error(error.message, { id: "errorCreateProductImage" });
    },
    onSuccess: (data) => {
      toast.success(data || "Imagen añadida!", {
        id: "successCreateProductImage",
      });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products", subCategoryId] });
      resetSelection();
    },
  });

  //Crear el FormData y hacer el mutate
  const handleCreateImage = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    mutate({ productId, formData });
  };

  return (
    <div className="relative">
      {/* Contenedor principal con el borde dinámico */}
      <div
        className={`relative aspect-square rounded-2xl border-2 overflow-hidden transition-all flex flex-col items-center justify-center ${
          isProcessing
            ? "border-pink-500"
            : "border-dashed border-slate-200 bg-slate-50/50 hover:border-slate-300"
        }`}
      >
        {/* Input y botón central (solo si no hay preview) */}
        {!isProcessing && (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileSelect}
            />
            <div className="p-3 rounded-full bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <PlusIcon className="h-6 w-6 text-slate-400 group-hover:text-pink-500" />
            </div>
          </label>
        )}

        {/* Imagen de previsualización */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white">
            {/* Replicando el overlay de carga y opacity del componente original */}
            {isPending && (
              <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center backdrop-blur-sm">
                <ArrowPathIcon className="h-8 w-8 text-pink-600 animate-spin" />
              </div>
            )}
            <img src={previewUrl} className="h-full w-full object-cover" />
          </div>
        )}
      </div>

      {/* Botones flotantes Añadir o Cancelar*/}
      {isProcessing && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white p-1 rounded-full shadow-lg border border-slate-100 z-20">
          <button
            onClick={resetSelection}
            disabled={isPending}
            className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer disabled:opacity-30"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleCreateImage}
            className="p-1.5 bg-pink-600 text-white rounded-full hover:bg-pink-700 cursor-pointer disabled:bg-pink-300 shadow-md"
          >
            {isPending ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <CheckIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}