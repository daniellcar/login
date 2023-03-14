import "@fontsource/jetbrains-mono";
import { Text, Container } from "@chakra-ui/react";

import { Button } from "../components/Button";
import unauthenticateUserCommand from "../commands/auth/unauthenticate-user-command";

function Dashboard() {
  const onSignOutClick = () => {
    unauthenticateUserCommand();
    localStorage.removeItem("@dconsti:token")
  }

  return (
    <Container
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="250px"
      p="0"
    >
      <Text
        fontWeight="bold"
        fontFamily="JetBrains Mono"
        fontSize="32px"
        mb="32px"
      >
        dconsti._
      </Text>
      <Button content="sign out" onClick={onSignOutClick} />
    </Container>
  );
}

export default Dashboard;
