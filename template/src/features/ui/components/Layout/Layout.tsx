import { Box, ScaleFade } from '@chakra-ui/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation, Outlet } from 'react-router-dom';

import { ErrorFallback } from './ErrorFallback/ErrorFallback';
import { PageLoading } from './PageLoding/PageLoading';
import { SiteMeta } from './SiteMeta/SiteMeta';

const Header = React.lazy(() =>
  import(/* webpackChunkName: "Header" */ './Header/Header').then(module => ({
    default: module.Header,
  }))
);
const Footer = React.lazy(() =>
  import(/* webpackChunkName: "Footer" */ './Footer/Footer').then(module => ({
    default: module.Footer,
  }))
);
const ScrollToTopButton = React.lazy(() =>
  import(
    /* webpackChunkName: "ScrollToTopButton" */ './ScrollToTopButton/ScrollToTopButton'
  ).then(module => ({
    default: module.ScrollToTopButton,
  }))
);
const CookieConsent = React.lazy(() =>
  import(
    /* webpackChunkName: "CookieConsent" */ './CookieConsent/CookieConsent'
  ).then(module => ({
    default: module.CookieConsent,
  }))
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  //console.error(error.message, info);
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation('Layout');
  const siteName = t('SITE_NAME');
  const siteDescription = t('SITE_DESCRIPTION');

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <HelmetProvider>
        <SiteMeta siteName={siteName} siteDescription={siteDescription} />
        <Box minH="100vh" flexDirection="column" display="flex">
          <Header siteName={siteName} />
          <Box p={0} flex={1}>
            <React.Suspense fallback={<PageLoading />}>
              <ScaleFade key={location.pathname} initialScale={0.9} in={true}>
                <Outlet />
              </ScaleFade>
            </React.Suspense>
          </Box>
          <Footer siteName={siteName} />
          <ScrollToTopButton />
          <CookieConsent />
        </Box>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
