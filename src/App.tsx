import "@fontsource/jetbrains-mono";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "./theme";
import Animated from "./components/Animated";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/auth/auth-page";

import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "./redux";
import React from "react";
import verifyTokenCommand from "./commands/auth/verify-token-command";

function App() {
  const authState = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("@dconsti:token");

  React.useEffect(() => {
    verifyTokenCommand({ token: token as string }, {
      onSuccess: () => {},
      onInvalidToken: () => {
        localStorage.removeItem("@dconsti:token");
      },
      onUnknownError: () => {
        localStorage.removeItem("@dconsti:token");
      },
    })
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <AnimatePresence mode="wait">
        {!authState.isLogged && (
          <Animated key="authPage">
            <Auth />
          </Animated>
        )}
        {authState.isLogged && (
          <Animated key="dashboardPage">
            <Dashboard />
          </Animated>
        )}
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
