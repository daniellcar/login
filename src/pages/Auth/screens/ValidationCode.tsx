import "@fontsource/jetbrains-mono";
import React from "react";
import { Flex, Stack, Button as ChakraButton, Text, PinInput, PinInputField, HStack } from "@chakra-ui/react";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { AuthStore } from "../../../stores/auth";
import { chakra, shouldForwardProp } from "@chakra-ui/react";

interface ValidationCodeScreenProps {
  authStore: AuthStore;
  onConfirmValidationCodeClick: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onBackToForgotPasswordClick: () => void;
}

function ValidationCodeScreen(props: ValidationCodeScreenProps) {
  return (
    <chakra.form
      onSubmit={(event) => props.onConfirmValidationCodeClick(event)}
    >
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
        <PinInput otp size="lg" onChange={props.authStore.setValidationCode}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button 
        isDisabled={props.authStore.validationCode.length !== 4}
        isLoading={props.authStore.isLoading} 
        content="confirm" 
      />
    </chakra.form>
  );
}

export default ValidationCodeScreen;
