// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProtectedRouteWarning } from ".";

export default {
  title: "Components/ProtectedRouteWarning",
  component: ProtectedRouteWarning,
} as ComponentMeta<typeof ProtectedRouteWarning>;

export const Default: ComponentStory<typeof ProtectedRouteWarning> = (args) => (
  <ProtectedRouteWarning />
);
