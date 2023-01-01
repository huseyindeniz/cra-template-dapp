import { put, call } from "redux-saga/effects";

import * as slicesActions from "../slices";
import { BlockInfoType, IWalletBlockInfoApi } from "../types";

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
    blockNumber: latestBlockNumber ? latestBlockNumber.toString() : "",
    signerAccountBalance: signerAccountBalance,
  };
  yield put(slicesActions.setBlockInfo(payload));
}
