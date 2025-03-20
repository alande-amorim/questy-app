import { create, StateCreator } from "zustand";

interface AuthState {
  user: { email: string; token: string } | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const initializer: StateCreator<AuthState, [], []> = (set) => {
  return {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    login: (email, token) => {
      const userData = { email, token };
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData });
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
};

export const useAuthStore = create<AuthState>(initializer);
