import api from "@/lib/axios";

import { isAxiosError } from "axios";
import {
  getCategorySchema,
  getRootCategoriesSchema,
  type createRootCategory,
  type generalCategoryType,
} from "../types";

export async function getRootCategories() {
  try {
    const url = "/category";
    const { data } = await api.get(url);
    const response = getRootCategoriesSchema.safeParse(data);
    
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function createCategory(formData: createRootCategory) {
  try {
    const url = "/category";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function getCategory(uuid: generalCategoryType["uuid"]) {
  try {
    const url = `/category/${uuid}/category`;
    const { data } = await api.get(url);
    const response = getCategorySchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
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
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function deleteRootCategory(uuid: generalCategoryType["uuid"]) {
  try {
    const url = `/category/${uuid}/rootCategory`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
