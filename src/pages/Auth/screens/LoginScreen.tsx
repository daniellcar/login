import "@fontsource/jetbrains-mono";
import React from "react";
import { Flex, Stack, Button as ChakraButton } from "@chakra-ui/react";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { AuthStore } from "../../../stores/auth";

interface LoginScreenProps {
  authStore: AuthStore;
  onForgotPasswordClick: () => void;
  onSignInClick: (event: React.FormEvent<HTMLDivElement>) => void;
}

function LoginScreen(props: LoginScreenProps) {
  return (
    <Stack
      as="form"
      onSubmit={(event) => props.onSignInClick(event)}
      spacing="32px"
    >
      <Stack spacing="16px">
        <Stack>
          <Input
            label="email"
            onChange={(event) => props.authStore.setEmail(event.target.value)}
            type="email"
            mb="24px"
          />
          <Input
            label="password"
            onChange={(event) =>
              props.authStore.setPassword(event.target.value)
            }
            type="password"
          />
        </Stack>
        <Flex justifyContent="space-between">
          <Checkbox
            content="remember me"
            isChecked={props.authStore.rememberMe}
            onChange={(event) =>
              props.authStore.setRememberMe(event.target.checked)
            }
          />
          <ChakraButton
            variant="link"
            size="sm"
            color="blue.500"
            fontWeight="bold"
            onClick={() => props.onForgotPasswordClick()}
          >
            forgot password?
          </ChakraButton>
        </Flex>
      </Stack>
      <Button isLoading={props.authStore.isLoading} content="sign in" />
    </Stack>
  );
}

export default LoginScreen;
