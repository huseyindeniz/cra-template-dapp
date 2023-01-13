import * as React from 'react';

import './features/i18n/i18n';
import { theme } from './features/ui/components/Layout/Theme/theme';
import { Router } from './pages/Router';
import store from './store/store';

const Provider = React.lazy(() =>
  import(/* webpackChunkName: "Redux" */ 'react-redux').then(module => ({
    default: module.Provider,
  }))
);

const ChakraProvider = React.lazy(() =>
  import(/* webpackChunkName: "ChakraUI" */ '@chakra-ui/react').then(
    module => ({
      default: module.ChakraProvider,
    })
  )
);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </Provider>
  );
};
