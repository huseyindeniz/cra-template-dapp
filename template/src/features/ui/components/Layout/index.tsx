import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  ScaleFade,
  Heading,
  Divider,
  Center,
  Stack,
  HStack,
  Text,
  Spinner,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import { ErrorFallback } from "./ErrorFallback";
import { SiteMeta } from "./SiteMeta";
import { Copyright } from "./Copyright";
import { SocialMenu } from "./SocialMenu";

import imageSiteLogo from "../../assets/images/logo.webp";

const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ "./Header").then((module) => ({
    default: module.Header,
  }))
);
const Footer = React.lazy(() =>
  import(/* webpackChunkName: "Footer" */ "./Footer").then((module) => ({
    default: module.Footer,
  }))
);
const ScrollToTopButton = React.lazy(() =>
  import(
    /* webpackChunkName: "ScrollToTopButton" */ "./ScrollToTopButton"
  ).then((module) => ({
    default: module.ScrollToTopButton,
  }))
);
const CookieConsent = React.lazy(() =>
  import(/* webpackChunkName: "CookieConsent" */ "./CookieConsent").then(
    (module) => ({
      default: module.CookieConsent,
    })
  )
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  //console.error(error.message, info);
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation("Layout");
  const siteName = t("SITE_NAME");
  const siteDescription = t("SITE_DESCRIPTION");
  const PageLoading = () => {
    return (
      <Box p={6} boxShadow={"lg"} w={"2xl"}>
        <HStack mb={2}>
          <Spinner />
          <Text size={"xs"} textColor={"gray"}>
            {t("loading page...")}
          </Text>
        </HStack>
        <Divider />
        <SkeletonCircle size="10" mt={"1"} />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    );
  };
  return (
    <HelmetProvider>
      <SiteMeta siteName={siteName} siteDescription={siteDescription} />
      <Box minH={"100vh"} flexDirection={"column"} display={"flex"}>
        <Header siteName={siteName} siteLogoUrl={imageSiteLogo} />
        <Box p={0} flex={1}>
          <ScaleFade key={location.pathname} initialScale={0.9} in={true}>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={myErrorHandler}
            >
              <Heading></Heading>
              <Divider />
              <React.Suspense
                fallback={
                  <Center>
                    <PageLoading />
                  </Center>
                }
              >
                <Outlet />
              </React.Suspense>
            </ErrorBoundary>
          </ScaleFade>
        </Box>
        <Footer siteName={siteName} siteLogoUrl={imageSiteLogo}>
          <Copyright />
          <Stack direction={"row"} spacing={6}>
            <SocialMenu />
          </Stack>
        </Footer>
        <ScrollToTopButton />
        <CookieConsent />
      </Box>
    </HelmetProvider>
  );
};

export default Layout;
