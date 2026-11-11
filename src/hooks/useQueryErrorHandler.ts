import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ApiError } from "@/shared/errors";

export function useQueryErrorHandler(error: Error | null) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    const status = error instanceof ApiError ? error.status : undefined;

    if (status === 401 || status === 403) {
      navigate("/auth-admin/login", { replace: true });
      return;
    }

    toast.error(error.message, { id: error.message });
  }, [error, navigate]);
}
