// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MonthYear } from "./MonthYear";

export default {
  title: "Components/DateFormatter/MonthYear",
  component: MonthYear,
  args: {
    date: new Date(),
  },
} as ComponentMeta<typeof MonthYear>;

export const Default: ComponentStory<typeof MonthYear> = (args) => (
  <MonthYear {...args} />
);
