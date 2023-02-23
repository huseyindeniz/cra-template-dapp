import { extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  components: {
    Steps,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  enableColorModeControl: true,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: { theme: theme },
}