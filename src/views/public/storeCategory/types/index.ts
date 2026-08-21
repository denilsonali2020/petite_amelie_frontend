import { z } from "zod";

// SCHEMAS
export const productsByCategorySchema = z.object({
  name: z.string(),
  products: z.array(
    z.object({
      uuid: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      isOnDiscount: z.boolean(),
      discountPrice: z.number(),
      stock: z.number(),
      images: z.string(),
    }),
  ),
  meta: z.object({
    totalProducts: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    limit: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
});
