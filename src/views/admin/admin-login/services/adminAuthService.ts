import api from "@/lib/axios";
import axios from "axios";
import {
  globalAdminAuthSchema,
  refreshTokenSchema,
  type adminLoginForm,
  type mustChangePasswordForm,
} from "../types";
import type { globalUserType } from "../../user/types";
import { toApiError } from "@/shared/errors";

export async function login(formData: adminLoginForm) {
  try {
    const url = "/admin-auth/login";
    const { data } = await api.post(url, formData);
    return globalAdminAuthSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function refresh() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL_BACKEND}/admin-auth/refresh`,
      {
        withCredentials: true,
      },
    );
    return refreshTokenSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function logout() {
  try {
    const url = "/admin-auth/logout";
    const { data } = await api.post<string>(url);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

type mustChangePasswordProps = {
  userId: globalUserType["uuid"];
  password: mustChangePasswordForm;
};

export async function mustChangePassword({
  userId,
  password,
}: mustChangePasswordProps) {
  try {
    const url = `/admin-auth/${userId}/password`;
    const { data } = await api.put<string>(url, password);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
