// ProfileDropdownMenu.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { DropdownMenu } from './DropdownMenu';

export default {
  title: 'wallet/ProfileDropdownMenu',
  component: DropdownMenu,
  decorators: [withRouter],
  argTypes: {},
} as ComponentMeta<typeof DropdownMenu>;

export const Default: ComponentStory<typeof DropdownMenu> = args => (
  <DropdownMenu {...args} />
);
export const Address = Default.bind({});
Address.args = {
  address: '0x0000000000000000000000000000000000000000',
  ensOrAddressTruncated: '0x0000...0000',
};

export const Ens = Default.bind({});
Ens.args = {
  address: '0x0000000000000000000000000000000000000000',
  ensOrAddressTruncated: 'mockEnsName.eth',
};
