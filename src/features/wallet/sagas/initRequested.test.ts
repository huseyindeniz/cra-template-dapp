import { call } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import * as slicesActions from "../slices";
import { SlowDown } from "../sagas";
import {
  HandleStateInitRequested,
  HandleStateInitFailed,
  HandleStateNotSupported,
} from "./initRequested";

import { IWalletApi, WalletStateType } from "../types";
import { HandleStateAccountRequested } from "./accountRequested";

const mockWalletApi: IWalletApi = {
  loadProvider: jest.fn(),
  loadNetwork: jest.fn(),
  switchNetwork: jest.fn(),
  unlock: jest.fn(),
  sign: jest.fn(),

  isEnsSupported: jest.fn(),
  isUnlocked: jest.fn(),
  isSigned: jest.fn(),

  getSigner: jest.fn(),
  getProvider: jest.fn(),
  getAccount: jest.fn(),
  getEns: jest.fn(),
  getNetwork: jest.fn(),
  getLatestBlock: jest.fn(),
  getBalance: jest.fn(),

  listenNetworkChange: jest.fn(),
  listenAccountChange: jest.fn(),

  handleNetworkChange: jest.fn(),
  handleAccountChange: jest.fn(),

  reset: jest.fn(),
};

//const mockNext = jest.fn(() => Promise.resolve());

describe("Step 0", () => {
  it("Init requested, init failed", () => {
    const error = new Error("Wallet detection failed");
    return expectSaga(HandleStateInitRequested, mockWalletApi)
      .provide([
        [call(mockWalletApi.loadProvider), throwError(error)],
        [call(SlowDown), null],
      ])
      .put(slicesActions.setWalletStatus(WalletStateType.INIT_REQUESTED))
      .call(HandleStateInitFailed, error.message)
      .run();
  });
  it("Init requested, wallet not detected", () => {
    return expectSaga(HandleStateInitRequested, mockWalletApi)
      .provide([
        [call(mockWalletApi.loadProvider), false],
        [call(SlowDown), null],
      ])
      .put(slicesActions.setWalletStatus(WalletStateType.INIT_REQUESTED))
      .call(HandleStateNotSupported)
      .run();
  });
  it("init requested, wallet detected", () => {
    return expectSaga(HandleStateInitRequested, mockWalletApi)
      .provide([
        [call(mockWalletApi.loadProvider), true],
        [call(SlowDown), null],
        [call(HandleStateAccountRequested, mockWalletApi), null],
      ])
      .put(slicesActions.setWalletStatus(WalletStateType.INIT_REQUESTED))
      .call(SlowDown)
      .call(HandleStateAccountRequested, mockWalletApi)
      .run();
  });
  it("wallet detection failed", () => {
    const mockErrorMessage = "wallet detection failed";
    testSaga(HandleStateInitFailed, mockErrorMessage)
      .next()
      .put(slicesActions.setError(mockErrorMessage))
      .next()
      .put(slicesActions.setWalletStatus(WalletStateType.INIT_FAILED))
      .next()
      .isDone();
  });
  it("wallet not detected", () => {
    testSaga(HandleStateNotSupported)
      .next()
      .put(slicesActions.setWalletStatus(WalletStateType.NOT_SUPPORTED))
      .next()
      .isDone();
  });
});
