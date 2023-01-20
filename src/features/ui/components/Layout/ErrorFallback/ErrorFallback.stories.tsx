// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorFallback } from './ErrorFallback';

export default {
  title: 'ui/Components/Layout/ErrorFallback',
  component: ErrorFallback,
} as ComponentMeta<typeof ErrorFallback>;

export const Default: ComponentStory<typeof ErrorFallback> = args => (
  <ErrorFallback error={new Error('Mock error message')} />
);
