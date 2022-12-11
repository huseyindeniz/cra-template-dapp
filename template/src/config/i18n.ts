import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { I18NConfig, LangCode, SupportedLang } from "./types";
import { resources } from "./i18nResources";

const langENUS: SupportedLang = {
  code: LangCode.EN_US,
  label: "English (US)",
};

const langTRTR: SupportedLang = {
  code: LangCode.TR_TR,
  label: "Türkçe",
};

export const i18nConfig: I18NConfig = {
  supportedLanguages: [langENUS, langTRTR],
  fallbackLang: langENUS,
  urlParam: "lang",
};

const detectionOptions = {
  lookupFromPathIndex: 0,
  order: ["path", "navigator"],
  lookupQuerystring: i18nConfig.urlParam,
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  whitelist: i18nConfig.supportedLanguages.map((l) => l.code),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //debug: process.env.NODE_ENV === "development",
    debug: false,
    resources: resources,
    fallbackLng: i18nConfig.fallbackLang.code,
    detection: detectionOptions,
    keySeparator: false,
    supportedLngs: i18nConfig.supportedLanguages.map((l) => l.code.slice(0, 2)),
    nonExplicitSupportedLngs: true,
    returnEmptyString: false,
  });

export default i18n;
