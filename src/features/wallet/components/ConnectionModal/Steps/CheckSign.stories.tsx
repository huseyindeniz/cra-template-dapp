// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletSignStateType } from '../../../models/WalletGlobalState';

import { CheckSign } from './CheckSign';

export default {
  title: 'wallet/ConnectionModal/Steps/CheckSign',
  component: CheckSign,
} as ComponentMeta<typeof CheckSign>;

const Template: ComponentStory<typeof CheckSign> = args => (
  <CheckSign {...args} />
);

// IDLE
export const CheckSignIdle = Template.bind({});

// NOT_SIGNED
export const NotSigned = Template.bind({});
NotSigned.args = {
  stepState: WalletSignStateType.NOT_SIGNED,
};

// SIGN_REQUESTED
export const SignRequested = Template.bind({});
SignRequested.args = {
  signCounter: 60,
  stepState: WalletSignStateType.SIGN_REQUESTED,
};

// SIGN_REJECTED
export const SignRejected = Template.bind({});
SignRejected.args = {
  stepState: WalletSignStateType.SIGN_REJECTED,
};

// SIGN_TIMED_OUT
export const SignTimedOut = Template.bind({});
SignTimedOut.args = {
  stepState: WalletSignStateType.SIGN_TIMED_OUT,
};

// SIGN_FAILED
export const SignFailed = Template.bind({});
SignFailed.args = {
  stepState: WalletSignStateType.SIGN_FAILED,
  errorMessage: 'MockSignFailedErrorCode',
};

// SIGNED
export const Signed = Template.bind({});
Signed.args = {
  stepState: WalletSignStateType.SIGNED,
};
