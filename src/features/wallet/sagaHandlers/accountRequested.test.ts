import { call } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import * as slicesActions from '../slices';
import {
  IWalletAccountApi,
  WalletAccountStateType,
  WalletStateType,
} from '../types';

import {
  HandleStateAccountRequested,
  HandleStateLocked,
  HandleStateUnlockFailed,
  HandleStateUnlockRejected,
  HandleStateUnlockRequested,
} from './accountRequested';
import { SlowDown } from './utils';

const mockWalletAccountApi: IWalletAccountApi = {
  isUnlocked: jest.fn(),
  unlock: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateAccountRequested is called', () => {
    it('and IWalletAccountApi.isUnlocked throws error, HandleStateLocked should be called.', () => {
      const error = new Error('mock isUnlocked error');
      return expectSaga(HandleStateAccountRequested, mockWalletAccountApi)
        .provide([
          [call(mockWalletAccountApi.isUnlocked), throwError(error)],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.ACCOUNT_REQUESTED
          )
        )
        .call(SlowDown)
        .call(HandleStateLocked)
        .run();
    });
    it('and IWalletAccountApi.isUnlocked returns false, HandleStateLocked should be called.', () => {
      return expectSaga(HandleStateAccountRequested, mockWalletAccountApi)
        .provide([
          [call(mockWalletAccountApi.isUnlocked), false],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.ACCOUNT_REQUESTED
          )
        )
        .call(SlowDown)
        .call(HandleStateLocked)
        .run();
    });
    it('and IWalletAccountApi.isUnlocked returns true, WalletAccountState should be updated as ACCOUNT_LOADED.', () => {
      return expectSaga(HandleStateAccountRequested, mockWalletAccountApi)
        .provide([
          [call(mockWalletAccountApi.isUnlocked), true],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.ACCOUNT_REQUESTED
          )
        )
        .call(SlowDown)
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.ACCOUNT_LOADED
          )
        )
        .run();
    });
  });
  describe('When HandleStateLocked is called', () => {
    it('WalletAccountState should be updated as LOCKED', () => {
      testSaga(HandleStateLocked)
        .next()
        .put(slicesActions.setWalletAccountState(WalletAccountStateType.LOCKED))
        .next()
        .isDone();
    });
  });
  describe('When HandleStateUnlockRequested is called', () => {
    it('and IWalletAccountApi.unlock throws unlock_rejected error, HandleStateUnlockRejected should be called.', () => {
      const error = new Error('unlock_rejected');
      return expectSaga(HandleStateUnlockRequested, mockWalletAccountApi)
        .provide([
          [call(mockWalletAccountApi.unlock), throwError(error)],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.UNLOCK_REQUESTED
          )
        )
        .call(SlowDown)
        .call(HandleStateUnlockRejected)
        .run();
    });
    it('and IWalletAccountApi.unlock throws error, HandleStateUnlockFailed should be called.', () => {
      const error = new Error('mock unlock error');
      return expectSaga(HandleStateUnlockRequested, mockWalletAccountApi)
        .provide([
          [call(mockWalletAccountApi.unlock), throwError(error)],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.UNLOCK_REQUESTED
          )
        )
        .call(SlowDown)
        .call(HandleStateUnlockFailed)
        .run();
    });
    it("and IWalletAccountApi.unlock doesn't throw error, WalletAccountState should be updated as ACCOUNT_LOADED.", () => {
      const mockState = {
        wallet: {
          globalState: {
            state: WalletStateType.CHECKING_ACCOUNT,
            accountState: WalletAccountStateType.UNLOCK_REQUESTED,
          },
        },
      };
      return expectSaga(HandleStateUnlockRequested, mockWalletAccountApi)
        .withState(mockState)
        .provide([
          [call(mockWalletAccountApi.unlock), null],
          [call(mockWalletAccountApi.isUnlocked), true],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.UNLOCK_REQUESTED
          )
        )
        .call(SlowDown)
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.ACCOUNT_LOADED
          )
        )
        .run();
    });
  });
  describe('When HandleStateUnlockRejected is called', () => {
    it('WalletAccountState should be updated as UNLOCK_REJECTED', () => {
      testSaga(HandleStateUnlockRejected)
        .next()
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.UNLOCK_REJECTED
          )
        )
        .next()
        .isDone();
    });
  });
  describe('When HandleStateUnlockFailed is called', () => {
    it('WalletAccountState should be updated as UNLOCK_FAILED', () => {
      testSaga(HandleStateUnlockFailed)
        .next()
        .put(
          slicesActions.setWalletAccountState(
            WalletAccountStateType.UNLOCK_FAILED
          )
        )
        .next()
        .isDone();
    });
  });
});
