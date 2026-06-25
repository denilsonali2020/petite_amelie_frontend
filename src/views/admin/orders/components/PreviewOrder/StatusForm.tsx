import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { ChangeStatus, orderType } from "../../types";
import { changeStatus } from "../../services/orderService";

type StatusFormProps = {
  orderId: string;
  data: orderType;
};

export default function StatusForm({ orderId, data }: StatusFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ChangeStatus>({
    defaultValues: {
      status: data.status,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changeStatus,
    onSuccess: (data) => {
      toast.success(data || "Estado cambiado!", { id: "statusChange" });
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: ChangeStatus) => {
    mutate({ uuid: orderId, formData });
  };

  return (
    <div className="mt-4 sm:mt-0 sm:ml-16 flex-none flex flex-col items-end gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Cambiar Estado de la Orden
      </label>

      {/* 4. Convertimos el div en un form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <select
          {...register("status")}
          disabled={isPending}
          className="text-sm font-semibold text-slate-700 border border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring-pink-500 py-2 pl-3 pr-10 cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <option value="PENDING">Pendiente</option>
          <option value="PAID">Pagado</option>
          <option value="PREPARING">En Preparación</option>
          <option value="READY">Listo para Envío</option>
          <option value="SHIPPED">Enviado</option>
          <option value="DELIVERED">Entregado</option>
          <option value="CANCELLED">Cancelado</option>
          <option value="REFUNDED">Reembolsado</option>
        </select>

        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-9 h-9"
          title="Guardar estado"
        >
          {isPending ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
          ) : (
            <CheckCircleIcon className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}
