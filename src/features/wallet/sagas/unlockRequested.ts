import { put, call, select } from "redux-saga/effects";

import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";
import { RootState } from "../../../store";
import { HandleStateNetworkRequested } from "./networkRequested";

export function* HandleStateUnlockRequested(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.UNLOCK_REQUESTED));
  let isUnlocked: boolean = false;
  let isRejected: boolean = false;
  try {
    yield call(walletApi.unlock);
    const walletState: WalletStateType = yield select(
      (state: RootState) => state.wallet.state
    );
    if (walletState === WalletStateType.UNLOCK_REQUESTED) {
      isUnlocked = yield call(walletApi.isUnlocked);
    }
  } catch (error) {
    console.debug("error:", error);
    if (error === "unlock_rejected") {
      isRejected = true;
    }
    isUnlocked = false;
  } finally {
    if (isUnlocked) {
      yield call(HandleStateNetworkRequested, walletApi);
    } else {
      if (isRejected) {
        yield call(HandleStateUnlockRejected);
      } else {
        yield call(HandleStateUnlockFailed);
      }
      return false;
    }
  }
}

export function* HandleStateUnlockRejected() {
  yield put(slicesActions.setWalletStatus(WalletStateType.UNLOCK_REJECTED));
}

export function* HandleStateUnlockFailed() {
  yield put(slicesActions.setWalletStatus(WalletStateType.UNLOCK_FAILED));
}
