// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Copyright } from ".";
import {
  copyrightLabel,
  copyrightUrl,
  copyrightLogoUrl,
} from "../../../config";
export default {
  title: "Layout/Copyright",
  component: Copyright,
  args: {
    copyrightLabel: copyrightLabel,
    copyrightLogoUrl: copyrightLogoUrl,
    copyrightUrl: copyrightUrl,
  },
} as ComponentMeta<typeof Copyright>;

export const Default: ComponentStory<typeof Copyright> = (args) => (
  <Copyright {...args} />
);
