import api from "@/lib/axios";
import { findProductSchema } from "../types";
import type { globalProductType } from "@/views/admin/product/types";
import { toApiError } from "@/shared/errors";

export async function findProduct(productId: globalProductType["uuid"]) {
  try {
    const url = `/store/products/${productId}`;
    const { data } = await api.get(url);

    return findProductSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
