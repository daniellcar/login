import * as Chakra from "@chakra-ui/react";
import { SpaceProps } from "@chakra-ui/react";

interface ButtonProps {
  content: string;
  mt?: SpaceProps["mt"];
  mb?: SpaceProps["mb"];
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <Chakra.Button
      mt={props.mt}
      mb={props.mb}
      type="submit"
      onClick={props.onClick}
      bg="blue.500"
      _hover={{ bg: "blue.600" }}
      isLoading={props.isLoading}
      isDisabled={props.isDisabled}
      w="full"
    >
      {props.content}
    </Chakra.Button>
  );
};
