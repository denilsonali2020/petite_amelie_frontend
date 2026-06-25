import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  getCurrentYearMonthlySalesSchema,
  getRecentOrdersSchema,
  getTopSellingProductsSchema,
  getTopSellingSubcategoriesSchema,
} from "../types";

export async function getCurrentYearMonthlySales() {
  try {
    const url = `/dashboard`;
    const { data } = await api.get(url);
    const response = getCurrentYearMonthlySalesSchema.safeParse(data);
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

export async function getRecentOrders() {
  try {
    const url = "/dashboard/recent";
    const { data } = await api.get(url);
    const response = getRecentOrdersSchema.safeParse(data);
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

export async function getTopSellingSubcategories() {
  try {
    const url = "/dashboard/top-categories";
    const { data } = await api.get(url);
    const response = getTopSellingSubcategoriesSchema.safeParse(data);
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

export async function getTopSellingProducts() {
  try {
    const url = "/dashboard/top-products";
    const { data } = await api.get(url);
    const response = getTopSellingProductsSchema.safeParse(data);
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
