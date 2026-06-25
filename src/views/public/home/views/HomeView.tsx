import {
  TruckIcon,
  SparklesIcon,
  CheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import NewArrivals from "../components/LatestProducts";

// Características de la tienda
const features = [
  {
    icon: TruckIcon,
    name: "Envío Ágil Centroamericano",
    description: "Entrega rápida en Honduras, El Salvador, Guatemala y más",
    color: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: SparklesIcon,
    name: "K-Beauty Auténtico",
    description: "Productos 100% originales directos desde Corea del Sur",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: CheckIcon,
    name: "Calidad Garantizada",
    description: "Todos nuestros productos cuentan con certificación oficial",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: StarIcon,
    name: "Atención Premium",
    description: "Soporte especializado para ayudarte a elegir tu rutina",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function HomeView() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Principal */}
      <div
        className="relative bg-slate-900 h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/daxosw10b/image/upload/v1782145949/imagen_wacp9z.jpg')`,
        }}
      >
        {/* Capa de degradado negro (Overlay) para que el texto resalte mucho más */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-black/30 md:bg-linear-to-r md:from-black/75 md:to-black/30" />

        {/* Contenido del banner */}
        <div className="relative z-10 text-center px-6 max-w-2xl drop-shadow-md">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Descubre tu estilo con Petite Amelie
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 font-medium mb-6 drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
            Explora nuestra nueva colección de temporada.
          </p>
        </div>
      </div>

      {/* COMPONENTE DE NOVEDADES (Carrusel con React Query) */}
      <NewArrivals />

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-4">
              ¿Por qué elegir P_Amelie?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Somos tu puente a la belleza coreana más auténtica y de calidad en
              Centroamérica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="group bg-white rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  <div
                    className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`size-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HISTORIA DE LA EMPRESA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600"
                alt="P_Amelie Historia"
                className="rounded-lg shadow-lg w-full object-cover h-80"
              />
            </div>

            {/* Contenido */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                P_Amelie nace en 2022 con la misión de democratizar el acceso a
                productos K-beauty auténticos en Centroamérica. Nacimos de la
                pasión por el cuidado de la piel coreano y el deseo de compartir
                esta transformación con nuestras vecinas.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Cada producto que vendemos es cuidadosamente seleccionado,
                importado directamente desde Corea del Sur y verificado con
                nuestros propios estándares de calidad. Creemos que la belleza
                verdadera viene del cuidado genuino y los mejores ingredientes.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Hoy somos la tienda de confianza para miles de mujeres
                centroamericanas que han transformado sus rutinas de belleza con
                nuestros productos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-linear-to-r from-rose-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Suscríbete a Nuestro Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Recibe consejos de K-beauty, ofertas exclusivas y nuevos
            lanzamientos directamente en tu correo
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 outline-none transition"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Suscribir
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
