import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  getAllUsersSchema,
  getUserSchema,
  getUsersQuickPinShcema,
  type createUserType,
  type globalUserType,
  type passwordForm,
  type updateUserType,
} from "../types";

export async function getAllUsers() {
  try {
    const url = `/users`;
    const { data } = await api.get(url);
    const response = getAllUsersSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Error al cargar los datos");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function createUser(formData: createUserType) {
  try {
    const url = `/users`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function getUser(userId: globalUserType["uuid"]) {
  try {
    const url = `/users/${userId}`;
    const { data } = await api.get(url);
    const response = getUserSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Error al cargar los datos");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
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
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type verifyPasswordProps = {
  userId: globalUserType["uuid"];
  password: passwordForm;
};
export async function verifyPassword({
  userId,
  password,
}: verifyPasswordProps) {
  try {
    const url = `/users/${userId}/check-password`;
    const { data } = await api.post<string>(url, password);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
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
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function getUsersQuickPin() {
  try {
    const url = `/users/quick-pin`;
    const { data } = await api.get(url);
    const response = getUsersQuickPinShcema.safeParse(data);
    if (!response.success) {
      throw new Error("Error al cargar los datos");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
