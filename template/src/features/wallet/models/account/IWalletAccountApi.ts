import { EventChannel } from 'redux-saga';

import { AccountType } from './types/Account';

export interface IWalletAccountApi {
  isUnlocked(): Promise<boolean>;
  unlock(): Promise<void>;
  isSigned(): Promise<boolean>;
  sign(message: string): Promise<void>;
  getAccount(): Promise<AccountType | null>;
  isEnsSupported(chainId: number | null): Promise<boolean>;
  getEns(): Promise<string | null | undefined>;
  listenAccountChange(): EventChannel<string[]> | undefined;
  handleAccountChange(): Promise<void>;
  reset(): Promise<void>;
}
