import api from "@/lib/axios";

import {
  getSubCategoriesByUuidSchema,
  type generalCategoryType,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function getSubCategoriesByUuid(
  uuid: generalCategoryType["uuid"],
) {
  try {
    const url = `/category/${uuid}`;
    const { data } = await api.get(url);
    return getSubCategoriesByUuidSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createSubCategory(formData: FormData) {
  try {
    const url = "/category";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

type updateRootCategoryProps = {
  subCategoryId: generalCategoryType["uuid"];
  formData: FormData;
};
export async function updateSubCategory({
  subCategoryId,
  formData,
}: updateRootCategoryProps) {
  try {
    const url = `/category/${subCategoryId}/subCategory`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteSubCategory(
  subCategoryId: generalCategoryType["uuid"],
) {
  try {
    const url = `/category/${subCategoryId}/subCategory`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
