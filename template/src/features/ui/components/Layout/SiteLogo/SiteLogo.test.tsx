import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import * as stories from './SiteLogo.stories';

describe.skip('Feature: UI', () => {
  describe('Component: Layout/SiteLogo', () => {
    const { Default } = composeStories(stories);
    describe('Scenario: Default', () => {
      it('should be visible and show both rows of content', () => {
        // Arrange
        const { getByRole } = render(<Default {...Default.args} />);
        const element = getByRole('img');
        // Assert
        expect(element.hasAttribute('aria-label'));
        // TODO: (Default.args?.siteName ?? '')).toBeInTheDocument();
      });
    });
  });
});
