// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SocialMenu } from './SocialMenu';

export default {
  title: 'ui/Components/Layout/SocialMenu',
  component: SocialMenu,
  args: {
    items: [
      {
        name: 'GitHub',
        link: 'https://github.com/yourusername',
      },
      {
        name: 'Instagram',
        link: 'https://instagram.com/yourusername',
      },
      {
        name: 'Linkedin',
        link: 'https://linkedin.com/yourusername',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/yourusername',
      },
      {
        name: 'YouTube',
        link: 'https://youtube.com/yourusername',
      },
      {
        name: 'Discord',
        link: 'https://discord.com/yourusername',
      },
      {
        name: 'Telegram',
        link: 'https://telegram.com/yourusername',
      },
    ],
  },
} as ComponentMeta<typeof SocialMenu>;

export const Default: ComponentStory<typeof SocialMenu> = args => (
  <SocialMenu {...args} />
);
