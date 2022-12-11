import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Container, Stack } from "@chakra-ui/react";
import Header from "./Header";

const UserPage: React.FC = () => {
  const { t } = useTranslation("PageUser");

  return (
    <Box>
      <Container maxW={"7xl"} py={2} as={Stack} spacing={2}>
        <Header />
        <Box>{t("Current Balance and Block Information")}</Box>
      </Container>
    </Box>
  );
};

export default UserPage;
