import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  ScaleFade,
  Heading,
  Divider,
  Center,
  Stack,
} from "@chakra-ui/react";

import "../../config/i18n";
import { LangCode } from "../../config/types";
import useTypedSelector from "../../hooks/useTypedSelector";
import { WalletStateType } from "../../features/wallet/types";
import { ErrorFallback } from "./ErrorFallback";
import { Loading } from "../UI/Loading";
import { SiteMeta } from "./SiteMeta";
import { Copyright } from "./Copyright";
import { SocialMenu } from "./SocialMenu";
import { socialLinks } from "../../config/socialLinks";
import { usePages } from "../../hooks/usePages";

import imageSiteLogo from "../../assets/images/logo.webp";

const Header = React.lazy(() =>
  import("./Header").then((module) => ({ default: module.Header }))
);
const Footer = React.lazy(() =>
  import("./Footer").then((module) => ({ default: module.Footer }))
);
const ScrollToTopButton = React.lazy(() =>
  import("./ScrollToTopButton").then((module) => ({
    default: module.ScrollToTopButton,
  }))
);
const CookieConsent = React.lazy(() =>
  import("./CookieConsent").then((module) => ({
    default: module.CookieConsent,
  }))
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  //console.error(error.message, info);
};

const Layout: React.FC<WithTranslation> = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation("Layout");
  const { mainMenuItems, footerMenuItems } = usePages();
  const walletState = useTypedSelector((state) => state.wallet.state);
  const isAuthenticated = walletState === WalletStateType.AUTHENTICATED;
  const currentLangCode = (i18n.resolvedLanguage as LangCode) ?? LangCode.EN_US;
  const siteName = t("SITE_NAME");
  const siteDescription = t("SITE_DESCRIPTION");

  return (
    <HelmetProvider>
      <SiteMeta siteName={siteName} siteDescription={siteDescription} />
      <Box minH={"100vh"} flexDirection={"column"} display={"flex"}>
        <Header
          siteName={siteName}
          siteLogoUrl={imageSiteLogo}
          isAuthenticated={isAuthenticated}
          currentLangCode={currentLangCode}
          headerMenuItems={mainMenuItems}
        />
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
                    <Loading message={t("loading page...")} />
                  </Center>
                }
              >
                <Outlet />
              </React.Suspense>
            </ErrorBoundary>
          </ScaleFade>
        </Box>
        <Footer
          siteName={siteName}
          siteLogoUrl={imageSiteLogo}
          isAuthenticated={isAuthenticated}
          currentLangCode={currentLangCode}
          footerMenuItems={footerMenuItems}
        >
          <Copyright />
          <Stack direction={"row"} spacing={6}>
            <SocialMenu items={socialLinks} />
          </Stack>
        </Footer>
        <ScrollToTopButton />
        <CookieConsent />
      </Box>
    </HelmetProvider>
  );
};

export default withTranslation()(Layout);
