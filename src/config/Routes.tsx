import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import WithProtectedRoute from "../hoc/ProtectedRoute";
import { i18nConfig } from "./i18n";

const Layout = React.lazy(() => import("../components/Layout"));
const HomePage = React.lazy(() =>
  import("../pages/Home").then((module) => ({ default: module.HomePage }))
);
const AboutPage = React.lazy(() =>
  import("../pages/About").then((module) => ({ default: module.AboutPage }))
);
const UserPage = React.lazy(() => import("../pages/User"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound"));

export const Routes: React.FC = () => {
  const routeHome: RouteObject = {
    index: true,
    element: <HomePage />,
  };

  const routeNotFound: RouteObject = {
    path: "*",
    element: <NotFoundPage />,
  };

  const routeAbout: RouteObject = {
    path: "about",
    element: <AboutPage />,
  };

  const routeUser: RouteObject = {
    path: "user",
    element: (
      <WithProtectedRoute>
        <UserPage />
      </WithProtectedRoute>
    ),
  };

  const routeRootWithLang: RouteObject = {
    id: "root",
    path: `/:${i18nConfig.urlParam}/`,
    element: <Layout />,
    children: [routeHome, routeAbout, routeUser, routeNotFound],
  };

  const routeRoot: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [routeHome, routeNotFound],
  };

  return useRoutes([routeRoot, routeRootWithLang]);
};
