import {
  BanknotesIcon,
  ArchiveBoxIcon,
  UsersIcon,
  GiftIcon,
  ArrowRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ReportsHub() {
  const navigate = useNavigate();
  // Lista de las categorías de reportes
  const reportCategories = [
    {
      id: "finance",
      title: "Finanzas y Ventas",
      description:
        "Analiza ingresos totales, márgenes de ganancia y rendimiento por canal (POS vs Web).",
      icon: <BanknotesIcon className="w-7 h-7" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      hoverBorder: "hover:border-emerald-200",
    },
    {
      id: "inventory",
      title: "Inventario y Productos",
      description:
        "Revisa el valor de tu inventario, alertas de stock crítico.",
      icon: <ArchiveBoxIcon className="w-7 h-7" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBorder: "hover:border-blue-200",
    },
    {
      id: "employees",
      title: "Rendimiento de Empleados",
      description:
        "Métricas de ventas por usuario, cantidad de órdenes procesadas y margen de ganancia generado por cada uno.",
      icon: <UsersIcon className="w-7 h-7" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      hoverBorder: "hover:border-indigo-200",
    },
    {
      id: "loyalty",
      title: "Fidelización y Cupones",
      description:
        "Estadísticas sobre el uso de cupones de descuento, puntos canjeados por clientes y campañas activas.",
      icon: <GiftIcon className="w-7 h-7" />,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      hoverBorder: "hover:border-rose-200",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50 font-sans">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <ChartBarIcon className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Centro de Reportes
          </h1>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Selecciona el área del negocio que deseas analizar. Cada sección
          contiene métricas detalladas y opciones de exportación en PDF.
        </p>
      </div>

      {/* GRID DE NAVEGACIÓN (Tarjetas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/admin/reports/${category.id}`)}
            className={`group text-left bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md ${category.hoverBorder} relative overflow-hidden flex flex-col justify-between h-48 cursor-pointer`}
          >
            {/* Contenido Superior */}
            <div className="flex items-start justify-between">
              <div
                className={`p-3 rounded-xl ${category.bgColor} ${category.color}`}
              >
                {category.icon}
              </div>

              {/* Flecha que aparece/se mueve al hacer hover */}
              <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900 transition-colors">
                <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Textos Inferiores */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Efecto de barra de color en la parte inferior de la tarjeta al hacer hover */}
            <div
              className={`absolute bottom-0 left-0 w-full h-1 ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
