import { useAuthStore } from "@/store/auth/authStore";
import PersonalInfoForm from "../components/PersonalInfoForm";
import PasswordChangeForm from "../components/PasswordChangeForm";
import VerifyPasswordForm from "../components/VerifyPasswordForm";
import ChangePinModal from "../components/ChangePinModal";

export default function ProfileView() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-6 w-6 border-2 border-slate-200 border-t-rose-600 animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto w-full px-4 sm:px-0 py-10 relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Mi Perfil
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Gestiona tu información personal y la seguridad de tu cuenta.
        </p>
      </div>

      <div className="space-y-8">
        <PersonalInfoForm />
        <PasswordChangeForm />
        <VerifyPasswordForm />
      </div>

      {/* VENTANA MODAL */}
      <ChangePinModal />
    </main>
  );
}
