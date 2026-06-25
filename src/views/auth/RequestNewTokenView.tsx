import { reqConfirmationToken } from "@/api/AuthApi";
import ErrorMessage from "@/components/ui/ErrorMessage";
import type { UserEmailForm } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RequestNewTokenView() {
  const initialValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: reqConfirmationToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data);
      }
      reset();
    },
  });

  const handleNewToken = (formData: UserEmailForm) => {
    mutate(formData);
  };

  return (
    <>
      <div>
        Ingresa tu email para solicitar un nuevo token
      </div>

      <div className="mt-5">
        <form
          onSubmit={handleSubmit(handleNewToken)}
          noValidate
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                autoComplete="off"
                placeholder="Ingresa tu email"
                type="email"
                required
                className="inset-shadow-sm inset-shadow-gray-500/50 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                {...register("email", {
                  required: "Email requerido",
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

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
          >
            Nuevo Token
          </button>
        </form>
      </div>
    </>
  );
}
