// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { addDays, addSeconds, subMinutes } from "date-fns";

import { CountDown } from ".";

export default {
  title: "Components/CountDown",
  component: CountDown,
  args: {
    endTime: new Date(),
  },
} as ComponentMeta<typeof CountDown>;

export const Default: ComponentStory<typeof CountDown> = (args) => (
  <CountDown {...args} />
);

export const Valid = Default.bind({});
Valid.args = {
  endTime: addDays(new Date(), 1),
  label: "Mock Count Down Valid Title",
};

export const ValidClose = Default.bind({});
ValidClose.args = {
  endTime: addSeconds(new Date(), 10),
  label: "Mock Count Down Valid and Close To End Title",
};

export const Invalid = Default.bind({});
Invalid.args = {
  endTime: subMinutes(new Date(), 1),
  label: "Mock Cound Down Invalid Title",
};
