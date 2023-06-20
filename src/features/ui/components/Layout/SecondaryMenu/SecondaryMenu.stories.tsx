// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
//import { withRouter } from 'storybook-addon-react-router-v6';

import { MenuType } from '../../../../../pages/types';

import { SecondaryMenu } from './SecondaryMenu';

const meta: Meta<typeof SecondaryMenu> = { component: SecondaryMenu };
export default meta;

type Story = StoryObj<typeof SecondaryMenu>;

const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInMainMenu: false,
  isShownInSecondaryMenu: true,
  menuLabel: 'Public Menu',
  path: 'menu1',
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInMainMenu: false,
  isShownInSecondaryMenu: true,
  menuLabel: 'Private Menu',
  path: '/menu1',
};

const mockMainOnlyMenuItem1: MenuType = {
  isProtected: false,
  isShownInMainMenu: true,
  isShownInSecondaryMenu: false,
  menuLabel: 'Main Menu Only Menu',
  path: '/menu1',
};

const mockMenu = [
  mockPublicMenuItem1,
  mockPrivateMenuItem1,
  mockMainOnlyMenuItem1,
];

export const Public: Story = {
  args: {
    items: mockMenu,
  },
};

export const Private: Story = {
  args: {
    items: mockMenu,
  },
};
