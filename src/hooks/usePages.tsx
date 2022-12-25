import React from "react";
import { useTranslation } from "react-i18next";

import { MenuType, PageType } from "../config/types";

const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "../pages/Home").then((module) => ({
    default: module.HomePage,
  }))
);
const AboutPage = React.lazy(() =>
  import(/* webpackChunkName: "AboutPage" */ "../pages/About").then(
    (module) => ({
      default: module.AboutPage,
    })
  )
);

const DocumentationPage = React.lazy(() =>
  import(
    /* webpackChunkName: "DocumentationPage" */ "../pages/Documentation"
  ).then((module) => ({
    default: module.DocumentationPage,
  }))
);

export const usePages = () => {
  const { t, i18n } = useTranslation("Menu");
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

  const Documentation: PageType = {
    id: "documentation",
    path: "documentation",
    element: <DocumentationPage />,
    menuLabel: t("Documentation", { ns: "Menu" }),
    isShownInMainMenu: true,
    isShownInFooter: true,
    isProtected: false,
  };

  const Pages: PageType[] = [Home, About, Documentation];

  const mainMenuItems: MenuType[] = Pages.filter((m) => m.isShownInMainMenu);

  const footerMenuItems: MenuType[] = Pages.filter((m) => m.isShownInFooter);

  return React.useMemo(() => {
    return { Pages, mainMenuItems, footerMenuItems };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);
};
