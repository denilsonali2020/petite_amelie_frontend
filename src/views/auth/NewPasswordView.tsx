import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import type { UserConfirmationToken } from "@/types/auth";
import { useState } from "react";

export default function NewPasswordView() {
  const [token, setToken] = useState<UserConfirmationToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <div>
        Reestablecer Password
        <p className="text-xs font-medium text-black mt-2">
          Ingresa el token que recibiste {""}
          <span className=" text-blue-600 font-medium"> por e-mail</span>
        </p>

        {isValidToken ? (
          <NewPasswordForm token={token}/>
        ) : (
          <NewPasswordToken
            token={token}
            setToken={setToken}
            setIsValidToken={setIsValidToken}
          />
        )}
      </div>
    </>
  );
}
