import { Box, ChakraProvider, Text } from "@chakra-ui/react";

import customTheme from "./theme";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>Hello World</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
