import { create, StateCreator } from "zustand";
import { Auth } from "../entities";
import { questyQueryClient } from "../services/questy";

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
      questyQueryClient.invalidateQueries();
      localStorage.removeItem("user");
      window.location.href = "/sign-in";
    },
  };
};

export const useAuthStore = create<AuthState>(initializer);
