// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Wallet/ConnectButton",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Loading = Default.bind({});
Loading.args = {
  isLoading: true,
};
