import { z } from "zod";

//Schemas
//Obtener las ordenes mensuales del año presente
export const getCurrentYearMonthlySalesSchema = z.object({
  enero: z.number(),
  febrero: z.number(),
  marzo: z.number(),
  abril: z.number(),
  mayo: z.number(),
  junio: z.number(),
  julio: z.number(),
  agosto: z.number(),
  septiembre: z.number(),
  octubre: z.number(),
  noviembre: z.number(),
  diciembre: z.number(),
});

//Obtener las ultimas 10 ordenes realizadas
export const getRecentOrdersSchema = z.array(
  z.object({
    invoiceNumber: z.string(),
    channel: z.string(),
    customerName: z.string(),
    deliveryType: z.string(),
    total: z.string(),
    status: z.string(),
    createdAt: z.string(),
  }),
);

//obtener top 6 sub-categorias con mas productos vendidos
export const getTopSellingSubcategoriesSchema = z.array(
  z.object({
    name: z.string(),
    value: z.number(),
  }),
);

//Obtener los 10 productos mas vendidos
export const getTopSellingProductsSchema = z.array(
  z.object({
    name: z.string(),
    sku: z.string(),
    stock: z.number(),
    soldCount: z.number(),
    totalRevenue: z.number(),
  }),
);
