// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeSwitcher } from ".";

export default {
  title: "Layout/ThemeSwitcher",
  component: ThemeSwitcher,
  args: {},
} as ComponentMeta<typeof ThemeSwitcher>;

export const Default: ComponentStory<typeof ThemeSwitcher> = (args) => (
  <ThemeSwitcher {...args} />
);
