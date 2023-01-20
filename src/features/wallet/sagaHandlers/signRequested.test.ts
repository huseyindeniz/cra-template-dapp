import { call, spawn, put, delay, select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { SIGN_TIMEOUT_IN_SEC } from '../config';
import * as slicesActions from '../slices';
import { WalletStateType, WalletSignStateType, IWalletSignApi } from '../types';

import {
  CheckSignTimeout,
  HandleStateSignFailed,
  HandleStateSignRejected,
  HandleStateSignRequested,
  HandleStateSignTimedout,
} from './signRequested';
import { SlowDown } from './utils';

const mockWalletSignApi: IWalletSignApi = {
  sign: jest.fn(),
  isSigned: jest.fn(),
  getAccount: jest.fn(),
};

const message = 'test message';

describe('Feature: Wallet', () => {
  describe('When HandleStateSignRequested is called', () => {
    it('and IWalletSignApi.sign throws error, HandleStateSignFailed should be called with error message.', () => {
      const error = new Error('SIGN_FAILED');
      return expectSaga(HandleStateSignRequested, mockWalletSignApi, message)
        .provide([
          [spawn(CheckSignTimeout), null],
          [call(SlowDown), null],
          [call(mockWalletSignApi.sign, message), throwError(error)],
        ])
        .put(
          slicesActions.setWalletSignState(WalletSignStateType.SIGN_REQUESTED)
        )
        .call(SlowDown)
        .call(HandleStateSignFailed, error.message)
        .run();
    });

    it('and IWalletSignApi.sign throws error with "sign_rejected" message, HandleStateSignRejected should be called.', () => {
      const error = new Error('sign_rejected');
      return expectSaga(HandleStateSignRequested, mockWalletSignApi, message)
        .provide([
          [spawn(CheckSignTimeout), null],
          [call(SlowDown), null],
          [call(mockWalletSignApi.sign, message), throwError(error)],
        ])
        .put(
          slicesActions.setWalletSignState(WalletSignStateType.SIGN_REQUESTED)
        )
        .call(SlowDown)
        .call(HandleStateSignRejected)
        .run();
    });
  });

  describe('When CheckSignTimeout is called', () => {
    it('should handle the sign timeout correctly', () => {
      const getState = () => ({
        wallet: {
          globalState: {
            state: WalletStateType.CHECKING_SIGN,
            signState: WalletSignStateType.SIGN_REQUESTED,
          },
        },
      });

      return expectSaga(CheckSignTimeout)
        .provide([
          [select(getState), getState()],
          [call(HandleStateSignTimedout), null],
          [put(slicesActions.decSignCounter()), null],
          [put(slicesActions.resetSignCounter()), null],
          [delay(1000), null],
        ])
        .withState(getState())
        .call(HandleStateSignTimedout)
        .put(slicesActions.decSignCounter())
        .put(slicesActions.resetSignCounter())
        .run(SIGN_TIMEOUT_IN_SEC * 1000);
    });
  });

  describe('When HandleStateSignRejected is called', () => {
    it('should set state as SIGN_REJECTED', () => {
      testSaga(HandleStateSignRejected)
        .next()
        .put(
          slicesActions.setWalletSignState(WalletSignStateType.SIGN_REJECTED)
        )
        .next()
        .isDone();
    });
  });

  describe('When HandleStateSignTimedout is called', () => {
    it('should set state as SIGN_TIMED_OUT', () => {
      testSaga(HandleStateSignTimedout)
        .next()
        .put(
          slicesActions.setWalletSignState(WalletSignStateType.SIGN_TIMED_OUT)
        )
        .next()
        .isDone();
    });
  });

  describe('When HandleStateSignFailed is called', () => {
    it('should call setError and setWalletSignState actions with the correct payload', () => {
      const error = 'mock sign error';
      testSaga(HandleStateSignFailed, error)
        .next()
        .put(slicesActions.setError(error))
        .next()
        .put(slicesActions.setWalletSignState(WalletSignStateType.SIGN_FAILED))
        .next()
        .isDone();
    });
  });
});
