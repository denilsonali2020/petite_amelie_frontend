import { createAccount } from "@/api/AuthApi";
import ErrorMessage from "@/components/ui/ErrorMessage";
// import Heading from "@/components/ui/Heading";
import type { UserRegistrationForm } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message, {
        id: "error",
      });
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data);
      }
      reset();
    },
  });

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <>
      <div>
        Crea una cuenta
      </div>

      <div className="mt-0">
        <form
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          method="POST"
          className="space-y-6"
        >
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                placeholder="Ingresa tu nombre de usuario"
                autoComplete="off"
                type="email"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("username", {
                  required: "El usuario es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Nombre de usuario muy corto",
                  },
                })}
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                placeholder="Ingresa tu email"
                autoComplete="off"
                type="email"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("email", {
                  required: "El email obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                placeholder="Ingresa tu password"
                type="password"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: { value: 10, message: "Password muy corto" },
                })}
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="password_confirmation"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirma tu password
            </label>
            <div className="mt-2">
              <input
                id="password_confirmation"
                placeholder="Confirma tu password"
                type="password"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("password_confirmation", {
                  required: "El password de confirmacón es obligatorio",
                  validate: (value) =>
                    value === password || "Los Passwords no son iguales",
                })}
              />
              {errors.password_confirmation && (
                <ErrorMessage>
                  {errors.password_confirmation.message}
                </ErrorMessage>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-5">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ¿Ya tienes una cuenta?
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
            Crear Cuenta
          </button>
        </form>
      </div>
    </>
  );
}
