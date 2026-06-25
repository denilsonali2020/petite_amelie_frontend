import api from "@/lib/axios";

import { isAxiosError } from "axios";
import {
  getSubCategoriesByUuidSchema,
  type generalCategoryType,
} from "../types";

export async function getSubCategoriesByUuid(
  uuid: generalCategoryType["uuid"],
) {
  try {
    const url = `/category/${uuid}`;
    const { data } = await api.get(url);
    const response = getSubCategoriesByUuidSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function createSubCategory(formData: FormData) {
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

type updateRootCategoryProps = {
  rootCategoryId: generalCategoryType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
  formData: FormData;
};
export async function updateSubCategory({
  rootCategoryId,
  subCategoryId,
  formData,
}: updateRootCategoryProps) {
  try {
    const url = `/category/${rootCategoryId}/rootCategory/${subCategoryId}/subCategory`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type deleteSubCategoryProps = {
  rootCategoryId: generalCategoryType["uuid"];
  subCategoryId: generalCategoryType["uuid"];
};
export async function deleteSubCategory({
  rootCategoryId,
  subCategoryId,
}: deleteSubCategoryProps) {
  try {
    const url = `/category/${rootCategoryId}/rootCategory/${subCategoryId}/subCategory`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
