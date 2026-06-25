import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function AuthAdminLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <Outlet />
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Petite Amelie. Todos los derechos
          reservados.
        </div>
      </div>
      
      {/* Notificaciones elegantes */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "0.875rem",
            padding: "0.7rem 1.2rem",
            borderRadius: "1rem",
            background: "#fff",
            color: "#374151",
            border: "1px solid #f3f4f6",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          },
          success: {
            duration: 5000,
            iconTheme: { primary: "#25bf06", secondary: "#fff" },
          },
        }}
      />
    </>
  );
}
