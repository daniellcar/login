import * as Chakra from "@chakra-ui/react";
import { SpaceProps } from "@chakra-ui/react";

interface CheckboxProps {
  content: string;
  mt?: SpaceProps["mt"];
  mb?: SpaceProps["mb"];
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: CheckboxProps) => {


  return (
    <Chakra.Checkbox
      mt={props.mt}
      mb={props.mb}
      isChecked={props.isChecked}
      onChange={props.onChange}
      size="sm"
      color="gray.400"
    >
      {props.content}
    </Chakra.Checkbox>
  );
};
