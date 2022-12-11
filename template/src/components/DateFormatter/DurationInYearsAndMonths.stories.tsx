// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { addMonths } from "date-fns";

import { DurationInYearsAndMonth } from "./DurationInYearsAndMonths";

export default {
  title: "Components/DateFormatter/DurationInYearsAndMonth",
  component: DurationInYearsAndMonth,
  args: {
    dateStart: new Date(),
    dateEnd: addMonths(new Date(), 5),
  },
} as ComponentMeta<typeof DurationInYearsAndMonth>;

export const Default: ComponentStory<typeof DurationInYearsAndMonth> = (
  args
) => <DurationInYearsAndMonth {...args} />;
