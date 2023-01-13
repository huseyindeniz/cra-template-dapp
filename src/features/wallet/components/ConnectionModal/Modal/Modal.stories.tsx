import { ComponentStory, ComponentMeta } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';

import * as checkAccountStories from '../Steps/CheckAccount.stories';
import * as checkNetworkStories from '../Steps/CheckNetwork.stories';
import * as checkSignStories from '../Steps/CheckSign.stories';
import * as checkWalletStories from '../Steps/CheckWallet.stories';

import { Modal } from './Modal';

export default {
  title: 'wallet/ConnectionModal/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

// STEP: CHECK WALLET

const {
  CheckWalletIdle,
  InitRequested,
  InitFailed,
  NotSupported,
  Initialized,
} = composeStories(checkWalletStories);

const TemplateCheckWallet: ComponentStory<typeof Modal> = args => (
  <Modal {...args} isOpen={true} activeStep={0} />
);

export const CheckWalletCheckWalletIdle = TemplateCheckWallet.bind({});
CheckWalletCheckWalletIdle.args = {
  checkWalletContent: <CheckWalletIdle />,
};

export const CheckWalletInitRequested = TemplateCheckWallet.bind({});
CheckWalletInitRequested.args = {
  stepState: 'loading',
  checkWalletContent: <InitRequested />,
};

export const CheckWalletInitFailed = TemplateCheckWallet.bind({});
CheckWalletInitFailed.args = {
  stepState: 'error',
  checkWalletContent: <InitFailed />,
};

export const CheckWalletNotSupported = TemplateCheckWallet.bind({});
CheckWalletNotSupported.args = {
  stepState: 'error',
  checkWalletContent: <NotSupported />,
};

export const CheckWalletInitialized = TemplateCheckWallet.bind({});
CheckWalletInitialized.args = {
  checkWalletContent: <Initialized />,
};

// STEP: CHECK ACCOUNT

const {
  CheckAccountIdle,
  AccountRequested,
  AccountDetectionFailed,
  Locked,
  UnlockRequested,
  UnlockRejected,
  UnlockFailed,
  AccountLoaded,
} = composeStories(checkAccountStories);

const TemplateCheckAccount: ComponentStory<typeof Modal> = args => (
  <Modal {...args} isOpen={true} activeStep={1} />
);

export const CheckAccountCheckAccountIdle = TemplateCheckAccount.bind({});
CheckAccountCheckAccountIdle.args = {
  checkAccountContent: <CheckAccountIdle />,
};

export const CheckAccountAccountRequested = TemplateCheckAccount.bind({});
CheckAccountAccountRequested.args = {
  stepState: 'loading',
  checkAccountContent: <AccountRequested />,
};

export const CheckAccountAccountDetectionFailed = TemplateCheckAccount.bind({});
CheckAccountAccountDetectionFailed.args = {
  stepState: 'error',
  checkAccountContent: <AccountDetectionFailed />,
};

export const CheckAccountLocked = TemplateCheckAccount.bind({});
CheckAccountLocked.args = {
  stepState: 'error',
  checkAccountContent: <Locked />,
};

export const CheckAccountUnlockRequested = TemplateCheckAccount.bind({});
CheckAccountUnlockRequested.args = {
  stepState: 'loading',
  checkAccountContent: <UnlockRequested />,
};

export const CheckAccountUnlockRejected = TemplateCheckAccount.bind({});
CheckAccountUnlockRejected.args = {
  stepState: 'error',
  checkAccountContent: <UnlockRejected />,
};

export const CheckAccountUnlockFailed = TemplateCheckAccount.bind({});
CheckAccountUnlockFailed.args = {
  stepState: 'error',
  checkAccountContent: <UnlockFailed />,
};

export const CheckAccountAccountLoaded = TemplateCheckAccount.bind({});
CheckAccountAccountLoaded.args = {
  checkAccountContent: <AccountLoaded />,
};

// STEP: CHECK NETWORK

const {
  CheckNetworkIdle,
  NetworkRequested,
  NetworkDetectionFailed,
  WrongNetwork,
  NetworkSwitchRequested,
  NetworkSwitchRejected,
  NetworkSwitchFailed,
  NetworkLoaded,
} = composeStories(checkNetworkStories);

const TemplateCheckNetwork: ComponentStory<typeof Modal> = args => (
  <Modal {...args} isOpen={true} activeStep={2} />
);

export const CheckNetworkCheckNetworkIdle = TemplateCheckNetwork.bind({});
CheckNetworkCheckNetworkIdle.args = {
  checkNetworkContent: <CheckNetworkIdle />,
};

export const CheckNetworkNetworkRequested = TemplateCheckNetwork.bind({});
CheckNetworkNetworkRequested.args = {
  stepState: 'loading',
  checkNetworkContent: <NetworkRequested />,
};

export const CheckNetworkNetworkDetectionFailed = TemplateCheckNetwork.bind({});
CheckNetworkNetworkDetectionFailed.args = {
  stepState: 'error',
  checkNetworkContent: <NetworkDetectionFailed />,
};

export const CheckNetworkWrongNetwork = TemplateCheckNetwork.bind({});
CheckNetworkWrongNetwork.args = {
  stepState: 'error',
  checkNetworkContent: <WrongNetwork />,
};

export const CheckNetworkSwitchRequested = TemplateCheckNetwork.bind({});
CheckNetworkSwitchRequested.args = {
  stepState: 'loading',
  checkNetworkContent: <NetworkSwitchRequested />,
};

export const CheckNetworkSwitchRejected = TemplateCheckNetwork.bind({});
CheckNetworkSwitchRejected.args = {
  stepState: 'error',
  checkNetworkContent: <NetworkSwitchRejected />,
};

export const CheckNetworkSwitchFailed = TemplateCheckNetwork.bind({});
CheckNetworkSwitchFailed.args = {
  stepState: 'error',
  checkNetworkContent: <NetworkSwitchFailed />,
};

export const CheckNetworkLoaded = TemplateCheckNetwork.bind({});
CheckNetworkLoaded.args = {
  checkNetworkContent: <NetworkLoaded />,
};

// STEP: CHECK SIGN

const {
  CheckSignIdle,
  NotSigned,
  SignRequested,
  SignRejected,
  SignTimedOut,
  SignFailed,
  Signed,
} = composeStories(checkSignStories);

const TemplateCheckSign: ComponentStory<typeof Modal> = args => (
  <Modal {...args} isOpen={true} activeStep={3} />
);

export const CheckSignCheckSignIdle = TemplateCheckSign.bind({});
CheckSignCheckSignIdle.args = {
  checkSignContent: <CheckSignIdle />,
};

export const CheckSignNotSigned = TemplateCheckSign.bind({});
CheckSignNotSigned.args = {
  stepState: 'error',
  checkSignContent: <NotSigned />,
};

export const CheckSignSignRequested = TemplateCheckSign.bind({});
CheckSignSignRequested.args = {
  stepState: 'loading',
  checkSignContent: <SignRequested />,
};

export const CheckSignSignRejected = TemplateCheckSign.bind({});
CheckSignSignRejected.args = {
  stepState: 'error',
  checkSignContent: <SignRejected />,
};

export const CheckSignSignTimedOut = TemplateCheckSign.bind({});
CheckSignSignTimedOut.args = {
  stepState: 'error',
  checkSignContent: <SignTimedOut />,
};

export const CheckSignSignFailed = TemplateCheckSign.bind({});
CheckSignSignFailed.args = {
  stepState: 'error',
  checkSignContent: <SignFailed />,
};

export const CheckSignSigned = TemplateCheckSign.bind({});
CheckSignSigned.args = {
  checkSignContent: <Signed />,
};
