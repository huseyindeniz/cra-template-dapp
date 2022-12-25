import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Tag,
} from "@chakra-ui/react";
import { Modal } from "./Modal";

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation("PageHome");

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 2, md: 4 }}
          py={{ base: 20, md: 32 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "1xl", sm: "2xl", md: "3xl" }}
            lineHeight={"110%"}
            textAlign={"center"}
          >
            {t("experience the full power of React for dApp development")}{" "}
            <br />
            <Text as={"span"} color={"blue.400"}>
              {t("dApp CRA Template")}
            </Text>
          </Heading>
          <Text>
            {t(
              "dApp CRA Template is a create-react-app template specifically designed for decentralized application (dApp) development."
            )}
          </Text>
          <Text>
            <Tag size={"lg"} colorScheme="orange">
              npx create-react-app your-project-name --template
              @huseyindeniz/dapp
            </Tag>
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Modal />
            <Button
              as={RouterLink}
              to={"/" + i18n.language + "/about"}
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
            >
              {t("Learn more")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
