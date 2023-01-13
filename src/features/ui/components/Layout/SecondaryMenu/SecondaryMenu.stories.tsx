// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { MenuType } from '../../../../../pages/types';

import { SecondaryMenu } from './SecondaryMenu';

export default {
  title: 'ui/Components/Layout/SecondaryMenu',
  component: SecondaryMenu,
  decorators: [withRouter],
} as ComponentMeta<typeof SecondaryMenu>;

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

export const Default: ComponentStory<typeof SecondaryMenu> = args => (
  <SecondaryMenu {...args} />
);

export const Public = Default.bind({});
Public.args = {
  items: mockMenu,
};

export const Private = Default.bind({});
Private.args = {
  items: mockMenu,
};
