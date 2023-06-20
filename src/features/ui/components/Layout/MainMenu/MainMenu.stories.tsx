// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
//import { withRouter } from 'storybook-addon-react-router-v6';

import { MainMenu } from './MainMenu';
//import { MenuType } from "../../../../../pages/types";

const meta: Meta<typeof MainMenu> = { component: MainMenu };
export default meta;

type Story = StoryObj<typeof MainMenu>;

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

export const Public: Story = {
  args: {},
};

export const Private: Story = {
  args: {},
};
