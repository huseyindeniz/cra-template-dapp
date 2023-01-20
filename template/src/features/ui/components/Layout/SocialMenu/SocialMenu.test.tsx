import { composeStories } from '@storybook/testing-react';
import { render, act } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import * as stories from './SocialMenu.stories';

describe('Feature: UI', () => {
  describe('Component: Layout/SocialMenu', () => {
    const { Default } = composeStories(stories);
    describe('Scenario: Default', () => {
      it('renders a GitHub and LinkedIn button', async () => {
        // Arrange + Act
        const { asFragment, getByRole } = await act(async () =>
          render(<Default {...Default.args} />)
        );
        // Assert
        expect(getByRole('button', { name: 'GitHub' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Linkedin' })).toBeInTheDocument();
        expect(asFragment).toMatchSnapshot();
      });
    });
  });
});
