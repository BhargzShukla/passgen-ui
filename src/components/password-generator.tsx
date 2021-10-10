import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import * as React from "react";
import { allowedPasswordLength, apiUrl } from "../constants";
import { formReducer, init, initialState } from "../reducer";
import { ErrorFallback } from "./error-fallback";

export function PasswordGeneratorForm() {
  const [
    { length, uppercase, numbers, symbols, status, data, error, copied },
    dispatch,
  ] = React.useReducer(formReducer, initialState, init);

  const requestData = JSON.stringify({
    passwordLength: length,
    uppercase,
    numbers,
    symbols,
  });

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    dispatch({
      type: "callGeneratePasswordApi",
    });
  }

  function handleReset(evt: React.FormEvent) {
    evt.preventDefault();
    dispatch({ type: "resetAllState", payload: initialState });
  }

  function copyToClipboard() {
    if (typeof data?.password !== "string" || data?.password.length <= 0) {
      return;
    }
    navigator.clipboard.writeText(data?.password).then(() => {
      dispatch({
        type: "copyToClipboardSuccess",
      });
    });
  }

  React.useEffect(() => {
    if (status !== "pending") {
      return;
    }
    (async () => {
      await window
        .fetch(apiUrl, {
          method: "POST",
          body: requestData,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((responseData) => {
          dispatch({
            type: "generatePasswordApiResolve",
            payload: responseData,
          });
        })
        .catch((error) => {
          dispatch({
            type: "generatePasswordApiReject",
            payload: new Error(error),
          });
        });
    })();
  }, [requestData, status]);

  /**
   * Flip from the checkbox icon back to the copy icon
   * on the generated password field.
   */
  React.useEffect(() => {
    if (!copied) {
      return;
    }
    setTimeout(() => {
      dispatch({ type: "resetCopyToClipboardFlag" });
    }, 3000);
  }, [copied]);

  return (
    <form>
      <FormControl isRequired>
        <FormLabel>Length</FormLabel>
        <Flex>
          <NumberInput
            value={length}
            onChange={(value) =>
              dispatch({ type: "setLength", payload: Number(value) })
            }
            min={allowedPasswordLength.min}
            max={allowedPasswordLength.max}
            maxWidth={100}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Spacer maxWidth={4} />
          <Slider
            aria-label="Length of generated password"
            value={length}
            flex={1}
            min={allowedPasswordLength.min}
            max={allowedPasswordLength.max}
            size="lg"
            onChange={(value) =>
              dispatch({ type: "setLength", payload: Number(value) })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
        <FormHelperText>
          Pick the desired length for your new password. Must be between 8 & 64.
        </FormHelperText>
      </FormControl>
      <SimpleGrid columns={2} gap={4} marginY={8}>
        <FormControl isRequired>
          <FormLabel htmlFor="uppercase-flag">
            Include uppercase letters?
          </FormLabel>
          <Switch
            id="uppercase-flag"
            isChecked={uppercase}
            onChange={() => dispatch({ type: "toggleUppercaseFlag" })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="numbers-flag">Include numbers?</FormLabel>
          <Switch
            id="numbers-flag"
            isChecked={numbers}
            onChange={() => dispatch({ type: "toggleNumbersFlag" })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="symbols-flag">Include symbols?</FormLabel>
          <Switch
            id="symbols-flag"
            isChecked={symbols}
            onChange={() => dispatch({ type: "toggleSymbolsFlag" })}
          />
        </FormControl>
      </SimpleGrid>
      {status === "rejected" && error ? (
        <ErrorFallback errorMessage={error?.message} dispatch={dispatch} />
      ) : null}
      <FormControl>
        <FormLabel>Generated Password</FormLabel>
        <InputGroup>
          <Input
            readOnly
            defaultValue={data?.password}
            variant="filled"
            padding={1}
          />
          <InputRightAddon padding={1}>
            <IconButton
              aria-label="Copy password"
              icon={copied ? <CheckIcon color="green.500" /> : <CopyIcon />}
              width={8}
              height={8}
              onClick={copyToClipboard}
              disabled={data?.password?.length === 0}
            />
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <HStack marginTop={8}>
        <Button
          type="submit"
          variant="solid"
          colorScheme="purple"
          color="whiteAlpha.900"
          onClick={handleSubmit}
        >
          Generate
        </Button>
        <Button
          variant="ghost"
          colorScheme="red"
          color="blackAlpha.900"
          onClick={handleReset}
        >
          Reset
        </Button>
      </HStack>
    </form>
  );
}
