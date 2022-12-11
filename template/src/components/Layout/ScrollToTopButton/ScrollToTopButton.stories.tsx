// ConnectButton.stories.ts|tsx
import { Box } from "@chakra-ui/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ScrollToTopButton } from "./";

export default {
  title: "Layout/ScrollToTopButton",
  component: ScrollToTopButton,
  args: {},
} as ComponentMeta<typeof ScrollToTopButton>;

export const Default: ComponentStory<typeof ScrollToTopButton> = (args) => (
  <Box height={2000} border={"1px solid red"}>
    Scroll to bottom and check right bottom corner
    <ScrollToTopButton {...args} />
  </Box>
);
