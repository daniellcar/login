import "@fontsource/jetbrains-mono";
import React from "react";
import { chakra, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import {
  Button as ChakraButton,
  Text,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";

import { useAppSelector } from "../../../redux";

import { Button } from "../../../components/Button";

import confirmValidationCodeCommand from "../../../commands/auth/confirm-validation-code-command";
import navigateToScreenCommand from "../../../commands/auth/go-to-screen-command";
import finishLoadingCommand from "../../../commands/auth/finish-loading-command";

function ValidationCodeScreen() {
  const [validationCode, setValidationCode] = React.useState<string>("");

  const authState = useAppSelector((state) => state.auth);
  const toast = useToast();

  const onConfirmValidationCodeClick = async (event: React.FormEvent) => {
    event.preventDefault();

    await confirmValidationCodeCommand(
      { validationCode },
      {
        onSuccess: () => {
          toast({
            title: "success",
            description: "sour password has been changed.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigateToScreenCommand({ screen: "login" });
        },
        onInvalidValidationCode: () => {
          toast({
            title: "invalid validation code",
            description: "the validation code you entered is invalid.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
        onUnknownError: () => {
          console.log("error");
        },
      }
    );
  };

  const onBackToForgotPasswordClick = () => {
    navigateToScreenCommand({ screen: "forgotPassword" });
  };

  return (
    <chakra.form onSubmit={onConfirmValidationCodeClick}>
      <ChakraButton
        variant="link"
        size="sm"
        color="blue.500"
        fontWeight="bold"
        mb="24px"
        onClick={onBackToForgotPasswordClick}
      >
        change email
      </ChakraButton>
      <Text mb="16px" fontSize="16px">
        please enter the code we sent to the email address you provided.
      </Text>
      <FormControl>
        <FormLabel fontSize="sm" color="gray.400">
          code
        </FormLabel>
        <HStack mb="32px" w="full" spacing="12px">
          <PinInput otp size="lg" onChange={setValidationCode}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </FormControl>
      <Button
        isDisabled={validationCode.length !== 4}
        isLoading={authState.isLoading}
        content="confirm"
      />
    </chakra.form>
  );
}

export default ValidationCodeScreen;
