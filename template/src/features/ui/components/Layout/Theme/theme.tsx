import { extendTheme } from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
  },
  components: {
    Steps,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});
