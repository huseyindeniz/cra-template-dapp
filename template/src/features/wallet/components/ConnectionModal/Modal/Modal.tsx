import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/react';
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { GiChoice } from '@react-icons/all-files/gi/GiChoice';
import { IoMdUnlock } from '@react-icons/all-files/io/IoMdUnlock';
import { MdExtension } from '@react-icons/all-files/md/MdExtension';
import { Step, Steps } from 'chakra-ui-steps';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  isOpen: boolean;
  activeStep: number;
  stepState?: 'loading' | 'error';
  checkWalletContent?: React.ReactNode;
  checkAccountContent?: React.ReactNode;
  checkNetworkContent?: React.ReactNode;
  checkSignContent?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical'; // this is a temp fix for unit tests. It should always be "vertical"
  onDisconnect: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  activeStep,
  stepState,
  checkWalletContent,
  checkAccountContent,
  checkNetworkContent,
  checkSignContent,
  orientation = 'vertical',
  onDisconnect,
}) => {
  const { t } = useTranslation('FeatureWallet');

  const connectionSteps = (
    <Steps
      orientation={orientation}
      activeStep={activeStep}
      state={stepState}
      colorScheme="whatsapp"
      responsive={false}
    >
      <Step
        width="100%"
        label={t('Check Metamask Extension')}
        key="installation"
        description={
          t('The Metamask wallet extension needs to be installed.') as string
        }
        icon={MdExtension}
      >
        {checkWalletContent}
      </Step>
      <Step
        width="100%"
        label={t('Check Metamask Status')}
        key="unlock"
        description={t('The Metamask wallet needs to be unlocked.') as string}
        icon={IoMdUnlock}
      >
        {checkAccountContent}
      </Step>
      <Step
        width="100%"
        label={t('Check Metamask Network')}
        key="network"
        description={
          t(
            'A supported network needs to be selected in the Metamask wallet.'
          ) as string
        }
        icon={GiChoice}
      >
        {checkNetworkContent}
      </Step>
      <Step
        width="100%"
        label={t('Check Metamask Signature')}
        key="signin"
        description={
          t(
            'The login request needs to be signed in the Metamask wallet.'
          ) as string
        }
        icon={FaFileSignature}
      >
        {checkSignContent}
      </Step>
    </Steps>
  );

  return (
    <ChakraModal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={() => onDisconnect()}
      size="xl"
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('Connecting to Metamask')}:
          <Divider mt={1} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>{connectionSteps}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
