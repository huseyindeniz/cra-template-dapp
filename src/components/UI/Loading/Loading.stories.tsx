// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Loading } from ".";

export default {
  title: "Components/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Default: ComponentStory<typeof Loading> = (args) => (
  <Loading message="Mock Loading Message" />
);
