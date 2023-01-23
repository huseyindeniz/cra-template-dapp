import { put, call } from 'redux-saga/effects';

import { BlockInfoType } from '../models/BlockInfo';
import { IWalletBlockInfoApi } from '../models/IWalletAPI';
import * as slicesActions from '../slices';

export function* HandleStateBlockRequested(
  walletBlockInfoApi: IWalletBlockInfoApi
) {
  const latestBlockNumber: number | undefined = yield call(
    walletBlockInfoApi.getLatestBlock
  );
  const signerAccountBalance: string = yield call(
    walletBlockInfoApi.getBalance
  );
  const payload: BlockInfoType = {
    blockNumber: latestBlockNumber ? latestBlockNumber.toString() : '',
    signerAccountBalance: signerAccountBalance,
  };
  yield put(slicesActions.setBlockInfo(payload));
}
