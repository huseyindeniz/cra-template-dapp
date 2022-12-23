import { useTranslation } from "react-i18next";
import {
  Heading,
  Divider,
  Box,
  Container,
  Stack,
  List,
  ListItem,
} from "@chakra-ui/react";
import { PageMeta } from "../../components/UI/PageMeta";
import { useLocation, useHref } from "react-router-dom";

export const AboutPage: React.FC = () => {
  const { t } = useTranslation("PageAbout");
  const PUBLIC_URL = window.location.host;
  const { pathname } = useLocation();
  const url = `${PUBLIC_URL}/${useHref(pathname)}`;
  const title = t("About");
  return (
    <>
      <PageMeta
        title={title}
        description={t("My Awesome dApp About Page")}
        url={url}
      />
      <Box>
        <Container maxW={"7xl"} py={2} as={Stack} spacing={0}>
          <Stack spacing={0} align={"center"}>
            <Heading>{title}</Heading>
            <Divider />
          </Stack>
          <Box>
            <Heading>Features</Heading>
            <List>
              <ListItem>Wallet</ListItem>
            </List>
            <Heading>Preconfigured Web 3 Packages</Heading>
            <List>
              <ListItem>ethers.js</ListItem>
              <ListItem>typechain</ListItem>
            </List>
            <Heading>Preconfigured Other Packages</Heading>
            <List>
              <ListItem>React</ListItem>
              <ListItem>Typescript</ListItem>
              <ListItem>Chakra-UI</ListItem>
              <ListItem>React Router</ListItem>
              <ListItem>React Error Boundary</ListItem>
              <ListItem>React Helmet</ListItem>
              <ListItem>I18Next with Browser Language Detector</ListItem>
              <ListItem>React Hook Form with Zod</ListItem>
              <ListItem>React Icon All Files</ListItem>
              <ListItem>React Date Picker</ListItem>
              <ListItem>React Count Down Circle Timer</ListItem>
              <ListItem>React Cookie Consent</ListItem>
              <ListItem>Redux Toolkit with Redux Saga</ListItem>
            </List>
          </Box>
        </Container>
      </Box>
    </>
  );
};
