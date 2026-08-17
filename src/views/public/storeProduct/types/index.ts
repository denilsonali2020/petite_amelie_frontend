import { z } from "zod";

// --- SCHEMAS PRINCIPALES ---

export const findProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isOnDiscount: z.boolean(),
  discountPrice: z.number(),
  stock: z.number(),
  images: z.array(
    z.object({
      url: z.string(),
      isPrimary: z.boolean(),
    }),
  ),
});

export type findProductType = z.infer<typeof findProductSchema>