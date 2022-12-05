import { ChainInfoType } from "../types";

export const AvalancheFujiChain: ChainInfoType = {
  chain: {
    chainId: 43113,
    chainName: "Avalanche Fuji C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://testnet.snowtrace.io/address/"],
  },
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3",
  transactionExplorerUrl: "https://testnet.snowtrace.io/tx/",
};
