import { z } from "zod";

const USER_ROLES = ["OWNER", "ADMIN", "CASHIER"] as const;

// --- SCHEMAS PRINCIPALES DE PRODUCTO---
export const globalAdminAuthSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    uuid: z.string(),
    name: z.string(),
    role: z.enum(USER_ROLES),
    email: z.string(),
    mustChangePassword: z.boolean(),
  }),
});

// SCHEMA DE REFRESH TOKEN (no devuelve el usuario, solo el nuevo accessToken)
export const refreshTokenSchema = z.object({
  accessToken: z.string(),
});

export type adminLoginForm = {
  email: string;
  password: string;
};

export type mustChangePasswordForm = {
  password: string;
};
