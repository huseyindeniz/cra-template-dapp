import { ChainInfoType } from "../types";

export const GanacheChain: ChainInfoType = {
  chain: {
    chainId: 1337,
    chainName: "Ganache",
    nativeCurrency: {
      name: "Ganache",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://snowtrace.io/address/"],
  },
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3",
  transactionExplorerUrl: "https://snowtrace.io/tx/",
};
