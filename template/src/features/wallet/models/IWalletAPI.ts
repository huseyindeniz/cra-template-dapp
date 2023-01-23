import { ethers } from 'ethers';
import { EventChannel } from 'redux-saga';

import { AccountType } from './Account';
import { ChainInfoType } from './ChainInfo';

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
