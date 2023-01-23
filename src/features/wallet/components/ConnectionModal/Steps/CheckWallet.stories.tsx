// ConnectionModal.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletInitStateType } from '../../../models/WalletGlobalState';

import { CheckWallet } from './CheckWallet';

export default {
  title: 'wallet/ConnectionModal/Steps/CheckWallet',
  component: CheckWallet,
  excludeStories: [],
} as ComponentMeta<typeof CheckWallet>;

const Template: ComponentStory<typeof CheckWallet> = args => (
  <CheckWallet {...args} />
);

// IDLE
export const CheckWalletIdle = Template.bind({});

// INIT_REQUESTED
export const InitRequested = Template.bind({});
InitRequested.args = {
  stepState: WalletInitStateType.INIT_REQUESTED,
};

// NOT_SUPPORTED
export const NotSupported = Template.bind({});
NotSupported.args = {
  stepState: WalletInitStateType.NOT_SUPPORTED,
};

// INIT_FAILED
export const InitFailed = Template.bind({});
InitFailed.args = {
  stepState: WalletInitStateType.INIT_FAILED,
};

// INITIALIZED
export const Initialized = Template.bind({});
Initialized.args = {
  stepState: WalletInitStateType.INITIALIZED,
};
