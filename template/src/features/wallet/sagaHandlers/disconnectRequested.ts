import { call, put } from 'redux-saga/effects';

import * as slicesActions from '../slices';
import { IWalletResetApi } from '../types';

export function* HandleStateDisconnectRequested(
  walletResetApi: IWalletResetApi
) {
  try {
    yield call(walletResetApi.reset);
  } catch (error) {
    yield put(slicesActions.setError((error as Error).message));
  }
}
