import * as Chakra from "@chakra-ui/react";
import { SpaceProps } from "@chakra-ui/react";

interface ButtonProps {
  content: string;
  mt?: SpaceProps["mt"];
  mb?: SpaceProps["mb"];
  onClick?: () => void;
  onSubmit?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <Chakra.Button
      mt={props.mt}
      mb={props.mb}
      onClick={props.onClick}
      onSubmit={props.onSubmit}

      bg="blue.500"
      _hover={{ bg: "blue.600" }}
      w="full"
    >
      {props.content}
    </Chakra.Button>
  );
};
