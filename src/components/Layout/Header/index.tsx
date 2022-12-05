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
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { MainMenu } from "../MainMenu";
import { LangMenu } from "../LangMenu";
import { ProfileMenu } from "../ProfileMenu";
import { ThemeSwitcher } from "../ThemeSwitcher";

import { LangCode, MenuItem } from "../../../config/types";

export interface HeaderProps {
  siteName: string;
  siteLogoUrl: string;
  isAuthenticated: boolean;
  currentLangCode: LangCode;
  headerMenuItems: MenuItem[];
}

export const Header: React.FC<HeaderProps> = ({
  siteName,
  siteLogoUrl,
  isAuthenticated,
  currentLangCode,
  headerMenuItems,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainMenu = (
    <MainMenu
      onClick={onClose}
      items={headerMenuItems}
      isAuthenticated={isAuthenticated}
      currentLangCode={currentLangCode}
    />
  );
  const toolsMenu = (
    <>
      <LangMenu />
      <ThemeSwitcher />
    </>
  );
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <IoClose /> : <GiHamburgerMenu />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Link to={`/${currentLangCode}/`}>
              <Avatar src={siteLogoUrl} name={siteName} />
            </Link>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {mainMenu}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <HStack as={"nav"} m={0} display={{ base: "none", md: "flex" }}>
            {toolsMenu}
          </HStack>
          <ProfileMenu />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={2}>
            {mainMenu}
            <Divider />
            {toolsMenu}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
