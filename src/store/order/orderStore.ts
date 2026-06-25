import type {
  orderBillingInfoType,
  orderItemsType,
  shippingDetailsType,
  createOrderType,
} from "@/views/admin/orders/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialShippingDetails: shippingDetailsType = {
  recipientName: "",
  phone: "",
  country: "",
  department: "",
  city: "",
  addressLine1: "",
  shippingCost: 0,
};

type OrderState = {
  orderBillingInfo: orderBillingInfoType;
  items: orderItemsType[];
  shippingDetails: shippingDetailsType;

  clearBillingInfo: () => void;
  addCustomerInfo: (data: orderBillingInfoType) => void;
  addOrderItem: (newItem: orderItemsType) => void;
  generateFinalOrder: () => createOrderType | null;
  updateQuantity: (uuid: string, quantity: number) => void;
  removeItem: (uuid: string) => void;
  clearItems: () => void;

  setShippingDetails: (data: shippingDetailsType) => void;
  updateShippingField: <K extends keyof shippingDetailsType>(
    field: K,
    value: shippingDetailsType[K],
  ) => void;
};

export const useOrderStore = create<OrderState>()(
  devtools((set, get) => ({
    orderBillingInfo: {
      billingRTN: "",
      customerName: "",
      customerId: "",
      paymentMethod: "",
      phone: "",
    },
    items: [],
    shippingDetails: initialShippingDetails,

    clearBillingInfo: () => {
      set(() => ({
        orderBillingInfo: {
          billingRTN: "",
          customerName: "",
          customerId: "",
          paymentMethod: "",
          phone: "",
        },
        shippingDetails: initialShippingDetails,
      }));
    },

    addCustomerInfo: (data) => set({ orderBillingInfo: data }),

    setShippingDetails: (data) => set({ shippingDetails: data }),

    updateShippingField: (field, value) => {
      set((state) => ({
        shippingDetails: {
          ...state.shippingDetails,
          [field]: value,
        },
      }));
    },

    addOrderItem: (newItem) => {
      set((state) => {
        const itemExist = state.items.find(
          (item) => item.uuid === newItem.uuid,
        );
        if (itemExist) {
          return {
            items: state.items.map((item) =>
              item.uuid === itemExist.uuid
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,
            ),
          };
        }
        return { items: [...state.items, newItem] };
      });
    },

    generateFinalOrder: () => {
      const { orderBillingInfo, items, shippingDetails } = get();
      if (items.length === 0) return null;

      const formatedItems = items.map((item) => ({
        uuid: item.uuid,
        quantity: item.quantity,
      }));

      return {
        billingRTN: orderBillingInfo.billingRTN,
        customerName: orderBillingInfo.customerName,
        customerId: orderBillingInfo.customerId,
        paymentMethod: orderBillingInfo.paymentMethod,
        items: formatedItems,
        shippingDetails: shippingDetails,
      };
    },

    updateQuantity: (uuid, quantity) => {
      set((state) => ({
        items: state.items.map((item) =>
          item.uuid === uuid ? { ...item, quantity: quantity } : item,
        ),
      }));
    },

    removeItem: (uuid) => {
      set((state) => ({
        items: state.items.filter((item) => item.uuid !== uuid),
      }));
    },

    clearItems: () => {
      set(() => ({ items: [] }));
    },
  })),
);
