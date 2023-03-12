import "@fontsource/jetbrains-mono";
import React from "react";
import { Flex, Stack, Button as ChakraButton } from "@chakra-ui/react";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Checkbox } from "../../../components/Checkbox";
import { useAppSelector } from "../../../redux";
import { SignInClickProps } from "../Auth";

interface LoginScreenProps {
  onForgotPasswordClick: () => void;
  onSignInClick: (data: SignInClickProps) => void;
}

function LoginScreen(props: LoginScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const authState = useAppSelector((state) => state.auth);

  return (
    <Stack
      as="form"
      onSubmit={(event) => {
        event.preventDefault();

        props.onSignInClick({ email, password, rememberMe });
      }}
      spacing="32px"
    >
      <Stack spacing="16px">
        <Stack>
          <Input
            label="email"
            onChange={(event) =>
              setEmail(event.target.value)
            }
            type="email"
            mb="24px"
          />
          <Input
            label="password"
            onChange={(event) =>
              setPassword(event.target.value)
            }
            type="password"
          />
        </Stack>
        <Flex justifyContent="space-between">
          <Checkbox
            content="remember me"
            isChecked={authState.rememberMe}
            onChange={(event) =>
              setRememberMe(event.target.checked)
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
      <Button isLoading={authState.isLoading} content="sign in" />
    </Stack>
  );
}

export default LoginScreen;
