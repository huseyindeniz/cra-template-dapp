import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageLoading } from './PageLoading';

export default {
  title: 'ui/Components/Layout/PageLoading',
  component: PageLoading,
} as ComponentMeta<typeof PageLoading>;

const Template: ComponentStory<typeof PageLoading> = args => (
  <PageLoading {...args} />
);

export const Default = Template.bind({});
