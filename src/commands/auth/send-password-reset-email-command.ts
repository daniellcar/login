import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";
import { sendPasswordResetEmailServiceMock } from "../../services/mocks/auth-service-mock";

interface CommandData {
  email: string;
}

interface CommandListener {
  onSuccess: () => void;
  onEmailNotFound: () => void;
  onBlockedUser: () => void;
  onUnknownError: () => void;
}

const sendPasswordResetEmailCommand = async (
  data: CommandData,
  listener: CommandListener
) => {
  store.dispatch(authActions.loading_started());

  const response = await sendPasswordResetEmailServiceMock({
    email: data.email,
  });

  if (response.status === 200) {
    return listener.onSuccess();
  }

  switch (response.data?.errorCode) {
    case "auth/email_not_found":
      return listener.onEmailNotFound();
    case "auth/blocked_user":
      return listener.onBlockedUser();
    default:
      return listener.onUnknownError();
  }
};


export default sendPasswordResetEmailCommand;