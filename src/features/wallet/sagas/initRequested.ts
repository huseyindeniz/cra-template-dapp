import { put, call } from "redux-saga/effects";

import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";
import { SlowDown } from "../sagas";
import { HandleStateAccountRequested } from "./accountRequested";

export function* HandleStateInitRequested(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.INIT_REQUESTED));
  yield call(SlowDown);
  let isProviderLoaded: boolean = false;
  let isError: boolean = false;
  try {
    isProviderLoaded = yield call(walletApi.loadProvider);
  } catch (error) {
    isProviderLoaded = false;
    isError = true;
  } finally {
    if (isProviderLoaded) {
      yield call(HandleStateAccountRequested, walletApi);
    } else {
      if (isError) {
        yield call(HandleStateInitFailed, "Wallet detection failed");
      } else {
        yield call(HandleStateNotSupported);
      }
    }
  }
}

export function* HandleStateInitFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(slicesActions.setWalletStatus(WalletStateType.INIT_FAILED));
}

export function* HandleStateNotSupported() {
  yield put(slicesActions.setWalletStatus(WalletStateType.NOT_SUPPORTED));
}
