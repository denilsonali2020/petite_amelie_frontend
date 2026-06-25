import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="relative min-h-screen isolate overflow-hidden bg-slate-900">
      {/* Imagen de fondo con overlay */}
      <img
        alt="Background 404"
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        className="absolute inset-0 -z-10 size-full object-cover object-center"
      />

      {/* Capa de oscurecimiento para legibilidad */}
      <div
        className="absolute inset-0 -z-10 bg-slate-900/40 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-bold tracking-widest uppercase text-indigo-400">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-lg font-medium text-slate-300 text-pretty sm:text-xl/8">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
          que haya sido movida o eliminada.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/admin/dashboard"
            className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-md ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-all active:scale-95"
          >
            <span aria-hidden="true" className="mr-2">
              &larr;
            </span>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
