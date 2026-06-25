import { z } from "zod";

export const updateNameSchema = z.object({
  name: z.string(),
});

export type updateNameForm = {
  name: string;
};

export type changePasswordForm = {
  password: string;
  newPassword: string;
};

export type PasswordFormData = changePasswordForm & {
  confirmPassword: string;
};

export type changeQuickPinForm = {
  quickPin: string;
};
