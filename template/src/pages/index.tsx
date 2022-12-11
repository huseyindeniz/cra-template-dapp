import { t } from "i18next";
import React from "react";
import { MenuType, PageType } from "../config/types";

const HomePage = React.lazy(() =>
  import("./Home").then((module) => ({ default: module.HomePage }))
);
const AboutPage = React.lazy(() =>
  import("./About").then((module) => ({ default: module.AboutPage }))
);

const Home: PageType = {
  id: "home", // do not change this
  index: true,
  path: "",
  element: <HomePage />,
  menuLabel: t("Home", { ns: "Menu" }),
  isShownInMainMenu: true,
  isShownInFooter: true,
  isProtected: false,
};

const About: PageType = {
  id: "about",
  path: "about",
  element: <AboutPage />,
  menuLabel: t("About", { ns: "Menu" }),
  isShownInMainMenu: true,
  isShownInFooter: true,
  isProtected: false,
};

export const Pages: PageType[] = [Home, About];

export const mainMenuItems: MenuType[] = Pages.filter(
  (m) => m.isShownInMainMenu
);

export const footerMenuItems: MenuType[] = Pages.filter(
  (m) => m.isShownInFooter
);
