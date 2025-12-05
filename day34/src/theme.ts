// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e3f2ff",
      100: "#b3daff",
      200: "#81c2ff",
      300: "#4faaff",
      400: "#1d92ff",
      500: "#0079e6", // メインカラー
      600: "#005db4",
      700: "#004182",
      800: "#002651",
      900: "#000b21",
    },
  },
});

export default theme;
