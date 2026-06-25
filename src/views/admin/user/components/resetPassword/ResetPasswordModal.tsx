import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import VerifyOwnerPasswordForm from "./VerifyOwnerPasswordForm";
import ResetUserPasswordForm from "./ResetUserPasswordForm";

export default function ResetPasswordModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const show = queryParams.has("resetPassword");
  const userId = queryParams.get("user")!; // El ID del usuario al que le vamos a resetear la clave
  // ESTADO CLAVE: Controla si el Owner ya puso su contraseña correctamente
  const [isVerified, setIsVerified] = useState(false);

  // Limpiamos el estado cuando el modal se cierra, para que la próxima vez pida la clave de nuevo
  useEffect(() => {
    if (!show) {
      setTimeout(() => setIsVerified(false), 300); // Pequeño delay para la animación
    }
  }, [show]);

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

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
                  <div
                    className={`mb-8 border-l-4 pl-4 py-1 ${isVerified ? "border-rose-600" : "border-pink-600"}`}
                  >
                    <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                      {isVerified
                        ? "Resetear Contraseña"
                        : "Verificación de Seguridad"}
                    </DialogTitle>
                    <div className="mt-1">
                      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400/80">
                        {isVerified
                          ? "Asigna una clave temporal al empleado"
                          : "Confirma tu identidad para continuar"}
                      </p>
                    </div>
                  </div>

                  {/* RENDERIZADO CONDICIONAL BASADO EN EL ESTADO */}
                  {!isVerified ? (
                    <VerifyOwnerPasswordForm
                      onSuccess={() => setIsVerified(true)}
                      closeModal={closeModal}
                    />
                  ) : (
                    <ResetUserPasswordForm
                      userId={userId}
                      closeModal={closeModal}
                    />
                  )}
                </>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
