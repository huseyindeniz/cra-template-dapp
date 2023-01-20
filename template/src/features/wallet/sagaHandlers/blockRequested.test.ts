import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import * as slicesActions from '../slices';
import { BlockInfoType, IWalletBlockInfoApi } from '../types';

import { HandleStateBlockRequested } from './blockRequested';

const mockWalletBlockInfoApi: IWalletBlockInfoApi = {
  getLatestBlock: jest.fn(),
  getBalance: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateBlockRequested is called', () => {
    it('it should set the block info in the state', () => {
      const latestBlockNumber = 2;
      const signerAccountBalance = '1000';
      const payload: BlockInfoType = {
        blockNumber: latestBlockNumber.toString(),
        signerAccountBalance: signerAccountBalance,
      };
      return expectSaga(HandleStateBlockRequested, mockWalletBlockInfoApi)
        .provide([
          [call(mockWalletBlockInfoApi.getLatestBlock), latestBlockNumber],
          [call(mockWalletBlockInfoApi.getBalance), signerAccountBalance],
        ])
        .put(slicesActions.setBlockInfo(payload))
        .run();
    });
    it('it should set the block number as an empty string if getLatestBlock returns undefined', () => {
      const signerAccountBalance = '1000';
      const payload: BlockInfoType = {
        blockNumber: '',
        signerAccountBalance: signerAccountBalance,
      };
      return expectSaga(HandleStateBlockRequested, mockWalletBlockInfoApi)
        .provide([
          [call(mockWalletBlockInfoApi.getLatestBlock), undefined],
          [call(mockWalletBlockInfoApi.getBalance), signerAccountBalance],
        ])
        .put(slicesActions.setBlockInfo(payload))
        .run();
    });
  });
});
