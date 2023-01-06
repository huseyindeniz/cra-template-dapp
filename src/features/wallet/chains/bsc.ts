import { ChainInfoType } from '../types';

export const BinanceSmartChain: ChainInfoType = {
  chainId: 56,
  chainName: 'Binance Smart Chain Mainnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
  blockExplorerUrls: ['https://bscscan.com'],
  addressExplorerUrl: 'address',
  transactionExplorerUrl: 'tx',
  multicallAddress: '',
  isTestChain: false,
  isLocalChain: false,
};
