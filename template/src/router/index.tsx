import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import { i18nConfig } from "../config/i18n";
import { usePages } from "../hooks/usePages";

const Layout = React.lazy(() => import("../components/Layout"));

const UserPage = React.lazy(() =>
  import(/* webpackChunkName: "UserPage" */ "../pages/User").then((module) => ({
    default: module.UserPage,
  }))
);
const NotFoundPage = React.lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "../pages/NotFound").then(
    (module) => ({ default: module.NotFoundPage })
  )
);

export const Routes: React.FC = () => {
  const { Pages } = usePages();

  const routeNotFound: RouteObject = {
    path: "*",
    element: <NotFoundPage />,
  };

  const routeUser: RouteObject = {
    path: "user",
    element: <UserPage />,
  };

  const routeRootWithLang: RouteObject = {
    id: "root",
    path: `/:${i18nConfig.urlParam}/`,
    element: <Layout />,
    children: [routeNotFound, routeUser, ...Pages],
  };

  const routeRoot: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
      Pages.find((p) => p.id === "home") as RouteObject,
      routeNotFound,
    ],
  };

  return useRoutes([routeRoot, routeRootWithLang]);
};
