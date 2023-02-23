// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountLoadState } from '../../../models/account/types/AccountLoadState';

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
  stepState: AccountLoadState.ACCOUNT_REQUESTED,
};

// ACCOUNT_DETECTION_FAILED
export const AccountDetectionFailed = Template.bind({});
AccountDetectionFailed.args = {
  stepState: AccountLoadState.ACCOUNT_DETECTION_FAILED,
  errorMessage: 'MockAccountDetectionFailedErrorCode',
  onUnlock: () => null,
};

// LOCKED
export const Locked = Template.bind({});
Locked.args = {
  stepState: AccountLoadState.LOCKED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_REQUESTED
export const UnlockRequested = Template.bind({});
UnlockRequested.args = {
  stepState: AccountLoadState.UNLOCK_REQUESTED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_REJECTED
export const UnlockRejected = Template.bind({});
UnlockRejected.args = {
  stepState: AccountLoadState.UNLOCK_REJECTED,
  errorMessage: null,
  onUnlock: () => null,
};

// UNLOCK_FAILED
export const UnlockFailed = Template.bind({});
UnlockFailed.args = {
  stepState: AccountLoadState.UNLOCK_FAILED,
  errorMessage: 'MockUnlockFailedErrorCode',
  onUnlock: () => null,
};

// ACCOUNT_LOADED
export const AccountLoaded = Template.bind({});
AccountLoaded.args = {
  stepState: AccountLoadState.ACCOUNT_LOADED,
};
