import { useTranslation } from "react-i18next";
import {
  Heading,
  Divider,
  Box,
  Container,
  Stack,
  Code,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { PageMeta } from "../../components/UI/PageMeta";
import { useLocation, useHref } from "react-router-dom";

export const DocumentationPage: React.FC = () => {
  const { t } = useTranslation("PageDocumentation");
  const PUBLIC_URL = window.location.host;
  const { pathname } = useLocation();
  const url = `${PUBLIC_URL}/${useHref(pathname)}`;
  const title = t("Documentation");
  return (
    <>
      <PageMeta
        title={title}
        description={t("My Awesome dApp Documentat'on Page")}
        url={url}
      />
      <Box>
        <Container maxW={"7xl"} py={2} as={Stack} spacing={0}>
          <Stack spacing={0} align={"center"}>
            <Heading>{title}</Heading>
            <Divider />
          </Stack>
          <VStack m={4} p={4} spacing={4}>
            <Heading as={"h3"} size={"md"}>
              Installation
            </Heading>
            <Box>
              <Code>
                npx create-react-app your-project-name --template
                @huseyindeniz/dapp
              </Code>
            </Box>
            <Heading as={"h3"} size={"md"}>
              Configuration
            </Heading>
            <VStack>
              <HStack>
                <Box>config folder:</Box>
                <Box>deneme</Box>
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
};
