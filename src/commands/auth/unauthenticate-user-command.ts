import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";

const unauthenticateUserCommand = async () => {
  store.dispatch(authActions.user_unauthenticated());
};

export default unauthenticateUserCommand;
