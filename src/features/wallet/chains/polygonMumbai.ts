import { ChainInfoType } from '../types';

export const PolygonMumbaiChain: ChainInfoType = {
  chainId: 80001,
  chainName: 'Polygon Mumbai',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  addressExplorerUrl: 'address',
  transactionExplorerUrl: 'tx',
  multicallAddress: '',
  isTestChain: true,
  isLocalChain: false,
};
