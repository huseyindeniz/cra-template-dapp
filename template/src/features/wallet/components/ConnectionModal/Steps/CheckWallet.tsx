import { Box, Link, Image, VStack, Button, Text } from '@chakra-ui/react';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AlertMessage } from '../../../../ui/components/AlertMessage/AlertMessage';
import imageMetamaskLogo from '../../../assets/images/mm-logo.webp';
import { ProviderLoadState } from '../../../models/provider/types/ProviderLoadState';

export interface CheckWalletProps {
  stepState: ProviderLoadState;
  onCancel: () => void;
}

export const CheckWallet: React.FC<CheckWalletProps> = ({
  stepState,
  onCancel,
}) => {
  const { t } = useTranslation('FeatureWallet');
  const isVisible: boolean =
    stepState === ProviderLoadState.FAILED ||
    stepState === ProviderLoadState.NOT_SUPPORTED;
  return isVisible ? (
    <VStack>
      <Box w="full">
        <AlertMessage status="warning" title={t('Metamask Is Not Detected')}>
          <VStack>
            <Image width="25%" src={imageMetamaskLogo} alt="Metamask" m={2} />
            <Text fontSize="xs">
              {t(
                'The Metamask wallet extension is not detected in your browser.'
              )}
              <br />
              {t(
                'In order to use this app, please install the Metamask extension for your browser from the official link below and try again.'
              )}
            </Text>
          </VStack>
        </AlertMessage>
      </Box>
      <Box>
        <Button size="xs" variant="outline" rightIcon={<FaExternalLinkAlt />}>
          <Link href="https://metamask.io/" isExternal>
            https://metamask.io/
          </Link>
        </Button>
        <Button size="xs" onClick={() => onCancel()} variant="outline">
          {t('Cancel')}
        </Button>
      </Box>
    </VStack>
  ) : null;
};
