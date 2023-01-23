import { disconnectWallet } from './actions';
import { AccountType } from './models/Account';
import { BlockInfoType } from './models/BlockInfo';
import { ChainInfoType } from './models/ChainInfo';
import { LoadingStatusType } from './models/LoadingStatus';
import {
  WalletAccountStateType,
  WalletInitStateType,
  WalletNetworkStateType,
  WalletSignStateType,
  WalletStateType,
} from './models/WalletGlobalState';
import * as slicesActions from './slices';

const mockObject = <T extends object>(): T => {
  return {} as T;
};

describe('wallet slice', () => {
  it('should set loading status', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setLoading(LoadingStatusType.PENDING);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.loading).toEqual(LoadingStatusType.PENDING);
  });

  it('should set wallet state', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setWalletState(
      WalletStateType.CHECKING_ACCOUNT
    );
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.globalState.state).toEqual(
      WalletStateType.CHECKING_ACCOUNT
    );
  });

  it('should set wallet init state', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setWalletInitState(
      WalletInitStateType.INITIALIZED
    );
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.globalState.initState).toEqual(
      WalletInitStateType.INITIALIZED
    );
  });

  it('should set wallet account state', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setWalletAccountState(
      WalletAccountStateType.ACCOUNT_LOADED
    );
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.globalState.accountState).toEqual(
      WalletAccountStateType.ACCOUNT_LOADED
    );
  });

  it('should set wallet network state', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setWalletNetworkState(
      WalletNetworkStateType.NETWORK_DETECTION_FAILED
    );
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.globalState.networkState).toEqual(
      WalletNetworkStateType.NETWORK_DETECTION_FAILED
    );
  });

  it('should set wallet sign state', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setWalletSignState(
      WalletSignStateType.NOT_SIGNED
    );
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.globalState.signState).toEqual(
      WalletSignStateType.NOT_SIGNED
    );
  });

  it('should set current network', () => {
    const state = slicesActions.initialState;
    const mockNetwork: ChainInfoType = mockObject<ChainInfoType>();
    mockNetwork.chainName = 'My Mock Network';
    const action = slicesActions.setCurrentNetwork(mockNetwork);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.currentNetwork).toEqual(mockNetwork);
  });

  it('should decrease signCounter 1 at a time', () => {
    const state = slicesActions.initialState;
    const currentCounter = state.signCounter;
    const action = slicesActions.decSignCounter();
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.signCounter).toEqual(currentCounter - 1);
  });

  it("should not change signCounter if it's already 0", () => {
    const state = { ...slicesActions.initialState, signCounter: 0 };
    const action = slicesActions.decSignCounter();
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.signCounter).toEqual(0);
  });

  it('should set signCounter to initial state', () => {
    const state = {
      ...slicesActions.initialState,
      signCounter: slicesActions.initialState.signCounter - 1,
    };
    const action = slicesActions.resetSignCounter();
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.signCounter).toEqual(
      slicesActions.initialState.signCounter
    );
  });

  it('should set account', () => {
    const state = slicesActions.initialState;
    const mockAccount: AccountType = mockObject<AccountType>();
    mockAccount.address = 'My Mock Accound Address';
    const action = slicesActions.setAccount(mockAccount);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.account).toEqual(mockAccount);
  });

  it('should set account ens', () => {
    const mockAccount: AccountType = mockObject<AccountType>();
    const state = { ...slicesActions.initialState, account: mockAccount };
    const mockEns: string = 'My mock ens name';
    const action = slicesActions.setAccountEns(mockEns);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.account?.ens).toEqual(mockEns);
  });

  it('should not set account ens if account is null', () => {
    const state = { ...slicesActions.initialState };
    const mockEns: string = 'My mock ens name';
    const action = slicesActions.setAccountEns(mockEns);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.account?.ens).toEqual(undefined);
  });

  it('should set error', () => {
    const state = { ...slicesActions.initialState };
    const mockErrorMessage: string = 'My mock error message';
    const action = slicesActions.setError(mockErrorMessage);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.error).toEqual(mockErrorMessage);
  });

  it('should set error as null', () => {
    const state = { ...slicesActions.initialState };
    const action = slicesActions.setError(null);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.error).toEqual(null);
  });

  it('should set block info loading', () => {
    const state = slicesActions.initialState;
    const action = slicesActions.setBlockInfoLoading(LoadingStatusType.PENDING);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.blockInfoLoading).toEqual(LoadingStatusType.PENDING);
  });

  it('should set block info', () => {
    const state = slicesActions.initialState;
    const mockBlockInfo: BlockInfoType = mockObject<BlockInfoType>();
    mockBlockInfo.blockNumber = '1';
    mockBlockInfo.signerAccountBalance = 'Mock balance';
    const action = slicesActions.setBlockInfo(mockBlockInfo);
    const nextState = slicesActions.walletReducer(state, action);
    expect(nextState.blockInfo).toEqual(mockBlockInfo);
  });

  it('should reset the state when the disconnectWallet action is dispatched', () => {
    const state = slicesActions.initialState;
    let action = slicesActions.setLoading(LoadingStatusType.PENDING);
    let nextState = slicesActions.walletReducer(state, action);
    nextState = slicesActions.walletReducer(nextState, disconnectWallet());
    expect(nextState).toEqual(state);
  });
});
