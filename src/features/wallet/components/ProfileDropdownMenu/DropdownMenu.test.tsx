import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';

import * as stories from './DropdownMenu.stories';

const { Address, Ens } = composeStories(stories);

describe.skip('Feature: Wallet', () => {
  describe('Component: ProfileDropdownMenu/DropdownMenu', () => {
    it('renders address', () => {
      render(<Address {...Address.args} />);
      expect(screen).toMatchSnapshot();
    });
    it('renders ens', () => {
      render(<Ens {...Ens.args} />);
      expect(screen).toMatchSnapshot();
    });
  });
});
