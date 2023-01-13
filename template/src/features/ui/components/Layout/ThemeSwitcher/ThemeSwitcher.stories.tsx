// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'ui/Components/Layout/ThemeSwitcher',
  component: ThemeSwitcher,
  args: {},
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = args => (
  <ThemeSwitcher {...args} />
);

export const Default = Template.bind({});
