import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './Button.stories';

describe('Feature: Wallet', () => {
  describe('Component: ConnectButton/Button', () => {
    const { NotLoading, Loading } = composeStories(stories);
    const onClickSpy = jest.fn();
    describe('Scenario: NotLoading', () => {
      it('should be visible and clickable', () => {
        // Act
        const { asFragment, getByText, getByRole } = render(
          <NotLoading onClick={onClickSpy} />
        );
        getByRole('button').click();
        // Assert
        const actualButton = getByText('Connect');

        expect(actualButton).toBeVisible();
        expect(onClickSpy).toHaveBeenCalled();
        expect(asFragment).toMatchSnapshot();
      });
    });
    describe('Scenario: Loading', () => {
      it('should be visible, display loading spinner and disabled', () => {
        // Arrange
        const { asFragment, getByRole } = render(
          <Loading {...Loading.args} onClick={onClickSpy} />
        );
        // Act
        getByRole('button').click();
        // Assert
        const actualButton = getByRole('button');

        expect(actualButton).toHaveTextContent('Connect');
        expect(onClickSpy).not.toHaveBeenCalled();
        expect(asFragment).toMatchSnapshot();
      });
    });
  });
});
