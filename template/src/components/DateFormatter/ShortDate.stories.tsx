// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ShortDate } from "./ShortDate";

export default {
  title: "Components/DateFormatter/ShortDate",
  component: ShortDate,
  args: {
    date: new Date(),
    label: "My Mock Short Date Label",
  },
} as ComponentMeta<typeof ShortDate>;

export const Default: ComponentStory<typeof ShortDate> = (args) => (
  <ShortDate {...args} />
);
