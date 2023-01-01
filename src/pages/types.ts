import { RouteObject } from "react-router-dom";

export type MenuType = {
  path?: string;
  menuLabel: string | null;
  isShownInMainMenu?: boolean;
  isShownInFooter?: boolean;
  isProtected?: boolean;
};

export type PageType = RouteObject & MenuType;
