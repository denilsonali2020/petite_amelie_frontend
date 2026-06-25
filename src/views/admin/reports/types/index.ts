import { z } from "zod";
import { USER_ROLES } from "../../user/types";

export interface KpiCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}
// Finanzas
export const getMetricsFinanceSchema = z.object({
  metrics: z.object({
    totalEarn: z.number(),
    totalCost: z.number(),
    profit: z.number(),
  }),
  paymentMethodsRaw: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    }),
  ),
  productsTopSelling: z.array(
    z.object({
      name: z.string(),
      sku: z.string(),
      stock: z.number(),
      soldCount: z.number(),
      totalRevenue: z.number(),
    }),
  ),
});
export type getMetricsFinanceType = z.infer<typeof getMetricsFinanceSchema>;

// Empleados
export const getMetricsEmployeesSchema = z.array(
  z.object({
    name: z.string(),
    email: z.string(),
    role: z.enum(USER_ROLES),
    totalSales: z.number(),
    totalCost: z.number(),
    orderCount: z.number(),
    profit: z.number(),
    avgTicket: z.number(),
  }),
);

export type getMetricsEmployeesType = z.infer<typeof getMetricsEmployeesSchema>;

//Inventario
export const getMetricsInventorySchema = z.object({
  costInventory: z.number(),
  countProducts: z.number(),
  countLowStock: z.number(),
  productsLowStock: z.array(
    z.object({
      name: z.string(),
      sku: z.string(),
      minStock: z.number(),
      stock: z.number(),
    }),
  ),
});

export type getMetricsInventoryType = z.infer<typeof getMetricsInventorySchema>;
