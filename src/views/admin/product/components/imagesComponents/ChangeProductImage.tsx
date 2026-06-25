// 1. IMPORTACIONES: Traemos hooks de React, herramientas de estado de servidor (TanStack Query),
// iconos de Heroicons y servicios de API externos.
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import type { getProductType, globalProductType } from "../../types";
import type { generalCategoryType } from "@/views/admin/category/types";
import { updateProductImage } from "../../services/imageService";
import { useNavigate } from "react-router-dom";

interface ChangeProductImageProps {
  image: getProductType["images"][0];
  productId: globalProductType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
}

export default function ChangeProductImage({
  image,
  productId,
  subCategoryId,
}: ChangeProductImageProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ESTADOS LOCALES:
  // 'previewUrl' guarda la URL temporal de la nueva imagen para mostrarla antes de subirla.
  // 'selectedFile' guarda el archivo real (File) que se enviará al servidor.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // MUTACIÓN
  const { mutate, isPending } = useMutation({
    mutationFn: updateProductImage,
    onError: (error) => toast.error(error.message, { id: "errorProductImage" }),
    onSuccess: (data) => {
      toast.success(data || "Imagen cambiadá!", { id: "successProductImage" });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products", subCategoryId] });
      resetSelection(); // Limpia la vista de previsualización
    },
  });

  // MANEJADOR DE ARCHIVOS: Se dispara cuando el usuario elige una imagen en su PC.
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación de tamaño (5MB máximo)
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

  const handleConfirm = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    mutate({ productId, imageId: image.uuid, formData });
  };

  // ESTADO DERIVADO: Si hay una previewUrl, significa que estamos en "modo edición".
  const isProcessing = !!previewUrl;

  return (
    <div className="relative group">
      {!image.isPrimary && !isProcessing && (
        <button
          type="button"
          onClick={() =>
            navigate(
              location.pathname +
                `?deleteProductImage=true&imageId=${image.uuid}`,
            )
          }
          className="absolute -top-2 -right-2 z-30 p-2 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-800 cursor-pointer border-2 border-white"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden border-2 ${
          isProcessing
            ? "border-pink-500"
            : "border-slate-100 group-hover:border-pink-200"
        }`}
      >
        <img
          src={image.url}
          className={`absolute inset-0 h-full w-full object-cover ${
            isProcessing ? "hidden" : "block"
          }`}
        />

        {/* Mostramos la imagen nueva */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="relative h-full w-full overflow-hidden">
              {isPending && (
                <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center backdrop-blur-sm">
                  <ArrowPathIcon className="h-8 w-8 text-pink-600 animate-spin" />
                </div>
              )}
              <img src={previewUrl} className="h-full w-full object-cover" />
            </div>
          </div>
        )}

        {!isProcessing && (
          <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onFileSelect}
            />
            <ArrowsRightLeftIcon className="h-8 w-8 text-white mb-1" />
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">
              Cambiar
            </span>
          </label>
        )}
      </div>

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
            onClick={handleConfirm}
            disabled={isPending}
            className="p-1.5 bg-pink-600 text-white rounded-full hover:bg-pink-700 cursor-pointer disabled:bg-pink-300"
          >
            {isPending ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <CheckIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <div className="mt-0 px-1">
        <span
          className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
            image.isPrimary
              ? "bg-pink-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {image.isPrimary ? "Principal" : "Secundaria"}
        </span>
      </div>
    </div>
  );
}
