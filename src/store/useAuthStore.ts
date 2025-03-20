import { create, StateCreator } from "zustand";
import { Auth } from "../entities";

interface AuthState {
  user: Auth.User | null;
  login: (user: Auth.User) => void;
  logout: () => void;
}

const initializer: StateCreator<AuthState, [], []> = (set) => {
  return {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    login: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      localStorage.removeItem("user");
      set({ user: null });
    },
  };
};

export const useAuthStore = create<AuthState>(initializer);
