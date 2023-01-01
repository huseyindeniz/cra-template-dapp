// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { WalletProtectionWarning } from ".";

export default {
  title: "Components/WalletProtectionWarning",
  component: WalletProtectionWarning,
} as ComponentMeta<typeof WalletProtectionWarning>;

export const Default: ComponentStory<typeof WalletProtectionWarning> = (
  args
) => <WalletProtectionWarning />;
