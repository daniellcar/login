import "@fontsource/jetbrains-mono";

import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AuthLayout from "./auth-layout";
import Animated from "../../components/Animated";
import { useAppSelector } from "../../redux";
import ValidationCodeScreen from "./screens/ValidationCodeScreen";

function AuthPage() {
  const authState = useAppSelector((state) => state.auth);

  return (
    <AuthLayout>
      {authState.screen === "login" && (
        <Animated key={authState.screen}>
          <LoginScreen />
        </Animated>
      )}
      {authState.screen === "forgotPassword" && (
        <Animated key={authState.screen}>
          <ForgotPasswordScreen />
        </Animated>
      )}
      {authState.screen === "validationCode" && (
        <Animated key={authState.screen}>
          <ValidationCodeScreen />
        </Animated>
      )}
    </AuthLayout>
  );
}

export default AuthPage;
