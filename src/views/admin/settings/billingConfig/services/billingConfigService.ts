import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  getBillingConfigsSchema,
  type createBillingConfigType,
  type BillingConfigType,
  type updateBillingConfigType,
  getBillingConfigSchema,
} from "../types";

export async function getBillingConfigs() {
  try {
    const url = "/billing-config";
    const { data } = await api.get(url);
    const response = getBillingConfigsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    throw new Error("Error en el formato de los datos");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
    throw error;
  }
}

export async function createBillingConfig(formData: createBillingConfigType) {
  try {
    const url = "/billing-config";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
    throw error;
  }
}

export async function getBillingConfig(uuid: BillingConfigType["uuid"]) {
  try {
    const url = `/billing-config/${uuid}`;
    const { data } = await api.get(url);
    const response = getBillingConfigSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    throw new Error("Error obteniendo la configuración");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
    throw error;
  }
}

type UpdateBillingConfigProps = {
  uuid: BillingConfigType['uuid'];
  formData: updateBillingConfigType;
};

export async function updateBillingConfig({
  uuid,
  formData,
}: UpdateBillingConfigProps) {
  try {
    const url = `/billing-config/${uuid}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
    throw error;
  }
}
