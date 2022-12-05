import { ChainInfoType } from "../types";

export const AvalancheChain: ChainInfoType = {
  chain: {
    chainId: 43114,
    chainName: "Avalanche",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://snowtrace.io/address/"],
  },
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3",
  transactionExplorerUrl: "https://snowtrace.io/tx/",
};
