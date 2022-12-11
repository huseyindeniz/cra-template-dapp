import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { Link, useColorModeValue } from "@chakra-ui/react";

import { LangCode, MenuType } from "../../../config/types";

export interface MainMenuProps {
  onClick: () => void;
  isAuthenticated: boolean;
  items: MenuType[];
  currentLangCode: LangCode;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onClick,
  isAuthenticated,
  items,
  currentLangCode,
}) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  const activeMenuColor = useColorModeValue("blue.900", "blue.100");
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
            key={link.id}
            as={RouterLink}
            to={`/${currentLangCode}/${link.path}`}
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: bgColor,
            }}
            _activeLink={{
              color: activeMenuColor,
              fontWeight: "bold",
            }}
            onClick={onClick}
          >
            {link.menuLabel}
          </Link>
        ))}
    </>
  );
};
