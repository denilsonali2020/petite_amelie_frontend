import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  CheckCircleIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom"; // <-- IMPORTAMOS useLocation

import ErrorMessage from "@/components/ui/ErrorMessage.tsx";
import type {
  editProductFormType,
  getProductType,
  globalProductType,
} from "../../types/index.ts";
import type { generalCategoryType } from "@/views/admin/category/types/index.ts";
import { updateProduct } from "../../services/productService.ts";

type EditProductFormProps = {
  data: getProductType;
  rootCategoryId: generalCategoryType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
  productId: globalProductType["uuid"];
};

export default function EditProductForm({
  data,
  rootCategoryId,
  subCategoryId,
  productId,
}: EditProductFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<editProductFormType>({
    defaultValues: {
      name: data.name,
      description: data.description || "",
      sku: data.sku,
      cost: data.cost,
      price: data.price,
      minStock: data.minStock,
      stock: data.stock,
      isReward: data.isReward,
      pointsValue: data.pointsValue,
      isOnDiscount: data.isOnDiscount,
      discountPrice: data.discountPrice,
      isActive: data.isActive,
    },
  });

  const isReward = watch("isReward");
  const isActive = watch("isActive");
  const isOnDiscount = watch("isOnDiscount");

  // Bloqueo de caracteres científicos en inputs numéricos
  const blockInvalidChar = (e: React.KeyboardEvent) =>
    ["e", "E", "-", "+"].includes(e.key) && e.preventDefault();

  // Lógica de reset de precio si es canje
  useEffect(() => {
    if (isReward) {
      setValue("price", 0);
    }
  }, [isReward, setValue]);

  // Lógica: reset de discountPrice a 0 si se apaga el descuento
  useEffect(() => {
    if (!isOnDiscount) {
      setValue("discountPrice", 0);
    }
  }, [isOnDiscount, setValue]);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      toast.error(error.message, { id: "productError" });
    },
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["products", subCategoryId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      toast.success(responseData || "Producto Actualizado", {
        id: "productSuccess",
      });
      // <-- 1. CORRECCIÓN AQUÍ: Agregamos location.search al onSuccess
      navigate(
        `/admin/category/${rootCategoryId}/category/${subCategoryId}/products${location.search}`,
      );
    },
  });

  const handleForm = (formData: editProductFormType) => {
    mutate({ productId, formData });
  };

  return (
    <form
      className="max-w-5xl mx-auto space-y-6 pb-0"
      onSubmit={handleSubmit(handleForm)}
      noValidate
    >
      {/* HEADER: Identificación Visual Rápida */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-5 shadow-sm">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {data.name}
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            SKU: <span className="font-mono text-pink-400">{data.sku}</span> •
            Status:{" "}
            <span
              className={
                isActive ? "text-green-600 font-bold" : "text-slate-400"
              }
            >
              {isActive ? "Activo en tienda" : "No visible en tienda"}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 px-4 border-l border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Visibilidad
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("isActive")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>
      </div>

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
                  placeholder="Ej. Serum Facial Hidratante"
                  className={`w-full rounded-xl border bg-slate-50/30 px-4 py-3 text-sm outline-none transition-all ${
                    errors.name
                      ? "border-red-300 ring-4 ring-red-50"
                      : "border-slate-200 focus:border-pink-500"
                  }`}
                  {...register("name", {
                    required: "El nombre es requerido",
                  })}
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

          {/* Bloque 2: Precios y Descuentos */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-50 pb-4 mb-5">
              <CurrencyDollarIcon className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">
                Precios y Finanzas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600">
                  Costo Unitario
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                    L.
                  </span>
                  <input
                    type="number"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm font-bold outline-none focus:border-slate-400 transition-all"
                    {...register("cost", {
                      min: 0,
                      required: "Costo unitario requerido",
                    })}
                  />
                  {errors.cost && (
                    <ErrorMessage>{errors.cost.message}</ErrorMessage>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 flex justify-between">
                  Precio de Venta{" "}
                  {isReward && (
                    <span className="text-[10px] text-slate-400 italic font-normal">
                      (Desactivado)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm ${isReward ? "text-slate-400" : "text-slate-600"}`}
                  >
                    L.
                  </span>
                  <input
                    type="number"
                    autoComplete="off"
                    min="0"
                    disabled={isReward}
                    onKeyDown={blockInvalidChar}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm font-black outline-none transition-all ${
                      isReward
                        ? "bg-slate-100 border-slate-200 text-slate-400"
                        : "bg-white border-slate-300 text-slate-700 focus:border-slate-500"
                    }`}
                    {...register("price", {
                      min: 0,
                      required: "Precio de venta requerido",
                    })}
                  />
                  {errors.price && (
                    <ErrorMessage>{errors.price.message}</ErrorMessage>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN DE DESCUENTOS */}
            <div
              className={`mt-6 pt-5 border-t transition-colors ${isOnDiscount ? "border-pink-100" : "border-slate-100"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4
                    className={`text-[13px] font-bold ${isOnDiscount ? "text-pink-600" : "text-slate-600"}`}
                  >
                    Habilitar Descuento
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Aplica un precio promocional a este producto.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={isReward}
                    {...register("isOnDiscount")}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600 ${isReward ? "opacity-50" : ""}`}
                  ></div>
                </label>
              </div>

              {/* Input condicional de precio de descuento */}
              {isOnDiscount && (
                <div className="animate-in fade-in slide-in-from-top-2 space-y-2 md:w-1/2 ml-auto">
                  <label className="text-[13px] font-bold text-pink-600 flex justify-between">
                    Precio Promocional
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-pink-500 text-sm">
                      L.
                    </span>
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      disabled={isReward}
                      onKeyDown={blockInvalidChar}
                      className="w-full rounded-xl border border-pink-200 bg-pink-50/50 pl-10 pr-4 py-3 text-sm font-black text-pink-600 outline-none transition-all focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20"
                      {...register("discountPrice", {
                        required: isOnDiscount
                          ? "Requerido si hay descuento"
                          : false,
                        validate: (value) =>
                          !isOnDiscount ||
                          value < watch("price") ||
                          "Debe ser menor al precio original",
                      })}
                    />
                  </div>
                  {errors.discountPrice && (
                    <ErrorMessage>{errors.discountPrice.message}</ErrorMessage>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA LATERAL */}
        <div className="space-y-6">
          {/* Bloque 3: Stock */}
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
                  min="0"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-mono outline-none focus:border-pink-500"
                  {...register("sku", { required: "SKU es requerido", min: 0 })}
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold outline-none focus:border-pink-500"
                  {...register("minStock", {
                    required: "Stock minimo es requerido",
                    min: 0,
                  })}
                />
                {errors.minStock && (
                  <ErrorMessage>{errors.minStock.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                  Stock Actual
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold outline-none focus:border-pink-500"
                  {...register("stock", {
                    required: "Stock es requerido",
                    min: 0,
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
                    className="w-full rounded-xl border border-pink-200 px-4 py-2.5 text-sm font-black text-pink-700 outline-none focus:ring-4 focus:ring-pink-500/20"
                    {...register("pointsValue", {
                      required: "Los puntos son requeridos",
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
        </div>
      </div>

      {/* FOOTER: Acciones */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 mt-4">
        <button
          type="button"
          onClick={() =>
            navigate(
              `/admin/category/${rootCategoryId}/category/${subCategoryId}/products${location.search}`,
            )
          }
          className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-pink-600 px-12 py-3 text-sm font-bold text-white hover:bg-pink-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? "Procesando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
