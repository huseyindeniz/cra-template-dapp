import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import * as walletStateSliceActions from '../../slice';
import { IWalletAccountApi } from '../IWalletAccountApi';

import { HandleStateDisconnectRequested } from './disconnectWallet';

const mockWalletResetApi: IWalletAccountApi = {
  isUnlocked: jest.fn(),
  unlock: jest.fn(),
  isSigned: jest.fn(),
  sign: jest.fn(),
  getAccount: jest.fn(),
  isEnsSupported: jest.fn(),
  getEns: jest.fn(),
  listenAccountChange: jest.fn(),
  handleAccountChange: jest.fn(),
  reset: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateDisconnectRequested is called', () => {
    it('and IWalletResetApi.reset throws error, error should be set in the store.', () => {
      const error = new Error('Error resetting wallet');
      return expectSaga(HandleStateDisconnectRequested, mockWalletResetApi)
        .provide([[call(mockWalletResetApi.reset), throwError(error)]])
        .put(walletStateSliceActions.setError(error.message))
        .run();
    });
    it('and IWalletResetApi.reset does not throw error, no error should be set in the store.', () => {
      return expectSaga(HandleStateDisconnectRequested, mockWalletResetApi)
        .provide([[call(mockWalletResetApi.reset), null]])
        .not.put(walletStateSliceActions.setError(null))
        .run();
    });
  });
});
