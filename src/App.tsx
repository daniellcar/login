import { Box, ChakraProvider, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>Hello World</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
