import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const WalletLoading: React.FC = () => {
  const { t } = useTranslation('FeatureWallet');
  return (
    <ChakraModal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={() => null}
      size="xl"
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('Loading Wallet')}:
          <Divider mt={1} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>
          {t('Loading wallet component. Please wait...')}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
