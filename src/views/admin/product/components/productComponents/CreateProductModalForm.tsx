import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  PhotoIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { createProductType } from "../../types";
import { createProduct } from "../../services/productService";

type CreateProductModalProps = {
  closeModal: () => void;
};
type ProductFormData = createProductType & {
  images: FileList;
};

export default function CreateProductModalForm({
  closeModal,
}: CreateProductModalProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const subCategoryId = params.subCategoryId!;
  const [previews, setPreviews] = useState<string[]>([]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      cost: undefined,
      price: undefined,
      minStock: undefined,
      stock: undefined,
      isReward: false,
      pointsValue: 0,
    },
  });

  const isReward = watch("isReward");
  const imagesField = watch("images");

  // Bloqueo de caracteres no válidos en campos numéricos
  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  // Reset de precio y puntos según el toggle de canje
  useEffect(() => {
    if (isReward) {
      setValue("price", 0);
    } else {
      setValue("pointsValue", 0);
    }
  }, [isReward, setValue]);

  // Previsualización de imágenes
  useEffect(() => {
    if (imagesField && imagesField.length > 0) {
      const selectedFiles = Array.from(imagesField).slice(0, 5);
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [imagesField]);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message, { id: "productError" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products", subCategoryId],
      });
      toast.success(data || "Producto creado!", { id: "productSuccess" });
      closeModal();
      reset();
    },
  });

  const handleForm = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("sku", data.sku);
    formData.append("cost", data.cost.toString());
    const finalPrice = isReward ? "0" : data.price.toString();
    const finalPointsValue = isReward ? data.pointsValue.toString() : "0";
    formData.append("price", finalPrice);
    formData.append("minStock", data.minStock.toString() || "0");
    formData.append("stock", data.stock.toString());
    formData.append("isReward", String(isReward));
    formData.append("pointsValue", finalPointsValue);
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("image", file);
      });
    }
    mutate({ subCategoryId, formData });
  };

  return (
    <form
      className="max-w-5xl mx-auto space-y-6 pb-0"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* COLUMNA PRINCIPAL */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bloque 1: Información Base */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
              <DocumentTextIcon className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                Detalles del Producto
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-slate-600 mb-1.5 ml-1">
                  Nombre del Producto
                </label>

                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Ej. Kit Facial de Rosas"
                  className={`w-full rounded-xl border bg-slate-50/30 px-4 py-3 text-sm outline-none transition-all ${
                    errors.name
                      ? "border-red-300 ring-4 ring-red-50"
                      : "border-slate-200 focus:border-pink-500"
                  }`}
                  {...register("name", { required: "El nombre es requerido" })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-600 mb-1.5 ml-1">
                  Descripción
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe las características principales..."
                  className="w-full rounded-xl border bg-slate-50/30 px-4 py-3 text-sm outline-none border-slate-200 focus:border-pink-500 transition-all"
                  {...register("description")}
                />
              </div>
            </div>
          </div>

          {/* Bloque 2: Precios */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4 mb-5">
              <CurrencyDollarIcon className="h-5 w-5 text-slate-400" />

              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                Precios y Finanzas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 flex justify-between">
                  Costo Unitario
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                    L.
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    onKeyDown={blockInvalidChar}
                    className={`w-full rounded-xl border bg-slate-50/50 pl-10 pr-4 py-3 text-sm font-bold outline-none transition-all ${
                      errors.cost
                        ? "border-red-300"
                        : "border-slate-200 focus:border-slate-400"
                    }`}
                    {...register("cost", {
                      required: "Costo unitario requerido",
                      min: { value: 0, message: "Mínimo 0" },
                    })}
                  />
                  {errors.cost && (
                    <ErrorMessage>{errors.cost.message}</ErrorMessage>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-pink-600 flex justify-between">
                  Precio de Venta{" "}
                  {isReward && (
                    <span className="text-[10px] text-slate-400 italic font-normal">
                      (Desactivado por Canje)
                    </span>
                  )}
                </label>

                <div className="relative">
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm ${
                      isReward ? "text-slate-400" : "text-pink-400"
                    }`}
                  >
                    L.
                  </span>
                  <input
                    type="number"
                    autoComplete="off"
                    min="0"
                    placeholder="0.00"
                    disabled={isReward}
                    onKeyDown={blockInvalidChar}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm font-black outline-none transition-all ${
                      isReward
                        ? "bg-slate-100 border-slate-200 text-slate-400"
                        : "bg-white border-pink-200 text-pink-600 focus:border-pink-500"
                    }`}
                    {...register("price", {
                      required: {
                        value: !isReward,

                        message: "Precio de venta requerido",
                      },
                    })}
                  />
                  {errors.price && (
                    <ErrorMessage>{errors.price.message}</ErrorMessage>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA LATERAL */}
        <div className="space-y-6">
          {/* Bloque 3: Stock y SKU */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ArchiveBoxIcon className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                Inventario
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                  SKU / Código
                </label>
                <input
                  type="text"
                  placeholder="SKU-123"
                  autoComplete="off"
                  className={`w-full rounded-xl border bg-slate-50/50 px-4 py-2.5 text-sm font-mono outline-none transition-all ${
                    errors.sku
                      ? "border-red-300"
                      : "border-slate-200 focus:border-pink-500"
                  }`}
                  {...register("sku", { required: "SKU es requerido" })}
                />
                {errors.sku && (
                  <ErrorMessage>{errors.sku.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                  Stock Minimo
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  onKeyDown={blockInvalidChar}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm font-bold outline-none transition-all ${
                    errors.minStock
                      ? "border-red-300 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-pink-500"
                  }`}
                  {...register("minStock", {
                    required: "Stock minimo es requerido",

                    min: { value: 0, message: "Mínimo 0" },
                  })}
                />
                {errors.minStock && (
                  <ErrorMessage>{errors.minStock.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                  Stock Inicial
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  onKeyDown={blockInvalidChar}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm font-bold outline-none transition-all ${
                    errors.stock
                      ? "border-red-300 ring-2 ring-red-50"
                      : "border-slate-200 focus:border-pink-500"
                  }`}
                  {...register("stock", {
                    required: "Stock es requerido",

                    min: { value: 0, message: "Mínimo 0" },
                  })}
                />
                {errors.stock && (
                  <ErrorMessage>{errors.stock.message}</ErrorMessage>
                )}
              </div>
            </div>
          </div>

          {/* Bloque 4: Reglas de Canje */}
          <div
            className={`rounded-2xl border p-6 transition-all shadow-sm ${
              isReward
                ? "border-pink-200 bg-pink-50/30"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircleIcon
                  className={`h-5 w-5 ${isReward ? "text-pink-500" : "text-slate-400"}`}
                />

                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                  Producto de canje
                </h3>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 text-pink-600 rounded border-slate-300 focus:ring-pink-500 cursor-pointer"
                {...register("isReward")}
              />
            </div>

            {isReward ? (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                <p className="text-[11px] text-pink-700 font-medium bg-white/50 p-2 rounded-lg">
                  Este producto solo podrá adquirirse mediante puntos.
                </p>
                <div>
                  <label className="block text-[11px] font-black text-pink-600 uppercase mb-1">
                    Costo en Puntos
                  </label>
                  <input
                    type="number"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm font-black text-pink-700 outline-none focus:ring-4 focus:ring-pink-500/20 ${
                      errors.pointsValue ? "border-red-300" : "border-pink-200"
                    }`}
                    {...register("pointsValue", {
                      required: {
                        value: isReward,

                        message: "Los puntos son requeridos",
                      },
                      min: 0,
                    })}
                  />

                  {errors.pointsValue && (
                    <ErrorMessage>{errors.pointsValue.message}</ErrorMessage>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                No disponible para canje por puntos actualmente.
              </p>
            )}
          </div>

          {/* Bloque 5: Galería de Imágenes */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <PhotoIcon className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                Multimedia
              </h3>
            </div>
            <label className="relative flex flex-col items-center justify-center w-full min-h-32 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-pink-400 transition-colors cursor-pointer overflow-hidden">
              <div className="flex flex-wrap justify-center gap-2 p-4">
                {previews.map((url, index) => (
                  <div
                    key={index}
                    className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-white shadow-sm"
                  >
                    <img src={url} className="h-full w-full object-cover" />
                    {index === 0 && (
                      <div className="absolute top-0 left-0 bg-pink-500 px-1 py-0.5 rounded-br shadow-sm">
                        <span className="text-[7px] font-black uppercase text-white tracking-tighter block leading-none">
                          Principal
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {previews.length === 0 && (
                  <div className="text-center py-4">
                    <PhotoIcon className="mx-auto h-8 w-8 text-pink-400 mb-2" />
                    <p className="text-xs font-bold text-slate-600">
                      Subir fotos
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Max 5 imgs (5MB c/u)
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                {...register("images", {
                  required: "Sube al menos una imagen",
                  validate: {
                    lessThan5MB: (files) => {
                      if (!files || files.length === 0) return true;
                      const filesArray = Array.from(files);
                      const tooLarge = filesArray.some(
                        (file) => file.size > 5 * 1024 * 1024,
                      );
                      return tooLarge ? "Un archivo supera los 5MB" : true;
                    },
                    maxCount: (files) => {
                      return (
                        files.length <= 5 || "Máximo 5 imágenes permitidas"
                      );
                    },
                  },
                })}
              />
            </label>

            <div className="flex justify-between items-start mt-2 px-1">
              <div className="flex-1">
                {errors.images ? (
                  <ErrorMessage>{errors.images.message}</ErrorMessage>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">
                    La primera imagen será la portada.
                  </p>
                )}
              </div>

              {previews.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue("images", [] as unknown as FileList);
                    setPreviews([]);
                  }}
                  className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER: Acciones */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-pink-600 px-12 py-3 text-sm font-bold text-white hover:bg-pink-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Procesando..." : "Crear Producto"}
        </button>
      </div>
    </form>
  );
}
