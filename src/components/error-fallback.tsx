import { Box, Button, Code, Divider, Text } from "@chakra-ui/react";
import * as React from "react";

type ComponentProps = {
  errorMessage: string;
  dispatch: Function;
};

export function ErrorFallback({
  errorMessage,
  dispatch,
}: ComponentProps): JSX.Element {
  return (
    <Box borderWidth={1} rounded="lg" paddingX={2} paddingY={3}>
      <Text>Something went wrong:</Text>
      <Code>{errorMessage}</Code>
      <Divider marginY={4} />
      <Button
        size="sm"
        colorScheme="red"
        onClick={() => dispatch({ type: "callGeneratePasswordApi" })}
      >
        Try Again
      </Button>
    </Box>
  );
}
