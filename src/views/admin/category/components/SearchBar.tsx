import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProduct } from "../../product/services/productService";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isError } = useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProduct(searchTerm),
    retry: false,
    enabled: searchTerm.trim().length > 1,
  });

  if (isError) return <Navigate to="/404" />;

  return (
    <div ref={searchRef} className="relative w-full max-w-md mt-3">
      {/* Campo de Entrada */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <MagnifyingGlassIcon
            className={`h-5 w-5 transition-colors ${
              isOpen || searchTerm ? "text-rose-500" : "text-gray-400"
            }`}
            aria-hidden="true"
          />
        </div>

        <input
          type="text"
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Buscar productos por nombre o SKU..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-gray-800 placeholder-gray-400 shadow-sm transition-all hover:border-gray-300 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-rose-500 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* resultados */}
      {isOpen && searchTerm.trim().length > 1 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in-50 slide-in-from-top-2 duration-150">
          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-50">
            {data &&
              data.map((product) => (
                <li key={product.uuid}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm("");
                      navigate(`/admin/products/${product.uuid}`);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-rose-50/40 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* imagen */}
                      <div
                        className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border transition-colors ${
                          product.isActive
                            ? "border-gray-200/60 group-hover:border-rose-200"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        {product.images ? (
                          <img
                            src={product.images}
                            alt={product.name}
                            className={`h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300 ${
                              !product.isActive ? "grayscale opacity-60" : ""
                            }`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-rose-50 text-rose-400">
                            <ShoppingBagIcon className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      {/* nombre */}
                      <div className="flex flex-col">
                        <p
                          className={`text-sm font-semibold transition-colors line-clamp-1 ${
                            product.isActive
                              ? "text-gray-800 group-hover:text-rose-600"
                              : "text-gray-500"
                          }`}
                        >
                          {product.name}
                        </p>

                        <div className="flex items-center gap-2 mt-0.5">
                          {/* sku */}
                          {product.sku && (
                            <span className="text-[11px] font-mono text-gray-400">
                              SKU: {product.sku}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                              product.isActive
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                : "bg-amber-50 text-amber-700 ring-amber-600/20"
                            }`}
                          >
                            {product.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRightIcon className="h-5 w-5 text-gray-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
