import { put, call } from 'redux-saga/effects';

import * as slicesActions from '../slices';
import { WalletNetworkStateType, IWalletNetworkApi } from '../types';

import { SlowDown } from './utils';

export function* HandleStateNetworkRequested(
  walletNetworkApi: IWalletNetworkApi
) {
  yield put(
    slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_REQUESTED
    )
  );
  yield call(SlowDown);
  let isNetworkLoaded: boolean = false;
  let isError: boolean = false;
  try {
    isNetworkLoaded = yield call(walletNetworkApi.loadNetwork);
  } catch (error) {
    isNetworkLoaded = false;
    isError = true;
  } finally {
    if (isNetworkLoaded) {
      const network = walletNetworkApi.getNetwork();
      if (network !== undefined) {
        yield put(slicesActions.setCurrentNetwork(network));
      } else {
        isError = true; // TODO: check what the fuck is going on here
      }
      yield put(
        slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_LOADED
        )
      );
      return true;
    } else {
      if (isError) {
        yield call(
          HandleStateNetworkDetectionFailed,
          'Network detection failed'
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
  yield put(
    slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
    )
  );
  yield call(SlowDown);
  let isNetworkSwitched: boolean = false;
  let isRejected: boolean = false;
  try {
    isNetworkSwitched = yield call(walletNetworkApi.switchNetwork, networkId);
    if (isNetworkSwitched) {
      const network = walletNetworkApi.getNetwork();
      if (network !== undefined) {
        yield put(slicesActions.setCurrentNetwork(network));
      } else {
        throw Error('network error');
      }
    }
  } catch (error) {
    if ((error as Error).message === 'switch_rejected') {
      isRejected = true;
    }
    isNetworkSwitched = false;
  } finally {
    if (isNetworkSwitched) {
      yield put(
        slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_LOADED
        )
      );
      return true;
    } else {
      if (isRejected) {
        yield call(HandleStateNetworkSwitchRejected);
      } else {
        yield call(HandleStateNetworkSwitchFailed, 'Network switch failed');
      }
      return false;
    }
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
