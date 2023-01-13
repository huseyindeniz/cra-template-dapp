// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SocialMenu } from './SocialMenu';

export default {
  title: 'ui/Components/Layout/SocialMenu',
  component: SocialMenu,
} as ComponentMeta<typeof SocialMenu>;

const Template: ComponentStory<typeof SocialMenu> = args => (
  <SocialMenu {...args} />
);

export const Default = Template.bind({});
