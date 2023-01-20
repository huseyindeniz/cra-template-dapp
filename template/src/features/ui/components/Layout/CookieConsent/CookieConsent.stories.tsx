// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CookieConsent } from './CookieConsent';

export default {
  title: 'ui/Components/Layout/CookieConsent',
  component: CookieConsent,
} as ComponentMeta<typeof CookieConsent>;

export const Default: ComponentStory<typeof CookieConsent> = args => (
  <CookieConsent debug={true} />
);
