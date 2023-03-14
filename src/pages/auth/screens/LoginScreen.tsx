import "@fontsource/jetbrains-mono";
import React from "react";
import {
  Flex,
  Stack,
  Button as ChakraButton,
  useToast,
} from "@chakra-ui/react";

import { useAppSelector } from "../../../redux";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";

import authenticateUserCommand from "../../../commands/auth/authenticate-user-command";
import navigateToScreenCommand from "../../../commands/auth/go-to-screen-command";
import finishLoadingCommand from "../../../commands/auth/finish-loading-command";

function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const authState = useAppSelector((state) => state.auth);
  const toast = useToast();

  const onSignInClick = async (event: React.FormEvent) => {
    event.preventDefault();

    await authenticateUserCommand(
      { email, password, rememberMe },
      {
        onSuccess: (token) => {
          localStorage.setItem("@dconsti:token", token);
        },
        onInvalidCredentials: () => {
          toast({
            title: "invalid credentials",
            description: "the email or password you entered is incorrect.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
        onBlockedUser: () => {
          toast({
            title: "Blocked user",
            description: "Your account has been blocked.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
        onUnknownError: () => {
          toast({
            title: "Unknown error",
            description: "An unknown error has occurred.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          finishLoadingCommand();
        },
      }
    );
  };

  const onForgotPasswordClick = () => {
    navigateToScreenCommand({ screen: "forgotPassword" });
  };

  return (
    <Stack as="form" onSubmit={onSignInClick} spacing="32px">
      <Stack spacing="16px">
        <Stack>
          <Input
            label="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            mb="24px"
          />
          <Input
            label="password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </Stack>
        <Flex justifyContent="space-between">
          <Checkbox
            content="remember me"
            isChecked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <ChakraButton
            variant="link"
            size="sm"
            color="blue.500"
            fontWeight="bold"
            onClick={onForgotPasswordClick}
          >
            forgot password?
          </ChakraButton>
        </Flex>
      </Stack>
      <Button isLoading={authState.isLoading} content="sign in" />
    </Stack>
  );
}

export default LoginScreen;
