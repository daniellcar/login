import "@fontsource/jetbrains-mono";
import React from "react";
import { Text, Button as ChakraButton, chakra } from "@chakra-ui/react";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { authActions } from "../../../redux/slices/auth";

interface ForgotPasswordScreenProps {
  onBackToLoginClick: () => void;
  onSendPasswordResetEmailClick: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}

function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
          dispatch(authActions.email_updated(event.target.value));
        }}
        type="email"
        mb="24px"
      />
      <Button isLoading={authState.isLoading} content="send" />
    </chakra.form>
  );
}

export default ForgotPasswordScreen;
