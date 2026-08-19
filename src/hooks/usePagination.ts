import { useSearchParams } from "react-router-dom";

const ALLOWED_LIMITS = [10, 25, 50, 100];

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  let page = Number(searchParams.get("page")) || 1;
  if (page < 1) page = 1;

  let limit = Number(searchParams.get("limit")) || 10;
  if (!ALLOWED_LIMITS.includes(limit)) {
    limit = 10;
  }

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", String(newPage));

      return params;
    });
  };

  const setLimit = (newLimit: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("limit", String(newLimit));
      params.set("page", "1");

      return params;
    });
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
}