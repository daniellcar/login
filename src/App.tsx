import "@fontsource/jetbrains-mono";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";
import { chakra, ChakraProvider, shouldForwardProp } from "@chakra-ui/react";

import { useAuthStore } from "./stores/auth";
import Auth from "./pages/Auth/Auth";
import customTheme from "./theme";
import { useApplicationStore } from "./stores/application";
import Dashboard from "./pages/Dashboard";

const TransitionContainer = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function App() {
  const authStore = useAuthStore((state) => state);
  const applicationStore = useApplicationStore((state) => state);

  return (
    <ChakraProvider theme={customTheme}>
      <AnimatePresence>
        {!applicationStore.isTransitioning && !authStore.isLogged && (
          <TransitionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              applicationStore.setIsTransitioning(false);
              authStore.setIsLoading(false);
            }}
          >
            <Auth />
          </TransitionContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!applicationStore.isTransitioning && authStore.isLogged && (
          <TransitionContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() =>
              applicationStore.setIsTransitioning(false)
            }
          >
            <Dashboard />
          </TransitionContainer>
        )}
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
