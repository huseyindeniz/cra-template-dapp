import { Box, VStack, Button, Text, Progress } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AlertMessage } from '../../../../ui/components/AlertMessage/AlertMessage';
import { WalletAccountStateType } from '../../../models/WalletGlobalState';

export interface CheckAccountProps {
  stepState: WalletAccountStateType;
  errorMessage: string | null;
  onUnlock: () => void;
}

export const CheckAccount: React.FC<CheckAccountProps> = ({
  stepState,
  errorMessage,
  onUnlock,
}) => {
  const { t } = useTranslation('FeatureWallet');

  const AccountDetectionFailed = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Unexpected Error')}>
          <Text fontSize="xs">
            {t('An error has occured during the wallet status check.')}
            <br /> {t('Please try again later.')}
            <br />
            {t('The error code was')}: {errorMessage}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const Locked = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Wallet Is Locked')}>
          <Text fontSize="xs">
            {t('Please unlock your wallet if you want to continue.')}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const UnlockRequested = () => {
    return (
      <Box w="full">
        <Progress size="xs" isIndeterminate colorScheme="yellow" />
        <Text fontSize="xs">
          {t('Waiting for the unlock wallet request to be accepted.')}
          <br />
          {t('Please check your Metamask wallet.')}
        </Text>
      </Box>
    );
  };

  const UnlockRejected = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Unlock Rejected')}>
          <Text fontSize="xs">
            {t('You rejected the unlock wallet request.')}
            <br />
            {t('Please try again if you want to continue.')}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const UnlockFailed = () => {
    return (
      <Box w="full">
        <AlertMessage status="warning" title={t('Unexpected Error')}>
          <Text fontSize="xs">
            {t('An error has occured during the unlock wallet check.')}
            <br /> {t('Please try again later.')}
            <br />
            {t('The error code was')}: {errorMessage}
          </Text>
        </AlertMessage>
      </Box>
    );
  };

  const Content = () => {
    switch (stepState) {
      case WalletAccountStateType.ACCOUNT_DETECTION_FAILED:
        return <AccountDetectionFailed />;
      case WalletAccountStateType.LOCKED:
        return <Locked />;
      case WalletAccountStateType.UNLOCK_REQUESTED:
        return <UnlockRequested />;
      case WalletAccountStateType.UNLOCK_REJECTED:
        return <UnlockRejected />;
      case WalletAccountStateType.UNLOCK_FAILED:
        return <UnlockFailed />;
      default:
        return null;
    }
  };

  const UnlockButton = () => {
    switch (stepState) {
      case WalletAccountStateType.LOCKED:
      case WalletAccountStateType.UNLOCK_REJECTED:
        return (
          <Box>
            <Button
              variant="solid"
              colorScheme="yellow"
              onClick={() => onUnlock()}
            >
              {t('Unlock Wallet')}
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
      <UnlockButton />
    </VStack>
  );
};
