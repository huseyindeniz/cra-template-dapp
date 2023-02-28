import { put, call, select } from 'redux-saga/effects';

import { RootState } from '../../../../../store/store';
import { SlowDown } from '../../../utils';
import { IWalletAPI } from '../../IWalletAPI';
import * as walletStateSliceActions from '../../slice';
import { LoadingStatusType } from '../../types/LoadingStatus';
import { WalletState } from '../../types/WalletState';
import * as actions from '../actions';
import { IWalletAccountApi } from '../IWalletAccountApi';
import * as slicesActions from '../slice';
import { AccountLoadState } from '../types/AccountLoadState';

export function* ActionEffectUnlockWallet(walletApi: IWalletAPI) {
  yield put(walletStateSliceActions.setLoading(LoadingStatusType.PENDING));
  yield put(walletStateSliceActions.setState(WalletState.CHECKING_ACCOUNT));
  const unlockResult: boolean = yield call(
    HandleStateUnlockRequested,
    walletApi
  );
  if (unlockResult) {
    yield put({ type: actions.loadAccount.type });
  } else {
    yield put(walletStateSliceActions.setLoading(LoadingStatusType.IDLE));
  }
}

export function* HandleStateLocked() {
  yield put(slicesActions.setAccountLoadState(AccountLoadState.LOCKED));
}

export function* HandleStateUnlockRequested(
  walletAccountApi: IWalletAccountApi
) {
  yield put(
    slicesActions.setAccountLoadState(AccountLoadState.UNLOCK_REQUESTED)
  );
  yield call(SlowDown);
  let isUnlocked: boolean = false;
  let isRejected: boolean = false;
  try {
    yield call(walletAccountApi.unlock);
    const walletState: WalletState = yield select(
      (state: RootState) => state.wallet.state.state
    );
    const accountLoadState: AccountLoadState = yield select(
      (state: RootState) => state.wallet.account.accountLoadState
    );
    if (
      walletState === WalletState.CHECKING_ACCOUNT &&
      accountLoadState === AccountLoadState.UNLOCK_REQUESTED
    ) {
      isUnlocked = yield call(walletAccountApi.isUnlocked);
    }
  } catch (error) {
    console.debug(error);
    if ((error as Error).message === 'unlock_rejected') {
      isRejected = true;
    }
    isUnlocked = false;
  } finally {
    if (isUnlocked) {
      yield put(
        slicesActions.setAccountLoadState(AccountLoadState.ACCOUNT_LOADED)
      );
      return true;
    } else {
      if (isRejected) {
        yield call(HandleStateUnlockRejected);
      } else {
        yield call(HandleStateUnlockFailed);
      }
      return false;
    }
  }
}

export function* HandleStateUnlockRejected() {
  yield put(
    slicesActions.setAccountLoadState(AccountLoadState.UNLOCK_REJECTED)
  );
}

export function* HandleStateUnlockFailed() {
  yield put(slicesActions.setAccountLoadState(AccountLoadState.UNLOCK_FAILED));
}
