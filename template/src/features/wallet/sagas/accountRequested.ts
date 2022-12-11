import { put, call } from "redux-saga/effects";

import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";
import { HandleStateNetworkRequested } from "./networkRequested";

export function* HandleStateAccountRequested(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.ACCOUNT_REQUESTED));
  let isUnlocked: boolean = false;
  try {
    isUnlocked = yield call(walletApi.isUnlocked);
  } catch (error) {
    isUnlocked = false;
  } finally {
    if (isUnlocked) {
      yield call(HandleStateNetworkRequested, walletApi);
    } else {
      yield call(HandleStateLocked);
    }
  }
}

function* HandleStateLocked() {
  yield put(slicesActions.setWalletStatus(WalletStateType.LOCKED));
}
