import { z } from "zod";

/** Auth & Users */
export const authSchema = z.object({
  username: z.string(),
  email: z.email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
//type de login 
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
//type de formulario de registrar nueva cuenta
export type UserRegistrationForm = Pick<Auth, "username" | "email" | "password" | "password_confirmation">;
//type se confirmacion de token primera vez
export type UserConfirmationToken = Pick<Auth, "token">;
//type para solicitar nuevo token
export type UserEmailForm = Pick<Auth, "email">;
//type de nuevo password formulario
export type UserNewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>