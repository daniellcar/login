import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  baseStyle: {
    field: {
      _dark: {
        borderColor: "gray.700",
        bg: "gray.900",
        borderRadius: "md",
      },
    },
  },
});

export const Input = defineStyleConfig({
  baseStyle,
});
