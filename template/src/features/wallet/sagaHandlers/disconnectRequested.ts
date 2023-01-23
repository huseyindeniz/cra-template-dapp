import { call, put } from 'redux-saga/effects';

import { IWalletResetApi } from '../models/IWalletAPI';
import * as slicesActions from '../slices';

export function* HandleStateDisconnectRequested(
  walletResetApi: IWalletResetApi
) {
  try {
    yield call(walletResetApi.reset);
  } catch (error) {
    yield put(slicesActions.setError((error as Error).message));
  }
}
