import api from "@/lib/axios";
import {
  getMetricsEmployeesSchema,
  getMetricsFinanceSchema,
  getMetricsInventorySchema,
} from "../types";
import { toApiError } from "@/shared/errors";

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
    return getMetricsFinanceSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
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
    return getMetricsEmployeesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getMetricsInventory() {
  try {
    const url = `/reports/inventory`;
    const { data } = await api.get(url);
    return getMetricsInventorySchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
