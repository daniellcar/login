import { create } from "zustand";

export interface AuthStore {
  email: string;
  password: string;
  validationCode: string;
  rememberMe: boolean;
  isLoading: boolean;
  isLogged: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setValidationCode: (validationCode: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsLogged: (isLogged: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  email: "",
  password: "",
  validationCode: "",
  rememberMe: false,
  isLoading: false,
  isLogged: false,
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setValidationCode: (validationCode: string) => set({ validationCode }),
  setRememberMe: (rememberMe: boolean) => set({ rememberMe }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
}));
