import { validateToken } from "@/api/AuthApi";
import type { UserConfirmationToken } from "@/types/auth";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { type Dispatch } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type NewPasswordTokenProps = {
  token: UserConfirmationToken["token"];
  setToken: Dispatch<React.SetStateAction<string>>;
  setIsValidToken: Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const handleChange = (token: UserConfirmationToken["token"]) => {
    setToken(token);
  };

  const { mutateAsync } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data);
      }
      setIsValidToken(true);
    },
  });
  const handleComplete = async (token: UserConfirmationToken["token"]) => {
    await mutateAsync({ token });
  };

  return (
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
            to="/auth/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Solicitar nuevo código
          </Link>
        </div>
      </form>
    </div>
  );
}
