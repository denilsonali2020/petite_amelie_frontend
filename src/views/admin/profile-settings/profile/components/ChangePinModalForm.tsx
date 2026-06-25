import { useState } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeQuickPin } from "../services/profileService";
import type { changeQuickPinForm } from "../types";

const inputClasses =
  "block w-full rounded-lg outline-none border-0 px-4 py-3 text-center text-xl tracking-[0.3em] font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 placeholder:tracking-normal focus:ring-2 focus:ring-inset focus:ring-pink-600 transition-all";

export default function ChangePinModalForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const [showPin, setShowPin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changeQuickPinForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: changeQuickPin,
    onSuccess: (data) => {
      toast.success(data || "Pin Actualizado!");
      closeModal();
    },
    onError: (error) => toast.error(error.message, { id: "changePinError" }),
  });

  const onSubmit = (data: changeQuickPinForm) => {
    if (!user?.uuid) return;
    mutate({ uuid: user.uuid, formData: { quickPin: data.quickPin } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Botón del ojito */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="text-gray-400 hover:text-pink-600 transition-colors flex items-center gap-1 text-sm font-medium"
        >
          {showPin ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              Ocultar
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Mostrar
            </>
          )}
        </button>
      </div>

      {/* Único Input para el PIN */}
      <div>
        <input
          type={showPin ? "text" : "password"}
          inputMode="numeric"
          maxLength={4}
          placeholder="Nuevo PIN"
          className={`${inputClasses} ${errors.quickPin ? "ring-red-500 focus:ring-red-500" : ""}`}
          {...register("quickPin", {
            required: "Ingresa el nuevo PIN",
            // Expresión regular que obliga a que sean EXACTAMENTE 4 números del 0 al 9
            pattern: {
              value: /^\d{4}$/,
              message: "Deben ser exactamente 4 números",
            },
          })}
        />
        {errors.quickPin && (
          <p className="mt-1 text-xs text-red-500 font-medium text-center">
            {errors.quickPin.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-pink-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-pink-700 disabled:opacity-50 transition-all active:scale-95"
      >
        {isPending ? "Guardando..." : "Guardar PIN"}
      </button>
    </form>
  );
}
