import api from "@/lib/axios";
import {
  getBillingConfigsSchema,
  type createBillingConfigType,
  type BillingConfigType,
  type updateBillingConfigType,
  getBillingConfigSchema,
} from "../types";
import { toApiError } from "@/shared/errors";

export async function getBillingConfigs() {
  try {
    const url = "/billing-config";
    const { data } = await api.get(url);
    return getBillingConfigsSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createBillingConfig(formData: createBillingConfigType) {
  try {
    const url = "/billing-config";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBillingConfig(uuid: BillingConfigType["uuid"]) {
  try {
    const url = `/billing-config/${uuid}`;
    const { data } = await api.get(url);
    return getBillingConfigSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

type UpdateBillingConfigProps = {
  uuid: BillingConfigType["uuid"];
  formData: updateBillingConfigType;
};

export async function updateBillingConfig({
  uuid,
  formData,
}: UpdateBillingConfigProps) {
  try {
    const url = `/billing-config/${uuid}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
