import { z } from "zod";

// --- SCHEMAS PRINCIPALES ---
export const globalInventorySchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  position: z.number(),
  imageURL: z.string().nullable(),
  parentId: z.string().nullable(),
});

// --- SCHEMAS DE ACCIÓN ---

// Schema para CREAR (Aquí sí es obligatorio el FileList)
export const createSubCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  position: z.number(),
  parentId: z.string().nullable(),
  imageURL: z
    .custom<FileList>()
    .refine(
      (file) => file instanceof FileList && file.length > 0,
      "La imagen es obligatoria",
    ),
});

// Schema para EDITAR / ACTUALIZAR (Acepta FileList o String)
export const updateSubCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().nullable(),
  position: z.number(),
  imageURL: z
    .union([z.instanceof(FileList), z.string(), z.null()])
    .transform((val) => {
      if (val instanceof FileList && val.length === 0) return null;
      return val;
    }),
});

// --- SCHEMAS CONSULTA ---
//Obtener todas las categoria raiz[]
export const getRootCategoriesSchema = z.array(
  globalInventorySchema.pick({
    uuid: true,
    name: true,
    position: true,
  }),
);

//obetener una categoria raiz con sus subcategorias
export const getSubCategoriesByUuidSchema = z.object({
  name: z.string(),
  children: z.array(
    globalInventorySchema.pick({
      uuid: true,
      name: true,
      description: true,
      position: true,
      imageURL: true,
    }),
  ),
});

export const getCategorySchema = globalInventorySchema.pick({
  name: true,
  description: true,
  position: true,
  imageURL: true,
});

// --- TYPES EXPORTADOS ---
export type generalCategoryType = z.infer<typeof globalInventorySchema>;
export type rootCategoriesType = z.infer<typeof getRootCategoriesSchema>;

export type createRootCategory = Pick<generalCategoryType, "name" | "position">;
export type updateRootCategory = Pick<generalCategoryType, "name" | "position">;

export type createSubCategoryType = z.infer<typeof createSubCategorySchema>;
export type updateSubCategoryType = z.infer<typeof updateSubCategorySchema>; // <-- Tipado flexible
