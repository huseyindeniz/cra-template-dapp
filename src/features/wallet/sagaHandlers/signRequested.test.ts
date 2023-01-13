import { Task } from 'redux-saga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call, spawn, put, delay, select, cancel } from 'redux-saga/effects';

import { RootState } from '../../../store/store';
import * as actions from '../actions';
import { SIGN_TIMEOUT_IN_SEC } from '../config';
import * as slicesActions from '../slices';
import {
  WalletStateType,
  AccountType,
  WalletGlobalStateType,
  WalletSignStateType,
  IWalletSignApi,
} from '../types';

import {
  CheckSignTimeout,
  HandleStateSignFailed,
  HandleStateSignRejected,
  HandleStateSignRequested,
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
});
