// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { MenuType } from '../../../../../pages/types';

import { MainMenu } from './MainMenu';

const meta: Meta<typeof MainMenu> = {
  component: MainMenu,
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof MainMenu>;

const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInMainMenu: true,
  menuLabel: 'Public Menu',
  path: 'menu1',
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInMainMenu: true,
  menuLabel: 'Private Menu',
  path: 'menu1',
};

export const Public: Story = {
  args: {
    mainMenuItems: [mockPublicMenuItem1],
  },
};

export const Private: Story = {
  args: {
    mainMenuItems: [mockPrivateMenuItem1],
  },
};
