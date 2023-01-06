// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { MainMenu } from './MainMenu';
//import { MenuType } from "../../../../../pages/types";

export default {
  title: 'ui/Components/Layout/MainMenu',
  component: MainMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof MainMenu>;

/* const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: false,
  isShownInMainMenu: true,
  menuLabel: "Public Menu",
  path: "menu1",
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInFooter: false,
  isShownInMainMenu: true,
  menuLabel: "Private Menu",
  path: "menu1",
};

const mockFooterOnlyMenuItem1: MenuType = {
  isProtected: false,
  isShownInFooter: true,
  isShownInMainMenu: false,
  menuLabel: "Footer Only Menu",
  path: "menu1",
};

const mockMenu = [
  mockPublicMenuItem1,
  mockPrivateMenuItem1,
  mockFooterOnlyMenuItem1,
]; */

export const Default: ComponentStory<typeof MainMenu> = args => (
  <MainMenu {...args} />
);

export const Public = Default.bind({});
Public.args = {};

export const Private = Default.bind({});
Private.args = {};
