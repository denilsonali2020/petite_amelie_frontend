import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/productService";
import LoadingAdminSite from "@/components/reusable/LoadingAdminSite";
import PreviewProductModalView from "./PreviewProductModalView";

export default function PreviewProductModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.has("productPreview");
  const productPreviewId = queryParams.get("productPreview")!;

  const { isError, isLoading, data } = useQuery({
    queryKey: ["getProductPreview", productPreviewId],
    queryFn: () => getProduct(productPreviewId),
    enabled: show,
    retry: false,
  });

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

  if (isLoading) return <LoadingAdminSite />;

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <Transition show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* CAMBIO: max-w-4xl para el doble de ancho */}
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">
                  <div className="mb-8 border-l-4 border-pink-600 pl-4 py-1">
                    <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                      Preview de Producto
                    </DialogTitle>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400/80 mt-1">
                      Información general
                    </p>
                  </div>
                  {/* Formulario aqui */}
                  <PreviewProductModalView data={data} />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}
