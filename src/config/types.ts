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

export type MenuItem = {
  name: string;
  url: string;
  label: {
    [LangCode.EN_US]: string;
    [LangCode.TR_TR]: string;
  };
  isShownInMainMenu: boolean;
  isShownInFooter: boolean;
  isProtected: boolean;
};

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

export type SignMessage = {
  [LangCode.EN_US]: string;
  [LangCode.TR_TR]: string;
};
