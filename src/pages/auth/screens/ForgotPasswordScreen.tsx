import "@fontsource/jetbrains-mono";
import React from "react";
import {
  Text,
  Button as ChakraButton,
  chakra,
  useToast,
} from "@chakra-ui/react";

import { useAppSelector } from "../../../redux";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import navigateToScreenCommand from "../../../commands/auth/go-to-screen-command";
import sendPasswordResetEmailCommand from "../../../commands/auth/send-password-reset-email-command";
import finishLoadingCommand from "../../../commands/auth/finish-loading-command";

function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState<string>("");

  const authState = useAppSelector((state) => state.auth);
  const toast = useToast();

  const onSendPasswordResetEmailClick = async (event: React.FormEvent) => {
    event.preventDefault();

    await sendPasswordResetEmailCommand(
      { email },
      {
        onSuccess: () => {
          navigateToScreenCommand({ screen: "validationCode" });
        },
        onEmailNotFound: () => {
          toast({
            title: "email not found",
            description: "the email you entered does not exist.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
        onBlockedUser: () => {
          toast({
            title: "blocked user",
            description: "your account has been blocked.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
        onUnknownError: () => {
          toast({
            title: "unknown error",
            description: "an unknown error has occurred.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
      }
    );
  };

  const onBackToLoginClick = () => {
    navigateToScreenCommand({ screen: "login" });
  };

  return (
    <chakra.form onSubmit={onSendPasswordResetEmailClick}>
      <ChakraButton
        variant="link"
        size="sm"
        color="blue.500"
        fontWeight="bold"
        mb="24px"
        onClick={onBackToLoginClick}
      >
        back to login
      </ChakraButton>
      <Text mb="16px" fontSize="16px">
        enter the email address assiciated with your account.
      </Text>
      <Input
        label="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        mb="24px"
      />
      <Button isLoading={authState.isLoading} content="send" />
    </chakra.form>
  );
}

export default ForgotPasswordScreen;
