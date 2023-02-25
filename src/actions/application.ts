import { AuthStore } from "../stores/auth";

const startTransition = async (authStore: AuthStore) => {
  authStore.setIsLoading(true);
};

const finishTransition = async (authStore: AuthStore) => {
  authStore.setIsLogged(false);
};

export { startTransition, finishTransition };
