import { put, spawn, call, delay, select, cancel } from "redux-saga/effects";
import { Task } from "redux-saga";

import * as actions from "../actions";
import * as slicesActions from "../slices";
import {
  WalletStateType,
  AccountType,
  WalletGlobalStateType,
  WalletSignStateType,
  IWalletSignApi,
} from "../types";
import { RootState } from "../../../store";
import { SIGN_TIMEOUT_IN_SEC } from "../config";
import { SlowDown } from "./utils";

// Cancellable Task Handlers
let taskSign: Task;

export function* HandleStateNotSigned() {
  yield put(slicesActions.setWalletSignState(WalletSignStateType.NOT_SIGNED));
}

export function* HandleStateSignRequested(
  walletSignApi: IWalletSignApi,
  message: string
) {
  yield put(
    slicesActions.setWalletSignState(WalletSignStateType.SIGN_REQUESTED)
  );
  yield call(SlowDown);
  let isSigned: boolean = false;
  let isRejected: boolean = false;
  try {
    yield spawn(CheckSignTimeout);
    yield call(walletSignApi.sign, message);
    const walletGlobalState: WalletGlobalStateType = yield select(
      (state: RootState) => state.wallet.globalState
    );
    if (
      walletGlobalState.state === WalletStateType.CHECKING_SIGN &&
      walletGlobalState.signState === WalletSignStateType.SIGN_REQUESTED
    ) {
      isSigned = yield call(walletSignApi.isSigned);
    }
  } catch (error) {
    if ((error as Error).message === "sign_rejected") {
      isRejected = true;
    }
    isSigned = false;
  } finally {
    if (isSigned) {
      yield put(actions.announceWalletLoaded());
      yield call(HandleStateSigned, walletSignApi);
      return true;
    } else {
      if (isRejected) {
        yield call(HandleStateSignRejected);
      } else {
        yield call(HandleStateSignFailed, "SIGN_FAILED");
      }
      return false;
    }
  }
}

export function* CheckSignTimeout() {
  for (let i = SIGN_TIMEOUT_IN_SEC; i > 0; i--) {
    yield delay(1000);
    yield put(slicesActions.decSignCounter());
    const walletGlobalState: WalletGlobalStateType = yield select(
      (state: RootState) => state.wallet.globalState
    );
    if (
      !(
        walletGlobalState.state === WalletStateType.CHECKING_SIGN &&
        walletGlobalState.signState === WalletSignStateType.SIGN_REQUESTED
      )
    ) {
      break;
    }
  }
  const walletGlobalState: WalletGlobalStateType = yield select(
    (state: RootState) => state.wallet.globalState
  );
  if (
    walletGlobalState.state === WalletStateType.CHECKING_SIGN &&
    walletGlobalState.signState === WalletSignStateType.SIGN_REQUESTED
  ) {
    yield call(HandleStateSignTimedout);
  }
  yield put(slicesActions.resetSignCounter());
  yield cancel(taskSign);
}

export function* HandleStateSignRejected() {
  yield put(
    slicesActions.setWalletSignState(WalletSignStateType.SIGN_REJECTED)
  );
}

export function* HandleStateSignTimedout() {
  yield put(
    slicesActions.setWalletSignState(WalletSignStateType.SIGN_TIMED_OUT)
  );
}

export function* HandleStateSignFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(slicesActions.setWalletSignState(WalletSignStateType.SIGN_FAILED));
}

export function* HandleStateSigned(walletSignApi: IWalletSignApi) {
  yield put(slicesActions.setWalletSignState(WalletSignStateType.SIGNED));
  yield call(SlowDown);
  // store user info
  const accountData: AccountType | null = yield call(walletSignApi.getAccount);
  if (accountData) {
    yield put(slicesActions.setAccount(accountData));
  }
}
