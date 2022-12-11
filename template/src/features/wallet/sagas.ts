import { put, takeLatest, call, delay } from "redux-saga/effects";

import * as actions from "./actions";
import * as slicesActions from "./slices";
import { BlockInfoType, LoadingStatusType } from "./types";
import { SLOW_DOWN_IN_MS } from "./config";
import EthersWalletApiFactory from "../../services/EthersWalletAPI/EthersWalletAPI";
import {
  HandleStateInitRequested,
  HandleStateUnlockRequested,
  HandleStateNetworkSwitchRequested,
  HandleStateSignRequested,
  HandleStateDisconnectRequested,
} from "./sagas/";

// helpers
export function* SlowDown() {
  yield delay(SLOW_DOWN_IN_MS);
}

// ACTION EFFECTS
export function* ActionEffectConnectWallet(
  action: ReturnType<typeof actions.connectWallet>
) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield call(HandleStateInitRequested, EthersWalletApiFactory.getInstance());
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

export function* ActionEffectUnlockWallet(
  action: ReturnType<typeof actions.unlockWallet>
) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield call(HandleStateUnlockRequested, EthersWalletApiFactory.getInstance());
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

export function* ActionEffectSwitchNetwork(
  action: ReturnType<typeof actions.switchNetwork>
) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield call(
    HandleStateNetworkSwitchRequested,
    action.payload,
    EthersWalletApiFactory.getInstance()
  );
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

export function* ActionEffectSignIn() {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield call(HandleStateSignRequested, EthersWalletApiFactory.getInstance());
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

export function* ActionEffectDisconnectWallet() {
  yield call(
    HandleStateDisconnectRequested,
    EthersWalletApiFactory.getInstance()
  );
}

export function* ActionEffectLatestBlock() {
  yield put(slicesActions.setBlockInfoLoading(LoadingStatusType.PENDING));
  const walletApi = EthersWalletApiFactory.getInstance();
  const latestBlockNumber: number | undefined = yield call(
    walletApi.getLatestBlock
  );
  const signerAccountBalance: string = yield call(walletApi.getBalance);
  const payload: BlockInfoType = {
    blockNumber: latestBlockNumber ? latestBlockNumber.toString() : "",
    signerAccountBalance: signerAccountBalance,
  };
  yield put(slicesActions.setBlockInfo(payload));
  yield put(slicesActions.setBlockInfoLoading(LoadingStatusType.IDLE));
}

// WATCHERS
export function* watchWalletSaga() {
  yield takeLatest(actions.connectWallet.type, ActionEffectConnectWallet);
  yield takeLatest(actions.unlockWallet.type, ActionEffectUnlockWallet);
  yield takeLatest(actions.switchNetwork.type, ActionEffectSwitchNetwork);
  yield takeLatest(actions.signIn.type, ActionEffectSignIn);
  yield takeLatest(actions.disconnectWallet.type, ActionEffectDisconnectWallet);
  yield takeLatest(actions.latestBlock.type, ActionEffectLatestBlock);
}
