import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { AddShippingInfo, globalOrderType } from "../../types";
import { addShippingInfo } from "../../services/orderService";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Ahora recibimos todo el objeto shippingDetails de la orden
type ShippingDetailsInfo = {
  recipientName: string;
  phone: string;
  country: string;
  department: string;
  city: string;
  addressLine1: string;
  trackingNumber: string | null;
  shippingCompany: string | null;
};

type ShippingLogisticsFormProps = {
  orderId: globalOrderType["uuid"];
  shippingDetails: ShippingDetailsInfo;
};

export default function ShippingLogisticsForm({
  orderId,
  shippingDetails,
}: ShippingLogisticsFormProps) {
  const queryClient = useQueryClient();

  const { shippingCompany, trackingNumber } = shippingDetails;

  // Si ya hay información, iniciamos en modo lectura (false), sino, en modo edición (true)
  const hasExistingData = !!(shippingCompany || trackingNumber);
  const [isEditing, setIsEditing] = useState(!hasExistingData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddShippingInfo>({
    defaultValues: {
      shippingCompany: shippingCompany || "",
      trackingNumber: trackingNumber || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addShippingInfo,
    onSuccess: () => {
      toast.success("Logística de envío guardada exitosamente");
      // Refrescamos la orden principal
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      // Pasamos a modo lectura
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: AddShippingInfo) => {
    mutate({ uuid: orderId, formData: data });
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm">
      {/* Header Tarjeta Envío */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white shadow-sm border border-slate-100 rounded-md">
            <TruckIcon className="h-5 w-5 text-slate-600" />
          </div>
          <h3 className="text-[14px] font-bold text-slate-800">
            Información y Logística de Envío
          </h3>
        </div>
      </div>

      {/* SECCIÓN 1: Información del Cliente (Dirección y Contacto - Solo Lectura) */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
            Recibe
          </p>
          <p className="text-[14px] font-bold text-slate-800">
            {shippingDetails.recipientName}
          </p>
          <p className="text-[13px] font-medium text-slate-600 flex items-center gap-1 mt-1">
            📞 {shippingDetails.phone}
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
            Dirección de Entrega
          </p>
          <p className="text-[13px] font-medium text-slate-700 leading-relaxed">
            {shippingDetails.addressLine1}
            <br />
            <span className="text-slate-500">
              {shippingDetails.city}, {shippingDetails.department},{" "}
              {shippingDetails.country}.
            </span>
          </p>
        </div>
      </div>

      {/* SECCIÓN 2: Lógica de Asignación de Empresa y Tracking */}
      {!isEditing && hasExistingData ? (
        // --- MODO LECTURA: YA HAY INFORMACIÓN ---
        <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
              <CheckCircleIcon className="h-4 w-4 text-emerald-500" /> Logística
              Asignada
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2">
              <div>
                <span className="text-xs text-slate-500 mr-1">Empresa:</span>
                <span className="font-bold text-slate-800">
                  {shippingCompany}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 mr-1">
                  Guía/Tracking:
                </span>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {trackingNumber}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-pink-600 transition-colors shadow-sm cursor-pointer"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Editar Datos
          </button>
        </div>
      ) : (
        // --- MODO EDICIÓN / AGREGAR: FORMULARIO ---
        <div className="p-6 bg-slate-50/50">
          <div className="mb-5 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-2">
              <TruckIcon className="h-5 w-5 text-pink-500" />
              {hasExistingData
                ? "Actualizar Datos de Envío"
                : "Asignar Tracking y Transporte"}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Ingresa la información de la empresa logística encargada de
              entregar este paquete.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-start gap-5 max-w-4xl mx-auto sm:mx-0"
          >
            {/* Campo Empresa */}
            <div className="w-full sm:flex-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Empresa de Transporte
              </label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Ej. Cargo Expreso, CAEX, Fedex..."
                className={`w-full text-sm rounded-lg shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-pink-500 outline-none transition-all ${
                  errors.shippingCompany
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-white"
                }`}
                {...register("shippingCompany", {
                  required: "La empresa es obligatoria",
                })}
              />
              {errors.shippingCompany && (
                <div className="mt-1.5">
                  <ErrorMessage>{errors.shippingCompany.message}</ErrorMessage>
                </div>
              )}
            </div>

            {/* Campo Tracking */}
            <div className="w-full sm:flex-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Número de Guía (Tracking)
              </label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Ej. 1029384756"
                className={`w-full text-sm font-mono rounded-lg shadow-sm py-2.5 px-3 focus:ring-2 focus:ring-pink-500 outline-none transition-all ${
                  errors.trackingNumber
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-white"
                }`}
                {...register("trackingNumber", {
                  required: "El número de guía es obligatorio",
                })}
              />
              {errors.trackingNumber && (
                <div className="mt-1.5">
                  <ErrorMessage>{errors.trackingNumber.message}</ErrorMessage>
                </div>
              )}
            </div>

            {/* Botones de Acción */}
            <div className="w-full sm:w-auto flex flex-col gap-2 self-start sm:self-end sm:mt-0 mt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-70 flex items-center justify-center h-10.5"
              >
                {isPending ? "Guardando..." : "Guardar Envío"}
              </button>

              {/* Si ya existía data y estamos editando, mostramos opción de cancelar */}
              {hasExistingData && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isPending}
                  className="w-full text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors py-1 cursor-pointer"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
