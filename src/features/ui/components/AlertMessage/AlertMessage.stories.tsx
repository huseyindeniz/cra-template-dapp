// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';

import { AlertMessage } from './AlertMessage';

const meta: Meta<typeof AlertMessage> = { component: AlertMessage };
export default meta;

type Story = StoryObj<typeof AlertMessage>;

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Mock Error Title',
    children: 'Mock error children.',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Mock Info Title',
    children: 'Mock info children.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Mock Warning Title',
    children: 'Mock warning children.',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Mock Success Title',
    children: 'Mock success children.',
  },
};

export const Loading: Story = {
  args: {
    status: 'loading',
    title: 'Mock Loading Title',
    children: 'Mock loading children.',
  },
};
