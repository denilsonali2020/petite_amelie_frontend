import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/20/solid";

// Tipado actualizado con los nuevos estados
export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "READY"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

// Configuración de estados (Colores e Íconos)
export const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case "PAID":
      return {
        classes: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
        label: "Pagado",
        Icon: CheckCircleIcon,
        iconColor: "text-emerald-500",
      };
    case "DELIVERED":
      return {
        classes: "bg-green-50 text-green-700 ring-green-600/20",
        label: "Entregado",
        Icon: CheckCircleIcon,
        iconColor: "text-green-500",
      };
    case "PREPARING":
      return {
        classes: "bg-amber-50 text-amber-700 ring-amber-600/20",
        label: "En Preparación",
        Icon: ArchiveBoxIcon,
        iconColor: "text-amber-500",
      };
    case "READY":
      return {
        classes: "bg-orange-50 text-orange-700 ring-orange-600/20",
        label: "Listo para Envío",
        Icon: ArchiveBoxIcon,
        iconColor: "text-orange-500",
      };
    case "SHIPPED":
      return {
        classes: "bg-blue-50 text-blue-700 ring-blue-600/20",
        label: "Enviado",
        Icon: TruckIcon,
        iconColor: "text-blue-500",
      };
    case "PENDING":
      return {
        classes: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        label: "Pendiente",
        Icon: ClockIcon,
        iconColor: "text-yellow-500",
      };
    case "CANCELLED":
    case "REFUNDED":
      return {
        classes: "bg-rose-50 text-rose-700 ring-rose-600/20",
        label: status === "REFUNDED" ? "Reembolsado" : "Cancelado",
        Icon: XCircleIcon,
        iconColor: "text-rose-500",
      };
    default:
      return {
        classes: "bg-gray-50 text-gray-600 ring-gray-500/10",
        label: status,
        Icon: ClockIcon,
        iconColor: "text-gray-400",
      };
  }
};

// Utilidad para formatear la fecha
export const formatDateTime = (dateString: string) => {
  return new Intl.DateTimeFormat("es-HN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
};
