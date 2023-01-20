import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './WalletProtectionWarning.stories';

describe('Feature: Wallet', () => {
  describe('Component: ConnectButton/WalletProtectionWarning', () => {
    const { Default } = composeStories(stories);
    describe('Scenario: Default', () => {
      it('should be visible and clickable', () => {
        // Arrange
        const expectedTitle = 'Access Denied';
        // Act
        const { asFragment, getByText } = render(<Default />);
        // Assert
        const actualTitle = getByText(expectedTitle);
        expect(actualTitle).toBeVisible();
        expect(asFragment).toMatchSnapshot();
      });
    });
  });
});
