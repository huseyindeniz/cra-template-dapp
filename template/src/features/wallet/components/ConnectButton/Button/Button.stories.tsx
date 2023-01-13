// Button.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Wallet/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const NotLoading: ComponentStory<typeof Button> = (
  args: ButtonProps
) => <Button {...args} />;

export const Loading: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} isLoading={true} />
);
