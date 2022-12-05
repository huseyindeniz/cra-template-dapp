// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";
//import { WalletStateType } from "../../types";

export default {
  title: "Wallet/ConnectionModal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

/*
// STEP 0
export const NotInitialized = Default.bind({});
NotInitialized.args = {
  walletState: WalletStateType.NOT_INITIALIZED,
};

export const InitRequested = Default.bind({});
InitRequested.args = {
  walletState: WalletStateType.INIT_REQUESTED,
};

export const NotSupported = Default.bind({});
NotSupported.args = {
  walletState: WalletStateType.NOT_SUPPORTED,
};

// STEP 1
export const NetworkRequested = Default.bind({});
NetworkRequested.args = {
  walletState: WalletStateType.NETWORK_REQUESTED,
};

export const NetworkDetectionFailed = Default.bind({});
NetworkDetectionFailed.args = {
  walletState: WalletStateType.NETWORK_DETECTION_FAILED,
  error: "code xxx - error message",
};

export const WrongNetwork = Default.bind({});
WrongNetwork.args = {
  walletState: WalletStateType.WRONG_NETWORK,
  supportedNetworks: [{ name: "Mainnet", id: 1 }],
};

export const NetworkSwitchRequested = Default.bind({});
NetworkSwitchRequested.args = {
  walletState: WalletStateType.NETWORK_SWITCH_REQUESTED,
};

export const NetworkSwitchRejected = Default.bind({});
NetworkSwitchRejected.args = {
  walletState: WalletStateType.NETWORK_SWITCH_REJECTED,
  supportedNetworks: [{ name: "Mainnet", id: 1 }],
};

export const NetworkSwitchFailed = Default.bind({});
NetworkSwitchFailed.args = {
  walletState: WalletStateType.NETWORK_SWITCH_FAILED,
};

// STEP 2

export const AccountRequested = Default.bind({});
AccountRequested.args = {
  walletState: WalletStateType.ACCOUNT_REQUESTED,
};

export const AccountDetectionFailed = Default.bind({});
AccountDetectionFailed.args = {
  walletState: WalletStateType.ACCOUNT_DETECTION_FAILED,
};

export const Locked = Default.bind({});
Locked.args = {
  walletState: WalletStateType.LOCKED,
};

export const UnlockRequested = Default.bind({});
UnlockRequested.args = {
  walletState: WalletStateType.UNLOCK_REQUESTED,
};

export const UnlockRejected = Default.bind({});
UnlockRejected.args = {
  walletState: WalletStateType.UNLOCK_REJECTED,
};

export const UnlockFailed = Default.bind({});
UnlockFailed.args = {
  walletState: WalletStateType.UNLOCK_FAILED,
};

// STEP 3

export const NotSigned = Default.bind({});
NotSigned.args = {
  walletState: WalletStateType.NOT_SIGNED,
};

export const SignRequested = Default.bind({});
SignRequested.args = {
  walletState: WalletStateType.SIGN_REQUESTED,
};

export const SignRejected = Default.bind({});
SignRejected.args = {
  walletState: WalletStateType.SIGN_REJECTED,
};

export const SignTimedout = Default.bind({});
SignTimedout.args = {
  walletState: WalletStateType.SIGN_TIMED_OUT,
};

export const SignFailed = Default.bind({});
SignFailed.args = {
  walletState: WalletStateType.SIGN_FAILED,
};

export const Signed = Default.bind({});
Signed.args = {
  walletState: WalletStateType.SIGNED,
};

export const Authenticated = Default.bind({});
Authenticated.args = {
  walletState: WalletStateType.AUTHENTICATED,
};
*/
