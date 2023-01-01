import { ChainInfoType } from "../types";

export const GanacheChain: ChainInfoType = {
  chainId: 1337,
  chainName: "Ganache",
  nativeCurrency: {
    name: "Ganache ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["http://localhost:7545"],
  blockExplorerUrls: [],
  addressExplorerUrl: "",
  transactionExplorerUrl: "",
  multicallAddress: "",
  isTestChain: true,
  isLocalChain: true,
};
