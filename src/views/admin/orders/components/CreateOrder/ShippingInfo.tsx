import { useOrderStore } from "@/store/order/orderStore";
import type { CreateOrderForm } from "../../types"; // Ajusta la ruta a tus types si es necesario
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/components/ui/ErrorMessage";

type ShippingInfoProps = {
  register: UseFormRegister<CreateOrderForm>;
  errors: FieldErrors<CreateOrderForm>;
  requiresShipping: boolean;
};

export default function ShippingInfo({
  register,
  errors,
  requiresShipping,
}: ShippingInfoProps) {
  // Extraemos las funciones de Zustand directamente aquí
  const updateShippingField = useOrderStore(
    (state) => state.updateShippingField,
  );
  const setShippingDetails = useOrderStore((state) => state.setShippingDetails);

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border ${
        requiresShipping
          ? "border-pink-200 ring-1 ring-pink-50"
          : "border-gray-100"
      } transition-all`}
    >
      <label className="flex items-center gap-2 cursor-pointer select-none w-max">
        <input
          type="checkbox"
          {...register("requiresShipping", {
            onChange: (e) => {
              // Si desmarcan la caja, limpiamos el estado global devolviendo el objeto vacío
              if (!e.target.checked) {
                setShippingDetails({
                  recipientName: "",
                  phone: "",
                  country: "",
                  department: "",
                  city: "",
                  addressLine1: "",
                  shippingCost: 0,
                });
              }
            },
          })}
          className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500 border-gray-300 cursor-pointer"
        />
        <span className="text-[13px] font-bold text-slate-700">
          📦 Requiere Envío a Domicilio
        </span>
      </label>

      {/* Se despliega solo si checkean la caja */}
      {requiresShipping && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Costo de Envío (L.)
            </label>
            <input
              type="number"
              min="0"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.shippingCost ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("shippingCost", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "El costo de envio no puede ser menor a 0",
                },
                onChange: (e) =>
                  updateShippingField("shippingCost", Number(e.target.value)),
              })}
            />
            {errors.shippingCost && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.shippingCost.message}</ErrorMessage>
              </span>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Recibe
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Nombre completo"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.recipientName ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("recipientName", {
                required: "Ingresa el nombre del receptor",
                onChange: (e) =>
                  updateShippingField("recipientName", e.target.value),
              })}
            />
            {errors.recipientName && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.recipientName.message}</ErrorMessage>
              </span>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Teléfono
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Ej. 9988-7766"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.phone ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("phone", {
                required: "Teléfono es requerido",
                onChange: (e) => updateShippingField("phone", e.target.value),
              })}
            />
            {errors.phone && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.phone.message}</ErrorMessage>
              </span>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              País
            </label>
            <input
              type="text"
              autoComplete="off"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.country ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("country", {
                required: "País es requerido",
                onChange: (e) => updateShippingField("country", e.target.value),
              })}
            />
            {errors.country && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.country.message}</ErrorMessage>
              </span>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Departamento / Estado
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Ej. Copán"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.department ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("department", {
                required: "Departamento es requerido",
                onChange: (e) =>
                  updateShippingField("department", e.target.value),
              })}
            />
            {errors.department && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.department.message}</ErrorMessage>
              </span>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Ciudad
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Ej. Santa Rosa"
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.city ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("city", {
                required: "Ciudad es requerida",
                onChange: (e) => updateShippingField("city", e.target.value),
              })}
            />
            {errors.city && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.city.message}</ErrorMessage>
              </span>
            )}
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Dirección Exacta
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Colonia, calle, referencia..."
              className={`w-full px-2.5 py-1.5 bg-gray-50 border ${
                errors.addressLine1 ? "border-red-500" : "border-gray-200"
              } rounded-md focus:ring-2 focus:ring-pink-500 outline-none text-[13px]`}
              {...register("addressLine1", {
                required: "Dirección es requerida",
                onChange: (e) =>
                  updateShippingField("addressLine1", e.target.value),
              })}
            />
            {errors.addressLine1 && (
              <span className="text-[10px] text-red-500 font-medium">
                <ErrorMessage>{errors.addressLine1.message}</ErrorMessage>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
