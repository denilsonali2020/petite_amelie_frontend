import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuthStore } from "@/store/auth/authStore";
import MustChangePasswordModalForm from "./MustChangePasswordModalForm";

export default function MustChangePasswordModal() {
  // Renombramos la variable para que su propósito sea evidente
  const mustChangePassword = useAuthStore((state) => state.user?.mustChangePassword);

  // Si no requiere cambio de contraseña, no renderizamos nada
  if (!mustChangePassword) return null;

  return (
    <Transition show={mustChangePassword} as={Fragment}>
      {/* Pasamos una función vacía en onClose para que NO puedan cerrar el modal haciendo clic afuera */}
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        
        {/* Fondo con desenfoque suave (hace que no puedan interactuar con el panel de atrás) */}
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
                  <div className="mb-6 border-l-4 border-pink-600 pl-4 py-1">
                    <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                      Actualiza tu contraseña
                    </DialogTitle>
                    <div className="mt-1">
                      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400/80">
                        Paso obligatorio de seguridad
                      </p>
                    </div>
                  </div>
                  
                  {/* FORMULARIO */}
                  <MustChangePasswordModalForm />
                </>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}