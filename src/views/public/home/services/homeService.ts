import api from "@/lib/axios";

import {
  getBestSellersPerTopCategoriesSchema,
  getOffersPerTopCategoriesSchema,
  latestSubCategoriesSchema,
  navigationSchema,
  newArrivalsSchema,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function navigation() {
  try {
    const url = "/home/navigation";
    const { data } = await api.get(url);
    return navigationSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function latestProducts() {
  try {
    const url = "/home/latest-products";
    const { data } = await api.get(url);
    return newArrivalsSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function latestSubCategories() {
  try {
    const url = "/home/sub-categories/latest";
    const { data } = await api.get(url);
    return latestSubCategoriesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBestSellersPerTopCategories() {
  try {
    const url = "/home/best-sellers/latest";
    const { data } = await api.get(url);
    return getBestSellersPerTopCategoriesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
export async function getOffersPerTopCategories() {
  try {
    const url = "/home/offers/latest";
    const { data } = await api.get(url);
    return getOffersPerTopCategoriesSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
