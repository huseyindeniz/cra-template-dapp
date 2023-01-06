import { EventChannel, END } from 'redux-saga';
import { put, take, spawn, call } from 'redux-saga/effects';

import * as actions from '../actions';
import * as slicesActions from '../slices';
import { IWalletAuthenticatedApi } from '../types';

export function* HandleStateUserAuthenticated(
  walletAuthenticatedApi: IWalletAuthenticatedApi
) {
  yield spawn(handleEventAccountsChanged, walletAuthenticatedApi);
  yield spawn(handleEventNetworkChanged, walletAuthenticatedApi);
  const isEnsSupported: boolean = yield call(
    walletAuthenticatedApi.isEnsSupported,
    null
  );
  if (isEnsSupported) {
    yield spawn(updateEnsWithAPI, walletAuthenticatedApi);
  }
}

// Non-blocking functions
function* updateEnsWithAPI(walletAuthenticatedApi: IWalletAuthenticatedApi) {
  try {
    const ens: string | null = yield call(walletAuthenticatedApi.getEns);
    if (ens) {
      yield put(slicesActions.setAccountEns(ens));
    }
  } catch (error) {
    console.debug(error);
    yield put(slicesActions.setError(error as string));
  }
}

// WalletApi Event Handlers
function* handleEventAccountsChanged(
  walletAuthenticatedApi: IWalletAuthenticatedApi
) {
  const channel: EventChannel<string[]> = yield call(
    walletAuthenticatedApi.listenAccountChange
  );
  try {
    while (true) {
      let accounts: string[] = yield take(channel);
      console.debug(`accountsChanged: ${accounts[0]}`);
      yield put(actions.disconnectWallet());
      yield call(walletAuthenticatedApi.handleAccountChange);
      yield put(actions.connectWallet());
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(END.type);
      break;
    }
  } finally {
    console.debug('accountsChanged terminated');
    channel.close();
  }
}

function* handleEventNetworkChanged(
  walletAuthenticatedApi: IWalletAuthenticatedApi
) {
  const channel: EventChannel<string> = yield call(
    walletAuthenticatedApi.listenNetworkChange
  );
  try {
    while (true) {
      let chainId: string = yield take(channel);
      console.debug('networkChanged: ' + chainId);
      yield put(actions.disconnectWallet());
      yield call(walletAuthenticatedApi.handleNetworkChange);
      yield put(actions.connectWallet());
      // take(END) will cause the saga to terminate by jumping to the finally block
      yield take(END.type);
      break;
    }
  } finally {
    console.debug('networkChanged terminated');
    channel.close();
  }
}
