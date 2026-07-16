import { z } from "zod";

const SALE_CHANNEL = ["POS", "WEB"] as const;
export const DELIVERY_TYPE = ["IN_STORE_PICKUP", "SHIPPING"] as const;
export const ORDER_STATUS = [
  "PENDING",
  "PAID",
  "PREPARING",
  "READY",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

// --- SCHEMA PRINCIPAL DE ORDEN---
export const globalOrderSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  invoiceNumber: z.string(),
  cai: z.string(),
  channel: z.enum(SALE_CHANNEL),
  billingRTN: z.string(),
  customerName: z.string(),
  customerId: z.number(),
  total: z.string(),
  status: z.enum(ORDER_STATUS),
  pointsEarned: z.number(),
  pointsUsed: z.number(),
  discountAmount: z.string(),
  userId: z.number(),
  couponId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// NUEVO: Extraemos el esquema del item de la lista para reutilizarlo
const orderListItemSchema = globalOrderSchema
  .pick({
    uuid: true,
    invoiceNumber: true,
    cai: true,
    channel: true,
    billingRTN: true,
    customerName: true,
    total: true,
    status: true,
    pointsEarned: true,
    pointsUsed: true,
    discountAmount: true,
    createdAt: true,
  })
  .extend({
    deliveryType: z.enum(DELIVERY_TYPE),
    user: z.object({
      name: z.string(),
    }),
  });

// NUEVO: Schema para obtener todas las ordenes PAGINADAS
export const getOrdersSchema = z.object({
  data: z.array(orderListItemSchema),
  meta: z.object({
    totalOrders: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    limit: z.number(),
  }),
});

//Schema de obtener un usuario para generar la orden
export const getCustomerBilingInfoSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  phone: z.string(),
});

// schema de obtener una orden
export const getOrderSchema = globalOrderSchema
  .pick({
    invoiceNumber: true,
    cai: true,
    channel: true,
    billingRTN: true,
    customerName: true,
    total: true,
    status: true,
    pointsEarned: true,
    createdAt: true,
  })
  .extend({
    deliveryType: z.enum(DELIVERY_TYPE),
    shippingCost: z.string(),
    shippingDetails: z
      .object({
        recipientName: z.string(),
        phone: z.string(),
        country: z.string(),
        department: z.string(),
        city: z.string(),
        addressLine1: z.string(),
        trackingNumber: z.string().nullable(),
        shippingCompany: z.string().nullable(),
      })
      .nullable(),

    user: z.object({
      name: z.string(),
    }),
    payment: z.object({
      method: z.string(),
    }),
    orderItems: z.array(
      z.object({
        product: z.object({
          sku: z.string(),
          name: z.string(),
        }),
        quantity: z.number(),
        discount: z.string(),
        originalPrice: z.string(),
        price: z.string(),
      }),
    ),
  });

// ================= //
// -- types  -- //
// ================= //
export type globalOrderType = z.infer<typeof globalOrderSchema>;

export type orderType = z.infer<typeof getOrderSchema>;

export type CustomerIdentifier = {
  email: string;
  phone: string;
};

export type SearchForm = {
  identifier: string;
};

// ================= //
// -- orderStore  -- //
// ================= //
export type orderBillingInfoType = {
  billingRTN: string;
  customerName: string;
  customerId: string;
  paymentMethod: string;
  phone: string;
};

export type orderItemsType = {
  uuid: string;
  sku: string;
  name: string;
  stock: number;
  price: number;
  discountPrice: number;
  isOnDiscount: boolean;
  quantity: number;
};

export type shippingDetailsType = {
  recipientName: string;
  phone: string;
  country: string;
  department: string;
  city: string;
  addressLine1: string;
  shippingCost: number;
};

export type createOrderType = Pick<
  orderBillingInfoType,
  "billingRTN" | "customerName" | "customerId" | "paymentMethod"
> & {
  items: Pick<orderItemsType, "uuid" | "quantity">[];
  shippingDetails: shippingDetailsType;
  userUUID: string;
  quickPin: string;
};

export type CreateOrderForm = {
  billingRTN: string;
  paymentMethod: string;
  requiresShipping: boolean;
  shippingCost: number;
  recipientName: string;
  phone: string;
  country: string;
  department: string;
  city: string;
  addressLine1: string;
};

export type AddShippingInfo = {
  shippingCompany: string;
  trackingNumber: string;
};

export type ChangeStatus = Pick<globalOrderType, "status">;
