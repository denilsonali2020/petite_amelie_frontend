import api from "@/lib/axios";

import {
  getCategorySchema,
  getRootCategoriesSchema,
  type createRootCategory,
  type generalCategoryType,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function getRootCategories() {
  try {
    const url = "/category";
    const { data } = await api.get(url);
    return getRootCategoriesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createCategory(formData: createRootCategory) {
  try {
    const url = "/category";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getCategory(uuid: generalCategoryType["uuid"]) {
  try {
    const url = `/category/${uuid}/category`;
    const { data } = await api.get(url);
    return getCategorySchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

type updateRootCategoryProps = {
  uuid: generalCategoryType["uuid"];
  formData: createRootCategory;
};
export async function updateRootCategory({
  uuid,
  formData,
}: updateRootCategoryProps) {
  try {
    const url = `/category/${uuid}/rootCategory`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteRootCategory(uuid: generalCategoryType["uuid"]) {
  try {
    const url = `/category/${uuid}/rootCategory`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
