import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateRootCategoryModalForm from "./CreateRootCategoryModalForm";

export default function CreateRootCategoryModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.has("newRootCategory");

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Fondo con desenfoque suave */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">
                <>
                  <div className="mb-8 border-l-4 border-pink-600 pl-4 py-1">
                    <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                      Categoría Principal
                    </DialogTitle>
                    <div className="mt-1">
                      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400/80">
                        Crea una nueva categoría principal.
                      </p>
                    </div>
                  </div>
                  {/* FORMULARIO */}
                  <CreateRootCategoryModalForm closeModal={closeModal} />
                </>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
