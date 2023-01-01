import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    keySeparator: false,
    nonExplicitSupportedLngs: true,
    returnEmptyString: false,
    resources: { en: {} },
  });

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </ChakraProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };

export { i18n };
