import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import * as slicesActions from '../slices';
import { IWalletResetApi } from '../types';

import { HandleStateDisconnectRequested } from './disconnectRequested';

const mockWalletResetApi: IWalletResetApi = {
  reset: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateDisconnectRequested is called', () => {
    it('and IWalletResetApi.reset throws error, error should be set in the store.', () => {
      const error = new Error('Error resetting wallet');
      return expectSaga(HandleStateDisconnectRequested, mockWalletResetApi)
        .provide([[call(mockWalletResetApi.reset), throwError(error)]])
        .put(slicesActions.setError(error.message))
        .run();
    });
    it('and IWalletResetApi.reset does not throw error, no error should be set in the store.', () => {
      return expectSaga(HandleStateDisconnectRequested, mockWalletResetApi)
        .provide([[call(mockWalletResetApi.reset), null]])
        .not.put(slicesActions.setError(null))
        .run();
    });
  });
});
