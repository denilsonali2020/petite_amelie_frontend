import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  getMetricsEmployeesSchema,
  getMetricsFinanceSchema,
  getMetricsInventorySchema,
} from "../types";

type dateProps = {
  from: string;
  to: string;
};

export async function getMetricsFinance({ from, to }: dateProps) {
  try {
    const url = `/reports/finance`;
    const { data } = await api.get(url, {
      params: {
        from,
        to,
      },
    });
    const response = getMetricsFinanceSchema.safeParse(data);
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

export async function getMetricsEmployees({ from, to }: dateProps) {
  try {
    const url = `/reports/employees`;
    const { data } = await api.get(url, {
      params: {
        from,
        to,
      },
    });
    const response = getMetricsEmployeesSchema.safeParse(data);
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

export async function getMetricsInventory() {
  try {
    const url = `/reports/inventory`;
    const { data } = await api.get(url);
    const response = getMetricsInventorySchema.safeParse(data);
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
