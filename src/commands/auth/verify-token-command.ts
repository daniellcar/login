import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";
import { signInServiceMock, verifyTokenServiceMock } from "../../services/mocks/auth-service-mock";

interface CommandData {
  token: string;
}

interface CommandListener {
  onSuccess: () => void;
  onInvalidToken: () => void;
  onUnknownError: () => void;
}

const verifyTokenCommand = async (
  data: CommandData,
  listener: CommandListener
) => {
  store.dispatch(authActions.loading_started());

  console.log(data.token)

  const response = await verifyTokenServiceMock({
    token: data.token,
  });

  if (response.status === 200) {
    store.dispatch(authActions.user_authenticated());
    return listener.onSuccess();
  }

  switch (response.data?.errorCode) {
    case "auth/invalid_token":
      store.dispatch(authActions.user_unauthenticated());
      return listener.onInvalidToken();
    default:
      return listener.onUnknownError();
  }
};

export default verifyTokenCommand;
