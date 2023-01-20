import { ethers } from 'ethers';
import { EventChannel } from 'redux-saga';

export enum LoadingStatusType {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
}

export enum WalletInitStateType {
  IDLE = 'IDLE',
  INIT_REQUESTED = 'INIT_REQUESTED',
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  INIT_FAILED = 'INIT_FAILED',
  INITIALIZED = 'INITIALIZED',
}

export enum WalletAccountStateType {
  IDLE = 'IDLE',
  ACCOUNT_REQUESTED = 'ACCOUNT_REQUESTED',
  ACCOUNT_DETECTION_FAILED = 'ACCOUNT_DETECTION_FAILED',
  LOCKED = 'LOCKED',
  UNLOCK_REQUESTED = 'UNLOCK_REQUESTED',
  UNLOCK_REJECTED = 'UNLOCK_REJECTED',
  UNLOCK_FAILED = 'UNLOCK_FAILED',
  ACCOUNT_LOADED = 'ACCOUNT_LOADED',
}

export enum WalletNetworkStateType {
  IDLE = 'IDLE',
  NETWORK_REQUESTED = 'NETWORK_REQUESTED',
  NETWORK_DETECTION_FAILED = 'NETWORK_DETECTION_FAILED',
  WRONG_NETWORK = 'WRONG_NETWORK',
  NETWORK_SWITCH_REQUESTED = 'NETWORK_SWITCH_REQUESTED',
  NETWORK_SWITCH_REJECTED = 'NETWORK_SWITCH_REJECTED',
  NETWORK_SWITCH_FAILED = 'NETWORK_SWITCH_FAILED',
  NETWORK_LOADED = 'NETWORK_LOADED',
}

export enum WalletSignStateType {
  IDLE = 'IDLE',
  NOT_SIGNED = 'NOT_SIGNED',
  SIGN_REQUESTED = 'SIGN_REQUESTED',
  SIGN_REJECTED = 'SIGN_REJECTED',
  SIGN_TIMED_OUT = 'SIGN_TIMED_OUT',
  SIGN_FAILED = 'SIGN_FAILED',
  SIGNED = 'SIGNED',
}

export enum WalletStateType {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  CHECKING_WALLET = 'CHECKING_WALLET',
  CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
  CHECKING_NETWORK = 'CHECKING_NETWORK',
  CHECKING_SIGN = 'CHECKING_SIGN',
  AUTHENTICATED = 'AUTHENTICATED',
}

export type WalletGlobalStateType = {
  state: WalletStateType;
  initState: WalletInitStateType;
  accountState: WalletAccountStateType;
  networkState: WalletNetworkStateType;
  signState: WalletSignStateType;
};

export type AccountType = {
  address: string;
  shortAddress: string;
  ens: string | null;
};

export type ChainInfoType = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  addressExplorerUrl: string | null;
  transactionExplorerUrl: string | null;
  multicallAddress: string | null;
  isTestChain: boolean;
  isLocalChain: boolean;
};

export type BlockInfoType = {
  blockNumber: string;
  signerAccountBalance: string;
};

export type WalletStoreState = {
  loading: LoadingStatusType;
  globalState: WalletGlobalStateType;
  currentNetwork: ChainInfoType | null;
  signCounter: number;
  account: AccountType | null;
  error: string | null;
  blockInfoLoading: LoadingStatusType;
  blockInfo: BlockInfoType | null;
};

export interface IWalletInitApi {
  loadProvider(): Promise<boolean>;
}

export interface IWalletAccountApi {
  isUnlocked(): Promise<boolean>;
  unlock(): Promise<void>;
}

export interface IWalletNetworkApi {
  loadNetwork(): Promise<boolean>;
  getNetwork(): ChainInfoType | undefined;
  switchNetwork(networkId: number): Promise<boolean>;
  listenNetworkChange(): EventChannel<string> | undefined;
  handleNetworkChange(): Promise<void>;
}

export interface IWalletSignApi {
  isSigned(): Promise<boolean>;
  sign(message: string): Promise<void>;
  getAccount(): Promise<AccountType | null>;
}

export interface IWalletAuthenticatedApi {
  isEnsSupported(chainId: number | null): Promise<boolean>;
  getEns(): Promise<string | null | undefined>;
  listenAccountChange(): EventChannel<string[]> | undefined;
  handleAccountChange(): Promise<void>;
}

export interface IWalletBlockInfoApi {
  getLatestBlock(): Promise<number | undefined>;
  getBalance(): Promise<string>;
}

export interface IWalletResetApi {
  reset(): Promise<void>;
}

export interface IWalletProviderApi {
  getProvider(): ethers.providers.Web3Provider | null;
  getSigner(): string | null;
}

export interface IWalletAPI
  extends IWalletInitApi,
    IWalletAccountApi,
    IWalletNetworkApi,
    IWalletSignApi,
    IWalletAuthenticatedApi,
    IWalletBlockInfoApi,
    IWalletResetApi,
    IWalletProviderApi {}
