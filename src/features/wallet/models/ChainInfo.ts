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
