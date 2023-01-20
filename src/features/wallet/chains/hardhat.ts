import { ChainInfoType } from '../types';

export const HardhatChain: ChainInfoType = {
  chainId: 31337,
  chainName: 'Hardhat',
  nativeCurrency: {
    name: 'HardhatETH',
    symbol: 'HardhatETH',
    decimals: 18,
  },
  rpcUrls: ['http://127.0.0.1:8545'],
  blockExplorerUrls: [],
  addressExplorerUrl: '',
  transactionExplorerUrl: '',
  multicallAddress: '',
  isTestChain: true,
  isLocalChain: true,
};
