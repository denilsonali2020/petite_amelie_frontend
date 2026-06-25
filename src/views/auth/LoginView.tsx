import { login } from "@/api/AuthApi";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { UserLoginForm } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message, {
        id: "error",
      });
    },
    onSuccess: () => {
      //navegar al usaurio a tienda para comprar
      reset();
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };
  return (
    <>
      <div>
        Inicia sesión
      </div>

      <div className="mt-3">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                autoComplete="off"
                type="email"
                placeholder="ej. correo@correo.com"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("email", {
                  required: "El email es requerido",
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                placeholder="**********"
                type="password"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("password", {
                  required: "El password es requerido",
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to="/auth/register"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Crear cuenta
            </Link>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}
