// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletInitStateType } from '../../../types';
import { Modal } from '../Modal/Modal';

import { StepCheckWallet } from './StepCheckWallet';

export default {
  title: 'wallet/ConnectionModal/Steps/CheckWallet',
  component: Modal,
  args: {
    isOpen: true,
    activeStep: 0,
    checkUnlockContent: 'mock checkUnlock content',
    checkNetworkContent: 'mock checkNetwork content',
    checkSignContent: 'mock checkSign content',
    onDisconnect: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = args => (
  <Modal {...args} />
);

// INIT_REQUESTED
export const InitRequested = Default.bind({});
InitRequested.args = {
  stepState: 'loading',
  checkWalletContent: (
    <StepCheckWallet
      onCancel={() => null}
      stepState={WalletInitStateType.INIT_REQUESTED}
    />
  ),
};

// INIT_FAILED
export const InitFailed = Default.bind({});
InitFailed.args = {
  stepState: 'error',
  checkWalletContent: (
    <StepCheckWallet
      onCancel={() => null}
      stepState={WalletInitStateType.INIT_FAILED}
    />
  ),
};

// NOT_SUPPORTED
export const NotSupported = Default.bind({});
NotSupported.args = {
  stepState: 'error',
  checkWalletContent: (
    <StepCheckWallet
      onCancel={() => null}
      stepState={WalletInitStateType.NOT_SUPPORTED}
    />
  ),
};

// INITIALIZED
export const Initialized = Default.bind({});
Initialized.args = {
  checkWalletContent: (
    <StepCheckWallet
      onCancel={() => null}
      stepState={WalletInitStateType.INITIALIZED}
    />
  ),
};
