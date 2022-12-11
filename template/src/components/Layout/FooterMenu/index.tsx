import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link, useColorModeValue } from "@chakra-ui/react";

import { LangCode, MenuType } from "../../../config/types";

export interface FooterMenuProps {
  isAuthenticated: boolean;
  items: MenuType[];
  currentLangCode: LangCode;
}

export const FooterMenu: React.FC<FooterMenuProps> = ({
  isAuthenticated,
  items,
  currentLangCode,
}) => {
  const footerMenuItems =
    items &&
    items.filter(
      (m) =>
        m.isShownInFooter &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    );
  const activeMenuColor = useColorModeValue("blue.900", "blue.100");
  return (
    <>
      {footerMenuItems &&
        footerMenuItems.map((link) => (
          <Link
            key={link.id}
            _activeLink={{
              color: activeMenuColor,
              fontWeight: "bold",
            }}
            as={RouterLink}
            to={`/${currentLangCode}/${link.path}`}
          >
            {link.menuLabel}
          </Link>
        ))}
    </>
  );
};
