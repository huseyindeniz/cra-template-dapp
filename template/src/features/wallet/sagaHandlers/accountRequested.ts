import { put, call, select } from "redux-saga/effects";

import * as slicesActions from "../slices";
import {
  WalletStateType,
  WalletAccountStateType,
  WalletGlobalStateType,
  IWalletAccountApi,
} from "../types";
import { RootState } from "../../../store";
import { SlowDown } from "./utils";

export function* HandleStateAccountRequested(
  walletAccountApi: IWalletAccountApi
) {
  yield put(
    slicesActions.setWalletAccountState(
      WalletAccountStateType.ACCOUNT_REQUESTED
    )
  );
  yield call(SlowDown);
  let isUnlocked: boolean = false;
  try {
    isUnlocked = yield call(walletAccountApi.isUnlocked);
  } catch (error) {
    isUnlocked = false;
  } finally {
    if (isUnlocked) {
      yield put(
        slicesActions.setWalletAccountState(
          WalletAccountStateType.ACCOUNT_LOADED
        )
      );
      return true;
    } else {
      yield call(HandleStateLocked);
      return false;
    }
  }
}

export function* HandleStateLocked() {
  yield put(slicesActions.setWalletAccountState(WalletAccountStateType.LOCKED));
}

export function* HandleStateUnlockRequested(
  walletAccountApi: IWalletAccountApi
) {
  yield put(
    slicesActions.setWalletAccountState(WalletAccountStateType.UNLOCK_REQUESTED)
  );
  yield call(SlowDown);
  let isUnlocked: boolean = false;
  let isRejected: boolean = false;
  try {
    yield call(walletAccountApi.unlock);
    const walletGlobalState: WalletGlobalStateType = yield select(
      (state: RootState) => state.wallet.globalState
    );
    if (
      walletGlobalState.state === WalletStateType.CHECKING_ACCOUNT &&
      walletGlobalState.accountState === WalletAccountStateType.UNLOCK_REQUESTED
    ) {
      isUnlocked = yield call(walletAccountApi.isUnlocked);
    }
  } catch (error) {
    if ((error as Error).message === "unlock_rejected") {
      isRejected = true;
    }
    isUnlocked = false;
  } finally {
    if (isUnlocked) {
      yield put(
        slicesActions.setWalletAccountState(
          WalletAccountStateType.ACCOUNT_LOADED
        )
      );
      return true;
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
  yield put(
    slicesActions.setWalletAccountState(WalletAccountStateType.UNLOCK_REJECTED)
  );
}

export function* HandleStateUnlockFailed() {
  yield put(
    slicesActions.setWalletAccountState(WalletAccountStateType.UNLOCK_FAILED)
  );
}
