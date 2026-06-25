import { updatePassword } from "@/api/AuthApi";
import type { UserConfirmationToken, UserNewPasswordForm } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";

type NewPasswordFormProps = {
  token: UserConfirmationToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: UserNewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutateAsync } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data);
      }
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = async (formData: UserNewPasswordForm) => {
    const data = {
      token,
      formData,
    };
    await mutateAsync(data);
  };

  const password = watch("password");

  return (
    <div className="mt-5">
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        noValidate
        method="POST"
        className="space-y-6"
      >
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
          <div className="mt-2 mb-5">
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

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
}
