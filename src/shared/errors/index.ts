import { isAxiosError } from "axios";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const DEFAULT_MESSAGE = "No se pudo completar la acción.";

export function toApiError(err: unknown): ApiError {
  if (isAxiosError(err)) {
    const serverMessage = err.response?.data?.error;
    return new ApiError(
      typeof serverMessage === "string" ? serverMessage : DEFAULT_MESSAGE,
      err.response?.status,
    );
  }
  return new ApiError(DEFAULT_MESSAGE);
}
