import { TagIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import ProductCarousel from "@/components/reusable/ProductCarousel";

// Tipado de los datos
export type Product = {
  uuid: string;
  name: string;
  description: string;
  price: number;
  isOnDiscount: boolean;
  discountPrice: number;
  images: string;
};

export type OffersPerCategoryType = {
  name: string;
  products: Product[];
}[];

// DATA MANUAL (5 Categorías con 10 productos cada una)
const OFFERS_DATA: OffersPerCategoryType = [
  // 1. LIMPIADORES
  {
    name: "Limpiadores en Oferta",
    products: [
      {
        uuid: "cl-1",
        name: "Low pH Good Morning Gel Cleanser",
        description: "Gel limpiador suave con pH balanceado, ideal para uso diario sin resecar.",
        price: 350,
        isOnDiscount: true,
        discountPrice: 280,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-2",
        name: "Salicylic Acid Daily Gentle Cleanser",
        description: "Espuma limpiadora con ácido salicílico para combatir el acné y poros obstruidos.",
        price: 380,
        isOnDiscount: true,
        discountPrice: 299,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-3",
        name: "Green Tea Foam Cleanser",
        description: "Espuma rica en extracto de té verde antioxidante que hidrata mientras limpia.",
        price: 320,
        isOnDiscount: true,
        discountPrice: 250,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-4",
        name: "Centella Light Cleansing Oil",
        description: "Aceite limpiador ligero a base de centella asiática para retirar maquillaje a prueba de agua.",
        price: 550,
        isOnDiscount: true,
        discountPrice: 440,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-5",
        name: "Rice Water Bright Foaming Cleanser",
        description: "Limpiador iluminador enriquecido con agua de arroz para un tono de piel más uniforme.",
        price: 310,
        isOnDiscount: true,
        discountPrice: 245,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-6",
        name: "Snail Mucin Gel Cleanser",
        description: "Limpiador regenerador con mucina de caracol que protege la barrera cutánea.",
        price: 420,
        isOnDiscount: true,
        discountPrice: 335,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-7",
        name: "Tea Tree Purifying Cleanser",
        description: "Formulado con árbol de té para calmar rojeces y controlar el exceso de sebo.",
        price: 360,
        isOnDiscount: true,
        discountPrice: 285,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-8",
        name: "Hyaluronic Acid Hydrating Cleanser",
        description: "Limpiador cremoso con ácido hialurónico que deja la piel suave y flexible.",
        price: 390,
        isOnDiscount: true,
        discountPrice: 310,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-9",
        name: "Heartleaf Quercetinol Deep Cleanser",
        description: "Limpieza profunda con extracto de heartleaf para pieles sensibles y reactivas.",
        price: 450,
        isOnDiscount: true,
        discountPrice: 360,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cl-10",
        name: "BHA Blackhead Deep Cleansing Oil",
        description: "Aceite formulado para disolver puntos negros y filamentos sebáceos eficazmente.",
        price: 520,
        isOnDiscount: true,
        discountPrice: 415,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  // 2. TÓNICOS Y ESENCIAS
  {
    name: "Tónicos y Esencias Especiales",
    products: [
      {
        uuid: "tn-1",
        name: "Advanced Snail 96 Mucin Power Essence",
        description: "Esencia ligera con 96% de mucina de caracol para reparar e hidratar intensamente.",
        price: 650,
        isOnDiscount: true,
        discountPrice: 499,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-2",
        name: "AHA/BHA Clarifying Treatment Toner",
        description: "Tónico exfoliante diario que previene la aparición de puntos negros y blancos.",
        price: 480,
        isOnDiscount: true,
        discountPrice: 380,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-3",
        name: "Heartleaf 77% Soothing Toner",
        description: "El tónico más vendido en Corea, calma irritaciones reduce la inflamación al instante.",
        price: 590,
        isOnDiscount: true,
        discountPrice: 470,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-4",
        name: "Supple Preparation Unscented Toner",
        description: "Tónico hidratante sin aceites esenciales, perfecto para pieles extremadamente sensibles.",
        price: 550,
        isOnDiscount: true,
        discountPrice: 440,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-5",
        name: "Ginseng Essence Water",
        description: "Agua de esencia enriquecida con ginseng coreano para revitalizar pieles cansadas.",
        price: 520,
        isOnDiscount: true,
        discountPrice: 410,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-6",
        name: "Rice 70 Glow Milky Toner",
        description: "Tónico lechoso con extracto de arroz que aporta un brillo natural tipo 'glass skin'.",
        price: 610,
        isOnDiscount: true,
        discountPrice: 485,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-7",
        name: "Centella Asiatica Toner",
        description: "Tónico puro de centella que fortalece la barrera de la piel y acelera la cicatrización.",
        price: 490,
        isOnDiscount: true,
        discountPrice: 390,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-8",
        name: "Watermelon Glow PHA+BHA Toner",
        description: "Minimiza los poros y refresca la piel con extracto de sandía y ácidos suaves.",
        price: 750,
        isOnDiscount: true,
        discountPrice: 599,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-9",
        name: "Propolis Synergy Toner",
        description: "Nutrición intensa con extracto de propóleo para aportar luminosidad y elasticidad.",
        price: 540,
        isOnDiscount: true,
        discountPrice: 430,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "tn-10",
        name: "Green Tea Seed Hyaluronic Toner",
        description: "Hidratación profunda multicapa con semillas de té verde de la isla de Jeju.",
        price: 580,
        isOnDiscount: true,
        discountPrice: 460,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  // 3. SUEROS Y AMPOLLETAS
  {
    name: "Sueros y Ampolletas Top Descuentos",
    products: [
      {
        uuid: "sr-1",
        name: "Glow Serum: Propolis + Niacinamide",
        description: "Suero iluminador formulado para combatir poros dilatados y piel opaca.",
        price: 480,
        isOnDiscount: true,
        discountPrice: 380,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-2",
        name: "Revive Serum: Ginseng + Snail Mucin",
        description: "Combinación potente para regenerar, nutrir y atenuar líneas de expresión.",
        price: 490,
        isOnDiscount: true,
        discountPrice: 390,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-3",
        name: "Calming Serum: Green Tea + Panthenol",
        description: "El alivio definitivo para pieles enrojecidas, irritadas o sensibles por el sol.",
        price: 470,
        isOnDiscount: true,
        discountPrice: 375,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-4",
        name: "Madagascar Centella Ampoule",
        description: "Ampolleta 100% extracto de centella asiática para calmar y reparar la barrera cutánea.",
        price: 550,
        isOnDiscount: true,
        discountPrice: 440,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-5",
        name: "Niacinamide 10% + TXA 4% Dark Spot Serum",
        description: "Tratamiento intensivo para eliminar manchas de acné e hiperpigmentación.",
        price: 520,
        isOnDiscount: true,
        discountPrice: 415,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-6",
        name: "Hyaluronic Acid 3 Serum",
        description: "Complejo de ácido hialurónico de bajo y alto peso molecular para máxima hidratación.",
        price: 450,
        isOnDiscount: true,
        discountPrice: 360,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-7",
        name: "Retinol Intense Trail Serum",
        description: "Suero suave con retinol y retinal para iniciarse en el antienvejecimiento sin irritar.",
        price: 680,
        isOnDiscount: true,
        discountPrice: 540,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-8",
        name: "Vitamin C 23 Serum",
        description: "Alta concentración de vitamina C pura para desvanecer marcas oscuras y dar brillo.",
        price: 560,
        isOnDiscount: true,
        discountPrice: 445,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-9",
        name: "Peptide 500 Real Ampoule",
        description: "Cóctel de péptidos para mejorar la firmeza y elasticidad de la piel madura.",
        price: 620,
        isOnDiscount: true,
        discountPrice: 495,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sr-10",
        name: "Tea Tree Relief Serum",
        description: "Control de brotes de acné y purificación de poros con extracto puro de árbol de té.",
        price: 460,
        isOnDiscount: true,
        discountPrice: 365,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  // 4. CREMAS HIDRATANTES
  {
    name: "Hidratantes en Promoción",
    products: [
      {
        uuid: "cr-1",
        name: "Advanced Snail 92 All in One Cream",
        description: "Crema gel reparadora enriquecida con mucina de caracol que hidrata sin dejar sensación grasa.",
        price: 620,
        isOnDiscount: true,
        discountPrice: 495,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-2",
        name: "Oil-Free Ultra-Moisturizing Lotion",
        description: "Loción ligera con savia de abedul ideal para climas húmedos y pieles mixtas o grasas.",
        price: 550,
        isOnDiscount: true,
        discountPrice: 440,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-3",
        name: "Centella Soothing Cream",
        description: "Crema en gel refrescante que calma al instante las rojeces y refuerza la barrera de la piel.",
        price: 580,
        isOnDiscount: true,
        discountPrice: 460,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-4",
        name: "Dynasty Cream",
        description: "Textura lujosa con agua de salvado de arroz y ginseng para una hidratación duradera.",
        price: 650,
        isOnDiscount: true,
        discountPrice: 520,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-5",
        name: "Red Bean Water Gel",
        description: "Gel hidratante con extracto de frijol rojo que controla el sebo y aporta frescura.",
        price: 490,
        isOnDiscount: true,
        discountPrice: 390,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-6",
        name: "Ceramide Ato Concentrated Cream",
        description: "Crema rica en ceramidas para reparar pieles secas, escamadas o dañadas por activos fuertes.",
        price: 520,
        isOnDiscount: true,
        discountPrice: 415,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-7",
        name: "Heartleaf 70 Daily Relief Lotion",
        description: "Emulsión ligera que aporta la humedad justa sin obstruir los poros en pieles propensas al acné.",
        price: 510,
        isOnDiscount: true,
        discountPrice: 405,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-8",
        name: "Green Tea Seed Hyaluronic Cream",
        description: "Hidratante diaria que retiene la humedad hasta por 24 horas gracias a su fórmula con té verde.",
        price: 600,
        isOnDiscount: true,
        discountPrice: 480,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-9",
        name: "Propolis Light Cream",
        description: "Crema iluminadora con complejo de propóleo negro, miel y extracto de jalea real.",
        price: 590,
        isOnDiscount: true,
        discountPrice: 470,
        images: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "cr-10",
        name: "Watermelon Glow Pink Juice Moisturizer",
        description: "Emulsión en gel 100% libre de aceites que aporta un brillo fresco y jugoso al instante.",
        price: 780,
        isOnDiscount: true,
        discountPrice: 620,
        images: "https://images.unsplash.com/photo-1556228722-194a7536be26?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  // 5. PROTECTORES SOLARES
  {
    name: "Protectores Solares (Descuentos Especiales)",
    products: [
      {
        uuid: "sf-1",
        name: "Relief Sun: Rice + Probiotics SPF50+ PA++++",
        description: "Protector solar orgánico con textura de crema ligera que no deja rastro blanco ni sensación grasosa.",
        price: 520,
        isOnDiscount: true,
        discountPrice: 399,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-2",
        name: "Matte Sun Stick: Mugwort + Camelia SPF50+",
        description: "Barra solar mate ideal para reaplicar el protector durante el día incluso sobre el maquillaje.",
        price: 490,
        isOnDiscount: true,
        discountPrice: 380,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-3",
        name: "Hyaluronic Acid Watery Sun Gel SPF50+",
        description: "Gel solar hidratante que se siente como un suero, perfecto para climas cálidos y húmedos.",
        price: 550,
        isOnDiscount: true,
        discountPrice: 430,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-4",
        name: "Aloe Soothing Sun Cream SPF50+ PA+++",
        description: "Formulado con extracto de hoja de aloe arborescens para proteger y calmar la piel al mismo tiempo.",
        price: 420,
        isOnDiscount: true,
        discountPrice: 330,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-5",
        name: "Centella Hyalu-Cica Water-Fit Sun Serum",
        description: "Fórmula ultrahidratante con ácido hialurónico y centella que deja un acabado jugoso natural.",
        price: 560,
        isOnDiscount: true,
        discountPrice: 445,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-6",
        name: "Air-Fit Suncream Light SPF30 PA++",
        description: "Protector mineral 100% físico ultra ligero ideal para pieles reactivas que buscan acabado mate.",
        price: 480,
        isOnDiscount: true,
        discountPrice: 380,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-7",
        name: "Ginseng Moist Sun Serum SPF50+ PA++++",
        description: "Suero solar con un 30% de extracto de ginseng que protege contra rayos UV y el envejecimiento temprano.",
        price: 590,
        isOnDiscount: true,
        discountPrice: 470,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-8",
        name: "Birch Juice Moisturizing Sunscreen",
        description: "El protector más vendido, con savia de abedul y vitamina hialurónica para hidratación intensa.",
        price: 610,
        isOnDiscount: true,
        discountPrice: 485,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-9",
        name: "Cotton Soft Sun Stick SPF50+ PA++++",
        description: "Barra solar con extracto de algodón para un control de sebo y brillo excepcional en el día a día.",
        price: 510,
        isOnDiscount: true,
        discountPrice: 405,
        images: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      },
      {
        uuid: "sf-10",
        name: "Green Tea Hyaluronic Sunscreen SPF50+",
        description: "Protección invisible con extracto de té verde que refresca la piel inmediatamente al aplicar.",
        price: 540,
        isOnDiscount: true,
        discountPrice: 430,
        images: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export default function OffersView() {
  // Dividimos nuestro arreglo manual como lo pediste: 2 primero, 3 después.
  const firstCategories: OffersPerCategoryType = OFFERS_DATA.slice(0, 2);
  const remainingCategories: OffersPerCategoryType = OFFERS_DATA.slice(2, 5);

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      {/* HERO - SECCIÓN DE OFERTAS EN TONO CORAL/MELOCOTÓN SUTIL */}
      <section className="border-b border-neutral-100 bg-[#fdf8f6] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Contenedor de Texto */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.22em] text-rose-600">
                <TagIcon className="size-4 animate-pulse" />
                Precios Especiales
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                Tu rutina ideal, <br />
                a un precio inteligente.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                Descubre descuentos exclusivos en las fórmulas coreanas más efectivas. 
                Es el momento perfecto para renovar tus esenciales de skincare y proteger 
                tu piel del clima cálido sin comprometer tu presupuesto.
              </p>
            </div>

            {/* Contenedor de Imagen */}
            <div className="mt-12 lg:mt-0 relative">
              <div className="aspect-4/3 sm:aspect-video lg:aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Ofertas en K-Beauty"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMERAS 2 CATEGORÍAS */}
      <div className="pt-12 space-y-4">
        {firstCategories.map((category) => (
          <ProductCarousel
            key={category.name}
            title={category.name}
            products={category.products}
          />
        ))}
      </div>

      {/* SECCIÓN DE REPUTACIÓN Y OFERTAS */}
      <section className="my-14 bg-neutral-900 text-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto md:flex md:items-center md:h-100">
          {/* Contenido */}
          <div className="p-8 md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
              Inversión Inteligente
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              Calidad premium, precios que no duran para siempre.
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              Creemos que el acceso a dermocosmética de alta gama no debería ser un lujo inalcanzable. 
              Esta selección incluye productos con alta demanda regional que hemos logrado negociar a precios preferenciales. 
              Mismas fórmulas revolucionarias, texturas ligeras ideales para nuestra región, pero con un descuento que tu bolsillo agradecerá.
            </p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <ClockIcon className="size-5 text-rose-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Tiempo Limitado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-5 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Stock Reducido
                </span>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1000&q=80"
              alt="Productos de belleza en descuento"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay sutil para oscurecer la imagen y darle un tono más elegante */}
            <div className="absolute inset-0 bg-neutral-900/30 mix-blend-multiply" />
            
            {/* Badge de Oferta sobre la imagen */}
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
              Hasta 40% OFF
            </div>
          </div>
        </div>
      </section>

      {/* ÚLTIMAS 3 CATEGORÍAS */}
      <div className="pb-12 space-y-4">
        {remainingCategories.map((category) => (
          <ProductCarousel
            key={category.name}
            title={category.name}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
}