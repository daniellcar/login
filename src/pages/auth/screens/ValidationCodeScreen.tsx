import "@fontsource/jetbrains-mono";
import React from "react";
import {
  Button as ChakraButton,
  Text,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";

import { Button } from "../../../components/Button";
import { chakra } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { authActions } from "../../../redux/slices/auth";

interface ValidationCodeScreenProps {
  onConfirmValidationCodeClick: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onBackToForgotPasswordClick: () => void;
}

function ValidationCodeScreen(props: ValidationCodeScreenProps) {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <chakra.form onSubmit={props.onConfirmValidationCodeClick}>
      <ChakraButton
        variant="link"
        size="sm"
        color="blue.500"
        fontWeight="bold"
        mb="24px"
        onClick={props.onBackToForgotPasswordClick}
      >
        change email
      </ChakraButton>
      <Text mb="32px" fontSize="16px">
        please enter the code we sent to the email address you provided.
      </Text>
      <HStack mb="32px" w="full" spacing="12px">
        <PinInput
          otp
          size="lg"
          onChange={(event) =>
            dispatch(authActions.validation_code_updated(event))
          }
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button
        isDisabled={authState.validationCode.length !== 4}
        isLoading={authState.isLoading}
        content="confirm"
      />
    </chakra.form>
  );
}

export default ValidationCodeScreen;
