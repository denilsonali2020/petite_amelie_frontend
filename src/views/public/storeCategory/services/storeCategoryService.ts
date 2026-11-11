import api from "@/lib/axios";
import { productsByCategorySchema } from "../types";
import type { generalCategoryType } from "@/views/admin/category/types";
import { toApiError } from "@/shared/errors";

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

    return productsByCategorySchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
