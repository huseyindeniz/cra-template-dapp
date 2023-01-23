import { AccountType } from './Account';
import { BlockInfoType } from './BlockInfo';
import { ChainInfoType } from './ChainInfo';
import { LoadingStatusType } from './LoadingStatus';
import { WalletGlobalStateType } from './WalletGlobalState';

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
