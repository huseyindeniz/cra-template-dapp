import React from "react";
import { useTranslation } from "react-i18next";
import { RouteObject } from "react-router-dom";
import { i18nConfig } from "../features/i18n";
import { useWalletAuthentication } from "../features/wallet";

import { MenuType, PageType } from "./types";

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./Home").then((module) => ({
    default: module.HomePage,
  }))
);

const AboutPage = React.lazy(() =>
  import(/* webpackChunkName: "AboutPage" */ "./About").then((module) => ({
    default: module.AboutPage,
  }))
);

const UserPage = React.lazy(() =>
  import(/* webpackChunkName: "UserPage" */ "./User").then((module) => ({
    default: module.UserPage,
  }))
);

export const usePages = () => {
  const { t, i18n } = useTranslation("Menu");
  const { isAuthenticated } = useWalletAuthentication();

  // if you do not have control/access on hosting(html server) config, use hashRouter
  // keep in mind that if you do not use hashRouter,
  // you should redirect all requests to index.html in your server config
  const isHashRouter = true;

  // ADD YOUR PAGES

  // Home Page
  const Home: PageType = {
    index: true,
    element: <HomePage />,
    menuLabel: t("Home", { ns: "Menu" }),
    isShownInMainMenu: true,
    isShownInFooter: true,
    isProtected: false,
  };

  // About Page
  const About: PageType = {
    path: "about",
    element: <AboutPage />,
    menuLabel: t("About", { ns: "Menu" }),
    isShownInMainMenu: true,
    isShownInFooter: true,
    isProtected: false,
  };

  // User Dashboard Page
  const User: RouteObject = {
    path: "user",
    element: <UserPage />,
  };

  // do not forget add your pages into this array
  const Pages: PageType[] = [About];

  // DO NOT CHANGE THE REST
  const homeMenuItem: MenuType = {
    ...Home,
    path:
      i18n.resolvedLanguage === i18nConfig.fallbackLang.code
        ? ""
        : `/${i18n.resolvedLanguage}/`,
  };

  const mainMenuItems: MenuType[] = [
    homeMenuItem,
    ...Pages.filter(
      (m) =>
        m.isShownInMainMenu &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    ).map((m) => {
      return {
        ...m,
        path:
          i18n.resolvedLanguage === i18nConfig.fallbackLang.code
            ? m.path
            : `/${i18n.resolvedLanguage}/${m.path}`,
      };
    }),
  ];

  const footerMenuItems: MenuType[] = [
    homeMenuItem,
    ...Pages.filter(
      (m) =>
        m.isShownInFooter &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    ).map((m) => {
      return {
        ...m,
        path:
          i18n.resolvedLanguage === i18nConfig.fallbackLang.code
            ? m.path
            : `/${i18n.resolvedLanguage}/${m.path}`,
      };
    }),
  ];

  const userPageLink: string =
    i18n.resolvedLanguage === i18nConfig.fallbackLang.code
      ? "user"
      : `/${i18n.resolvedLanguage}/user`;

  return React.useMemo(() => {
    return {
      Home,
      User,
      Pages,
      mainMenuItems,
      footerMenuItems,
      homeMenuItem,
      userPageLink,
      isHashRouter,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);
};
