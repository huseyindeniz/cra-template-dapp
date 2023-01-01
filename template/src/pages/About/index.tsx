import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Stack, Box } from "@chakra-ui/react";

export const AboutPage: React.FC = () => {
  const { t } = useTranslation("PageHome");
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 2, md: 4 }}
          py={{ base: 10, md: 16 }}
        >
          <Box>{t("Hello World")}</Box>
        </Stack>
      </Container>
    </>
  );
};
