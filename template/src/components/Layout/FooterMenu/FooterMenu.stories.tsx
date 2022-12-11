// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import { FooterMenu } from ".";
import { LangCode, MenuType } from "../../../config/types";

export default {
  title: "Layout/FooterMenu",
  component: FooterMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof FooterMenu>;

const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: true,
  isShownInMainMenu: false,
  menuLabel: "Public Menu",
  id: "menu1",
  path: "menu1",
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInFooter: true,
  isShownInMainMenu: false,
  menuLabel: "Private Menu",
  id: "menu1",
  path: "/menu1",
};

const mockMainOnlyMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: false,
  isShownInMainMenu: true,
  menuLabel: "Main Menu Only Menu",
  id: "menu1",
  path: "/menu1",
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
