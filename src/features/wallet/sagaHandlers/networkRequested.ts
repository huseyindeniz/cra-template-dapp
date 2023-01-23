import { END, EventChannel } from 'redux-saga';
import { put, call, take, spawn } from 'redux-saga/effects';

import * as actions from '../actions';
import { ChainInfoType } from '../models/ChainInfo';
import { IWalletNetworkApi } from '../models/IWalletAPI';
import { WalletNetworkStateType } from '../models/WalletGlobalState';
import * as slicesActions from '../slices';

import { SlowDown } from './utils';

export function* HandleStateNetworkRequested(
  walletNetworkApi: IWalletNetworkApi
) {
  let isSuccessful: boolean = false;
  try {
    yield put(
      slicesActions.setWalletNetworkState(
        WalletNetworkStateType.NETWORK_REQUESTED
      )
    );
    yield call(SlowDown);
    const isNetworkLoaded: boolean = yield call(walletNetworkApi.loadNetwork);
    if (!isNetworkLoaded) {
      throw new Error('Network detection failed');
    }
    const network: ChainInfoType = yield call(walletNetworkApi.getNetwork);
    if (network === undefined || network === null) {
      throw new Error('Wrong network');
    }
    yield put(slicesActions.setCurrentNetwork(network));
    yield put(
      slicesActions.setWalletNetworkState(WalletNetworkStateType.NETWORK_LOADED)
    );
    isSuccessful = true;
    yield spawn(handleEventNetworkChanged, walletNetworkApi);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    if (errorMessage === 'Wrong network') {
      yield call(HandleStateWrongNetwork);
    } else {
      yield call(HandleStateNetworkDetectionFailed, errorMessage);
    }
  } finally {
    return isSuccessful;
  }
}

export function* HandleStateNetworkDetectionFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(
    slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_DETECTION_FAILED
    )
  );
}

export function* HandleStateWrongNetwork() {
  yield put(
    slicesActions.setWalletNetworkState(WalletNetworkStateType.WRONG_NETWORK)
  );
}

export function* HandleStateNetworkSwitchRequested(
  networkId: number,
  walletNetworkApi: IWalletNetworkApi
) {
  let isSuccessful: boolean = false;
  try {
    yield put(
      slicesActions.setWalletNetworkState(
        WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
      )
    );
    yield call(SlowDown);
    const isNetworkSwitched: boolean = yield call(
      walletNetworkApi.switchNetwork,
      networkId
    );
    if (!isNetworkSwitched) {
      throw new Error('Network switch failed');
    }
    const network: ChainInfoType = yield call(walletNetworkApi.getNetwork);
    if (network === undefined || network === null) {
      throw new Error('Network switch failed');
    }
    yield put(slicesActions.setCurrentNetwork(network));
    yield put(
      slicesActions.setWalletNetworkState(WalletNetworkStateType.NETWORK_LOADED)
    );
    isSuccessful = true;
    yield spawn(handleEventNetworkChanged, walletNetworkApi);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    if (errorMessage === 'switch_rejected') {
      yield call(HandleStateNetworkSwitchRejected);
    } else {
      yield call(HandleStateNetworkSwitchFailed, errorMessage);
    }
  } finally {
    return isSuccessful;
  }
}

export function* HandleStateNetworkSwitchRejected() {
  yield put(slicesActions.setError('Network switch rejected'));
  yield put(
    slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_SWITCH_REJECTED
    )
  );
}

export function* HandleStateNetworkSwitchFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(
    slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_SWITCH_FAILED
    )
  );
}

export function* handleEventNetworkChanged(
  walletNetworkApi: IWalletNetworkApi
) {
  const channel: EventChannel<string> = yield call(
    walletNetworkApi.listenNetworkChange
  );
  try {
    while (true) {
      let chainId: string = yield take(channel);
      console.debug('networkChanged: ' + chainId);
      yield put(actions.disconnectWallet());
      yield call(walletNetworkApi.handleNetworkChange);
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
