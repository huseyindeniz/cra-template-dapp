// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WalletProtectionWarning } from './WalletProtectionWarning';

export default {
  title: 'wallet/WalletProtectionWarning',
  component: WalletProtectionWarning,
} as ComponentMeta<typeof WalletProtectionWarning>;

export const Default: ComponentStory<typeof WalletProtectionWarning> = args => (
  <WalletProtectionWarning />
);
