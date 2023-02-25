import "@fontsource/jetbrains-mono";
import React from "react";
import { chakra, shouldForwardProp, useToast } from "@chakra-ui/react";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";

import { useAuthStore } from "../../stores/auth";
import * as actions from "../../actions";
import { useApplicationStore } from "../../stores/application";
import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AuthLayout from "./AuthLayout";
import ValidationCodeScreen from "./screens/ValidationCode";

const TransitionContainer = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function Auth() {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [screen, setScreen] = React.useState<
    "login" | "forgotPassword" | "validationCode"
  >("login");

  const authStore = useAuthStore((state) => state);
  const applicationStore = useApplicationStore((state) => state);

  const toast = useToast();

  const onSignInClick = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    actions.auth.signIn({ authStore, applicationStore });
  };

  const onSendPasswordResetEmailClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await actions.auth.sendPasswordResetEmail({ authStore, applicationStore });
    setIsTransitioning(true);
    setScreen("validationCode");
  };

  const onConfirmValidationCodeClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await actions.auth.confirmValidationCode({ authStore, applicationStore });

    toast({
      title: "Your password has been reset.",
      description: "You can now sign in with your new password.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })

    setIsTransitioning(true);
    setScreen("login");
  }

  const onForgotPasswordClick = async () => {
    setIsTransitioning(true);
    setScreen("forgotPassword");
  };

  const onBackToLoginClick = async () => {
    setIsTransitioning(true);
    setScreen("login");
  };

  const onBackToForgotPasswordClick = async () => {
    setIsTransitioning(true);
    setScreen("forgotPassword");
  };

  return (
    <AuthLayout>
      <AnimatePresence>
        {!isTransitioning && screen === "login" && (
          <TransitionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setIsTransitioning(false);
              authStore.setIsLoading(false);
            }}
          >
            <LoginScreen
              authStore={authStore}
              onForgotPasswordClick={onForgotPasswordClick}
              onSignInClick={onSignInClick}
            />
          </TransitionContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isTransitioning && screen === "forgotPassword" && (
          <TransitionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setIsTransitioning(false);
              authStore.setIsLoading(false);
            }}
          >
            <ForgotPasswordScreen
              authStore={authStore}
              onBackToLoginClick={onBackToLoginClick}
              onSendPasswordResetEmailClick={onSendPasswordResetEmailClick}
            />
          </TransitionContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isTransitioning && screen === "validationCode" && (
          <TransitionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              setIsTransitioning(false);
              authStore.setIsLoading(false);
            }}
          >
            <ValidationCodeScreen 
              authStore={authStore}
              onConfirmValidationCodeClick={onConfirmValidationCodeClick}
              onBackToForgotPasswordClick={onBackToForgotPasswordClick}
            />
          </TransitionContainer>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

export default Auth;
