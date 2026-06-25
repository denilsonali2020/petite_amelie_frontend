// Reemplaza las importaciones necesarias y actualiza el componente
import CustomerBillingInfo from "../components/CreateOrder/CustomerBillingInfo";
import { useOrderStore } from "@/store/order/orderStore";
import { useAuthStore } from "@/store/auth/authStore";
import SearchProduct from "../components/CreateOrder/SearchProduct";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { CreateOrderForm } from "../types";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ShippingInfo from "../components/CreateOrder/ShippingInfo";
import ProductTableList from "../components/CreateOrder/ProductTableList";
import { paymentMethodsTranslation } from "@/locales/es";
import { useNavigate, useLocation } from "react-router-dom"; // NUEVO: importamos hooks de enrutamiento
import VendorAuthModal from "../components/CreateOrder/VendorAuthModal";

const PAYMENT_METHODS = ["CASH", "TRANSFER", "CARD"];

const CreateOrderView = () => {
  const user = useAuthStore((state) => state.user);
  const orderBillingInfo = useOrderStore((state) => state.orderBillingInfo);
  const addCustomerInfo = useOrderStore((state) => state.addCustomerInfo);
  const items = useOrderStore((state) => state.items);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateOrderForm>({
    defaultValues: {
      billingRTN: orderBillingInfo.billingRTN || "",
      paymentMethod: orderBillingInfo.paymentMethod || "",
      requiresShipping: false,
      shippingCost: 0,
      country: "",
    },
  });

  const requiresShipping = watch("requiresShipping");
  const shippingCost = watch("shippingCost") || 0;

  const totalProducts = items.reduce((acc, item) => {
    const activePrice = item.isOnDiscount ? item.discountPrice : item.price;
    return acc + activePrice * item.quantity;
  }, 0);

  const subtotal = totalProducts / 1.15;
  const tax = totalProducts - subtotal;
  const total = totalProducts + (requiresShipping ? Number(shippingCost) : 0);

  // NUEVO: La función onSubmit ahora solo abre el modal
  const onSubmit = () => {
    if (items.length === 0) {
      toast.error("Debes agregar al menos un producto a la venta.", {
        id: "itemsError",
      });
      return;
    }

    // Abrimos el modal inyectando el query param
    navigate(location.pathname + "?vendorAuth=true");
  };

  return (
    <div className="p-4 md:p-5 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-pink-50 p-1.5 rounded-lg flex items-center justify-center">
              <span className="text-lg text-pink-600">🛍️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Nueva Venta
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Registra los productos escaneados y procesa el pago.
              </p>
            </div>
          </div>
          <div className="text-[11px] font-medium text-gray-500 bg-white px-3 py-1.5 rounded-md border border-gray-100 shadow-sm">
            Vendedor • {user?.name || ""}
          </div>
        </div>

        {/* SECCIÓN SUPERIOR: CONTROLES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <CustomerBillingInfo />

          <div className="lg:col-span-3 bg-white p-3.5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col justify-center">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              RTN (Opcional)
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="0000-0000-000000"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${errors.billingRTN ? "border-red-500" : "border-gray-200"} rounded-md focus:ring-2 focus:ring-pink-500 outline-none transition-all text-[13px]`}
              {...register("billingRTN", {
                validate: (value) => {
                  if (!value || value.trim() === "") return true;
                  if (value.trim().length !== 14) return "El RTN no Válido";
                  return true;
                },
                onChange: (e) =>
                  addCustomerInfo({
                    ...orderBillingInfo,
                    billingRTN: e.target.value,
                  }),
              })}
            />
            {errors.billingRTN && (
              <ErrorMessage>{errors.billingRTN.message}</ErrorMessage>
            )}
          </div>

          <SearchProduct />
        </div>

        <ProductTableList />

        {/* SECCIÓN INFERIOR */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mt-2">
          <div className="w-full lg:flex-1 flex flex-col gap-3">
            <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Método de Pago
              </label>
              <select
                className={`w-full max-w-sm px-2.5 py-1.5 bg-gray-50 border ${errors.paymentMethod ? "border-red-500" : "border-gray-200"} rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px] font-medium text-slate-700`}
                {...register("paymentMethod", {
                  required: "Selecciona un método de pago",
                  onChange: (e) =>
                    addCustomerInfo({
                      ...orderBillingInfo,
                      paymentMethod: e.target.value,
                    }),
                })}
              >
                <option value="" disabled>
                  --- Seleccione Método de Pago ---
                </option>
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {
                      paymentMethodsTranslation[
                        method as keyof typeof paymentMethodsTranslation
                      ]
                    }
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <ErrorMessage>{errors.paymentMethod.message}</ErrorMessage>
              )}
            </div>

            <ShippingInfo
              register={register}
              errors={errors}
              requiresShipping={requiresShipping}
            />
          </div>

          <div className="w-full lg:w-80 space-y-3 shrink-0">
            <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 text-[13px]">
              <div className="flex justify-between text-gray-500 mb-1.5">
                <span>Subtotal Gravado:</span>
                <span className="font-semibold text-slate-700">
                  L. {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 border-b border-gray-100 pb-2 mb-2">
                <span>ISV (15%):</span>
                <span className="font-semibold text-slate-700">
                  L. {tax.toFixed(2)}
                </span>
              </div>

              {requiresShipping && shippingCost > 0 && (
                <div className="flex justify-between text-pink-600 border-b border-gray-100 pb-2 mb-2">
                  <span>Envío:</span>
                  <span className="font-semibold">
                    + L. {Number(shippingCost).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-end mt-2">
                <span className="text-sm font-bold text-slate-800">
                  TOTAL A PAGAR
                </span>
                <span className="text-xl font-black text-pink-600">
                  L. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white text-[13px] font-semibold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center cursor-pointer"
            >
              Cobrar Venta
            </button>
          </div>
        </div>
      </div>

      {/* NUEVO: Componente Modal Montado */}
      <VendorAuthModal />
    </div>
  );
};

export default CreateOrderView;
