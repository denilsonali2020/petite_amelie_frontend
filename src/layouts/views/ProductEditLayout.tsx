import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getProduct } from "@/views/admin/product/services/productService";

export default function ProductEditLayout() {
  const params = useParams();
  const rootCategoryId = params.rootCategoryId!;
  const subCategoryId = params.subCategoryId!;
  const productId = params.productId!;
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
  });

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-500 animate-spin rounded-full" />
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            Cargando Producto...
          </span>
        </div>
      </div>
    );

  const imagePrimary = data?.images.find((img) => img.isPrimary === true);

  if (isError) return <p>Error al cargar producto</p>;

  if (data)
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto space-y-6">
        {/* Botón Volver */}
        <button
          onClick={() =>
            navigate(
              `/admin/category/${rootCategoryId}/category/${subCategoryId}/products${location.search}`,
            )
          }
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a Productos
        </button>

        {/* HEADER FIJO: Lo sacamos del Form para que sea global */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-5 shadow-sm">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-inner">
            <img
              src={imagePrimary!.url}
              alt={data.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {data.name}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              SKU: <span className="font-mono text-pink-400">{data.sku}</span>
            </p>
          </div>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        {/* TABS DE NAVEGACIÓN */}
        <nav className="flex gap-8 border-b border-slate-200 px-2">
          <NavLink
            // 1. AQUI: Agregamos el location.search
            to={`.${location.search}`}
            end
            className={({ isActive }) =>
              `pb-3 text-sm font-bold transition-all border-b-2 ${
                isActive
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }
          >
            Información General
          </NavLink>
          <NavLink
            // 2. AQUI: Agregamos el location.search
            to={`media${location.search}`}
            className={({ isActive }) =>
              `pb-3 text-sm font-bold transition-all border-b-2 ${
                isActive
                  ? "border-pink-600 text-pink-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }
          >
            Multimedia
          </NavLink>
        </nav>

        {/* CONTENIDO DINÁMICO: Aquí se inyecta el Form o la Galería */}
        <div className="mt-6">
          <Outlet
            context={{ data, rootCategoryId, subCategoryId, productId }}
          />
        </div>
      </div>
    );
}
