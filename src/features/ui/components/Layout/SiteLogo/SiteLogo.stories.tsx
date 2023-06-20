// ConnectButton.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
//import { withRouter } from 'storybook-addon-react-router-v6';

import { SiteLogo } from './SiteLogo';

jest.mock('../../../../../pages/usePageLink.tsx', () => {
  return {
    usePageLink: jest.fn(() => '/'),
  };
});

const meta: Meta<typeof SiteLogo> = { component: SiteLogo };
export default meta;

type Story = StoryObj<typeof SiteLogo>;

export const Default: Story = {
  args: {
    siteName: 'Mock Site Name',
  },
};
