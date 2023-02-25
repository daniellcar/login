import "@fontsource/jetbrains-mono";
import React from "react";
import { Text, Button as ChakraButton, chakra } from "@chakra-ui/react";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { AuthStore } from "../../../stores/auth";

interface ForgotPasswordScreenProps {
  authStore: AuthStore;
  onBackToLoginClick: () => void;
  onSendPasswordResetEmailClick: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}

function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  return (
    <chakra.form
      onSubmit={(event) => props.onSendPasswordResetEmailClick(event)}
    >
      <ChakraButton
        variant="link"
        size="sm"
        color="blue.500"
        fontWeight="bold"
        mb="24px"
        onClick={props.onBackToLoginClick}
      >
        back to login
      </ChakraButton>
      <Text mb="16px" fontSize="16px">
        enter the email address assiciated with your account.
      </Text>
      <Input
        label="email"
        onChange={(event) => {
          props.authStore.setEmail(event.target.value);
        }}
        type="email"
        mb="24px"
      />
      <Button isLoading={props.authStore.isLoading} content="send" />
    </chakra.form>
  );
}

export default ForgotPasswordScreen;
