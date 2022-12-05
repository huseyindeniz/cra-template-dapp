import { ChainInfoType } from "../types";

export const EthereumMainnetChain: ChainInfoType = {
  chain: {
    chainId: 1,
    chainName: "Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://etherscan.io/address/"],
  },
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
  transactionExplorerUrl: "https://etherscan.io/tx/",
};
