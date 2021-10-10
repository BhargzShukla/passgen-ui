import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import { PasswordGeneratorForm } from "./components/password-generator";

function App() {
  return (
    <Box rounded="lg" borderWidth={1} paddingX={4} paddingY={6} marginY={8}>
      <Heading marginBottom={6}>Password Generator</Heading>
      <Text>
        Built by{" "}
        <Link href="https://bhargavshukla.com" color="blue.500" isExternal>
          Bhargav Shukla.
        </Link>{" "}
        Built using React and .NET. Website hosted on{" "}
        <Link href="https://vercel.com">Vercel.</Link> Generation logic hosted
        on Azure Functions.
      </Text>
      <Divider marginY={6} />
      <PasswordGeneratorForm />
    </Box>
  );
}

export default App;
