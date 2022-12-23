import { put, take, spawn, call } from "redux-saga/effects";
import { END } from "redux-saga";
import { EventChannel } from "redux-saga";

import * as actions from "../actions";
import * as slicesActions from "../slices";
import { WalletStateType, IWalletApi } from "../types";

export function* HandleStateUserAuthenticated(walletApi: IWalletApi) {
  yield put(slicesActions.setWalletStatus(WalletStateType.AUTHENTICATED));
  yield spawn(handleEventAccountsChanged, walletApi);
  yield spawn(handleEventNetworkChanged, walletApi);
  const isEnsSupported: boolean = yield call(walletApi.isEnsSupported, null);
  if (isEnsSupported) {
    yield spawn(updateEnsWithAPI, walletApi);
  }
}

// Non-blocking functions
function* updateEnsWithAPI(walletApi: IWalletApi) {
  try {
    const ens: string | null = yield call(walletApi.getEns);
    if (ens) {
      yield put(slicesActions.setAccountEns(ens));
    }
  } catch (error) {
    console.debug(error);
    yield put(slicesActions.setError(error as string));
  }
}

// Ethereum Event Handlers
function* handleEventAccountsChanged(walletApi: IWalletApi) {
  const channel: EventChannel<string[]> = yield call(
    walletApi.listenAccountChange
  );
  try {
    while (true) {
      let accounts: string[] = yield take(channel);
      console.debug(`accountsChanged: ${accounts[0]}`);
      yield put(actions.disconnectWallet());
      yield call(walletApi.handleAccountChange);
      yield put(actions.connectWallet());
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(END.type);
      break;
    }
  } finally {
    console.debug("accountsChanged terminated");
    channel.close();
  }
}

function* handleEventNetworkChanged(walletApi: IWalletApi) {
  const channel: EventChannel<string> = yield call(
    walletApi.listenNetworkChange
  );
  try {
    while (true) {
      let chainId: string = yield take(channel);
      console.debug("networkChanged: " + chainId);
      yield put(actions.disconnectWallet());
      yield call(walletApi.handleNetworkChange);
      yield put(actions.connectWallet());
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(END.type);
      break;
    }
  } finally {
    console.debug("networkChanged terminated");
    channel.close();
  }
}
