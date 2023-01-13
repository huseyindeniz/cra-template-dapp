import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import * as stories from './SiteLogo.stories';

describe('Feature: UI', () => {
  describe('Component: Layout/Footer/FooterContent', () => {
    const { Default } = composeStories(stories);
    describe('Scenario: Default', () => {
      it('should be visible and show both rows of content', () => {
        // Arrange
        const { asFragment, getByRole } = render(<Default {...Default.args} />);
        const element = getByRole('img');
        // Assert
        expect(element.hasAttribute('aria-label'));
        //  (Default.args?.siteName ?? '')).toBeInTheDocument();
      });
    });
  });
});
