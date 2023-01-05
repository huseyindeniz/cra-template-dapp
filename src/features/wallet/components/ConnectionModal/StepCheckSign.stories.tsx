// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { WalletSignStateType } from "../../types";

import { Modal } from "./Modal";
import { StepCheckSign } from "./StepCheckSign";

export default {
  title: "wallet/Modal/CheckSign",
  component: Modal,
  args: {
    isOpen: true,
    activeStep: 3,
    checkWalletContent: null,
    checkUnlockContent: null,
    checkNetworkContent: null,
    onDisconnect: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

// NOT_SIGNED
export const NotSigned = Default.bind({});
NotSigned.args = {
  stepState: "error",
  checkSignContent: (
    <StepCheckSign
      signCounter={0}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage={null}
      stepState={WalletSignStateType.NOT_SIGNED}
    />
  ),
};

// SIGN_REQUESTED
export const SignRequested = Default.bind({});
SignRequested.args = {
  stepState: "loading",
  checkSignContent: (
    <StepCheckSign
      signCounter={45}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage={null}
      stepState={WalletSignStateType.SIGN_REQUESTED}
    />
  ),
};

// SIGN_FAILED
export const SignFailed = Default.bind({});
SignFailed.args = {
  stepState: "error",
  checkSignContent: (
    <StepCheckSign
      signCounter={0}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage="mock error code"
      stepState={WalletSignStateType.SIGN_FAILED}
    />
  ),
};

// SIGN_REJECTED
export const SignRejected = Default.bind({});
SignRejected.args = {
  stepState: "error",
  checkSignContent: (
    <StepCheckSign
      signCounter={0}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage={null}
      stepState={WalletSignStateType.SIGN_REJECTED}
    />
  ),
};

// SIGN_TIMED_OUT
export const SignTimedOut = Default.bind({});
SignTimedOut.args = {
  stepState: "error",
  checkSignContent: (
    <StepCheckSign
      signCounter={0}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage={null}
      stepState={WalletSignStateType.SIGN_TIMED_OUT}
    />
  ),
};

// SIGNED
export const Signed = Default.bind({});
Signed.args = {
  checkSignContent: (
    <StepCheckSign
      signCounter={0}
      onSign={() => null}
      onDisconnect={() => null}
      errorMessage={null}
      stepState={WalletSignStateType.SIGNED}
    />
  ),
};
