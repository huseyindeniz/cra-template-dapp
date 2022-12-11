import { RouteObject } from "react-router-dom";

export enum LangCode {
  TR_TR = "tr-TR",
  EN_US = "en-US",
}

export type SupportedLang = {
  code: string;
  label: string;
};

export type I18NConfig = {
  supportedLanguages: SupportedLang[];
  fallbackLang: SupportedLang;
  urlParam: string;
};

export type MenuType = {
  id: string;
  path: string;
  menuLabel: string;
  isShownInMainMenu: boolean;
  isShownInFooter: boolean;
  isProtected: boolean;
};
export type PageType = RouteObject & MenuType;

export type SocialLinkName =
  | "Twitter"
  | "Instagram"
  | "YouTube"
  | "Linkedin"
  | "GitHub"
  | "Discord"
  | "Telegram";
export type SocialLink = {
  name: SocialLinkName;
  link: string;
};
