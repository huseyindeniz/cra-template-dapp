import { call, put } from "redux-saga/effects";
import { IWalletApi } from "../types";
import * as slicesActions from "../slices";

export function* HandleStateDisconnectRequested(walletApi: IWalletApi) {
  try {
    yield call(walletApi.reset);
  } catch (error) {
    yield put(slicesActions.setError(error as string));
  }
}
