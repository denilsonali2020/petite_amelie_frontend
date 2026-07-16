import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useOrderStore } from "@/store/order/orderStore";
import { createOrder } from "../../services/orderService";
import { getUsersQuickPin } from "@/views/admin/user/services/userService";

type VendorAuthModalFormProps = {
  closeModal: () => void;
};

type VendorAuthInputs = {
  userUUID: string;
  quickPin: string;
};

export default function VendorAuthModalForm({
  closeModal,
}: VendorAuthModalFormProps) {
  // Traer funciones del store
  const generateFinalOrder = useOrderStore((state) => state.generateFinalOrder);
  const clearBillingInfo = useOrderStore((state) => state.clearBillingInfo);
  const clearItems = useOrderStore((state) => state.clearItems);
  const toggleOrderSuccess = useOrderStore((state) => state.toggleOrderSuccess);
  //   const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VendorAuthInputs>({
    defaultValues: {
      userUUID: "",
      quickPin: "",
    },
  });

  const selectedUserUUID = watch("userUUID");

  // Query para obtener los usuarios que pueden autorizar
  const { data: users, isLoading } = useQuery({
    queryKey: ["usersQuickPin"],
    queryFn: getUsersQuickPin,
  });

  // Mutación para crear la venta
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error.message, { id: "createOrderError" });
    },
    onSuccess: () => {
      toast.success("¡Venta procesada exitosamente!");
      clearBillingInfo();
      clearItems();
      reset();
      closeModal();
      toggleOrderSuccess();
      //   queryClient.invalidsateQueries({ queryKey: ["orders"] });
    },
  });

  // Bloquear caracteres no numéricos en el PIN
  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "-", "+", ".", ","].includes(e.key)) {
      e.preventDefault();
    }
  };

  const onSubmit = (formData: VendorAuthInputs) => {
    const baseOrder = generateFinalOrder();

    if (!baseOrder) {
      toast.error("El carrito está vacío.");
      closeModal();
      return;
    }

    // Unimos el payload de Zustand con la autorización local del modal
    const finalPayload = {
      ...baseOrder,
      userUUID: formData.userUUID,
      quickPin: formData.quickPin,
    };

    mutate(finalPayload);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* SELECCIÓN DE USUARIO */}
      <div>
        <label className="block text-[13px] font-medium text-slate-700 mb-3">
          ¿Quién está procesando esta venta?
        </label>

        {/* Validar que exista el UUID */}
        <input
          type="hidden"
          {...register("userUUID", {
            required: "Debes seleccionar un usuario.",
          })}
        />

        {isLoading ? (
          <p className="text-[13px] text-gray-500">Cargando usuarios...</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
            {users?.map((u) => (
              <button
                key={u.uuid}
                type="button"
                onClick={() =>
                  setValue("userUUID", u.uuid, { shouldValidate: true })
                }
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  selectedUserUUID === u.uuid
                    ? "border-pink-500 bg-pink-50 ring-1 ring-pink-500 shadow-sm"
                    : "border-gray-200 bg-white hover:border-pink-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-xl mb-1">👤</span>
                <span
                  className={`text-[13px] font-semibold ${selectedUserUUID === u.uuid ? "text-pink-700" : "text-slate-700"}`}
                >
                  {u.name}
                </span>
              </button>
            ))}
          </div>
        )}
        {errors.userUUID && (
          <ErrorMessage>{errors.userUUID.message}</ErrorMessage>
        )}
      </div>

      {/* INPUT DEL PIN */}
      <div className="group pt-2">
        <label className="block text-[13px] font-medium text-slate-700 mb-1.5 transition-colors group-focus-within:text-pink-600">
          PIN de Ventas
        </label>
        <input
          type="password"
          autoComplete="new-password"
          maxLength={4}
          onKeyDown={blockInvalidChar}
          className={`w-full rounded-lg border px-3 py-3 text-center text-lg tracking-[0.5em] font-bold outline-none transition-all ${
            errors.quickPin
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500/10"
          }`}
          placeholder="••••"
          {...register("quickPin", {
            required: "El PIN es obligatorio",
            pattern: {
              value: /^\d{4}$/,
              message: "El PIN debe contener exactamente 4 dígitos",
            },
          })}
        />
        {errors.quickPin && (
          <ErrorMessage>{errors.quickPin.message}</ErrorMessage>
        )}
      </div>

      {/* BOTONES */}
      <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={closeModal}
          disabled={isPending}
          className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-700 active:scale-[0.98] ${isPending ? "cursor-not-allowed opacity-80" : "cursor-pointer"} `}
        >
          {isPending ? "Procesando..." : "Confirmar Venta"}
        </button>
      </div>
    </form>
  );
}
