// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AlertMessage } from "./";

export default {
  title: "Components/AlertMessage",
  component: AlertMessage,
} as ComponentMeta<typeof AlertMessage>;

export const Default: ComponentStory<typeof AlertMessage> = (args) => (
  <AlertMessage {...args} />
);

export const Error = Default.bind({});
Error.args = {
  status: "error",
  title: "Mock Error Title",
  children: "Mock error children.",
};

export const Info = Default.bind({});
Info.args = {
  status: "info",
  title: "Mock Info Title",
  children: "Mock info children.",
};

export const Warning = Default.bind({});
Warning.args = {
  status: "warning",
  title: "Mock Warning Title",
  children: "Mock warning children.",
};

export const Success = Default.bind({});
Success.args = {
  status: "success",
  title: "Mock Success Title",
  children: "Mock success children.",
};
