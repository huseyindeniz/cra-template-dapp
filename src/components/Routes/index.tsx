import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import WithProtectedRoute from "../../hoc/ProtectedRoute";
import { i18nConfig } from "../../config/i18n";
import { Pages } from "../../pages";

const Layout = React.lazy(() => import("../Layout"));

const UserPage = React.lazy(() => import("../../pages/User"));
const NotFoundPage = React.lazy(() => import("../../pages/NotFound"));

export const Routes: React.FC = () => {
  const routeNotFound: RouteObject = {
    path: "*",
    element: <NotFoundPage />,
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
