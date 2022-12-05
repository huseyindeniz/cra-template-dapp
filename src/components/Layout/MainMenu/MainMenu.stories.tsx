// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import { MainMenu } from ".";
import { LangCode, MenuItem } from "../../../config/types";

export default {
  title: "Layout/MainMenu",
  component: MainMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof MainMenu>;

const mockPublicMenuItem1: MenuItem = {
  isProtected: false,
  isShownInFooter: false,
  isShownInMainMenu: true,
  label: {
    "en-US": "Public Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockPrivateMenuItem1: MenuItem = {
  isProtected: true,
  isShownInFooter: false,
  isShownInMainMenu: true,
  label: {
    "en-US": "Private Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockFooterOnlyMenuItem1: MenuItem = {
  isProtected: false,
  isShownInFooter: true,
  isShownInMainMenu: false,
  label: {
    "en-US": "Footer Only Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockMenu = [
  mockPublicMenuItem1,
  mockPrivateMenuItem1,
  mockFooterOnlyMenuItem1,
];

export const Default: ComponentStory<typeof MainMenu> = (args) => (
  <MainMenu {...args} />
);

export const Public = Default.bind({});
Public.args = {
  currentLangCode: LangCode.EN_US,
  isAuthenticated: false,
  items: mockMenu,
};

export const Private = Default.bind({});
Private.args = {
  currentLangCode: LangCode.EN_US,
  isAuthenticated: true,
  items: mockMenu,
};
