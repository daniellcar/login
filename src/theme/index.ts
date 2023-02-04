import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  styles
};

export default extendTheme(overrides);
