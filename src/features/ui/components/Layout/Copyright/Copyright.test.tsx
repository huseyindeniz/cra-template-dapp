import { render } from '@testing-library/react';

import { Copyright } from './Copyright';

describe('Feature: UI', () => {
  describe('Component: Layout/Copyright', () => {
    it('should be visible and show correct label and URL', () => {
      // Arrange
      const { asFragment, getByText } = render(<Copyright />);
      // Assert
      expect(getByText('powered by CRA Template: dApp v1.1.0')).toBeVisible();
      expect(asFragment).toMatchSnapshot();
    });
  });
});
