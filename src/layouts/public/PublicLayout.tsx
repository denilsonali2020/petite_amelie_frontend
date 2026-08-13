import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { navigation } from "@/views/public/home/services/homeService";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Links del footer
const footerSections: FooterSection[] = [
  {
    title: "INFORMACIÓN",
    links: [
      { name: "Sobre Nosotros", href: "#" },
      { name: "Contacto", href: "#" },
      { name: "Blog K-Beauty", href: "#" },
      { name: "Guías de Rutina", href: "#" },
      { name: "Carreras", href: "#" },
    ],
  },
  {
    title: "COMPRA",
    links: [
      { name: "Nuevos Productos", href: "#" },
      { name: "Ofertas", href: "#" },
      { name: "Envíos y Devoluciones", href: "#" },
      { name: "Métodos de Pago", href: "#" },
      { name: "Tarjetas de Regalo", href: "#" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { name: "Términos de Servicio", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Política de Cookies", href: "#" },
      { name: "Cambios y Devoluciones", href: "#" },
    ],
  },
];

export default function PublicLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<number | null>(null);

  // NAVIGATION
  const { data, isLoading, isError } = useQuery({
    queryKey: ["navigation"],
    queryFn: () => navigation(),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <div className="bg-white min-h-screen flex flex-col antialiased text-black font-sans">
        {/* Top Banner (Envío gratis - Fondo negro) */}
        <div className="bg-black flex h-10 items-center justify-center px-4 sm:px-6 lg:px-8 cursor-pointer group">
          <p className="text-xs font-bold tracking-widest text-white uppercase group-hover:text-gray-300 transition-colors text-center">
            PRODUCTO IMPORTADO DE COREA, NOSOTROS NO JUGAMOS CON TU PIEL
          </p>
        </div>

        {/* Header Principal Estilo Amazon */}
        <header className="relative bg-white border-b border-gray-200 z-40">
          {/* FILA 1: Logo, Buscador Central (Desktop/Tablet) y Acciones (Usuario + Carrito) */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 md:gap-4">
            {/* Menú Hamburguesa (Móvil - Se oculta en Tablet/PC) */}
            <div className="flex md:hidden shrink-0">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="p-1.5 text-black border border-transparent hover:border-black rounded-xs transition-all"
              >
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* LOGO */}
            <div className="shrink-0 flex items-center">
              <Link
                to="/"
                className="border border-transparent hover:border-black px-1.5 md:px-2 py-1 rounded-xs transition-all flex items-center"
              >
                <span className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase">
                  P_Amelie
                </span>
              </Link>
            </div>

            {/* BUSCADOR CENTRAL (Se muestra desde Tablet/PC) */}
            <div className="hidden md:flex relative flex-1 max-w-2xl mx-4 lg:mx-8">
              <input
                type="text"
                placeholder="Buscar en P_Amelie"
                className="w-full bg-gray-100 text-[13px] font-medium text-black placeholder-gray-500 py-2.5 pl-4 pr-10 border border-transparent hover:border-gray-300 focus:border-black focus:bg-white focus:outline-none transition-colors rounded-xs"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 size-5 text-black" />
            </div>

            {/* ACCIONES DERECHA: Usuario ("Identifícate") y Carrito */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <Link
                to="/login"
                className="p-1.5 md:p-2 text-black border border-transparent hover:border-black rounded-xs transition-all flex items-center gap-1.5"
              >
                <UserIcon className="size-6 shrink-0" />
                <span className="text-xs font-bold text-black leading-tight">
                  Identifícate
                </span>
              </Link>

              <Link
                to="/carrito"
                className="p-1.5 md:p-2 text-black border border-transparent hover:border-black rounded-xs transition-all relative flex items-center"
              >
                <ShoppingBagIcon className="size-6" />
                <span className="absolute top-1 right-1 bg-red-600 text-[9px] font-bold text-white rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* BUSCADOR PARA MÓVIL (Visible solo en dispositivos móviles, se oculta en Tablet) */}
          <div className="md:hidden px-4 pb-2.5 pt-0.5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar en P_Amelie"
                className="w-full bg-gray-100 text-[13px] font-medium text-black placeholder-gray-500 py-2 pl-4 pr-10 border border-transparent hover:border-gray-300 focus:border-black focus:bg-white focus:outline-none transition-colors rounded-xs"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 size-5 text-black" />
            </div>
          </div>

          {/* FILA 2: Barra de enlaces inferior (Se muestra desde Tablet/PC) */}
          <div className="border-t border-gray-100 hidden md:block bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1 flex items-center gap-3 text-xs font-semibold text-gray-800">
              {/* BOTÓN TODO */}
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 text-sm font-bold uppercase text-black border border-transparent hover:border-black px-2.5 py-1.5 rounded-xs transition-all"
              >
                <Bars3Icon className="size-5" />
                Todo
              </button>

              {/* Enlaces de categorías */}
              <Link
                to="/novedades"
                className="border border-transparent hover:border-black px-2.5 py-1.5 rounded-xs transition-all hover:text-black"
              >
                Novedades
              </Link>
              <Link
                to="/mas-vendidos"
                className="border border-transparent hover:border-black px-2.5 py-1.5 rounded-xs transition-all hover:text-black"
              >
                Más Vendidos
              </Link>
              <Link
                to="/ofertas"
                className="border border-transparent hover:border-black px-2.5 py-1.5 rounded-xs transition-all hover:text-black"
              >
                Ofertas
              </Link>
              <Link
                to="#"
                className="border border-transparent hover:border-black px-2.5 py-1.5 rounded-xs transition-all hover:text-black"
              >
                Marcas
              </Link>
            </div>
          </div>
        </header>

        {/* MENÚ MÓVIL Y ACORDEÓN DE CATEGORÍAS */}
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-50 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-sm transform flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
                <span className="text-xl font-black tracking-tighter uppercase text-black">
                  P_Amelie
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="bg-slate-900 text-white px-6 py-5">
                <h2 className="text-lg font-bold">Hola, Identifícate</h2>
              </div>

              {/* Sección de Accesos Rápidos (Se oculta en Tablet/PC) */}
              <div className="bg-gray-50 border-b border-gray-200 py-3 px-6 md:hidden">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Destacados
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/novedades"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Novedades
                  </Link>
                  <Link
                    to="/mas-vendidos"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Más Vendidos
                  </Link>
                  <Link
                    to="/ofertas"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Ofertas
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Marcas
                  </Link>
                </div>
              </div>

              {/* Categorías Dinámicas */}
              <div className="flex-1 overflow-y-auto">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 pt-4 mb-1 md:hidden">
                  Categorías
                </p>
                {data.map((section, index) => (
                  <div key={section.name} className="border-b border-gray-100">
                    <button
                      onClick={() =>
                        setOpenSection(openSection === index ? null : index)
                      }
                      className={`w-full flex items-center justify-between px-6 py-4 font-semibold text-left transition-colors duration-200 ${
                        openSection === index
                          ? "bg-neutral-800 text-white font-bold"
                          : "text-black hover:bg-gray-200 hover:text-neutral-700"
                      }`}
                    >
                      {section.name}
                      <span
                        className={`text-xl font-light transition-transform duration-300 ${openSection === index ? "rotate-180" : "rotate-0"}`}
                      >
                        {openSection === index ? "−" : "+"}
                      </span>
                    </button>

                    {/* Contenedor Animado del Acordeón */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openSection === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden bg-white">
                        <div className="pb-4 pt-1">
                          {section.children.map((item) => (
                            <Link
                              key={item.uuid}
                              to="#"
                              onClick={() => setOpen(false)}
                              className="block px-10 py-2.5 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* VISTAS DINÁMICAS */}
        <main className="flex-1 w-full bg-white">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className="bg-black text-white mt-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">
                  P_Amelie
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Tu tienda de K-beauty auténtica en Centroamérica. Productos
                  certificados, envío rápido y atención especializada.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-white font-bold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-white font-bold">𝕏</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-white font-bold">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                  >
                    <span className="text-white font-bold">▶️</span>
                  </a>
                </div>
              </div>

              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-6 border-b border-gray-700 pb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 text-sm hover:text-white hover:underline transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="size-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Correo
                    </p>
                    <a
                      href="mailto:hola@petiamerie.com"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      hola@petiamerie.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="size-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Teléfono
                    </p>
                    <a
                      href="tel:+50412345678"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      +504 1234-5678
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="size-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Ubicación
                    </p>
                    <p className="text-gray-400 text-sm">
                      Santa Rosa de Copán, Honduras
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">
                &copy; {new Date().getFullYear()} PETITE AMELIE K-BEAUTY. Todos
                los derechos reservados.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  💳
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  🏦
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  📱
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
}