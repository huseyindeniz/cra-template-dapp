import { call, spawn } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { HardhatChain } from '../chains/hardhat';
import { IWalletNetworkApi } from '../models/IWalletAPI';
import { WalletNetworkStateType } from '../models/WalletGlobalState';
import * as slicesActions from '../slices';

import {
  handleEventNetworkChanged,
  HandleStateNetworkDetectionFailed,
  HandleStateNetworkRequested,
  HandleStateNetworkSwitchFailed,
  HandleStateNetworkSwitchRejected,
  HandleStateNetworkSwitchRequested,
  HandleStateWrongNetwork,
} from './networkRequested';
import { SlowDown } from './utils';

const mockWalletNetworkApi: IWalletNetworkApi = {
  loadNetwork: jest.fn(),
  getNetwork: jest.fn(),
  switchNetwork: jest.fn(),
  listenNetworkChange: jest.fn(),
  handleNetworkChange: jest.fn(),
};

describe('Feature: Wallet', () => {
  describe('When HandleStateNetworkRequested is called', () => {
    it('network is loaded successfully', () => {
      return expectSaga(HandleStateNetworkRequested, mockWalletNetworkApi)
        .provide([
          [call(mockWalletNetworkApi.loadNetwork), true],
          [call(mockWalletNetworkApi.getNetwork), HardhatChain],
          [call(SlowDown), null],
          [spawn(handleEventNetworkChanged, mockWalletNetworkApi), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.loadNetwork)
        .call(mockWalletNetworkApi.getNetwork)
        .put(slicesActions.setCurrentNetwork(HardhatChain))
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_LOADED
          )
        )
        .spawn(handleEventNetworkChanged, mockWalletNetworkApi)
        .returns(true)
        .run();
    });
  });
  it('network is not loaded without Exception', () => {
    const error = new Error('Network detection failed');
    return expectSaga(HandleStateNetworkRequested, mockWalletNetworkApi)
      .provide([
        [call(mockWalletNetworkApi.loadNetwork), false],
        [call(SlowDown), null],
      ])
      .put(
        slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_REQUESTED
        )
      )
      .call(SlowDown)
      .call(mockWalletNetworkApi.loadNetwork)
      .call(HandleStateNetworkDetectionFailed, error.message)
      .returns(false)
      .run();
  });

  it('network is not loaded with Exception', () => {
    const error = new Error('mock network fail code');
    return expectSaga(HandleStateNetworkRequested, mockWalletNetworkApi)
      .provide([
        [call(mockWalletNetworkApi.loadNetwork), throwError(error)],
        [call(SlowDown), null],
      ])
      .put(
        slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_REQUESTED
        )
      )
      .call(SlowDown)
      .call(mockWalletNetworkApi.loadNetwork)
      .call(HandleStateNetworkDetectionFailed, error.message)

      .not.put.like({
        action: slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_LOADED
        ),
      })
      .returns(false)
      .run();
  });

  it('network loaded but not supported', () => {
    return expectSaga(HandleStateNetworkRequested, mockWalletNetworkApi)
      .provide([
        [call(mockWalletNetworkApi.loadNetwork), true],
        [call(mockWalletNetworkApi.getNetwork), null],
        [call(SlowDown), null],
      ])
      .put(
        slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_REQUESTED
        )
      )
      .call(SlowDown)
      .call(mockWalletNetworkApi.loadNetwork)
      .call(HandleStateWrongNetwork)

      .not.put.like({
        action: slicesActions.setWalletNetworkState(
          WalletNetworkStateType.NETWORK_LOADED
        ),
      })
      .returns(false)
      .run();
  });

  describe('When HandleStateNetworkDetectionFailed is called', () => {
    it('should call setError and setWalletNetworkState actions with the correct payload', () => {
      const error = 'network error';
      return expectSaga(HandleStateNetworkDetectionFailed, error)
        .put(slicesActions.setError(error))
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_DETECTION_FAILED
          )
        )
        .run();
    });
  });

  describe('When HandleStateWrongNetwork is called', () => {
    it('should call setWalletNetworkState action with the correct payload', () => {
      return expectSaga(HandleStateWrongNetwork)
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.WRONG_NETWORK
          )
        )
        .run();
    });
  });

  // network requested will be here

  describe('When HandleStateNetworkSwitchRequested is called', () => {
    it('network switched successfully', () => {
      return expectSaga(
        HandleStateNetworkSwitchRequested,
        HardhatChain.chainId,
        mockWalletNetworkApi
      )
        .provide([
          [
            call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId),
            true,
          ],
          [call(mockWalletNetworkApi.getNetwork), HardhatChain],
          [call(SlowDown), null],
          [spawn(handleEventNetworkChanged, mockWalletNetworkApi), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId)
        .call(mockWalletNetworkApi.getNetwork)
        .put(slicesActions.setCurrentNetwork(HardhatChain))
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_LOADED
          )
        )
        .spawn(handleEventNetworkChanged, mockWalletNetworkApi)
        .returns(true)
        .run();
    });
    it('network can not switched without Exception', () => {
      const error = new Error('Network switch failed');
      return expectSaga(
        HandleStateNetworkSwitchRequested,
        HardhatChain.chainId,
        mockWalletNetworkApi
      )
        .provide([
          [
            call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId),
            false,
          ],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId)
        .call(HandleStateNetworkSwitchFailed, error.message)
        .returns(false)
        .run();
    });
    it('network can not switched with Exception', () => {
      const error = new Error('mock network switch exception');
      return expectSaga(
        HandleStateNetworkSwitchRequested,
        HardhatChain.chainId,
        mockWalletNetworkApi
      )
        .provide([
          [
            call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId),
            throwError(error),
          ],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId)
        .call(HandleStateNetworkSwitchFailed, error.message)
        .returns(false)
        .run();
    });
    it('network switched but network is null', () => {
      const error = new Error('Network switch failed');
      return expectSaga(
        HandleStateNetworkSwitchRequested,
        HardhatChain.chainId,
        mockWalletNetworkApi
      )
        .provide([
          [
            call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId),
            true,
          ],
          [call(mockWalletNetworkApi.getNetwork), null],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId)
        .call(HandleStateNetworkSwitchFailed, error.message)
        .returns(false)
        .run();
    });
    it('network switch rejected', () => {
      const error = new Error('switch_rejected');
      return expectSaga(
        HandleStateNetworkSwitchRequested,
        HardhatChain.chainId,
        mockWalletNetworkApi
      )
        .provide([
          [
            call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId),
            throwError(error),
          ],
          [call(SlowDown), null],
        ])
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REQUESTED
          )
        )
        .call(SlowDown)
        .call(mockWalletNetworkApi.switchNetwork, HardhatChain.chainId)
        .call(HandleStateNetworkSwitchRejected)
        .returns(false)
        .run();
    });
  });

  describe('When HandleStateNetworkSwitchRejected is called', () => {
    it('should call setError and setWalletNetworkState actions with the correct payload', () => {
      return expectSaga(HandleStateNetworkSwitchRejected)
        .put(slicesActions.setError('Network switch rejected'))
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_REJECTED
          )
        )
        .run();
    });
  });

  describe('When HandleStateNetworkSwitchFailed is called', () => {
    it('should call setError and setWalletNetworkState actions with the correct payload', () => {
      const error = 'network switch failed';
      return expectSaga(HandleStateNetworkSwitchFailed, error)
        .put(slicesActions.setError(error))
        .put(
          slicesActions.setWalletNetworkState(
            WalletNetworkStateType.NETWORK_SWITCH_FAILED
          )
        )
        .run();
    });
  });
});
