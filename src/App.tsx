import React from "react";
import "@fontsource/jetbrains-mono";
import { ChakraProvider } from "@chakra-ui/react";
import { subscribeBefore } from "redux-subscribe-action";

import customTheme from "./theme";
import TransitionContainer from "./components/TransitionContainer";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/auth/Auth";

import { useAppDispatch, useAppSelector } from "./redux";
import { authActions } from "./redux/slices/auth";

function App() {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  subscribeBefore((action) => {
    if (action.type === authActions.user_authenticated.type) {
      setIsLogged(true);
      setIsTransitioning(true);
    }

    if (action.type === authActions.user_unauthenticated.type) {
      setIsLogged(false);
      setIsTransitioning(true);
    }
  });

  return (
    <ChakraProvider theme={customTheme}>
      <TransitionContainer
        condition={!authState.isTransitioning && !authState.isLogged}
        onAnimationComplete={() => {
          setIsTransitioning(false);
          if (authState.isLoading) {
            dispatch(authActions.loading_finished())
          }
        }}
      >
        <Auth />
      </TransitionContainer>
      <TransitionContainer
        condition={!authState.isTransitioning && authState.isLogged}
        onAnimationComplete={() => {
          setIsTransitioning(false);
          if (authState.isLoading) {
            dispatch(authActions.loading_finished())
          }
        }}
      >
        <Dashboard />
      </TransitionContainer>
    </ChakraProvider>
  );
}

export default App;
