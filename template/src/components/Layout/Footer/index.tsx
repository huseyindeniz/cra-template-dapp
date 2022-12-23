import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Link,
  Stack,
  useColorModeValue,
  Avatar,
  Divider,
} from "@chakra-ui/react";

import { LangCode, MenuType } from "../../../config/types";
import { FooterMenu } from "../FooterMenu";

export interface FooterProps {
  siteName: string;
  siteLogoUrl: string;
  isAuthenticated: boolean;
  currentLangCode: LangCode;
  footerMenuItems: MenuType[];
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  siteName,
  siteLogoUrl,
  isAuthenticated,
  currentLangCode,
  footerMenuItems,
  children,
}) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Box>
          <Link as={RouterLink} to={`/${currentLangCode}/`}>
            <Avatar src={siteLogoUrl} name={siteName} />
          </Link>
        </Box>
        <Stack direction={"row"} spacing={6}>
          <FooterMenu
            isAuthenticated={isAuthenticated}
            currentLangCode={currentLangCode}
            items={footerMenuItems}
          />
        </Stack>
      </Container>
      <Divider />
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        {children}
      </Container>
    </Box>
  );
};