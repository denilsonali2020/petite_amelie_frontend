import { useOrderStore } from "@/store/order/orderStore";

export default function ProductTableList() {
  const updateQuantity = useOrderStore((state) => state.updateQuantity);
  const removeItem = useOrderStore((state) => state.removeItem);
  const items = useOrderStore((state) => state.items);

  // Manejadores del carrito
  const handleQuantityChange = (uuid: string, quantity: number) => {
    updateQuantity(uuid, quantity);
  };

  const handleRemoveItem = (uuid: string) => {
    removeItem(uuid);
  };
  return (
    <>
      {/* TABLA DE PRODUCTOS */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  SKU / Código
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Producto
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Precio Unit.
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                  Cant.
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Total Línea
                </th>
                <th className="py-2.5 px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-400 text-[13px]"
                  >
                    Aún no hay productos en la venta. Escanea un código para
                    agregar.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const activePrice = item.isOnDiscount
                    ? item.discountPrice
                    : item.price;
                  return (
                    <tr
                      key={item.uuid}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="py-2 px-3 text-[13px] font-mono text-gray-400">
                        {item.sku}
                      </td>
                      <td className="py-2 px-3 text-[13px] font-semibold text-slate-800">
                        {item.name}
                      </td>
                      <td className="py-2 px-3 text-[13px] font-semibold text-slate-800">
                        {item.stock}
                      </td>
                      <td className="py-2 px-3 text-[13px] text-right">
                        <div className="flex flex-col items-end">
                          {item.isOnDiscount ? (
                            <>
                              <span className="font-bold text-rose-600">
                                L. {item.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-gray-400 line-through decoration-red-500">
                                L. {item.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-500">
                              L. {item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.uuid, +e.target.value)
                          }
                          className="bg-white border border-gray-200 text-slate-700 rounded-md py-0.5 px-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 text-[13px] cursor-pointer shadow-sm"
                        >
                          {Array.from({ length: 30 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ),
                          )}
                        </select>
                      </td>
                      <td className="py-2 px-3 text-[13px] text-right font-bold text-slate-800">
                        L. {(activePrice * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.uuid)}
                          className="text-gray-300 hover:text-pink-600 transition-colors p-1"
                          title="Eliminar"
                        >
                          <span className="text-base font-bold">×</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
