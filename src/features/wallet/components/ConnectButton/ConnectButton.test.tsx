import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { connectWallet } from '../../actions';
import { LoadingStatusType } from '../../types';

import { ConnectButton } from './ConnectButton';

const mockStore = configureStore([]);
describe.skip('Feature: Wallet', () => {
  describe('ConnectButton', () => {
    afterEach(() => {
      cleanup();
    });
    it('should be visible and enabled', async () => {
      // Arrange
      const store = mockStore({
        wallet: {
          loading: LoadingStatusType.IDLE,
        },
      });
      // Act
      const { queryByRole } = render(
        <Provider store={store}>
          <ConnectButton />
        </Provider>
      );
      // Assert
      const received = queryByRole('button');
      received?.click();
      const receivedDispatchedActions = store.getActions();
      expect(connectWallet.match(receivedDispatchedActions[0])).toBe(true);
    });
  });
});
