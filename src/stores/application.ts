import { create } from "zustand";

export interface ApplicationStore {
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  isTransitioning: false,
  setIsTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
}));
