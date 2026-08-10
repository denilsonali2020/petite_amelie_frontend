import api from "@/lib/axios";

import { isAxiosError } from "axios";
import { searchProductSchema } from "../types";
import type { globalProductType } from "@/views/admin/product/types";

export async function searchProduct(productId: globalProductType["uuid"]) {
  try {
    const url = `/store/products/${productId}`;
    const { data } = await api.get(url);

    const response = searchProductSchema.safeParse(data);
    if (!response.success) {
      throw new Error("Error al cargar los datos");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Hubo un error");
    }
    throw new Error("Hubo un error inesperado");
  }
}
