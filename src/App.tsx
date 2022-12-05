import * as React from "react";

import { Routes } from "./config/Routes";
import { theme } from "./config/Theme";
import store from "./store";

const ChakraProvider = React.lazy(() =>
  import("@chakra-ui/react").then((module) => ({
    default: module.ChakraProvider,
  }))
);

const Provider = React.lazy(() =>
  import("react-redux").then((module) => ({
    default: module.Provider,
  }))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
