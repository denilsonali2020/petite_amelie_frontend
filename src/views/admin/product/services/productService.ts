import api from "@/lib/axios";

import { isAxiosError } from "axios";
import {
  getProductOrderSchema,
  getProductsByCategorySchema,
  getProductSchema,
  type editProductFormType,
  type getProductOrderType,
  type globalProductType,
} from "../types";
import type { generalCategoryType } from "../../category/types";

export async function getProductsByCategory(
  categoryId: generalCategoryType["uuid"],
  page: number = 1,
  limit: number = 10,
) {
  try {
    const url = `/products/${categoryId}/products`;
    const { data } = await api.get(url, {
      params: { page, limit }, // Pasamos los params al backend
    });
    const response = getProductsByCategorySchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type createProductProps = {
  subCategoryId: generalCategoryType["uuid"];
  formData: FormData;
};

export async function createProduct({
  subCategoryId,
  formData,
}: createProductProps) {
  try {
    const url = `/products/${subCategoryId}`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function getProduct(productId: globalProductType["uuid"]) {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.get(url);
    const response = getProductSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type updateProductProps = {
  productId: globalProductType["uuid"];
  formData: editProductFormType;
};
export async function updateProduct({
  productId,
  formData,
}: updateProductProps) {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function getProductOrder({ sku }: getProductOrderType) {
  try {
    const url = `/products/${sku}/order`;
    const { data } = await api.post(url);
    const response = getProductOrderSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
