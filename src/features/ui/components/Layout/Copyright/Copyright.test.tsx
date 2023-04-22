import { render } from '@testing-library/react';

import { Copyright } from './Copyright';

describe('Feature: UI', () => {
  describe('Component: Layout/Copyright', () => {
    it('should be visible and show correct label and URL', () => {
      // Arrange
      const { asFragment, getByText } = render(<Copyright />);
      // Assert
      expect(getByText('dApp CRA Template v1.0.1')).toBeVisible();
      expect(asFragment).toMatchSnapshot();
    });
  });
});
