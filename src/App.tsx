import { Box, ChakraProvider, Flex, Stack, Text, useToast, Button as ChakraButton } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { Input } from "./components/Input";

import customTheme from "./theme";

function App() {
  const toast = useToast();

  return (
    <ChakraProvider theme={customTheme}>
      <Box 
        h="100vh" 
        display="flex" 
        alignItems="center"
        justifyContent="center" 
      >
        <Stack spacing="16px" align={""}>
          <Text 
            fontWeight="bold"
            fontFamily="JetBrains Mono" 
            fontSize="24px"
          >
            dconsti._
          </Text>
          <Box 
            bg="gray.800" 
            w="350px"
            p="24px" 
            borderRadius="md"
          >
            <Stack spacing="32px">
              <Stack spacing="16px">
                <Stack>
                  <Input 
                    label="email"
                    onChange={() => {}}
                    type="email"
                    mb="24px"
                  />
                  <Input 
                    label="password"
                    onChange={() => {}}
                    type="password"
                  />
                </Stack>
                <Flex justifyContent="space-between">
                  <Checkbox
                    content="remember me"
                    isChecked={true}
                    onChange={() => {}}
                  />
                  <ChakraButton 
                    variant="link"
                    size="sm"
                    color="blue.500"
                    fontWeight="bold"
                  >
                    forgot password?
                  </ChakraButton>
                </Flex>
              </Stack>
              <Button 
                content="sign in" 
                onClick={() => {
                  toast({
                    title: "Hello world!",
                    description: "This is a toast",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right"
                  })
                }} 
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
