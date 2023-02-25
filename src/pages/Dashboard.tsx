import "@fontsource/jetbrains-mono";
import { Text, Container } from "@chakra-ui/react";

import { Button } from "../components/Button";
import { useAuthStore } from "../stores/auth";
import * as actions from "../actions";
import { useApplicationStore } from "../stores/application";

function Dashboard() {
  const authStore = useAuthStore((state) => state);
  const applicationStore = useApplicationStore((state) => state);

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
      <Button
        content="sign out"
        onClick={() => actions.auth.signOut({ authStore, applicationStore })}
      />
    </Container>
  );
}

export default Dashboard;
