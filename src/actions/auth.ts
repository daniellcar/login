import {
  sendPasswordResetEmailServiceMock,
  signInServiceMock,
} from "../services/mocks/auth-service-mock";
import { ApplicationStore } from "../stores/application";
import { AuthStore } from "../stores/auth";

interface AuthActionOptions {
  authStore: AuthStore;
  applicationStore?: ApplicationStore;
}

const signIn = async (options: AuthActionOptions) => {
  options.authStore.setIsLoading(true);

  const data = await signInServiceMock({
    email: options.authStore.email,
    password: options.authStore.password,
  });

  options.applicationStore?.setIsTransitioning(true);
  options.authStore.setIsLogged(true);
};

const signOut = async (options: AuthActionOptions) => {
  options.applicationStore?.setIsTransitioning(true);
  options.authStore.setIsLogged(false);
};

const sendPasswordResetEmail = async (options: AuthActionOptions) => {
  options.authStore.setIsLoading(true);

  await sendPasswordResetEmailServiceMock({
    email: options.authStore.email,
  });
};

const confirmValidationCode = async (options: AuthActionOptions) => {
  options.authStore.setIsLoading(true);

  await sendPasswordResetEmailServiceMock({
    email: options.authStore.email,
  });
};

export { signIn, signOut, sendPasswordResetEmail, confirmValidationCode };
