import { put, call } from 'redux-saga/effects';

import { IWalletInitApi } from '../models/IWalletAPI';
import { WalletInitStateType } from '../models/WalletGlobalState';
import * as slicesActions from '../slices';

import { SlowDown } from './utils';

export function* HandleStateWalletRequested(walletInitApi: IWalletInitApi) {
  yield put(
    slicesActions.setWalletInitState(WalletInitStateType.INIT_REQUESTED)
  );
  yield call(SlowDown);
  let isProviderLoaded: boolean = false;
  let isError: boolean = false;
  try {
    isProviderLoaded = yield call(walletInitApi.loadProvider);
  } catch (error) {
    isProviderLoaded = false;
    isError = true;
  } finally {
    if (isProviderLoaded) {
      yield put(
        slicesActions.setWalletInitState(WalletInitStateType.INITIALIZED)
      );
      return true;
    } else {
      if (isError) {
        yield call(HandleStateWalletFailed, 'Wallet detection failed');
      } else {
        yield call(HandleStateWalletNotSupported);
      }
      return false;
    }
  }
}

export function* HandleStateWalletFailed(error: string) {
  yield put(slicesActions.setError(error));
  yield put(slicesActions.setWalletInitState(WalletInitStateType.INIT_FAILED));
}

export function* HandleStateWalletNotSupported() {
  yield put(
    slicesActions.setWalletInitState(WalletInitStateType.NOT_SUPPORTED)
  );
}
