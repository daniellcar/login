import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";

const finishLoadingCommand = () => {
  store.dispatch(authActions.loading_finished());
};

export default finishLoadingCommand;