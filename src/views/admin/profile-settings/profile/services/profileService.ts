import api from "@/lib/axios";
import {
  updateNameSchema,
  type changePasswordForm,
  type changeQuickPinForm,
  type updateNameForm,
} from "../types";
import { toApiError } from "@/shared/errors";

type updateNameProps = {
  formData: updateNameForm;
};
export async function updateName({ formData }: updateNameProps) {
  try {
    const url = `/users/name`;
    const { data } = await api.patch(url, formData);
    return updateNameSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
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
    throw toApiError(error);
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
    throw toApiError(error);
  }
}
