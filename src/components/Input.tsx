import * as Chakra from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SpaceProps,
} from "@chakra-ui/react";

interface InputProps {
  label: string;
  type: "email" | "password";
  error?: boolean;
  mt?: SpaceProps["mt"];
  mb?: SpaceProps["mb"];
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <FormControl isInvalid={props.error} mt={props.mt} mb={props.mb}>
      <FormLabel fontSize="sm" color="gray.400">
        {props.label}
      </FormLabel>
      <Chakra.Input required type={props.type} onChange={props.onChange} bg="gray.900" />
      <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
