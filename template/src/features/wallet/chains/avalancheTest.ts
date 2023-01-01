import { ChainInfoType } from "../types";

export const AvalancheTestChain: ChainInfoType = {
  chainId: 43113,
  chainName: "Avalanche Fuji Testnet",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io"],
  addressExplorerUrl: "address",
  transactionExplorerUrl: "tx",
  multicallAddress: "",
  isTestChain: true,
  isLocalChain: false,
};
