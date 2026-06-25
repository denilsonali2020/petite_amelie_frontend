import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserConfirmationToken } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import toast from "react-hot-toast";

export default function ConfirmAccountView() {
  const navigate = useNavigate();
  const [token, setToken] = useState<UserConfirmationToken["token"]>("");

  const handleChange = (token: UserConfirmationToken["token"]) => {
    setToken(token);
  };

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data);
      }
      navigate("/auth/login");
    },
  });

  const handleComplete = (token: UserConfirmationToken["token"]) => {
    mutate({ token });
  };

  return (
    <>
      <div>
        Confirma tu cuenta
      </div>

              <p className="text-xs font-light text-black mt-2">
          Ingresa el token que recibiste {""}
          <span className=" text-blue-600 font-bold"> por e-mail</span>
        </p>

      <div className="mt-5">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <div className="flex justify-center gap-2 mt-2">
              <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
              >
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              </PinInput>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Link
              to="/auth/request-new-token"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Solicitar nuevo código
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
