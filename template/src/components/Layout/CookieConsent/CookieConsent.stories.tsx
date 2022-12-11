// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CookieConsent } from ".";

export default {
  title: "Layout/CookieConsent",
  component: CookieConsent,
} as ComponentMeta<typeof CookieConsent>;

export const Default: ComponentStory<typeof CookieConsent> = (args) => (
  <CookieConsent debug={true} />
);
