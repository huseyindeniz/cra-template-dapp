import { ethers } from "ethers";
import { EventChannel } from "redux-saga";
import { LangCode } from "../../config/types";

export enum LoadingStatusType {
  IDLE = "IDLE",
  PENDING = "PENDING",
}

export enum WalletStateType {
  NOT_INITIALIZED = "NOT_INITIALIZED",

  // Step 0
  INIT_REQUESTED = "INIT_REQUESTED",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  INIT_FAILED = "INIT_FAILED",

  // Step 1
  ACCOUNT_REQUESTED = "ACCOUNT_REQUESTED",
  ACCOUNT_DETECTION_FAILED = "ACCOUNT_DETECTION_FAILED",
  LOCKED = "LOCKED",
  UNLOCK_REQUESTED = "UNLOCK_REQUESTED",
  UNLOCK_REJECTED = "UNLOCK_REJECTED",
  UNLOCK_FAILED = "UNLOCK_FAILED",

  // Step 2
  NETWORK_REQUESTED = "NETWORK_REQUESTED",
  NETWORK_DETECTION_FAILED = "NETWORK_DETECTION_FAILED",
  WRONG_NETWORK = "WRONG_NETWORK",
  NETWORK_SWITCH_REQUESTED = "NETWORK_SWITCH_REQUESTED",
  NETWORK_SWITCH_REJECTED = "NETWORK_SWITCH_REJECTED",
  NETWORK_SWITCH_FAILED = "NETWORK_SWITCH_FAILED",

  // Step 3
  NOT_SIGNED = "NOT_SIGNED",
  SIGN_REQUESTED = "SIGN_REQUESTED",
  SIGN_REJECTED = "SIGN_REJECTED",
  SIGN_TIMED_OUT = "SIGN_TIMED_OUT",
  SIGN_FAILED = "SIGN_FAILED",
  SIGNED = "SIGNED",

  AUTHENTICATED = "AUTHENTICATED",
}

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
  state: WalletStateType;
  currentNetwork: ChainInfoType | null;
  signCounter: number;
  account: AccountType | null;
  error: string | null;
  blockInfoLoading: LoadingStatusType;
  blockInfo: BlockInfoType | null;
};

export type SignMessage = {
  [LangCode.EN_US]: string;
  [LangCode.TR_TR]: string;
};

export interface IWalletApi {
  loadProvider(): Promise<boolean>;
  loadNetwork(): Promise<boolean>;
  switchNetwork(networkId: number): Promise<boolean>;
  unlock(): Promise<void>;
  sign(message: string): Promise<void>;

  isEnsSupported(chainId: number | null): Promise<boolean>;
  isUnlocked(): Promise<boolean>;
  isSigned(): Promise<boolean>;

  getSigner(): string | null;
  getProvider(): ethers.providers.Web3Provider | null;
  getAccount(): Promise<AccountType | null>;
  getEns(): Promise<string | null | undefined>;
  getNetwork(): ChainInfoType | undefined;
  getLatestBlock(): Promise<number | undefined>;
  getBalance(): Promise<string>;

  listenNetworkChange(): EventChannel<string> | undefined;
  listenAccountChange(): EventChannel<string[]> | undefined;

  handleNetworkChange(): Promise<void>;
  handleAccountChange(): Promise<void>;

  reset(): Promise<void>;
}
