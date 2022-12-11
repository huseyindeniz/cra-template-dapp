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
import useTypedSelector from "../../hooks/useTypedSelector";
import { LoadingStatusType } from "../../features/wallet/types";
import useActions from "../../features/wallet/useActions";

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation("PageHome");
  const actions = useActions();
  const account = useTypedSelector((state) => state.wallet.account);
  const loadingState = useTypedSelector((state) => state.wallet.loading);

  const handleOnClick = () => {
    actions.connectWallet();
  };

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textAlign={"center"}
          >
            {t("quick entry to the world of Web3")} <br />
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
            {account ? (
              <Button
                as={RouterLink}
                to={"/" + i18n.language + "/myraffles"}
                colorScheme={"blue"}
                bg={"blue.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {t("Get Started")}
              </Button>
            ) : (
              <Button
                isLoading={loadingState === LoadingStatusType.PENDING}
                onClick={handleOnClick}
                colorScheme={"blue"}
                bg={"blue.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {t("Get Started")}
              </Button>
            )}
            <Button
              as={RouterLink}
              to={"/" + i18n.language + "/help"}
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
