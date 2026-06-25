import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  updateNameSchema,
  type changePasswordForm,
  type changeQuickPinForm,
  type updateNameForm,
} from "../types";
import type { globalUserType } from "@/views/admin/user/types";

type updateNameProps = {
  uuid: globalUserType["uuid"];
  formData: updateNameForm;
};
export async function updateName({ uuid, formData }: updateNameProps) {
  try {
    const url = `/users/${uuid}/name`;
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
  uuid: globalUserType["uuid"];
  formData: changePasswordForm;
};
export async function changePassword({ uuid, formData }: changePasswordProps) {
  try {
    const url = `/users/${uuid}/change-password`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type changeQuickPinProps = {
  uuid: globalUserType["uuid"];
  formData: changeQuickPinForm;
};
export async function changeQuickPin({ uuid, formData }: changeQuickPinProps) {
  try {
    const url = `/users/${uuid}/change-quickpin`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
