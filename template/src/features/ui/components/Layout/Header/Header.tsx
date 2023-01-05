import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { useTranslation } from "react-i18next";

import { LangMenu } from "../../../../i18n/components/LangMenu/LangMenu";
import { MainMenu } from "../MainMenu/MainMenu";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { usePages } from "../../../../../pages/usePages";

export interface HeaderProps {
  siteName: string;
  siteLogoUrl: string;
}

export const Header: React.FC<HeaderProps> = React.memo(
  ({ siteName, siteLogoUrl }) => {
    const { t } = useTranslation("Layout");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { homeMenuItem } = usePages();
    const mainMenu = <MainMenu onClick={onClose} />;
    const toolsMenu = (
      <>
        <LangMenu />
        <ThemeSwitcher />
      </>
    );
    return (
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            variant="outline"
            icon={isOpen ? <IoClose /> : <IoEllipsisVertical />}
            aria-label={t("Open Menu")}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>
              <Link to={homeMenuItem.path ?? ""}>
                <Avatar src={siteLogoUrl} name={siteName} />
              </Link>
            </Box>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {mainMenu}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <HStack as="nav" m={0} display={{ base: "none", md: "flex" }}>
              {toolsMenu}
            </HStack>
            <ProfileMenu />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={2}>
              {mainMenu}
              <Divider />
              {toolsMenu}
            </Stack>
          </Box>
        ) : null}
      </Box>
    );
  }
);
