// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Copyright } from './Copyright';
export default {
  title: 'ui/Components/Layout/Copyright',
  component: Copyright,
} as ComponentMeta<typeof Copyright>;

export const Default: ComponentStory<typeof Copyright> = args => (
  <Copyright {...args} />
);
