import { put, call } from "redux-saga/effects";

import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";
import { SlowDown } from "../sagas";
import { HandleStateNotSigned } from "./signRequested";

export function* HandleStateNetworkRequested(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.NETWORK_REQUESTED));
  yield call(SlowDown);
  let isNetworkLoaded: boolean = false;
  let isError: boolean = false;
  try {
    isNetworkLoaded = yield call(walletApi.loadNetwork);
  } catch (error) {
    isNetworkLoaded = false;
    isError = true;
  } finally {
    if (isNetworkLoaded) {
      const network = walletApi.getNetwork();
      if (network !== undefined) {
        yield put(slicesActions.setCurrentNetwork(network));
      } else {
        isError = true; // TODO: check what the fuck is going on here
      }
      yield call(HandleStateNotSigned);
    } else {
      if (isError) {
        yield call(
          HandleStateNetworkDetectionFailed,
          "Network detection failed"
        );
      } else {
        yield call(HandleStateWrongNetwork);
      }
      return false;
    }
  }
}

export function* HandleStateNetworkDetectionFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(
    slicesActions.setWalletStatus(WalletStateType.NETWORK_DETECTION_FAILED)
  );
}

export function* HandleStateWrongNetwork() {
  yield put(slicesActions.setWalletStatus(WalletStateType.WRONG_NETWORK));
}
