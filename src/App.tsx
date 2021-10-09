import { Box, Divider, Heading } from "@chakra-ui/react";
import * as React from "react";
import { PasswordGeneratorForm } from "./components/password-generator";

function App() {
  return (
    <Box rounded="lg" borderWidth={1} paddingX={4} paddingY={6} marginY={8}>
      <Heading marginBottom={6}>Password Generator</Heading>
      <Divider marginY={6} />
      <PasswordGeneratorForm />
    </Box>
  );
}

export default App;
