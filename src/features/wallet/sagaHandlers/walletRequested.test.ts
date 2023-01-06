import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';

import * as slicesActions from '../slices';
import { IWalletInitApi, WalletInitStateType } from '../types';

import { SlowDown } from './utils';
import {
  HandleStateWalletRequested,
  HandleStateWalletFailed,
  HandleStateWalletNotSupported,
} from './walletRequested';

const mockWalletInitApi: IWalletInitApi = {
  loadProvider: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateWalletRequested is called', () => {
    it('and IWalletInitApi.loadProvider throws error, HandleStateWalletFailed should be called.', () => {
      const error = new Error('Wallet detection failed');
      return expectSaga(HandleStateWalletRequested, mockWalletInitApi)
        .provide([
          [call(mockWalletInitApi.loadProvider), throwError(error)],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletInitState(WalletInitStateType.INIT_REQUESTED)
        )
        .call(SlowDown)
        .call(HandleStateWalletFailed, error.message)
        .run();
    });
    it('and IWalletInitApi.loadProvider returns false, HandleStateWalletNotSupported should be called.', () => {
      return expectSaga(HandleStateWalletRequested, mockWalletInitApi)
        .provide([
          [call(mockWalletInitApi.loadProvider), false],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletInitState(WalletInitStateType.INIT_REQUESTED)
        )
        .call(SlowDown)
        .call(HandleStateWalletNotSupported)
        .run();
    });
    it('and IWalletInitApi.loadProvider returns true, WalletInitState should be updated as INITIALIZED.', () => {
      return expectSaga(HandleStateWalletRequested, mockWalletInitApi)
        .provide([
          [call(mockWalletInitApi.loadProvider), true],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletInitState(WalletInitStateType.INIT_REQUESTED)
        )
        .call(SlowDown)
        .put(slicesActions.setWalletInitState(WalletInitStateType.INITIALIZED))
        .run();
    });
  });
  describe('When HandleStateWalletFailed is called', () => {
    it('WalletInitState should be updated as INIT_FAILED', () => {
      const mockErrorMessage = 'wallet detection failed';
      testSaga(HandleStateWalletFailed, mockErrorMessage)
        .next()
        .put(slicesActions.setError(mockErrorMessage))
        .next()
        .put(slicesActions.setWalletInitState(WalletInitStateType.INIT_FAILED))
        .next()
        .isDone();
    });
  });
  describe('When HandleStateWalletNotSupported is called', () => {
    it('WalletInitState should be updated as NOT_SUPPORTED', () => {
      testSaga(HandleStateWalletNotSupported)
        .next()
        .put(
          slicesActions.setWalletInitState(WalletInitStateType.NOT_SUPPORTED)
        )
        .next()
        .isDone();
    });
  });
});
