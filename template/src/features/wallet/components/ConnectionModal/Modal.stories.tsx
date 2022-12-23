// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

export default {
  title: "Wallet/Modal",
  component: Modal,
  args: {
    isOpen: true,
    checkWalletContent: "mock checkWallet content",
    checkUnlockContent: "mock checkUnlock content",
    checkNetworkContent: "mock checkNetwork content",
    checkSignContent: "mock checkSign content",
    onDisconnect: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

// STEP 0
export const Step0Default = Default.bind({});
Step0Default.args = {
  activeStep: 0,
};

export const Step0Loading = Default.bind({});
Step0Loading.args = {
  activeStep: 0,
  stepState: "loading",
};

export const Step0Error = Default.bind({});
Step0Error.args = {
  activeStep: 0,
  stepState: "error",
};

// STEP 1
export const Step1Default = Default.bind({});
Step1Default.args = {
  activeStep: 1,
};

export const Step1Loading = Default.bind({});
Step1Loading.args = {
  activeStep: 1,
  stepState: "loading",
};

export const Step1Error = Default.bind({});
Step1Error.args = {
  activeStep: 1,
  stepState: "error",
};

// STEP 2
export const Step2Default = Default.bind({});
Step2Default.args = {
  activeStep: 2,
};

export const Step2Loading = Default.bind({});
Step2Loading.args = {
  activeStep: 2,
  stepState: "loading",
};

export const Step2Error = Default.bind({});
Step2Error.args = {
  activeStep: 2,
  stepState: "error",
};

// STEP 3
export const Step3Default = Default.bind({});
Step3Default.args = {
  activeStep: 3,
};

export const Step3Loading = Default.bind({});
Step3Loading.args = {
  activeStep: 3,
  stepState: "loading",
};

export const Step3Error = Default.bind({});
Step3Error.args = {
  activeStep: 3,
  stepState: "error",
};
