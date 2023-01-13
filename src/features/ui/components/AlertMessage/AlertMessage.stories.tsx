// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AlertMessage } from './AlertMessage';

export default {
  title: 'ui/Components/AlertMessage',
  component: AlertMessage,
} as ComponentMeta<typeof AlertMessage>;

const Template: ComponentStory<typeof AlertMessage> = args => (
  <AlertMessage {...args} />
);

export const Error = Template.bind({});
Error.args = {
  status: 'error',
  title: 'Mock Error Title',
  children: 'Mock error children.',
};

export const Info = Template.bind({});
Info.args = {
  status: 'info',
  title: 'Mock Info Title',
  children: 'Mock info children.',
};

export const Warning = Template.bind({});
Warning.args = {
  status: 'warning',
  title: 'Mock Warning Title',
  children: 'Mock warning children.',
};

export const Success = Template.bind({});
Success.args = {
  status: 'success',
  title: 'Mock Success Title',
  children: 'Mock success children.',
};

export const Loading = Template.bind({});
Loading.args = {
  status: 'loading',
  title: 'Mock Loading Title',
  children: 'Mock loading children.',
};
