import { useState } from "react";
import {
  ArchiveBoxIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  GiftIcon,
  InformationCircleIcon,
  TagIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

import type { getProductType } from "../types";
import { formatCurrency } from "@/shared/utils";

type PreviewProductModalViewProps = {
  data: getProductType;
};

export default function PreviewProductModalView({
  data,
}: PreviewProductModalViewProps) {
  const primaryImage =
    data.images.find((image) => image.isPrimary) || data.images[0];

  const [selectedImage, setSelectedImage] = useState(primaryImage?.url || null);

  const isLowStock = data.stock <= data.minStock;

  const discountPercentage =
    data.isOnDiscount && data.price > 0
      ? Math.round(((data.price - data.discountPrice) / data.price) * 100)
      : 0;

  // Limitar descripción a 120 caracteres
  const description = data.description?.trim() || "";

  const shortDescription =
    description.length > 120
      ? `${description.substring(0, 120)}...`
      : description;

  return (
    <div className="space-y-5">
      {/* ENCABEZADO */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-black tracking-tight text-slate-800 sm:text-xl">
              {data.name}
            </h2>

            {data.isOnDiscount && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-pink-600">
                <TagIcon className="h-3 w-3" />
                Oferta
              </span>
            )}

            {data.isReward && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-amber-700">
                <GiftIcon className="h-3 w-3" />
                Canje
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-slate-400">
            <span>
              SKU:
              <span className="ml-1 font-mono font-bold text-slate-500">
                {data.sku}
              </span>
            </span>

            <span className="text-slate-300">•</span>

            <span
              className={`font-bold ${
                data.isActive ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              {data.isActive ? "Activo en tienda" : "No visible en tienda"}
            </span>
          </div>
        </div>

        {data.isActive ? (
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5">
            <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-wide text-emerald-700">
              Activo
            </span>
          </div>
        ) : (
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5">
            <XCircleIcon className="h-4 w-4 text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-wide text-slate-500">
              Inactivo
            </span>
          </div>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        {/* =======================================================
            GALERÍA
        ======================================================= */}
        <div className="space-y-3">
          {/* Imagen principal más pequeña */}
          <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-72">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={data.name}
                className="h-full w-full object-contain p-3"
              />
            ) : (
              <div className="text-xs font-medium text-slate-400">
                Sin imagen disponible
              </div>
            )}

            {data.isOnDiscount && discountPercentage > 0 && (
              <div className="absolute left-3 top-3 rounded-full bg-pink-600 px-2.5 py-1 text-[10px] font-black text-white shadow-md">
                -{discountPercentage}%
              </div>
            )}

            {data.isReward && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[9px] font-black text-white shadow-md">
                <GiftIcon className="h-3 w-3" />
                Canje
              </div>
            )}
          </div>

          {/* Miniaturas más pequeñas */}
          {data.images.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {data.images.map((image) => {
                const isSelected = selectedImage === image.url;

                return (
                  <button
                    key={image.uuid}
                    type="button"
                    onClick={() => setSelectedImage(image.url)}
                    className={`relative h-14 w-14 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-16 ${
                      isSelected
                        ? "border-pink-500 ring-2 ring-pink-100"
                        : "border-slate-100 hover:border-pink-200"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${data.name} preview`}
                      className="h-full w-full object-cover"
                    />

                    {image.isPrimary && (
                      <span className="absolute bottom-0.5 left-0.5 rounded bg-pink-600 px-1 py-0.5 text-[7px] font-black uppercase text-white">
                        Principal
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* INFORMACION */}
        <div className="flex flex-col gap-4">
          {/* Descripción */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <DocumentTextIcon className="h-4 w-4 text-slate-400" />

              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Descripción
              </h3>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              {shortDescription || "Sin descripción registrada."}
            </p>
          </div>

          {/* PRECIO */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <CurrencyDollarIcon className="h-4 w-4 text-slate-400" />

              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Información de precio
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Precio */}
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Precio de venta
                </span>

                <div className="mt-1 text-xl font-black text-slate-800">
                  L. {formatCurrency(data.price)}
                </div>
              </div>

              {/* Costo */}
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Costo unitario
                </span>

                <div className="mt-1 text-xl font-black text-slate-700">
                  L. {formatCurrency(data.cost)}
                </div>
              </div>
            </div>

            {/* Descuento */}
            {data.isOnDiscount && (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-pink-100 bg-pink-50 px-3 py-2.5">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-pink-500">
                    Precio promocional
                  </span>

                  <div className="mt-0.5 text-xl font-black text-pink-600">
                    L. {formatCurrency(data.discountPrice)}
                  </div>
                </div>

                <div className="rounded-md bg-white px-2.5 py-1.5 text-center shadow-sm">
                  <span className="block text-[8px] font-bold uppercase text-slate-400">
                    Descuento
                  </span>

                  <span className="text-sm font-black text-pink-600">
                    {discountPercentage}%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* INVENTARIO */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <ArchiveBoxIcon className="h-4 w-4 text-slate-400" />

              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Inventario
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Stock actual */}
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Stock
                </span>

                <div className="mt-1 text-xl font-black text-slate-800">
                  {data.stock}
                </div>
              </div>

              {/* Stock mínimo */}
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Mínimo
                </span>

                <div className="mt-1 text-xl font-black text-slate-800">
                  {data.minStock}
                </div>
              </div>

              {/* Estado stock */}
              <div
                className={`rounded-lg p-3 ${
                  isLowStock
                    ? "border border-amber-200 bg-amber-50"
                    : "border border-emerald-200 bg-emerald-50"
                }`}
              >
                <span
                  className={`text-[8px] font-bold uppercase tracking-wider ${
                    isLowStock ? "text-amber-600" : "text-emerald-600"
                  }`}
                >
                  Estado
                </span>

                <div
                  className={`mt-1 flex items-center gap-1 text-[11px] font-black ${
                    isLowStock ? "text-amber-700" : "text-emerald-700"
                  }`}
                >
                  {isLowStock ? (
                    <>
                      <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                      Bajo
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      Disponible
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          INFORMACIÓN INFERIOR
      ========================================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Canje */}
        <div
          className={`rounded-xl border p-4 ${
            data.isReward
              ? "border-pink-200 bg-pink-50/40"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <GiftIcon
              className={`h-4 w-4 ${
                data.isReward ? "text-pink-500" : "text-slate-400"
              }`}
            />

            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-600">
              Producto de canje
            </h3>
          </div>

          {data.isReward ? (
            <div className="flex items-center justify-between rounded-lg bg-white p-3">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Valor
                </span>

                <div className="mt-0.5 text-lg font-black text-pink-600">
                  {data.pointsValue.toLocaleString("es-HN")} puntos
                </div>
              </div>

              <GiftIcon className="h-7 w-7 text-pink-200" />
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
              <InformationCircleIcon className="h-4 w-4 shrink-0 text-slate-400" />

              <p className="text-[10px] leading-4 text-slate-500">
                Este producto no está disponible para canje.
              </p>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <InformationCircleIcon className="h-4 w-4 text-slate-400" />

            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-600">
              Resumen
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="text-[10px] text-slate-400">Estado</span>

              <span
                className={`text-[10px] font-bold ${
                  data.isActive ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {data.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="text-[10px] text-slate-400">Descuento</span>

              <span className="text-[10px] font-bold text-slate-700">
                {data.isOnDiscount ? "Sí" : "No"}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-[10px] text-slate-400">Canje</span>

              <span className="text-[10px] font-bold text-slate-700">
                {data.isReward ? "Sí" : "No"}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-[10px] text-slate-400">Imágenes</span>

              <span className="text-[10px] font-bold text-slate-700">
                {data.images.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
