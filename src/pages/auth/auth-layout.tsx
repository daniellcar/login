import "@fontsource/jetbrains-mono";
import React from "react";
import {
  Stack,
  Container,
  chakra,
  shouldForwardProp,
  Box,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const TransitionText = chakra(motion.h1, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const TransitionContainer = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout(props: AuthLayoutProps) {
  return (
    <Container
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="24px"
    >
      <Stack w="full" spacing="16px" align="center">
        <Box w={{ base: "full", md: "350px" }} maxW="350px" p="0">
          <TransitionText
            fontWeight="bold"
            fontFamily="JetBrains Mono"
            fontSize="24px"
            layout
          >
            dconsti._
          </TransitionText>
        </Box>
        <TransitionContainer
          bg="gray.800"
          w={{ base: "full", md: "350px" }}
          maxW="350px"
          p="24px"
          borderRadius="md"
          layout
        >
          {props.children}
        </TransitionContainer>
      </Stack>
    </Container>
  );
}

export default AuthLayout;
