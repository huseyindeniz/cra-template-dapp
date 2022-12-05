import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { disconnectWallet } from "./actions";
import {
  WalletStoreState,
  WalletStateType,
  AccountType,
  LoadingStatusType,
  ChainInfoType,
  BlockInfoType,
} from "./types";

import { SIGN_TIMEOUT_IN_SEC } from "./config";

export const initialState = Object.freeze({
  loading: LoadingStatusType.IDLE,
  state: WalletStateType.NOT_INITIALIZED,
  currentNetwork: null,
  signCounter: SIGN_TIMEOUT_IN_SEC,
  account: null,
  error: null,
  blockInfoLoading: LoadingStatusType.IDLE,
  blockInfo: null,
}) as WalletStoreState;

const wallet = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<LoadingStatusType>) => {
      state.loading = payload;
    },
    setWalletStatus: (state, { payload }: PayloadAction<WalletStateType>) => {
      state.state = payload;
    },
    setCurrentNetwork: (state, { payload }: PayloadAction<ChainInfoType>) => {
      state.currentNetwork = payload;
    },
    decSignCounter: (state) => {
      --state.signCounter;
    },
    resetSignCounter: (state) => {
      state.signCounter = initialState.signCounter;
    },
    setAccount: (state, { payload }: PayloadAction<AccountType>) => {
      state.account = payload;
    },
    setAccountEns: (state, { payload }: PayloadAction<string>) => {
      state.account!.ens = payload;
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
  extraReducers: (builder) => {
    builder.addCase(disconnectWallet.type, (state, action) => {
      state.loading = initialState.loading;
      state.state = initialState.state;
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
  setWalletStatus,
  setCurrentNetwork,
  setLoading,
  decSignCounter,
  resetSignCounter,
  setError,
  setBlockInfoLoading,
  setBlockInfo,
} = wallet.actions;

export const walletReducer = wallet.reducer;
