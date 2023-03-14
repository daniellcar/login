import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";
import { confirmValidationCodeServiceMock } from "../../services/mocks/auth-service-mock";

interface CommandData {
  validationCode: string;
}

interface CommandListener {
  onSuccess: () => void;
  onInvalidValidationCode: () => void;
  onUnknownError: () => void;
}

const confirmValidationCodeCommand = async (
  data: CommandData,
  listener: CommandListener
) => {
  store.dispatch(authActions.loading_started());

  const response = await confirmValidationCodeServiceMock({
    validationCode: data.validationCode,
  });

  if (response.status === 200) {
    return listener.onSuccess();
  }

  switch (response.data?.errorCode) {
    case "auth/invalid_validation_code":
      return listener.onInvalidValidationCode();
    default:
      return listener.onUnknownError();
  }
};

export default confirmValidationCodeCommand;