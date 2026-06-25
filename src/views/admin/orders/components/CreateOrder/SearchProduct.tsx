import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useOrderStore } from "@/store/order/orderStore";
import { getProductOrder } from "@/views/admin/product/services/productService";

// Tipo para el formulario de búsqueda de producto
type SearchProductForm = {
  sku: string;
};

export default function SearchProduct() {
  const addOrderItem = useOrderStore((state) => state.addOrderItem);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchProductForm>();

  const { mutate } = useMutation({
    mutationFn: getProductOrder,
    onError: (error) => {
      toast.error(error.message, {id: "searchProductError"});
    },
    onSuccess: (data) => {
      if (data) addOrderItem({ ...data, quantity: 1 });
      reset();
    },
  });
  // Aquí conectarás tu useMutation más adelante
  const handleSearchProduct = (data: SearchProductForm) => {
    mutate(data);
  };

  return (
    <div className="lg:col-span-5 bg-white p-3.5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col justify-center">
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Producto (Escáner o Manual)
      </label>

      <form
        onSubmit={handleSubmit(handleSearchProduct)}
        className="flex flex-col gap-1"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <span className="text-pink-500 text-sm">🔍</span>
            </div>
            <input
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="Escanea el código o ingresa SKU..."
              className={`w-full pl-8 pr-2.5 py-1.5 bg-pink-50/50 border ${
                errors.sku ? "border-red-500" : "border-pink-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none transition-all placeholder-pink-300 text-slate-800 font-medium text-[13px]`}
              {...register("sku", {
                required: "SKU requerido",
              })}
            />
          </div>
          <button
            type="submit"
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </div>

        {/* Mensaje de error */}
        {errors.sku && (
          <span className="text-[10px] text-red-500 font-medium">
            <ErrorMessage>{errors.sku.message}</ErrorMessage>
          </span>
        )}
      </form>
    </div>
  );
}
