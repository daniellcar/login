import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";
import { signInServiceMock } from "../../services/mocks/auth-service-mock";

interface CommandData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface CommandListener {
  onSuccess: (token: string) => void;
  onInvalidCredentials: () => void;
  onBlockedUser: () => void;
  onUnknownError: () => void;
}

const authenticateUserCommand = async (
  data: CommandData,
  listener: CommandListener
) => {
  store.dispatch(authActions.loading_started());

  const response = await signInServiceMock({
    email: data.email,
    password: data.password,
  });

  if (response.status === 200) {
    store.dispatch(authActions.user_authenticated());
    return listener?.onSuccess(response.data.token as string);
  }

  switch (response.data.errorCode) {
    case "auth/invalid_credentials":
      return listener.onInvalidCredentials();
    case "auth/blocked_user":
      return listener.onBlockedUser();
    default:
      return listener.onUnknownError();
  }
};

export default authenticateUserCommand;
