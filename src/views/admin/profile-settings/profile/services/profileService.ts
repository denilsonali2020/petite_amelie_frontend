import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  updateNameSchema,
  type changePasswordForm,
  type changeQuickPinForm,
  type updateNameForm,
} from "../types";

type updateNameProps = {
  formData: updateNameForm;
};
export async function updateName({ formData }: updateNameProps) {
  try {
    const url = `/users/name`;
    const { data } = await api.patch(url, formData);
    const response = updateNameSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type changePasswordProps = {
  formData: changePasswordForm;
};
export async function changePassword({ formData }: changePasswordProps) {
  try {
    const url = `/users/change-password`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type changeQuickPinProps = {
  formData: changeQuickPinForm;
};
export async function changeQuickPin({ formData }: changeQuickPinProps) {
  try {
    const url = `/users/change-quickpin`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
