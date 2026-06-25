import { z } from "zod";

export const USER_ROLES = ["OWNER", "ADMIN", "CASHIER"] as const;

// Constantes de Roles Para ocultar o mostrar botones
export const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  CASHIER: "CASHIER",
};

// --- SCHEMAS PRINCIPALES DE PRODUCTO---
export const globalUserSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(USER_ROLES),
  mustChangePassword: z.boolean(),
  isActive: z.boolean(),
});

//Obtener todos los usuarios []
export const getAllUsersSchema = z.array(
  globalUserSchema.pick({
    uuid: true,
    name: true,
    email: true,
    role: true,
    isActive: true,
  }),
);
//Obtener un usuario
export const getUserSchema = globalUserSchema.pick({
  name: true,
  email: true,
  role: true,
  isActive: true,
});

//obtener los usuarios para proceso de venta
export const getUsersQuickPinShcema = z.array(
  globalUserSchema.pick({
    uuid: true,
    name: true,
  }),
);

//TYPES
export type globalUserType = z.infer<typeof globalUserSchema>;

//Type de obtener un usuairo
export type getUserType = z.infer<typeof getUserSchema>;

//Type de crear un usuario
export type createUserType = Pick<
  globalUserType,
  "name" | "email" | "password" | "role"
>;

//Type de actualizar un usuario
export type updateUserType = Pick<
  globalUserType,
  "name" | "email" | "role" | "isActive"
>;

//Formulario de un password
export type passwordForm = Pick<globalUserType, "password">;

export type getUsersQuickPinType = z.infer<typeof getUsersQuickPinShcema>;
