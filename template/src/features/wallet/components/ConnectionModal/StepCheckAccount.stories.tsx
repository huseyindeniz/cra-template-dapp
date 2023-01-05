// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WalletAccountStateType } from "../../types";

import { Modal } from "./Modal";
import { StepCheckAccount } from "./StepCheckAccount";

export default {
  title: "wallet/Modal/CheckAccount",
  component: Modal,
  args: {
    isOpen: true,
    activeStep: 1,
    checkWalletContent: null,
    checkNetworkContent: "mock checkNetwork content",
    checkSignContent: "mock checkSign content",
    onDisconnect: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

// ACCOUNT_REQUESTED
export const AccountRequested = Default.bind({});
AccountRequested.args = {
  stepState: "loading",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage={null}
      stepState={WalletAccountStateType.ACCOUNT_REQUESTED}
    />
  ),
};

// ACCOUNT_DETECTION_FAILED
export const AccountDetectionFailed = Default.bind({});
AccountDetectionFailed.args = {
  stepState: "error",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage="mock error code"
      stepState={WalletAccountStateType.ACCOUNT_DETECTION_FAILED}
    />
  ),
};

// LOCKED
export const Locked = Default.bind({});
Locked.args = {
  stepState: "error",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage={null}
      stepState={WalletAccountStateType.LOCKED}
    />
  ),
};

// UNLOCK_REQUESTED
export const UnlockRequested = Default.bind({});
UnlockRequested.args = {
  stepState: "loading",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage={null}
      stepState={WalletAccountStateType.UNLOCK_REQUESTED}
    />
  ),
};

// UNLOCK_FAILED
export const UnlockFailed = Default.bind({});
UnlockFailed.args = {
  stepState: "error",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage="mock error code"
      stepState={WalletAccountStateType.UNLOCK_FAILED}
    />
  ),
};

// UNLOCK_REJECTED
export const UnlockRejected = Default.bind({});
UnlockRejected.args = {
  stepState: "error",
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage={null}
      stepState={WalletAccountStateType.UNLOCK_REJECTED}
    />
  ),
};

// ACCOUNT_LOADED
export const AccountLoaded = Default.bind({});
AccountLoaded.args = {
  checkAccountContent: (
    <StepCheckAccount
      onUnlock={() => null}
      errorMessage={null}
      stepState={WalletAccountStateType.ACCOUNT_LOADED}
    />
  ),
};
