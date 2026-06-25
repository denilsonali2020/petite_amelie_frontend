import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { createBillingConfigType } from "../types";
import { createBillingConfig } from "../services/billingConfigService";
import { SALE_CHANNELS } from "../types";

type Props = {
  closeModal: () => void;
};

export default function CreateBillingConfigModalForm({ closeModal }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createBillingConfigType>({
    defaultValues: {
      channel: "POS",
      cai: "",
      rangeFrom: "",
      rangeTo: "",
      limitDate: "",
      prefix: "",
      currentSequence: 1,
      isActive: true,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBillingConfig,
    onError: (error) => {
      toast.error(error.message, { id: "billingConfigError" });
    },
    onSuccess: (data) => {
      closeModal();
      reset();
      queryClient.invalidateQueries({ queryKey: ["billingConfigs"] });
      toast.success(data || "Configuración creada!");
    },
  });

  const handleForm = (formData: createBillingConfigType) => {
    mutate(formData);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleForm)} noValidate>
      {/* Canal y Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Canal de Venta
          </label>
          <select
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
              errors.channel
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
            }`}
            {...register("channel", { required: "El canal es obligatorio" })}
          >
            {SALE_CHANNELS.map((channel) => (
              <option key={channel} value={channel}>
                {channel === "POS" ? "Tienda Física (POS)" : "Página Web (WEB)"}
              </option>
            ))}
          </select>
          {errors.channel && (
            <ErrorMessage>{errors.channel.message}</ErrorMessage>
          )}
        </div>

        <div className="group flex flex-col justify-center mt-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("isActive")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            <span className="ml-3 text-[13px] font-medium text-slate-700">
              Talonario Activo
            </span>
          </label>
        </div>
      </div>

      {/* CAI */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          CAI Autorizado
        </label>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all font-mono uppercase ${
            errors.cai
              ? "border-red-300 focus:border-red-500"
              : "border-slate-200 focus:border-pink-500"
          }`}
          placeholder="Ej. 12345A-12345B-..."
          {...register("cai", { required: "El CAI es obligatorio" })}
        />
        {errors.cai && <ErrorMessage>{errors.cai.message}</ErrorMessage>}
      </div>

      {/* Rangos */}
      <div className="grid grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Rango Desde
          </label>
          <input
            type="text"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none font-mono ${
              errors.rangeFrom
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
            placeholder="000-001-01-00000001"
            {...register("rangeFrom", { required: "Obligatorio" })}
          />
          {errors.rangeFrom && (
            <ErrorMessage>{errors.rangeFrom.message}</ErrorMessage>
          )}
        </div>

        <div className="group">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Rango Hasta
          </label>
          <input
            type="text"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none font-mono ${
              errors.rangeTo
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
            placeholder="000-001-01-00005000"
            {...register("rangeTo", { required: "Obligatorio" })}
          />
          {errors.rangeTo && (
            <ErrorMessage>{errors.rangeTo.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Prefijo y Secuencia */}
      <div className="grid grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Prefijo (Punto Emisión)
          </label>
          <input
            type="text"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none font-mono ${
              errors.prefix
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
            placeholder="000-001-01-"
            {...register("prefix", { required: "Obligatorio" })}
          />
          {errors.prefix && (
            <ErrorMessage>{errors.prefix.message}</ErrorMessage>
          )}
        </div>

        <div className="group">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
            Secuencia Actual
          </label>
          <input
            type="number"
            min="1"
            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none font-mono ${
              errors.currentSequence
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-pink-500"
            }`}
            {...register("currentSequence", {
              required: "Obligatorio",
              min: { value: 1, message: "Mínimo 1" },
            })}
          />
          {errors.currentSequence && (
            <ErrorMessage>{errors.currentSequence.message}</ErrorMessage>
          )}
        </div>
      </div>

      {/* Fecha Límite */}
      <div className="group">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          Fecha Límite de Emisión
        </label>
        <input
          type="date"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all ${
            errors.limitDate
              ? "border-red-300 focus:border-red-500"
              : "border-slate-200 focus:border-pink-500"
          }`}
          {...register("limitDate", { required: "La fecha es obligatoria" })}
        />
        {errors.limitDate && (
          <ErrorMessage>{errors.limitDate.message}</ErrorMessage>
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
          {isPending ? "Procesando..." : "Guardar Talonario"}
        </button>
      </div>
    </form>
  );
}
