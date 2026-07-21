import { z } from "zod";

// --- SCHEMAS PRINCIPALES ---
//Schema de menu de navegacion
export const navigationSchema = z.array(
  z.object({
    name: z.string(),
    children: z.array(
      z.object({
        uuid: z.string(),
        name: z.string(),
      }),
    ),
  }),
);

//Schema de new-arrivals
export const newArrivalsSchema = z.array(
  z.object({
    uuid: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    isOnDiscount: z.boolean(),
    discountPrice: z.number(),
    images: z.string(),
  }),
);

// schema de latestSubCategories
export const latestSubCategoriesSchema = z.array(
  z.object({
    uuid: z.string(),
    name: z.string(),
    description: z.string(),
    imageURL: z.string().nullable(),
  }),
);

//schema of getBestSellersPerTopCategories
export const getBestSellersPerTopCategoriesSchema = z.array(
  z.object({
    name: z.string(),
    products: z.array(
      z.object({
        uuid: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        isOnDiscount: z.boolean(),
        discountPrice: z.number(),
        images: z.string(),
      }),
    ),
  }),
);
export type getBestSellersPerTopCategoriesType = z.infer<typeof getBestSellersPerTopCategoriesSchema>

export type ProductCardCarouselType = z.infer<typeof newArrivalsSchema>;

//type de un cardproduct reutilizable
export type ProductCardType = {
  uuid: string;
  name: string;
  description: string;
  price: number;
  isOnDiscount: boolean;
  discountPrice: number;
  images: string;
};
