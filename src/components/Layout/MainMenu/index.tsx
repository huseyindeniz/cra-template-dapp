import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link, useColorModeValue } from "@chakra-ui/react";

import { LangCode, MenuItem } from "../../../config/types";

export interface MainMenuProps {
  onClick: () => void;
  isAuthenticated: boolean;
  items: MenuItem[];
  currentLangCode: LangCode;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onClick,
  isAuthenticated,
  items,
  currentLangCode,
}) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const mainMenuItems =
    items &&
    items.filter(
      (m) =>
        m.isShownInMainMenu &&
        ((m.isProtected && isAuthenticated) || !m.isProtected)
    );
  return (
    <>
      {mainMenuItems &&
        mainMenuItems.map((link) => (
          <Link
            key={link.name}
            as={RouterLink}
            to={`/${currentLangCode}${link.url}`}
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: bg,
            }}
            _activeLink={{
              color: "blue.600",
              fontWeight: "bold",
            }}
            onClick={onClick}
          >
            {link.label[currentLangCode]}
          </Link>
        ))}
    </>
  );
};
