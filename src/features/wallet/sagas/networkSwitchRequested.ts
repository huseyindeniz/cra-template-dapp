import { put, call } from "redux-saga/effects";
import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";
import { SlowDown } from "../sagas";
import { HandleStateSignRequested } from "./signRequested";

export function* HandleStateNetworkSwitchRequested(
  networkId: number,
  walletApi: IWalletApi
) {
  yield put(
    slicesActions.setWalletStatus(WalletStateType.NETWORK_SWITCH_REQUESTED)
  );
  yield call(SlowDown);
  let isNetworkSwitched: boolean = false;
  let isRejected: boolean = false;
  try {
    isNetworkSwitched = yield call(walletApi.switchNetwork, networkId);
    if (isNetworkSwitched) {
      const network = walletApi.getNetwork();
      if (network !== undefined) {
        yield put(slicesActions.setCurrentNetwork(network));
      } else {
        throw Error("network error");
      }
    }
  } catch (error) {
    if ((error as Error).message === "switch_rejected") {
      isRejected = true;
    }
    isNetworkSwitched = false;
  } finally {
    if (isNetworkSwitched) {
      yield call(HandleStateSignRequested, walletApi);
    } else {
      if (isRejected) {
        yield call(HandleStateNetworkSwitchRejected);
      } else {
        yield call(HandleStateNetworkSwitchFailed, "Network switch failed");
      }
      return false;
    }
  }
}

export function* HandleStateNetworkSwitchRejected() {
  yield put(slicesActions.setError("Network switch rejected"));
  yield put(
    slicesActions.setWalletStatus(WalletStateType.NETWORK_SWITCH_REJECTED)
  );
}

export function* HandleStateNetworkSwitchFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(
    slicesActions.setWalletStatus(WalletStateType.NETWORK_SWITCH_FAILED)
  );
}
