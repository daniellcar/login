import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      fontFamily: "body",
      bg: mode("white", "gray.900")(props),
    },
  }),
};

export default styles;