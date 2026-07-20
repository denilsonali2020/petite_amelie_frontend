import { FireIcon, TrophyIcon, HeartIcon } from "@heroicons/react/24/outline";
import ProductCarousel from "@/components/reusable/ProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { getBestSellersPerTopCategories } from "../services/homeService";
import { Navigate } from "react-router-dom";

// Estructura completa con 5 categorías y 10 productos reales por categoría (50 productos en total)
const bestSellersCategories = [
  {
    title: "1. Limpieza Profunda y Doble Limpieza",
    subtitle: "El secreto coreano para una piel sin imperfecciones",
    viewAllLink: "/catalogo?categoria=limpiadores",
    products: [
      {
        uuid: "lim-1",
        name: "Heimish - All Clean Balm",
        description:
          "Bálsamo desmaquillante ideal para remover maquillaje y protector solar.",
        price: 520.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-2",
        name: "COSRX - Low pH Good Morning Gel",
        description: "Limpiador al agua suave que equilibra el pH sin resecar.",
        price: 450.0,
        isOnDiscount: true,
        discountPrice: 390.0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-3",
        name: "Beauty of Joseon - Ginseng Cleansing Oil",
        description: "Aceite limpiador ligero con agua de raíz de ginseng.",
        price: 590.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-4",
        name: "Skin1004 - Madagascar Centella Light Cleansing Oil",
        description: "Aceite limpiador calmante para pieles sensibles.",
        price: 620.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-5",
        name: "Anua - Heartleaf Pore Control Cleansing Oil",
        description: "Elimina puntos negros y exceso de sebo profundamente.",
        price: 680.0,
        isOnDiscount: true,
        discountPrice: 595.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-6",
        name: "COSRX - Salicylic Acid Daily Gentle Cleanser",
        description:
          "Limpiador exfoliante ideal para pieles con tendencia al acné.",
        price: 460.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-7",
        name: "Isntree - Green Tea Fresh Cleanser",
        description:
          "Gel limpiador refrescante con extracto de té verde de Jeju.",
        price: 490.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-8",
        name: "Some By Mi - Bye Bye Blackhead 30Days",
        description: "Limpiador de burbujas mágicas para limpiar poros.",
        price: 640.0,
        isOnDiscount: true,
        discountPrice: 540.0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-9",
        name: "Pyunkang Yul - Low pH Pore Deep Cleansing Foam",
        description:
          "Espuma densa estricta con las impurezas y suave con tu piel.",
        price: 430.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "lim-10",
        name: "Ma:nyo - Pure Cleansing Oil",
        description:
          "Aceite orgánico premium, favorito número uno en ventas globales.",
        price: 720.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "2. Tónicos y Brumas Equilibrantes",
    subtitle: "Restaura el balance hídrico de tu rostro en segundos",
    viewAllLink: "/catalogo?categoria=tonicos",
    products: [
      {
        uuid: "ton-1",
        name: "Anua - Heartleaf 77% Soothing Toner",
        description:
          "El tónico viral más vendido en Corea para calmar rojeces.",
        price: 720.0,
        isOnDiscount: true,
        discountPrice: 610.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-2",
        name: "I'm From - Rice Toner",
        description:
          "Fórmula iluminadora basada en extracto de arroz de alta calidad.",
        price: 780.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-3",
        name: "Some By Mi - AHA BHA PHA 30Days Miracle",
        description:
          "Tónico exfoliante suave para transformar la textura de la piel.",
        price: 650.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-4",
        name: "COSRX - AHA/BHA Clarifying Treatment",
        description:
          "Bruma tónica exfoliante de uso diario para prevenir brotes.",
        price: 540.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-5",
        name: "Haruharu Wonder - Black Rice Hyaluronic Toner",
        description:
          "Intensa hidratación antioxidante con arroz negro fermentado.",
        price: 610.0,
        isOnDiscount: true,
        discountPrice: 520.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-6",
        name: "Pyunkang Yul - Essence Toner",
        description: "Fórmula minimalista con extracto de raíz de astrágalo.",
        price: 480.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-7",
        name: "Isntree - Green Tea Fresh Toner",
        description: "Controla el brillo graso y refresca las pieles mixtas.",
        price: 510.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-8",
        name: "Beauty of Joseon - Ginseng Essence Water",
        description: "Nutrición profunda revitalizante para pieles opacas.",
        price: 630.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-9",
        name: "Numbuzin - No.3 Super Glowing Essence Toner",
        description:
          "Fermentos seleccionados para conseguir la anhelada Glass Skin.",
        price: 740.0,
        isOnDiscount: true,
        discountPrice: 650.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ton-10",
        name: "Round Lab - 1025 Dokdo Toner",
        description:
          "Exfoliación invisible con agua marina profunda de la isla Dokdo.",
        price: 580.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "3. Esencias, Sueros y Ampollas",
    subtitle: "Tratamientos intensivos con alta concentración de activos",
    viewAllLink: "/catalogo?categoria=sueros",
    products: [
      {
        uuid: "ese-1",
        name: "COSRX - Advanced Snail 96 Mucin Power",
        description:
          "96% Filtrado de secreción de caracol para máxima regeneración.",
        price: 580.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-2",
        name: "Skin1004 - Madagascar Centella Ampoule",
        description:
          "Centella asiática pura para calmar y reparar la barrera cutánea.",
        price: 690.0,
        isOnDiscount: true,
        discountPrice: 585.0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-3",
        name: "Beauty of Joseon - Glow Serum : Propolis",
        description:
          "Própolis y niacinamida para combatir poros y aportar luminosidad.",
        price: 560.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-4",
        name: "Axis-Y - Dark Spot Correcting Glow",
        description:
          "Suero con 5% de niacinamida enfocado en corregir manchas.",
        price: 670.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-5",
        name: "Goodal - Green Tangerine Vita C Dark Spot",
        description: "Vitamina C cítrica para desvanecer manchas de acné.",
        price: 760.0,
        isOnDiscount: true,
        discountPrice: 680.0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-6",
        name: "Torriden - Dive-In Low Molecular Hyaluronic",
        description:
          "Suero de ácido hialurónico molecular para hidratación profunda.",
        price: 640.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-7",
        name: "Some By Mi - Retinol Intense Reactivating",
        description:
          "Retinol suave diseñado especialmente para pieles sensibles.",
        price: 790.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-8",
        name: "Beauty of Joseon - Revive Serum : Ginseng",
        description: "Sérum antiedad con ginseng y filtrado de caracol.",
        price: 560.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-9",
        name: "Anua - Peach 70% Niacin Serum",
        description:
          "Suero de melocotón para una textura suave y tono uniforme.",
        price: 750.0,
        isOnDiscount: true,
        discountPrice: 640.0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "ese-10",
        name: "Jumiso - All Day Vitamin Brightening",
        description: "Complejo vitamínico no pegajoso para iluminar el rostro.",
        price: 530.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "4. Cremas e Hidratantes",
    subtitle: "El sello final para retener la humedad y los nutrientes",
    viewAllLink: "/catalogo?categoria=hidratantes",
    products: [
      {
        uuid: "cre-1",
        name: "Illiyoon - Ceramide Ato Concentrate Cream",
        description: "Cápsulas de ceramidas para una barrera cutánea fuerte.",
        price: 680.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-2",
        name: "COSRX - Advanced Snail 92 All In One Cream",
        description: "Crema gel nutritiva que calma e hidrata sin dejar grasa.",
        price: 590.0,
        isOnDiscount: true,
        discountPrice: 510.0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-3",
        name: "Beauty of Joseon - Dynasty Cream",
        description: "Crema de lujo tradicional que aporta firmeza y brillo.",
        price: 660.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-4",
        name: "Aestura - Atobarrier 365 Cream",
        description: "Hidratación médica coreana altamente recomendada.",
        price: 820.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-5",
        name: "Purito SEOUL - Oat-In Calming Gel Cream",
        description: "Gel refrescante de avena ideal para climas húmedos.",
        price: 550.0,
        isOnDiscount: true,
        discountPrice: 480.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-6",
        name: "Round Lab - Birch Juice Moisturizing Cream",
        description: "Crema ligera con savia de abedul purificada.",
        price: 630.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-7",
        name: "Isntree - Hyaluronic Acid Aqua Gel Cream",
        description: "Cinco tipos de ácido hialurónico en base gel.",
        price: 580.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-8",
        name: "iUnik - Centella Calming Gel Cream",
        description:
          "Crema en gel ultra ligera que reduce la temperatura cutánea.",
        price: 520.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-9",
        name: "Mary&May - Sensitive Soothing Gel Blemish",
        description:
          "Houttuynia Cordata y Tea Tree para calmar imperfecciones.",
        price: 640.0,
        isOnDiscount: true,
        discountPrice: 550.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cre-10",
        name: "Klairs - Rich Moist Soothing Cream",
        description:
          "Rescate de hidratación profunda prolongada para todo el año.",
        price: 690.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    title: "5. Alta Protección Solar",
    subtitle: "El pilar antiedad indispensable de la rutina diaria",
    viewAllLink: "/catalogo?categoria=bloqueadores",
    products: [
      {
        uuid: "sun-1",
        name: "Beauty of Joseon - Relief Sun : Rice + Probiotics",
        description:
          "Protector orgánico ligero, textura crema hidratante suave.",
        price: 650.0,
        isOnDiscount: true,
        discountPrice: 520.0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-2",
        name: "Skin1004 - Madagascar Centella Hyalu-Cica",
        description:
          "Fórmula tipo sérum solar ultra fluida con acabado invisible.",
        price: 640.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-3",
        name: "Tocobo - Bio Watery Sun Cream SPF50+",
        description: "Bloqueador acuoso refrescante de rápida absorción.",
        price: 620.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
      },
      {
        uuid: "sun-4",
        name: "Round Lab - Birch Juice Moisturizing Sun Cream",
        description:
          "Protección solar número uno en los rankings internos de Corea.",
        price: 660.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-5",
        name: "COSRX - Aloe Soothing Sun Cream SPF50+",
        description:
          "Enriquecido con extracto de aloe vera para calmar e hidratar.",
        price: 510.0,
        isOnDiscount: true,
        discountPrice: 450.0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-6",
        name: "Haruharu Wonder - Black Rice Pure Mineral",
        description:
          "Protector 100% mineral ideal para las pieles más reactivas.",
        price: 630.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-7",
        name: "Axis-Y - Complete No-Stress Physical Sunscreen",
        description: "Protección física con barra de camaleón y niacinamida.",
        price: 650.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-8",
        name: "Isntree - Hyaluronic Acid Watery Sun Gel",
        description:
          "Gel con ocho tipos de ácido hialurónico sin rastro blanco.",
        price: 670.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-9",
        name: "Abib - Quick Sunstick Protection Bar",
        description:
          "Protector solar en barra ideal para reaplicar sobre el maquillaje.",
        price: 590.0,
        isOnDiscount: true,
        discountPrice: 495.0,
        images:
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sun-10",
        name: "Tocobo - Cotton Soft Sun Stick SPF50+",
        description: "Barra solar con acabado mate y extracto de algodón.",
        price: 580.0,
        isOnDiscount: false,
        discountPrice: 0,
        images:
          "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export default function BestSellersView() {
  // Dividimos las categorías para posicionar estratégicamente la sección de branding en medio
  const firstCategories = bestSellersCategories.slice(0, 3);
  const remainingCategories = bestSellersCategories.slice(3);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestSellersProdutsPerCategories"],
    queryFn: getBestSellersPerTopCategories,
  });

  if (isLoading) return "";

  if (isError) return <Navigate to={"/404"} />;

  if (data) {
    // const firstCategories = data.slice(0, 3);
  }

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      {/* 1. HERO - SECCIÓN PREMIUM EN TONO ROSA SUTIL */}
      <section className="border-b border-neutral-100 bg-[#fbf6f9] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Contenedor de Texto */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-purple-600">
                <FireIcon className="size-4 animate-pulse" />
                Los Favoritos de la Comunidad
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                Los más vendidos, avalados por tu piel.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                Las fórmulas coreanas más deseadas en Honduras y Centroamérica.
                Productos que se agotan en tiempo récord por una sola razón: sus
                resultados reales.
              </p>
            </div>

            {/* Contenedor de Imagen */}
            <div className="mt-12 lg:mt-0 relative">
              <div className="aspect-4/3 sm:aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
                  alt="Productos K-Beauty más vendidos"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRIMERAS 3 CATEGORÍAS */}
      <div className="pt-12 space-y-4">
        {firstCategories.map((category) => (
          <ProductCarousel
            key={category.title}
            title={category.title}
            subtitle={category.subtitle}
            viewAllLink={category.viewAllLink}
            products={category.products}
          />
        ))}
      </div>

      {/* 3. SECCIÓN DE REPUTACIÓN / TESTIMONIAL BRANDING (En el medio para romper ritmo visual) */}
      <section className="my-14 bg-neutral-900 text-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto md:flex md:items-center md:h-100">
          {/* Contenido */}
          <div className="p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
              Resultados Comprobados
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              ¿Por qué todos están hablando de estos productos?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              No se trata de modas pasajeras. Cada producto en nuestra lista de
              Best Sellers ha ganado su lugar gracias a valoraciones de 5
              estrellas de consumidoras reales en toda la región. Son joyas de
              la cosmética coreana formuladas para calmar, transformar y
              mantener el brillo saludable sin importar el clima
              centroamericano.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <TrophyIcon className="size-5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Top Regional
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="size-5 text-rose-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Recomendado
                </span>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80"
              alt="Piel radiante cuidado coreano"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* 4. ÚLTIMAS 2 CATEGORÍAS */}
      <div className="pb-12 space-y-4">
        {remainingCategories.map((category) => (
          <ProductCarousel
            key={category.title}
            title={category.title}
            subtitle={category.subtitle}
            viewAllLink={category.viewAllLink}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
}
