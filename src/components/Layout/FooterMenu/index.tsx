import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

import { LangCode, MenuItem } from "../../../config/types";

export interface FooterMenuProps {
  isAuthenticated: boolean;
  items: MenuItem[];
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
  return (
    <>
      {footerMenuItems &&
        footerMenuItems.map((link) => (
          <Link
            key={link.name}
            _activeLink={{
              color: "blue.600",
              fontWeight: "bold",
            }}
            as={RouterLink}
            to={`/${currentLangCode}${link.url}`}
          >
            {link.label[currentLangCode]}
          </Link>
        ))}
    </>
  );
};
