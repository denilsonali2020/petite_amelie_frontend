import { z } from "zod";

// --- SCHEMAS PRINCIPALES DE PRODUCTO---
export const globalProductSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  sku: z.string(),
  cost: z.number(),
  price: z.number(),
  isOnDiscount: z.boolean(),
  discountPrice: z.number(),
  isReward: z.boolean(),
  pointsValue: z.number(),
  minStock: z.number(),
  stock: z.number(),
  isActive: z.boolean(),
  categoryId: z.number(),
});
// --- SCHEMA PRINCIPAL DE IMAGEPRODUCTO ---
export const globalProductImageSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  url: z.string(),
  isPrimary: z.boolean(),
  productId: z.number(),
});

//Schemas de respuesta de la API

// NUEVO: obetener productos por categoria [] (Actualizado con Paginación)
export const getProductsByCategorySchema = z.object({
  name: z.string(),
  data: z.array(
    // CAMBIO: de "products" a "data"
    globalProductSchema
      .pick({
        uuid: true,
        name: true,
        sku: true,
        cost: true,
        price: true,
        isOnDiscount: true,
        discountPrice: true,
        isReward: true,
        pointsValue: true,
        stock: true,
        isActive: true,
      })
      .extend({
        images: globalProductImageSchema
          .pick({
            url: true,
            isPrimary: true,
          })
          .nullable(), // Agregado nullable por si un producto no tiene imagen
      }),
  ),
  meta: z.object({
    // NUEVO: Metadata de paginación
    totalProducts: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    limit: z.number(),
  }),
});

//TYPES PRICIPALES
export type globalProductType = z.infer<typeof globalProductSchema>;
export type globalProductImageType = z.infer<typeof globalProductImageSchema>;

//Types de respuesta de la API

//obtener productos por categoria []
export type getProductsByCategoryType = z.infer<
  typeof getProductsByCategorySchema
>;

/////////////////////////////////////////////////
// --- SCHEMA PARA CREAR PRODUCTO ---
export const createProductSchema = globalProductSchema
  .pick({
    name: true,
    description: true,
    sku: true,
    cost: true,
    price: true,
    isReward: true,
    pointsValue: true,
    minStock: true,
    stock: true,
  })
  .extend({
    price: z.coerce.number(),
    stock: z.coerce.number().int(),
    pointsValue: z.number().int().default(0),
    isReward: z.boolean().default(false),
    description: z.string().optional().nullable(),
    sku: z.string(),
  });

// --- SCHEMA PARA LAS IMÁGENES (Referencia interna) ---
export const createImagesSchema = z.array(
  z.object({
    url: z.string().url(),
    isPrimary: z.boolean(),
  }),
);

//Schema de obtener un producto |
export const getProductSchema = globalProductSchema
  .pick({
    name: true,
    description: true,
    sku: true,
    cost: true,
    price: true,
    isOnDiscount: true,
    discountPrice: true,
    isReward: true,
    pointsValue: true,
    minStock: true,
    stock: true,
    isActive: true,
  })
  .extend({
    images: z.array(
      globalProductImageSchema.pick({
        uuid: true,
        url: true,
        isPrimary: true,
      }),
    ),
  });

//Schema de obtener un producto para una orden
export const getProductOrderSchema = globalProductSchema.pick({
  uuid: true,
  sku: true,
  name: true,
  price: true,
  discountPrice: true,
  isOnDiscount: true,
});

// Type para los datos del formulario (lo que envías al backend)
export type createProductType = z.infer<typeof createProductSchema>;
export type editProductFormType = Pick<
  globalProductType,
  | "name"
  | "description"
  | "sku"
  | "cost"
  | "price"
  | "isOnDiscount"
  | "discountPrice"
  | "isReward"
  | "pointsValue"
  | "minStock"
  | "stock"
  | "isActive"
>;

// Type para la estructura de imágenes que maneja Prisma
export type createImagesType = z.infer<typeof createImagesSchema>;

export type productFormData = createProductType & {
  images: FileList;
};

//Type par obtener un producto apra editarlo
export type getProductType = z.infer<typeof getProductSchema>;

//type para buscar un producto por sku para nueva orden
export type getProductOrderType = Pick<globalProductType, "sku">;
