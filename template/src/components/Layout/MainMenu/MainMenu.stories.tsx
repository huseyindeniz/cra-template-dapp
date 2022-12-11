// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

import { MainMenu } from ".";
import { LangCode, MenuType } from "../../../config/types";

export default {
  title: "Layout/MainMenu",
  component: MainMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof MainMenu>;

const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: false,
  isShownInMainMenu: true,
  menuLabel: "Public Menu",
  id: "menu1",
  path: "menu1",
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInFooter: false,
  isShownInMainMenu: true,
  menuLabel: "Private Menu",
  id: "menu1",
  path: "menu1",
};

const mockFooterOnlyMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: true,
  isShownInMainMenu: false,
  menuLabel: "Footer Only Menu",
  id: "menu1",
  path: "menu1",
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
