import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Animación flotante definida en CSS
const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
  .animate-float-subtle {
    animation: float 3s ease-in-out infinite;
  }
`;

interface ErrorMessageProps {
  title?: string;
  message?: string;
  variant?: "danger" | "warning";
  className?: string;
  onRetry?: () => void;
}

export default function ErrorMessageLoadingData({
  title = "Error de carga",
  message = "No pudimos procesar la solicitud en este momento.",
  variant = "danger",
  className = "",
  onRetry = () => window.location.reload(),
}: ErrorMessageProps) {
  return (
    <>
      <style>{floatAnimation}</style>

      {/* Eliminamos bg, border y p-10 del contenedor principal */}
      <div className={`flex flex-col items-center justify-center ${className} mt-20`}>
        {/* El icono conserva su "badge" pero con la animación flotante */}
        <div className="p-3 bg-white rounded-full border border-gray-100 shadow-sm mb-4 animate-float-subtle">
          <ExclamationTriangleIcon
            className={`w-6 h-6 ${variant === "danger" ? "text-gray-400" : "text-amber-400/70"}`}
          />
        </div>

        <div className="text-center max-w-xs">
          <h4 className="font-bold text-gray-900 text-sm tracking-tight">
            {title}
          </h4>
          <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
            {message}
          </p>
        </div>

        <button
          onClick={onRetry}
          className="mt-5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all active:scale-95"
        >
          Reintentar
        </button>
      </div>
    </>
  );
}
