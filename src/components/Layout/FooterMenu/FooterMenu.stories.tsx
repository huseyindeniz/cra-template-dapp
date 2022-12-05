// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import { FooterMenu } from ".";
import { LangCode, MenuItem } from "../../../config/types";

export default {
  title: "Layout/FooterMenu",
  component: FooterMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof FooterMenu>;

const mockPublicMenuItem1: MenuItem = {
  isProtected: false,
  isShownInFooter: true,
  isShownInMainMenu: false,
  label: {
    "en-US": "Public Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockPrivateMenuItem1: MenuItem = {
  isProtected: true,
  isShownInFooter: true,
  isShownInMainMenu: false,
  label: {
    "en-US": "Private Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockMainOnlyMenuItem1: MenuItem = {
  isProtected: false,
  isShownInFooter: false,
  isShownInMainMenu: true,
  label: {
    "en-US": "Main Menu Only Menu",
    "tr-TR": "",
  },
  name: "menu1",
  url: "/menu1",
};

const mockMenu = [
  mockPublicMenuItem1,
  mockPrivateMenuItem1,
  mockMainOnlyMenuItem1,
];

export const Default: ComponentStory<typeof FooterMenu> = (args) => (
  <FooterMenu {...args} />
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
