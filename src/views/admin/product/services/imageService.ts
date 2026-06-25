import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { globalProductType } from "../types";

type updateProductImageProps = {
  productId: globalProductType["uuid"];
  imageId: string;
  formData: FormData;
};
export async function updateProductImage({
  productId,
  imageId,
  formData,
}: updateProductImageProps) {
  try {
    const url = `/products/${productId}/product/${imageId}/image`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

type createProductImageProps = {
  productId: globalProductType["uuid"];
  formData: FormData;
};
export async function createProductImage({
  productId,
  formData,
}: createProductImageProps) {
  try {
    const url = `/products/${productId}/image`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}

export async function deleteProductImage(imageId: string) {
  try {
    const url = `/products/${imageId}/image`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
  }
}
