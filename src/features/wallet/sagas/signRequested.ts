import { put, spawn, call, delay, select, cancel } from "redux-saga/effects";
import { Task } from "redux-saga";

import * as slicesActions from "../slices";
import { WalletStateType, AccountType, IWalletApi } from "../types";
import { RootState } from "../../../store";
import { SIGN_TIMEOUT_IN_SEC } from "../config";
import { SlowDown } from "../sagas";
import { HandleStateUserAuthenticated } from "./userAuthenticated";
import { WalletSignMessage } from "../../../config";
import { LangCode } from "../../../config/types";

// Cancellable Task Handlers
let taskSign: Task;

export function* HandleStateNotSigned() {
  yield put(slicesActions.setWalletStatus(WalletStateType.NOT_SIGNED));
}

export function* HandleStateSignRequested(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.SIGN_REQUESTED));
  yield call(SlowDown);

  let isSigned: boolean = false;
  let isRejected: boolean = false;
  try {
    yield spawn(CheckSignTimeout);
    yield call(walletApi.sign, WalletSignMessage[LangCode.EN_US]);
    const walletState: WalletStateType = yield select(
      (state: RootState) => state.wallet.state
    );
    if (walletState === WalletStateType.SIGN_REQUESTED) {
      isSigned = yield call(walletApi.isSigned);
    }
  } catch (error) {
    if ((error as Error).message === "sign_rejected") {
      isRejected = true;
    }
    isSigned = false;
  } finally {
    if (isSigned) {
      yield call(HandleStateSigned, walletApi);
    } else {
      if (isRejected) {
        yield call(HandleStateSignRejected);
      } else {
        yield call(HandleStateSignFailed, "SIGN_FAILED");
      }
    }
  }
}

export function* CheckSignTimeout() {
  for (let i = SIGN_TIMEOUT_IN_SEC; i > 0; i--) {
    yield delay(1000);
    yield put(slicesActions.decSignCounter());
    const walletState: WalletStateType = yield select(
      (state: RootState) => state.wallet.state
    );
    if (walletState !== WalletStateType.SIGN_REQUESTED) {
      break;
    }
  }
  const walletState: WalletStateType = yield select(
    (state: RootState) => state.wallet.state
  );
  yield cancel(taskSign);
  if (walletState === WalletStateType.SIGN_REQUESTED) {
    yield call(HandleStateSignTimedout);
  }
  yield put(slicesActions.resetSignCounter());
}

export function* HandleStateSignRejected() {
  yield put(slicesActions.setWalletStatus(WalletStateType.SIGN_REJECTED));
}

export function* HandleStateSignTimedout() {
  yield put(slicesActions.setWalletStatus(WalletStateType.SIGN_TIMED_OUT));
}

export function* HandleStateSignFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(slicesActions.setWalletStatus(WalletStateType.SIGN_FAILED));
}

export function* HandleStateSigned(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.SIGNED));
  yield call(SlowDown);
  // store user info
  const accountData: AccountType | null = yield call(walletApi.getAccount);
  if (accountData) {
    yield put(slicesActions.setAccount(accountData));
  }
  yield call(HandleStateUserAuthenticated, walletApi);
}
