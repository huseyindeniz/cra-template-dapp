// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Copyright } from ".";
export default {
  title: "Layout/Copyright",
  component: Copyright,
} as ComponentMeta<typeof Copyright>;

export const Default: ComponentStory<typeof Copyright> = (args) => (
  <Copyright {...args} />
);
