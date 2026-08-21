import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { productsByCategorySchema } from "../types";
import type { generalCategoryType } from "@/views/admin/category/types";

export async function productsByCategory(
  categoryId: generalCategoryType["uuid"],
  page: number,
  limit: number,
) {
  try {
    const url = `/store/category/${categoryId}`;
    const { data } = await api.get(url, {
      params: { page, limit },
    });

    const response = productsByCategorySchema.safeParse(data);
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
