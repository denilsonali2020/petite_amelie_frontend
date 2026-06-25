import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function AuthLayout() {
  return (
    <>
      <div className="flex h-screen overflow-hidden font-roboto bg-gray-100">
        {/* Columna de la Imagen */}
        <div className="relative hidden w-0 flex-1 lg:block overflow-hidden ">
          <img
            alt="F-15 Jet"
            src="/images/f-15_imagen.webp"
            className="absolute inset-0 size-full object-cover"
          />

          {/* Onda blanca */}
          <svg
            className="absolute right-0 top-0 h-full w-32 text-gray-100"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C60,20 40,80 100,100 L100,0 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Columna del Formulario (SCROLL AQUÍ) */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen overflow-y-auto">
          <div className="mx-auto w-full max-w-sm lg:w-96 p-5 rounded-xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <Outlet />

            <div className="mt-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <img src="/icons/escudo_azul.png" alt="imagen de escudo"/>
              <span className="text-xs text-gray-400">Tus datos están seguros</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
          },
          success: { duration: 5000 },
          error: { duration: 5000 },
        }}
      />
    </>
  );
}
