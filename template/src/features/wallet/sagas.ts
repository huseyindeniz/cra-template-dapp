import { put, takeLatest, call } from "redux-saga/effects";

import { IWalletApi, LoadingStatusType, WalletStateType } from "./types";

import * as actions from "./actions";
import * as slicesActions from "./slices";
import {
  HandleStateWalletRequested,
  HandleStateAccountRequested,
  HandleStateUnlockRequested,
  HandleStateNetworkRequested,
  HandleStateNetworkSwitchRequested,
  HandleStateNotSigned,
  HandleStateSignRequested,
  HandleStateUserAuthenticated,
  HandleStateDisconnectRequested,
  HandleStateBlockRequested,
} from "./sagaHandlers";

// ACTION EFFECTS
function* ActionEffectConnectWallet(walletApi: IWalletApi) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield put(slicesActions.setWalletState(WalletStateType.CHECKING_WALLET));
  const initResult: boolean = yield call(HandleStateWalletRequested, walletApi);
  if (initResult) {
    yield put(slicesActions.setWalletState(WalletStateType.CHECKING_ACCOUNT));
    const accountResult: boolean = yield call(
      HandleStateAccountRequested,
      walletApi
    );
    if (accountResult) {
      yield put(slicesActions.setWalletState(WalletStateType.CHECKING_NETWORK));
      const networkResult: boolean = yield call(
        HandleStateNetworkRequested,
        walletApi
      );
      if (networkResult) {
        yield put(slicesActions.setWalletState(WalletStateType.CHECKING_SIGN));
        yield call(HandleStateNotSigned);
      }
    }
  }
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

function* ActionEffectUnlockWallet(walletApi: IWalletApi) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield put(slicesActions.setWalletState(WalletStateType.CHECKING_ACCOUNT));
  const unlockResult: boolean = yield call(
    HandleStateUnlockRequested,
    walletApi
  );
  if (unlockResult) {
    yield put(slicesActions.setWalletState(WalletStateType.CHECKING_NETWORK));
    const networkResult: boolean = yield call(
      HandleStateNetworkRequested,
      walletApi
    );
    if (networkResult) {
      yield put(slicesActions.setWalletState(WalletStateType.CHECKING_SIGN));
      yield call(HandleStateNotSigned);
    }
  }
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

function* ActionEffectSwitchNetwork(
  walletApi: IWalletApi,
  action: ReturnType<typeof actions.switchNetwork>
) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield put(slicesActions.setWalletState(WalletStateType.CHECKING_NETWORK));
  const networkSwitchResult: boolean = yield call(
    HandleStateNetworkSwitchRequested,
    action.payload,
    walletApi
  );
  if (networkSwitchResult) {
    yield put(slicesActions.setWalletState(WalletStateType.CHECKING_SIGN));
    yield call(HandleStateNotSigned);
  }
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

function* ActionEffectSignIn(
  walletApi: IWalletApi,
  action: ReturnType<typeof actions.signIn>
) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield put(slicesActions.setWalletState(WalletStateType.CHECKING_SIGN));
  const signResult: boolean = yield call(
    HandleStateSignRequested,
    walletApi,
    action.payload
  );
  if (signResult) {
    yield put(slicesActions.setWalletState(WalletStateType.AUTHENTICATED));
    yield call(HandleStateUserAuthenticated, walletApi);
  }
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

function* ActionEffectDisconnectWallet(walletApi: IWalletApi) {
  yield put(slicesActions.setLoading(LoadingStatusType.PENDING));
  yield call(HandleStateDisconnectRequested, walletApi);
  yield put(slicesActions.setLoading(LoadingStatusType.IDLE));
}

function* ActionEffectLatestBlock(walletApi: IWalletApi) {
  yield put(slicesActions.setBlockInfoLoading(LoadingStatusType.PENDING));
  yield call(HandleStateBlockRequested, walletApi);
  yield put(slicesActions.setBlockInfoLoading(LoadingStatusType.IDLE));
}

export function* watchWalletSaga(walletApi: IWalletApi) {
  yield takeLatest(
    actions.connectWallet.type,
    ActionEffectConnectWallet,
    walletApi
  );
  yield takeLatest(
    actions.unlockWallet.type,
    ActionEffectUnlockWallet,
    walletApi
  );
  yield takeLatest(
    actions.switchNetwork.type,
    ActionEffectSwitchNetwork,
    walletApi
  );
  yield takeLatest(actions.signIn.type, ActionEffectSignIn, walletApi);
  yield takeLatest(
    actions.disconnectWallet.type,
    ActionEffectDisconnectWallet,
    walletApi
  );
  yield takeLatest(
    actions.latestBlock.type,
    ActionEffectLatestBlock,
    walletApi
  );
}
