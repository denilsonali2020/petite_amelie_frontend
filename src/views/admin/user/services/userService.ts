import api from "@/lib/axios";
import {
  getAllUsersSchema,
  getUserSchema,
  getUsersQuickPinShcema,
  type createUserType,
  type globalUserType,
  type passwordForm,
  type updateUserType,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function getAllUsers() {
  try {
    const url = `/users`;
    const { data } = await api.get(url);
    return getAllUsersSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createUser(formData: createUserType) {
  try {
    const url = `/users`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getUser(userId: globalUserType["uuid"]) {
  try {
    const url = `/users/${userId}`;
    const { data } = await api.get(url);
    return getUserSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

type updateUserProps = {
  userId: globalUserType["uuid"];
  formData: updateUserType;
};

export async function updateUser({ userId, formData }: updateUserProps) {
  try {
    const url = `/users/${userId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

type verifyPasswordProps = {
  password: passwordForm;
};
export async function verifyPassword({ password }: verifyPasswordProps) {
  try {
    const url = `/users/check-password`;
    const { data } = await api.post<string>(url, password);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

type recoveryPasswordUserProps = {
  userId: globalUserType["uuid"];
  password: passwordForm;
};
export async function recoveryPasswordUser({
  userId,
  password,
}: recoveryPasswordUserProps) {
  try {
    const url = `/users/${userId}/recovery`;
    const { data } = await api.patch<string>(url, password);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getUsersQuickPin() {
  try {
    const url = `/users/quick-pin`;
    const { data } = await api.get(url);
    return getUsersQuickPinShcema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
