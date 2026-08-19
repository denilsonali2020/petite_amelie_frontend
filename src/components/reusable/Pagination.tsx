import { generatePagination } from "@/shared/utils/generatePagination";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

type PaginationProps = {
  page: number;
  limit: number;

  totalItems: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;

  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function Pagination({
  page,
  limit,
  totalItems,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const pages = generatePagination(page, totalPages);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 gap-4">
      <div className="flex items-center gap-4 text-sm text-gray-500 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center gap-2">
          <label htmlFor="limit-select" className="font-medium">
            Mostrar:
          </label>

          <select
            id="limit-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <span className="hidden sm:inline">
          Total: <span className="font-bold text-gray-700">{totalItems}</span>{" "}
          productos
        </span>
      </div>

      {totalPages > 1 && (
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPreviousPage}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" />
          </button>

          <div className="hidden md:flex">
            {pages.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 pt-4 text-sm text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  onClick={() => onPageChange(item)}
                  className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium transition-colors ${
                    page === item
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:border-pink-300 hover:text-pink-700"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" />
          </button>
        </div>
      )}
    </nav>
  );
}
