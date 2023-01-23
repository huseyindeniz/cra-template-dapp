// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletAccountStateType } from '../../../models/WalletGlobalState';

import { CheckAccount } from './CheckAccount';

export default {
  title: 'wallet/ConnectionModal/Steps/CheckAccount',
  component: CheckAccount,
  excludeStories: [],
} as ComponentMeta<typeof CheckAccount>;

const Template: ComponentStory<typeof CheckAccount> = args => (
  <CheckAccount {...args} />
);

// IDLE
export const CheckAccountIdle = Template.bind({});

// ACCOUNT_REQUESTED
export const AccountRequested = Template.bind({});
AccountRequested.args = {
  stepState: WalletAccountStateType.ACCOUNT_REQUESTED,
};

// ACCOUNT_DETECTION_FAILED
export const AccountDetectionFailed = Template.bind({});
AccountDetectionFailed.args = {
  stepState: WalletAccountStateType.ACCOUNT_DETECTION_FAILED,
  errorMessage: 'MockAccountDetectionFailedErrorCode',
  onUnlock: () => null,
};

// LOCKED
export const Locked = Template.bind({});
Locked.args = {
  stepState: WalletAccountStateType.LOCKED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_REQUESTED
export const UnlockRequested = Template.bind({});
UnlockRequested.args = {
  stepState: WalletAccountStateType.UNLOCK_REQUESTED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_REJECTED
export const UnlockRejected = Template.bind({});
UnlockRejected.args = {
  stepState: WalletAccountStateType.UNLOCK_REJECTED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_FAILED
export const UnlockFailed = Template.bind({});
UnlockFailed.args = {
  stepState: WalletAccountStateType.UNLOCK_FAILED,
  errorMessage: 'MockUnlockFailedErrorCode',
  onUnlock: () => null,
};

// ACCOUNT_LOADED
export const AccountLoaded = Template.bind({});
AccountLoaded.args = {
  stepState: WalletAccountStateType.ACCOUNT_LOADED,
};
