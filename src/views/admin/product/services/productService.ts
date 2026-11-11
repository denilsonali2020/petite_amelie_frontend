import api from "@/lib/axios";

import {
  getProductOrderSchema,
  getProductsByCategorySchema,
  getProductSchema,
  searchProductSchema,
  type editProductFormType,
  type getProductOrderType,
  type globalProductType,
} from "../types";
import type { generalCategoryType } from "../../category/types";
import { toApiError } from "@/shared/errors";

export async function getProductsByCategory(
  categoryId: generalCategoryType["uuid"],
  page: number = 1,
  limit: number = 10,
) {
  try {
    const url = `/products/${categoryId}/products`;
    const { data } = await api.get(url, {
      params: { page, limit },
    });
    return getProductsByCategorySchema.parse(data);
  } catch (error) {
    throw toApiError(error);
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
    throw toApiError(error);
  }
}

export async function getProduct(productId: globalProductType["uuid"]) {
  try {
    const url = `/products/${productId}`;
    const { data } = await api.get(url);
    return getProductSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
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
    throw toApiError(error);
  }
}

export async function getProductOrder({ sku }: getProductOrderType) {
  try {
    const url = `/products/${sku}/order`;
    const { data } = await api.post(url);
    return getProductOrderSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function searchProduct(p: string) {
  try {
    const url = `/products/search`;
    const { data } = await api.get(url, {
      params: { p },
    });
    return searchProductSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
