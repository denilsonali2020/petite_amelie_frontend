import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the User type
type User = {
  uuid: string;
  name: string;
  role: "OWNER" | "ADMIN" | "CASHIER";
  email: string;
  mustChangePassword: boolean;
};

// Define the AuthState type
type AuthState = {
  token: string | null;
  user: User | null;
  isAuth: boolean;
  setAuth: (token: string, user: User) => void;
  setName: (name: string) => void;
  logout: () => void;
  mustChangePassword: () => void;
};

// Create the auth store using Zustand
export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token: null,
    user: null,
    isAuth: false,
    setAuth: (token, user) => set({ token, user, isAuth: true }),
    setName: (name) =>
      set((state) => ({
        user: state.user ? { ...state.user, name } : null,
      })),
    logout: () => set({ token: null, user: null, isAuth: false }),
    mustChangePassword: () =>
      set((state) => {
        if (state.user) {
          return {
            user: { ...state.user, mustChangePassword: false },
          };
        }
        return {};
      }),
  })),
);
