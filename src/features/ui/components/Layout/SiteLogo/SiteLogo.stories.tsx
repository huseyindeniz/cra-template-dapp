// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { SiteLogo } from './SiteLogo';

jest.mock('../../../../../pages/usePageLink.tsx', () => {
  return {
    usePageLink: jest.fn(() => '/'),
  };
});

export default {
  title: 'ui/Components/Layout/SiteLogo',
  component: SiteLogo,
  decorators: [withRouter],
} as ComponentMeta<typeof SiteLogo>;

const Template: ComponentStory<typeof SiteLogo> = args => (
  <SiteLogo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  siteName: 'Mock Site Name',
};
