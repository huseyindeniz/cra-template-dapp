import { WalletStateType, IWalletApi, AccountType } from "./types";

import { SUPPORTED_NETWORKS } from "./config";

import { Wallet } from "./components/Wallet";

import { BlockInfo } from "./components/BlockInfo";
import { NetworkLogo } from "./components/NetworkLogo";

import { useActions } from "./useActions";
import { useWalletAuthentication } from "./hooks/useWalletAuthentication";
import { withWalletProtection } from "./hocs/withWalletProtection";
import { watchWalletSaga } from "./sagas";
import { announceWalletLoaded } from "./actions";

import { walletReducer } from "./slices";

export type { IWalletApi, AccountType };

export {
  Wallet,
  BlockInfo,
  NetworkLogo,
  SUPPORTED_NETWORKS,
  useActions,
  useWalletAuthentication,
  withWalletProtection,
  watchWalletSaga,
  walletReducer,
  announceWalletLoaded,
  WalletStateType,
};
