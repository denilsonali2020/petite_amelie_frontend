import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  getCustomerBilingInfoSchema,
  getOrderSchema,
  getOrdersSchema,
  type AddShippingInfo,
  type ChangeStatus,
  type createOrderType,
  type CustomerIdentifier,
  type globalOrderType,
} from "../types";

export async function createOrder(formData: createOrderType) {
  try {
    const url = "/orders";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

// NUEVO: Recibimos page y limit (por defecto 10)
export async function getOrders(page: number = 1, limit: number = 10) {
  try {
    const url = `/orders`;
    const { data } = await api.get(url, {
      params: {
        page: page,
        limit: limit, // Se lo mandamos a Express
      },
    });

    const response = getOrdersSchema.safeParse(data);
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

export async function getCustomerBilingInfo(
  identifier: CustomerIdentifier["email"] | CustomerIdentifier["phone"],
) {
  try {
    const url = `/customer/${identifier}`;
    const { data } = await api.post(url);
    const response = getCustomerBilingInfoSchema.safeParse(data);
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

export async function getOrder(uuid: globalOrderType["uuid"]) {
  try {
    const url = `/orders/${uuid}`;
    const { data } = await api.get(url);
    const response = getOrderSchema.safeParse(data);
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

type addShippingInfoProps = {
  uuid: globalOrderType["uuid"];
  formData: AddShippingInfo;
};
export async function addShippingInfo({
  uuid,
  formData,
}: addShippingInfoProps) {
  try {
    const url = `/orders/${uuid}/shipping`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type changeStatusProps = {
  uuid: globalOrderType["uuid"];
  formData: ChangeStatus;
};
export async function changeStatus({ uuid, formData }: changeStatusProps) {
  try {
    const url = `/orders/${uuid}/status`;
    const { data } = await api.patch<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
