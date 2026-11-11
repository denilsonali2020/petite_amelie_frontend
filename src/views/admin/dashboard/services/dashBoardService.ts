import api from "@/lib/axios";
import {
  getCurrentYearMonthlySalesSchema,
  getRecentOrdersSchema,
  getTopSellingProductsSchema,
  getTopSellingSubcategoriesSchema,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function getCurrentYearMonthlySales() {
  try {
    const url = `/dashboard`;
    const { data } = await api.get(url);
    return getCurrentYearMonthlySalesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getRecentOrders() {
  try {
    const url = "/dashboard/recent";
    const { data } = await api.get(url);
    return getRecentOrdersSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getTopSellingSubcategories(m: string) {
  try {
    const url = "/dashboard/top-categories";
    const { data } = await api.get(url, {
      params: { m },
    });
    return getTopSellingSubcategoriesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getTopSellingProducts(m: string) {
  try {
    const url = "/dashboard/top-products";
    const { data } = await api.get(url, {
      params: { m },
    });
    return getTopSellingProductsSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
