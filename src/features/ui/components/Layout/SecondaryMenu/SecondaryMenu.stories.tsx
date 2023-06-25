// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { MenuType } from '../../../../../pages/types';

import { SecondaryMenu } from './SecondaryMenu';

const meta: Meta<typeof SecondaryMenu> = {
  component: SecondaryMenu,
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof SecondaryMenu>;

const mockPublicMenuItem1: MenuType = {
  isProtected: false,
  isShownInSecondaryMenu: true,
  menuLabel: 'Public Menu',
  path: 'menu1',
};

const mockPrivateMenuItem1: MenuType = {
  isProtected: true,
  isShownInSecondaryMenu: true,
  menuLabel: 'Private Menu',
  path: '/menu1',
};

const mockMenu = [mockPublicMenuItem1, mockPrivateMenuItem1];

export const Public: Story = {
  args: {
    secondaryMenuItems: mockMenu,
  },
};

export const Private: Story = {
  args: {
    secondaryMenuItems: mockMenu,
  },
};
