import { useQuery } from "@tanstack/react-query";
import { latestSubCategories } from "../services/homeService";
import { Link, Navigate } from "react-router-dom";

export default function LatestCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestSubCategories"],
    queryFn: latestSubCategories,
  });

  if (isLoading) return "";

  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <section className="border-y border-neutral-100 bg-neutral-50 mt-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-500">
              Compra por categoría
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl text-neutral-900">
              Novedades según lo que buscas
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((category) => (
              <Link
                key={category.uuid}
                to={`/productos?categoria=${category.uuid}&orden=nuevos`}
                className="group relative min-h-75 overflow-hidden rounded-xs bg-neutral-900"
              >
                <img
                  src={category.imageURL || ""}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-xl font-black">{category.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-neutral-200">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-block text-xs font-black uppercase tracking-wider underline underline-offset-4">
                    Ver novedades
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
}
