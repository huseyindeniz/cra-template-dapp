import { call, put } from 'redux-saga/effects';

import * as walletStateSliceActions from '../../slice';
import { LoadingStatusType } from '../../types/LoadingStatus';
import { IWalletAccountApi } from '../IWalletAccountApi';

export function* ActionEffectDisconnectWallet(walletApi: IWalletAccountApi) {
  yield put(walletStateSliceActions.setLoading(LoadingStatusType.PENDING));
  yield call(HandleStateDisconnectRequested, walletApi);
  yield put(walletStateSliceActions.setLoading(LoadingStatusType.IDLE));
}

export function* HandleStateDisconnectRequested(
  walletAccountApi: IWalletAccountApi
) {
  try {
    yield call(walletAccountApi.reset);
  } catch (error) {
    yield put(walletStateSliceActions.setError((error as Error).message));
  }
}
