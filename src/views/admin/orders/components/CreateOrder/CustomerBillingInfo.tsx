import { useForm } from "react-hook-form";
import { useOrderStore } from "@/store/order/orderStore";
import { useMutation } from "@tanstack/react-query";
import { getCustomerBilingInfo } from "../../services/orderService";
import toast from "react-hot-toast";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { SearchForm } from "../../types";
import { useEffect, type ChangeEvent } from "react";

export default function CustomerBillingInfo() {
  const orderBillingInfo = useOrderStore((state) => state.orderBillingInfo);
  const addCustomerInfo = useOrderStore((state) => state.addCustomerInfo);
  const clearBillingInfo = useOrderStore((state) => state.clearBillingInfo);

  // Inicializamos React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchForm>();

  //useEffect para limpiar el input de nombre cuando se cree una orden
  useEffect(() => {
    if (!orderBillingInfo.customerName.length) {
      reset({ identifier: "" });
    }
  }, [orderBillingInfo.customerName, reset]);

  // Mutación para buscar al cliente en la DB
  const { mutate, isPending } = useMutation({
    mutationFn: getCustomerBilingInfo,
    onError: (error) => {
      toast.error(error.message || "Error al buscar el cliente", {
        id: "getCustomerError",
      });
    },
    onSuccess: (data) => {
      if (data) {
        addCustomerInfo({
          billingRTN: "",
          customerName: data.name,
          customerId: data.uuid,
          paymentMethod: orderBillingInfo?.paymentMethod || "",
          phone: data.phone,
        });
        reset({ identifier: "" });
      }
    },
  });

  //buscar el cliente
  const onSubmit = (data: SearchForm) => {
    mutate(data.identifier.trim());
  };

  //limpiar la busqueda de Cliente - x -
  const handleClearCustomer = () => {
    clearBillingInfo();
    reset({ identifier: "" });
  };

  //Editar el nombre de la factura manualmente
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    addCustomerInfo({ ...orderBillingInfo, customerName: e.target.value });
  };

  const hasCustomer = orderBillingInfo && orderBillingInfo.customerId !== "";

  return (
    <div className="lg:col-span-4 bg-white p-3.5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col justify-center">
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Cliente
      </label>

      {hasCustomer ? (
        /* TARJETA DE CLIENTE SELECCIONADO */
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 py-1.5 px-2.5 rounded-md">
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-200 text-slate-500 rounded-full w-7 h-7 flex items-center justify-center text-[13px]">
              👤
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-800 leading-tight">
                {orderBillingInfo.customerName}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {orderBillingInfo.phone}
              </span>
            </div>
          </div>
          <button
            onClick={handleClearCustomer}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            type="button"
          >
            <span className="text-sm font-bold">×</span>
          </button>
        </div>
      ) : (
        /* FORMULARIO DE BÚSQUEDA Y ESCRITURA LIBRE */
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">👤</span>
              </div>
              <input
                type="text"
                autoComplete="off"
                placeholder="Teléfono o Nombre..."
                className={`w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border ${
                  errors.identifier ? "border-red-500" : "border-gray-200"
                } rounded-md focus:ring-2 focus:ring-pink-500 outline-none transition-all text-[13px]`}
                {...register("identifier", {
                  required: "Ingresa un dato",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  onChange: handleInputChange,
                })}
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-pink-700 hover:bg-pink-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? "..." : "Buscar"}
            </button>
          </div>

          {errors.identifier && (
            <span className="text-[10px] text-red-500 font-medium">
              <ErrorMessage>{errors.identifier.message}</ErrorMessage>
            </span>
          )}
        </form>
      )}
    </div>
  );
}
