import "@fontsource/jetbrains-mono";
import React from "react";
import { useToast } from "@chakra-ui/react";

import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AuthLayout from "./AuthLayout";
import ValidationCodeScreen from "./screens/ValidationCodeScreen";
import TransitionContainer from "../../components/TransitionContainer";
import { useAppDispatch, useAppSelector } from "../../redux";
import { authActions, authenticateUser } from "../../redux/slices/auth";
import {
  sendPasswordResetEmailServiceMock,
  confirmValidationCodeServiceMock,
} from "../../services/mocks/auth-service-mock";

type Screen = "login" | "forgotPassword" | "validationCode";

export interface SignInClickProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

function Auth() {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [screen, setScreen] = React.useState<Screen>("login");

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toast = useToast();

  const onSignInClick = async (signInClickProps: SignInClickProps) => {
    dispatch(authActions.loading_started());

    const response = await signIn

    dispatch(authActions.user_authenticated());
  };

  const onConfirmValidationCodeClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    dispatch(authActions.loading_started());

    const response = await confirmValidationCodeServiceMock({
      validationCode: authState.validationCode,
    });

    if (response.status === 200) {
      toast({
        title: "Your password has been reset.",
        description: "You can now sign in with your new password.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsTransitioning(true);
      setScreen("login");
    }
  };

  const onSendPasswordResetEmailClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    dispatch(authActions.loading_started());

    const response = await sendPasswordResetEmailServiceMock({
      email: authState.email,
    });

    if (response.status === 200) {
      setIsTransitioning(true);
      setScreen("validationCode");
    }
  };

  const onForgotPasswordClick = async () => {
    setIsTransitioning(true);
    setScreen("forgotPassword");
  };

  const onBackToLoginClick = () => {
    setIsTransitioning(true);
    setScreen("login");
  };

  const onBackToForgotPasswordClick = () => {
    setIsTransitioning(true);
    setScreen("forgotPassword");
  };

  return (
    <AuthLayout>
      <TransitionContainer
        condition={!isTransitioning && screen === "login"}
        onAnimationComplete={() => {
          setIsTransitioning(false);
          if (authState.isLoading) {
            dispatch(authActions.loading_finished());
          }
        }}
      >
        <LoginScreen
          onForgotPasswordClick={onForgotPasswordClick}
          onSignInClick={onSignInClick}
        />
      </TransitionContainer>
      <TransitionContainer
        condition={!isTransitioning && screen === "forgotPassword"}
        onAnimationComplete={() => {
          setIsTransitioning(false);
          if (authState.isLoading) {
            dispatch(authActions.loading_finished());
          }
        }}
      >
        <ForgotPasswordScreen
          onBackToLoginClick={onBackToLoginClick}
          onSendPasswordResetEmailClick={onSendPasswordResetEmailClick}
        />
      </TransitionContainer>
      <TransitionContainer
        condition={!isTransitioning && screen === "validationCode"}
        onAnimationComplete={() => {
          setIsTransitioning(false);
          if (authState.isLoading) {
            dispatch(authActions.loading_finished());
          }
        }}
      >
        <ValidationCodeScreen
          onConfirmValidationCodeClick={onConfirmValidationCodeClick}
          onBackToForgotPasswordClick={onBackToForgotPasswordClick}
        />
      </TransitionContainer>
    </AuthLayout>
  );
}

export default Auth;
