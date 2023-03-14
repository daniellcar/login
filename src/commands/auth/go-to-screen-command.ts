import store from "../../redux";
import { authActions } from "../../redux/reducers/auth";

interface CommandData {
  screen: string;
}

const navigateToScreenCommand = (data: CommandData) => {
  store.dispatch(authActions.screen_updated(data.screen));
};

export default navigateToScreenCommand;