import { LangCode, MenuItem } from "./types";

const menuItems: MenuItem[] = [
  {
    name: "home",
    url: "/",
    label: {
      [LangCode.EN_US]: "Home",
      [LangCode.TR_TR]: "Anasayfa",
    },
    isShownInMainMenu: true,
    isShownInFooter: true,
    isProtected: false,
  },
  {
    name: "about",
    url: "/about",
    label: {
      [LangCode.EN_US]: "About",
      [LangCode.TR_TR]: "Hakkında",
    },
    isShownInMainMenu: true,
    isShownInFooter: true,
    isProtected: false,
  },
];

export const mainMenuItems = menuItems.filter((m) => m.isShownInMainMenu);

export const footerMenuItems = menuItems.filter((m) => m.isShownInFooter);
