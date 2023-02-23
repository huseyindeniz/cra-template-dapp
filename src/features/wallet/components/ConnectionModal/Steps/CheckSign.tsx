import {
  Box,
  VStack,
  Button,
  Text,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AlertMessage } from '../../../../ui/components/AlertMessage/AlertMessage';
import { AccountSignState } from '../../../models/account/types/AccountSignState';

export interface CheckSignProps {
  stepState: AccountSignState;
  errorMessage: string | null;
  signCounter: number;
  onSign: (message: string) => void;
  onDisconnect: () => void;
}

export const CheckSign: React.FC<CheckSignProps> = ({
  stepState,
  errorMessage,
  signCounter,
  onSign,
  onDisconnect,
}) => {
  const { t } = useTranslation('FeatureWallet');
  const signMessage = t('SIGN_MESSAGE');
  const NotSigned = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Sign Required')}>
          {t(
            'In order to use this app, you need to sign the login request in your wallet.'
          )}
        </AlertMessage>
      </Box>
    );
  };
  const SignRequested = () => {
    return (
      <Box w="full">
        <CircularProgress value={(100 * signCounter) / 60} color="yellow.400">
          <CircularProgressLabel>{signCounter}s</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="xs">
          {t('Waiting for the login request to be signed.')}
          <br />
          {t('Please check your Metamask wallet.')}
        </Text>
      </Box>
    );
  };
  const SignRejected = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Sign Rejected')}>
          {t('You rejected the sign request.')}
          <br /> {t('Please try again if you want to continue.')}
        </AlertMessage>
      </Box>
    );
  };
  const SignTimedOut = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Sign Timed Out')}>
          {t("You didn't respond to the sign request in time.")}
          <br /> {t('Please try again if you want to continue.')}
        </AlertMessage>
      </Box>
    );
  };
  const SignFailed = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Unexpected Error')}>
          {t('An error has occured during the sign check.')}
          <br /> {t('Please try again later.')}
          <br />
          {t('The error code was')}: {errorMessage}
        </AlertMessage>
      </Box>
    );
  };
  const Signed = () => {
    return (
      <Box w="full">
        <AlertMessage status="success" title={t('Signed In')}>
          {t('You have successfully signed the login request.')}
          <br />
          {t('Redirecting to app...')}
        </AlertMessage>
        <Progress size="xs" colorScheme="green" isIndeterminate />
      </Box>
    );
  };

  const Content = () => {
    switch (stepState) {
      case AccountSignState.NOT_SIGNED:
        return <NotSigned />;
      case AccountSignState.SIGN_REQUESTED:
        return <SignRequested />;
      case AccountSignState.SIGN_REJECTED:
        return <SignRejected />;
      case AccountSignState.SIGN_TIMED_OUT:
        return <SignTimedOut />;
      case AccountSignState.SIGN_FAILED:
        return <SignFailed />;
      case AccountSignState.SIGNED:
        return <Signed />;
      default:
        return null;
    }
  };

  const SignButton = () => {
    switch (stepState) {
      case AccountSignState.NOT_SIGNED:
      case AccountSignState.SIGN_REJECTED:
      case AccountSignState.SIGN_TIMED_OUT:
        return (
          <Box>
            <Button
              variant="solid"
              colorScheme="yellow"
              onClick={() => onSign(signMessage)}
            >
              {t('Sign In')}
            </Button>
            <Button ml={1} variant="outline" onClick={() => onDisconnect()}>
              {t('Cancel')}
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <VStack>
      <Content />
      <SignButton />
    </VStack>
  );
};
