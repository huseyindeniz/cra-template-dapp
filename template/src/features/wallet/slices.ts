import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { disconnectWallet } from './actions';
import { SIGN_TIMEOUT_IN_SEC } from './config';
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
import { WalletStoreState } from './models/WalletStoreState';

export const initialState = Object.freeze({
  loading: LoadingStatusType.IDLE,
  globalState: {
    state: WalletStateType.NOT_INITIALIZED,
    initState: WalletInitStateType.IDLE,
    accountState: WalletAccountStateType.IDLE,
    networkState: WalletNetworkStateType.IDLE,
    signState: WalletSignStateType.IDLE,
  },
  currentNetwork: null,
  signCounter: SIGN_TIMEOUT_IN_SEC,
  account: null,
  error: null,
  blockInfoLoading: LoadingStatusType.IDLE,
  blockInfo: null,
}) as WalletStoreState;

const wallet = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<LoadingStatusType>) => {
      state.loading = payload;
    },
    setWalletState: (state, { payload }: PayloadAction<WalletStateType>) => {
      state.globalState.state = payload;
    },
    setWalletInitState: (
      state,
      { payload }: PayloadAction<WalletInitStateType>
    ) => {
      state.globalState.initState = payload;
    },
    setWalletAccountState: (
      state,
      { payload }: PayloadAction<WalletAccountStateType>
    ) => {
      state.globalState.accountState = payload;
    },
    setWalletNetworkState: (
      state,
      { payload }: PayloadAction<WalletNetworkStateType>
    ) => {
      state.globalState.networkState = payload;
    },
    setWalletSignState: (
      state,
      { payload }: PayloadAction<WalletSignStateType>
    ) => {
      state.globalState.signState = payload;
    },
    setCurrentNetwork: (state, { payload }: PayloadAction<ChainInfoType>) => {
      state.currentNetwork = payload;
    },
    decSignCounter: state => {
      if (state.signCounter > 0) {
        --state.signCounter;
      }
    },
    resetSignCounter: state => {
      state.signCounter = initialState.signCounter;
    },
    setAccount: (state, { payload }: PayloadAction<AccountType>) => {
      state.account = payload;
    },
    setAccountEns: (state, { payload }: PayloadAction<string>) => {
      if (state.account) {
        state.account.ens = payload;
      }
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    setBlockInfoLoading: (
      state,
      { payload }: PayloadAction<LoadingStatusType>
    ) => {
      state.blockInfoLoading = payload;
    },
    setBlockInfo: (state, { payload }: PayloadAction<BlockInfoType>) => {
      state.blockInfo = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(disconnectWallet.type, (state, action) => {
      state.loading = initialState.loading;
      state.globalState = initialState.globalState;
      state.currentNetwork = initialState.currentNetwork;
      state.signCounter = initialState.signCounter;
      state.account = initialState.account;
      state.error = initialState.error;
      state.blockInfoLoading = initialState.blockInfoLoading;
      state.blockInfo = initialState.blockInfo;
    });
  },
});

export const {
  setAccount,
  setAccountEns,
  setWalletState,
  setWalletInitState,
  setWalletAccountState,
  setWalletNetworkState,
  setWalletSignState,
  setCurrentNetwork,
  setLoading,
  decSignCounter,
  resetSignCounter,
  setError,
  setBlockInfoLoading,
  setBlockInfo,
} = wallet.actions;

export const walletReducer = wallet.reducer;
